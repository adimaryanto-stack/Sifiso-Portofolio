import * as dotenv from "dotenv";
import path from "path";

// Load env variables from apps/web/.env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

async function main() {
  console.log("POSTGRES_URL from env:", process.env.POSTGRES_URL ? "DEFINED" : "UNDEFINED");
  
  // Dynamically import db so env vars are set before it evaluates
  const { db } = await import("../src/lib/db");
  const { siteSettings } = await import("../src/lib/db/schema");
  const { eq } = await import("drizzle-orm");
  const postgres = (await import("postgres")).default;

  console.log("Updating using Drizzle...");
  const seoData = {
    title: "Sifiso — Modern Design & Development Portfolio (Updated)",
    description: "Creative developer and designer specializing in high-end digital experiences.",
    generator: "Next.js, Tailwind, Framer Motion"
  };

  try {
    await db.update(siteSettings)
      .set({ value: seoData })
      .where(eq(siteSettings.key, "seo_metadata"));

    console.log("Updated via Drizzle successfully!");

    // Query it back using raw postgres to see what is written in the DB
    const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
    const rawRecord = await sql`SELECT value FROM site_settings WHERE key = 'seo_metadata'`;
    console.log("Raw value in PostgreSQL:", rawRecord[0].value);
    await sql.end();
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
