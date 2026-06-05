const postgres = require("postgres");

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
  console.log("Connecting to Neon PostgreSQL...");
  const sql = postgres(connectionString, { ssl: "require" });

  try {
    const seoData = JSON.stringify({
      title: "Sifiso — Modern Design & Development Portfolio",
      description: "Creative developer and designer specializing in high-end digital experiences.",
      generator: "Next.js, Tailwind, Framer Motion"
    });

    console.log("Updating seo_metadata in site_settings...");
    const result = await sql`
      UPDATE site_settings 
      SET value = ${seoData}, updated_at = NOW() 
      WHERE key = 'seo_metadata'
    `;
    console.log("Update result:", result);

    const updated = await sql`SELECT * FROM site_settings WHERE key = 'seo_metadata'`;
    console.log("Updated record:", updated);
  } catch (err) {
    console.error("Database error during update:", err);
  } finally {
    await sql.end();
  }
}

main();
