import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import Database from "better-sqlite3";
import postgres from "postgres";
import * as schema from "./schema";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";
const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

function createDb() {
  if (postgresUrl) {
    console.log("🚀 Using Production PostgreSQL Database");
    const client = postgres(postgresUrl, { connect_timeout: 10 });
    return drizzlePg(client, { schema });
  }

  if (isProduction) {
    console.log("⚠️ WARNING: Running in production but no PostgreSQL URL found! Falling back to SQLite (may fail on read-only filesystems).");
  }

  console.log("💻 Using Local SQLite Database");
  const dbPath = process.cwd().includes("apps") 
    ? path.resolve(process.cwd(), "../../sifiso-local.db") 
    : path.resolve(process.cwd(), "sifiso-local.db");
    
  const sqlite = new Database(dbPath);
  return drizzleSqlite(sqlite, { schema });
}

// NOTE: `as any` is required here because Drizzle's SQLite and PostgreSQL
// database types have incompatible select()/insert()/update() overloads.
// A union type (BetterSQLite3Database | PostgresJsDatabase) causes TS2349
// errors at every query call site. This is a known tradeoff of the hybrid
// DB architecture. Runtime behavior is correct — the cast only affects types.
export const db = createDb() as any;
