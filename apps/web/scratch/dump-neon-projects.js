const postgres = require("postgres");

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
  console.log("Connecting to Neon PostgreSQL...");
  const sql = postgres(connectionString, { ssl: "require" });

  try {
    const projects = await sql`SELECT id, title, process_gallery, results_metrics FROM projects`;
    console.log("Projects in Neon DB:", projects);
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    await sql.end();
  }
}

main();
