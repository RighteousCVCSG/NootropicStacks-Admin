import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  float,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Supplements ────────────────────────────────────────────────────────────

export const supplements = mysqlTable("supplements", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: varchar("name", { length: 128 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  dosageMin: float("dosageMin"),
  dosageMax: float("dosageMax"),
  dosageUnit: varchar("dosageUnit", { length: 16 }),
  // Effect scores 0-10
  scoreEnergy: float("scoreEnergy").default(0),
  scoreMood: float("scoreMood").default(0),
  scoreMemory: float("scoreMemory").default(0),
  scoreFocus: float("scoreFocus").default(0),
  scoreCreativity: float("scoreCreativity").default(0),
  scoreSleep: float("scoreSleep").default(0),
  scoreAnxiety: float("scoreAnxiety").default(0),
  // Affiliate links
  affiliatePrimary: varchar("affiliatePrimary", { length: 512 }),
  affiliatePrimaryLabel: varchar("affiliatePrimaryLabel", { length: 64 }),
  affiliateSecondary: varchar("affiliateSecondary", { length: 512 }),
  affiliateSecondaryLabel: varchar("affiliateSecondaryLabel", { length: 64 }),
  affiliateAmazon: varchar("affiliateAmazon", { length: 512 }),
  imageUrl: varchar("imageUrl", { length: 512 }),
  safetyRating: mysqlEnum("safetyRating", ["very_safe", "safe", "moderate", "caution"]).default("safe"),
  isPopular: boolean("isPopular").default(false),
  isFeatured: boolean("isFeatured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Supplement = typeof supplements.$inferSelect;
export type InsertSupplement = typeof supplements.$inferInsert;

// ─── User Stacks ─────────────────────────────────────────────────────────────

export const stacks = mysqlTable("stacks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  goal: varchar("goal", { length: 64 }),
  description: text("description"),
  isPublic: boolean("isPublic").default(false),
  shareToken: varchar("shareToken", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Stack = typeof stacks.$inferSelect;
export type InsertStack = typeof stacks.$inferInsert;

export const stackItems = mysqlTable("stack_items", {
  id: int("id").autoincrement().primaryKey(),
  stackId: int("stackId").notNull(),
  supplementId: int("supplementId").notNull(),
  dosageMg: float("dosageMg"),
  timing: varchar("timing", { length: 64 }),
  notes: text("notes"),
  sortOrder: int("sortOrder").default(0),
});

export type StackItem = typeof stackItems.$inferSelect;
export type InsertStackItem = typeof stackItems.$inferInsert;

// ─── Email Leads ─────────────────────────────────────────────────────────────

export const emailLeads = mysqlTable("email_leads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 128 }),
  source: varchar("source", { length: 64 }).default("lead_magnet"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailLead = typeof emailLeads.$inferSelect;

// ─── Affiliate Click Tracking ────────────────────────────────────────────────

export const affiliateClicks = mysqlTable("affiliate_clicks", {
  id: int("id").autoincrement().primaryKey(),
  supplementId: int("supplementId"),
  supplementSlug: varchar("supplementSlug", { length: 128 }),
  affiliatePartner: varchar("affiliatePartner", { length: 64 }).notNull(),
  destinationUrl: text("destinationUrl").notNull(),
  userId: int("userId"),
  sessionId: varchar("sessionId", { length: 64 }),
  ipHash: varchar("ipHash", { length: 64 }),
  referrer: text("referrer"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AffiliateClick = typeof affiliateClicks.$inferSelect;
