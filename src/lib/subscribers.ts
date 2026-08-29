import "server-only";
import { desc, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { subscribers, type SubscriberRow } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

export type SubscribeResult = "subscribed" | "already_subscribed" | "invalid";

export async function addSubscriber(rawEmail: string): Promise<SubscribeResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!isValidEmail(email)) return "invalid";

  const db = getDb();
  const inserted = await db
    .insert(subscribers)
    .values({ email })
    .onConflictDoNothing({ target: subscribers.email })
    .returning({ id: subscribers.id });

  return inserted.length > 0 ? "subscribed" : "already_subscribed";
}

export async function listSubscribers(): Promise<SubscriberRow[]> {
  const db = getDb();
  return db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
}

export async function subscriberCount(): Promise<number> {
  const db = getDb();
  const [row] = await db.select({ count: sql<number>`count(*)` }).from(subscribers);
  return Number(row?.count ?? 0);
}
