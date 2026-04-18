import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import Database from "better-sqlite3";
import postgres from "postgres";
import * as schema from "./schema";
import path from "path";

const isProduction = process.env.NODE_ENV === "production" || !!process.env.POSTGRES_URL;

function createDb() {
  if (isProduction && process.env.POSTGRES_URL) {
    console.log("🚀 Using Production PostgreSQL Database");
    const client = postgres(process.env.POSTGRES_URL);
    return drizzlePg(client, { schema });
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
