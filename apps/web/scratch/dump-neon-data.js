const postgres = require("postgres");

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
  console.log("Connecting to Neon PostgreSQL...");
  const sql = postgres(connectionString, { ssl: "require" });

  try {
    const services = await sql`SELECT * FROM services`;
    console.log(`Services count: ${services.length}`);
    console.log("Services:", services);

    const testimonials = await sql`SELECT * FROM testimonials`;
    console.log(`Testimonials count: ${testimonials.length}`);
    console.log("Testimonials:", testimonials);

    const siteSettings = await sql`SELECT * FROM site_settings`;
    console.log("Site Settings:", siteSettings);

    const projects = await sql`SELECT * FROM projects`;
    console.log(`Projects count: ${projects.length}`);
  } catch (err) {
    console.error("Database error during select:", err);
  } finally {
    await sql.end();
  }
}

main();
