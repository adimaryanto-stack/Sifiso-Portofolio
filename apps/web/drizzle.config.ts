import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

const isPostgres = process.env.DATABASE_URL?.startsWith("postgres") || !!process.env.POSTGRES_URL;
const sqlitePath = path.resolve(process.cwd(), "../../sifiso-local.db"); // Drizzle kit often runs from apps/web

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: isPostgres ? "postgresql" : "sqlite",
  dbCredentials: {
    url: (isPostgres ? process.env.POSTGRES_URL || process.env.DATABASE_URL : "../../sifiso-local.db") as string,
  },
});
