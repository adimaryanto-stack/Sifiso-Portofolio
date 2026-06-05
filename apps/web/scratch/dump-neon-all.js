const postgres = require("postgres");

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
  console.log("Connecting to Neon PostgreSQL...");
  const sql = postgres(connectionString, { ssl: "require" });

  try {
    const packages = await sql`SELECT * FROM pricing_packages`;
    console.log("Pricing packages:", packages);

    const siteSettings = await sql`SELECT * FROM site_settings`;
    console.log("Site settings:", siteSettings);
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    await sql.end();
  }
}

main();
