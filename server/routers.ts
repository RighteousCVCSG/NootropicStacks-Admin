import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import {
  supplements,
  stacks,
  stackItems,
  emailLeads,
  affiliateClicks,
} from "../drizzle/schema";
import { eq, like, or, desc, and, inArray, sql, gte } from "drizzle-orm";
import crypto from "crypto";

const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN || "";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Supplements ──────────────────────────────────────────────────────────
  supplements: router({
    list: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          search: z.string().optional(),
          goal: z.string().optional(),
          featured: z.boolean().optional(),
          popular: z.boolean().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { items: [], total: 0 };

        let query = db.select().from(supplements).$dynamic();

        const conditions = [];
        if (input.category) conditions.push(eq(supplements.category, input.category));
        if (input.featured) conditions.push(eq(supplements.isFeatured, true));
        if (input.popular) conditions.push(eq(supplements.isPopular, true));
        if (input.search) {
          conditions.push(
            or(
              like(supplements.name, `%${input.search}%`),
              like(supplements.category, `%${input.search}%`),
              like(supplements.summary, `%${input.search}%`)
            )
          );
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }

        const items = await query.limit(input.limit).offset(input.offset);
        return { items, total: items.length };
      }),

    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db
          .select()
          .from(supplements)
          .where(eq(supplements.slug, input.slug))
          .limit(1);
        return result[0] ?? null;
      }),

    categories: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const result = await db
        .selectDistinct({ category: supplements.category })
        .from(supplements);
      return result.map((r) => r.category);
    }),

    recommend: publicProcedure
      .input(
        z.object({
          goals: z.array(z.string()),
          limit: z.number().default(6),
        })
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        // Simple scoring: sum scores for selected goals
        const all = await db.select().from(supplements);
        const goalToScore: Record<string, keyof typeof all[0]> = {
          energy: "scoreEnergy",
          mood: "scoreMood",
          memory: "scoreMemory",
          focus: "scoreFocus",
          creativity: "scoreCreativity",
          sleep: "scoreSleep",
          anxiety: "scoreAnxiety",
        };
        const scored = all.map((s) => {
          let total = 0;
          for (const g of input.goals) {
            const key = goalToScore[g.toLowerCase()];
            if (key) total += (s[key] as number) ?? 0;
          }
          return { ...s, _score: total };
        });
        scored.sort((a, b) => b._score - a._score);
        return scored.slice(0, input.limit);
      }),
  }),

  // ─── Stacks ───────────────────────────────────────────────────────────────
  stacks: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(stacks)
        .where(eq(stacks.userId, ctx.user.id))
        .orderBy(desc(stacks.updatedAt));
    }),

    byId: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return null;
        const [stack] = await db
          .select()
          .from(stacks)
          .where(and(eq(stacks.id, input.id), eq(stacks.userId, ctx.user.id)))
          .limit(1);
        if (!stack) return null;
        const items = await db
          .select()
          .from(stackItems)
          .where(eq(stackItems.stackId, stack.id));
        const supplementIds = items.map((i) => i.supplementId);
        const supps =
          supplementIds.length > 0
            ? await db
                .select()
                .from(supplements)
                .where(inArray(supplements.id, supplementIds))
            : [];
        return { ...stack, items, supplements: supps };
      }),

    byShareToken: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const [stack] = await db
          .select()
          .from(stacks)
          .where(and(eq(stacks.shareToken, input.token), eq(stacks.isPublic, true)))
          .limit(1);
        if (!stack) return null;
        const items = await db
          .select()
          .from(stackItems)
          .where(eq(stackItems.stackId, stack.id));
        const supplementIds = items.map((i) => i.supplementId);
        const supps =
          supplementIds.length > 0
            ? await db
                .select()
                .from(supplements)
                .where(inArray(supplements.id, supplementIds))
            : [];
        return { ...stack, items, supplements: supps };
      }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128),
          goal: z.string().optional(),
          description: z.string().optional(),
          isPublic: z.boolean().default(false),
          items: z.array(
            z.object({
              supplementId: z.number(),
              dosageMg: z.number().optional(),
              timing: z.string().optional(),
              notes: z.string().optional(),
              sortOrder: z.number().default(0),
            })
          ),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const shareToken = input.isPublic
          ? crypto.randomBytes(8).toString("hex")
          : null;
        const [result] = await db.insert(stacks).values({
          userId: ctx.user.id,
          name: input.name,
          goal: input.goal,
          description: input.description,
          isPublic: input.isPublic,
          shareToken,
        });
        const stackId = (result as any).insertId as number;
        if (input.items.length > 0) {
          await db.insert(stackItems).values(
            input.items.map((item) => ({ ...item, stackId }))
          );
        }
        return { id: stackId, shareToken };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1).max(128).optional(),
          goal: z.string().optional(),
          description: z.string().optional(),
          isPublic: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const { id, ...updates } = input;
        let shareToken: string | null | undefined = undefined;
        if (updates.isPublic === true) {
          shareToken = crypto.randomBytes(8).toString("hex");
        } else if (updates.isPublic === false) {
          shareToken = null;
        }
        await db
          .update(stacks)
          .set({ ...updates, ...(shareToken !== undefined ? { shareToken } : {}) })
          .where(and(eq(stacks.id, id), eq(stacks.userId, ctx.user.id)));
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db
          .delete(stackItems)
          .where(eq(stackItems.stackId, input.id));
        await db
          .delete(stacks)
          .where(and(eq(stacks.id, input.id), eq(stacks.userId, ctx.user.id)));
        return { success: true };
      }),

    addItem: protectedProcedure
      .input(
        z.object({
          stackId: z.number(),
          supplementId: z.number(),
          dosageMg: z.number().optional(),
          timing: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        // Verify ownership
        const [stack] = await db
          .select()
          .from(stacks)
          .where(and(eq(stacks.id, input.stackId), eq(stacks.userId, ctx.user.id)))
          .limit(1);
        if (!stack) throw new Error("Stack not found");
        const [result] = await db.insert(stackItems).values(input);
        return { id: (result as any).insertId };
      }),

    removeItem: protectedProcedure
      .input(z.object({ itemId: z.number(), stackId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const [stack] = await db
          .select()
          .from(stacks)
          .where(and(eq(stacks.id, input.stackId), eq(stacks.userId, ctx.user.id)))
          .limit(1);
        if (!stack) throw new Error("Stack not found");
        await db.delete(stackItems).where(eq(stackItems.id, input.itemId));
        return { success: true };
      }),
  }),

  // ─── Email Leads ──────────────────────────────────────────────────────────
  leads: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
          source: z.string().default("lead_magnet"),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        try {
          await db.insert(emailLeads).values(input);
          return { success: true };
        } catch {
          // Duplicate email — still return success
          return { success: true };
        }
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Forbidden");
      const db = await getDb();
      if (!db) return [];
      return db.select().from(emailLeads).orderBy(desc(emailLeads.createdAt));
    }),
  }),

  // ─── Affiliate Click Tracking ─────────────────────────────────────────────
  affiliate: router({
    trackClick: publicProcedure
      .input(
        z.object({
          supplementSlug: z.string().optional(),
          supplementId: z.number().optional(),
          affiliatePartner: z.string(),
          destinationUrl: z.string().url(),
          sessionId: z.string().optional(),
          referrer: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return { success: true };
        const ip = ctx.req.headers["x-forwarded-for"] as string || ctx.req.socket?.remoteAddress || "";
        const ipHash = ip ? crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16) : null;
        await db.insert(affiliateClicks).values({
          ...input,
          userId: ctx.user?.id,
          ipHash,
        });
        return { success: true };
      }),

    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Forbidden");
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(affiliateClicks)
        .orderBy(desc(affiliateClicks.createdAt))
        .limit(500);
    }),

    // Token-gated public summary so a small dashboard can be viewed without OAuth.
    publicSummary: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        if (!DASHBOARD_TOKEN || input.key !== DASHBOARD_TOKEN) {
          throw new Error("Unauthorized");
        }
        const db = await getDb();
        if (!db) {
          return {
            totals: { last24h: 0, last7d: 0, last30d: 0, allTime: 0 },
            byPartner: [],
            byReferrer: [],
            byDay: [],
            bySupplement: [],
          };
        }
        const now = Date.now();
        const d24 = new Date(now - 24 * 3600 * 1000);
        const d7 = new Date(now - 7 * 24 * 3600 * 1000);
        const d30 = new Date(now - 30 * 24 * 3600 * 1000);

        const [allTime, last24h, last7d, last30d] = await Promise.all([
          db.select({ c: sql<number>`count(*)` }).from(affiliateClicks),
          db.select({ c: sql<number>`count(*)` }).from(affiliateClicks).where(gte(affiliateClicks.createdAt, d24)),
          db.select({ c: sql<number>`count(*)` }).from(affiliateClicks).where(gte(affiliateClicks.createdAt, d7)),
          db.select({ c: sql<number>`count(*)` }).from(affiliateClicks).where(gte(affiliateClicks.createdAt, d30)),
        ]);

        const byPartner = await db
          .select({
            partner: affiliateClicks.affiliatePartner,
            count: sql<number>`count(*)`,
          })
          .from(affiliateClicks)
          .where(gte(affiliateClicks.createdAt, d30))
          .groupBy(affiliateClicks.affiliatePartner)
          .orderBy(desc(sql`count(*)`));

        const byReferrer = await db
          .select({
            referrer: affiliateClicks.referrer,
            count: sql<number>`count(*)`,
          })
          .from(affiliateClicks)
          .where(gte(affiliateClicks.createdAt, d30))
          .groupBy(affiliateClicks.referrer)
          .orderBy(desc(sql`count(*)`))
          .limit(20);

        const byDay = await db
          .select({
            day: sql<string>`date(${affiliateClicks.createdAt})`,
            count: sql<number>`count(*)`,
          })
          .from(affiliateClicks)
          .where(gte(affiliateClicks.createdAt, d30))
          .groupBy(sql`date(${affiliateClicks.createdAt})`)
          .orderBy(desc(sql`date(${affiliateClicks.createdAt})`));

        const bySupplement = await db
          .select({
            slug: affiliateClicks.supplementSlug,
            count: sql<number>`count(*)`,
          })
          .from(affiliateClicks)
          .where(gte(affiliateClicks.createdAt, d30))
          .groupBy(affiliateClicks.supplementSlug)
          .orderBy(desc(sql`count(*)`))
          .limit(20);

        return {
          totals: {
            allTime: Number(allTime[0]?.c ?? 0),
            last24h: Number(last24h[0]?.c ?? 0),
            last7d: Number(last7d[0]?.c ?? 0),
            last30d: Number(last30d[0]?.c ?? 0),
          },
          byPartner: byPartner.map((r) => ({ partner: r.partner, count: Number(r.count) })),
          byReferrer: byReferrer.map((r) => ({ referrer: r.referrer ?? "(none)", count: Number(r.count) })),
          byDay: byDay.map((r) => ({ day: r.day, count: Number(r.count) })),
          bySupplement: bySupplement.map((r) => ({ slug: r.slug ?? "(none)", count: Number(r.count) })),
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
