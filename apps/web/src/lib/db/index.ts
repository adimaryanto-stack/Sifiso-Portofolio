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
  // Ensure we consistently point to the same file in the project root
  // Handles running from project root or apps/web
  const dbPath = process.cwd().includes("apps") 
    ? path.resolve(process.cwd(), "../../sifiso-local.db") 
    : path.resolve(process.cwd(), "sifiso-local.db");
    
  const sqlite = new Database(dbPath);
  return drizzleSqlite(sqlite, { schema });
}

// Export as any to avoid Drizzle's dialect-specific union type errors in cross-platform usage
export const db = createDb() as any;
