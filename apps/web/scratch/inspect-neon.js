const postgres = require("postgres");

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
  console.log("Connecting to Neon PostgreSQL...");
  const sql = postgres(connectionString, { ssl: "require" });

  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("Tables in database:", tables.map(t => t.table_name));

    if (tables.some(t => t.table_name === 'site_settings')) {
      const settings = await sql`SELECT * FROM site_settings`;
      console.log("Site settings:", settings);
    } else {
      console.log("site_settings table does not exist!");
    }
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    await sql.end();
  }
}

main();
