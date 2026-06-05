const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("No database URL found");
  process.exit(1);
}

const client = postgres(connectionString);

async function checkProjects() {
  try {
    const results = await client`SELECT id, title, slug, project_status, live_url FROM projects`;
    console.log("Current Projects in DB:");
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

checkProjects();
