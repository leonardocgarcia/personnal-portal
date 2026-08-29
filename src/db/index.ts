import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy initialization: DATABASE_URL isn't set at build time (e.g. before the
// Marketplace integration provisions it), and neon() throws immediately if
// the connection string is missing. Deferring the call keeps `next build`
// from crashing when no request has actually reached the DB yet.
function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}
