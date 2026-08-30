import "server-only";
import { and, eq, gt, lt, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { loginAttempts } from "@/db/schema";

const WINDOW_MINUTES = 15;
const MAX_ATTEMPTS = 5;
const RETENTION_MS = 24 * 60 * 60 * 1000;

export async function isLoginRateLimited(ip: string): Promise<boolean> {
  const db = getDb();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(loginAttempts)
    .where(and(eq(loginAttempts.ip, ip), gt(loginAttempts.attemptedAt, since)));
  return Number(row?.count ?? 0) >= MAX_ATTEMPTS;
}

export async function recordFailedLogin(ip: string): Promise<void> {
  const db = getDb();
  // Piggyback a cheap cleanup so this table never grows unbounded —
  // no cron job needed for a personal-blog scale of traffic.
  await db.delete(loginAttempts).where(lt(loginAttempts.attemptedAt, new Date(Date.now() - RETENTION_MS)));
  await db.insert(loginAttempts).values({ ip });
}

export async function clearLoginAttempts(ip: string): Promise<void> {
  const db = getDb();
  await db.delete(loginAttempts).where(eq(loginAttempts.ip, ip));
}
