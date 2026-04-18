import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: postgresUrl ? "pg" : "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL,
  emailAndPassword: {
    enabled: true,
  },
});
