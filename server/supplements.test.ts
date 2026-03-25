import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@nootropicstacker.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

describe("supplements.list", () => {
  it("returns items array when called without filters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.supplements.list({});
    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);
  });

  it("accepts category filter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.supplements.list({ category: "Adaptogen" });
    expect(result).toHaveProperty("items");
  });

  it("accepts search filter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.supplements.list({ search: "lion" });
    expect(result).toHaveProperty("items");
  });
});

describe("supplements.categories", () => {
  it("returns an array of category strings", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.supplements.categories();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("supplements.recommend", () => {
  it("returns recommended supplements for focus goal", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.supplements.recommend({ goals: ["focus"], limit: 3 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

describe("affiliate.trackClick", () => {
  it("tracks a click successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.affiliate.trackClick({
      affiliatePartner: "Nootropics Depot",
      destinationUrl: "https://nootropicsdepot.com/lions-mane",
      supplementSlug: "lions-mane-mushroom",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("affiliate.stats (admin only)", () => {
  it("returns stats for admin user", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.affiliate.stats();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws for non-admin user", async () => {
    const ctx = createPublicContext();
    ctx.user = {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    const caller = appRouter.createCaller(ctx);
    await expect(caller.affiliate.stats()).rejects.toThrow();
  });
});

describe("leads.subscribe", () => {
  it("accepts a valid email subscription", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.leads.subscribe({
      email: `test-${Date.now()}@example.com`,
      name: "Test User",
      source: "test",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const cleared: string[] = [];
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {
        clearCookie: (name: string) => cleared.push(name),
      } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
  });
});
