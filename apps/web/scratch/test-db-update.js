// Set environment variables before importing anything
process.env.POSTGRES_URL = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

const { db } = require("../src/lib/db");
const { siteSettings } = require("../src/lib/db/schema");
const { eq } = require("drizzle-orm");

async function main() {
  console.log("Updating using Drizzle...");
  const seoData = {
    title: "Sifiso — Modern Design & Development Portfolio",
    description: "Creative developer and designer specializing in high-end digital experiences.",
    generator: "Next.js, Tailwind, Framer Motion"
  };

  try {
    await db.update(siteSettings)
      .set({ value: seoData })
      .where(eq(siteSettings.key, "seo_metadata"));

    console.log("Updated via Drizzle successfully!");

    // Query it back using raw postgres to see what is written in the DB
    const postgres = require("postgres");
    const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });
    const rawRecord = await sql`SELECT value FROM site_settings WHERE key = 'seo_metadata'`;
    console.log("Raw value in PostgreSQL:", rawRecord[0].value);
    await sql.end();
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
