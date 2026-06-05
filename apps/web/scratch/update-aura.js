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

async function updateAuraCommerce() {
  try {
    const result = await client`
      UPDATE projects 
      SET project_status = 'live', live_url = 'https://sifiso-portofolio-web.vercel.app'
      WHERE slug = 'aura-commerce'
      RETURNING id, title, slug, project_status, live_url
    `;
    console.log("Updated Aura Commerce project:");
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Failed to update database:", err);
  } finally {
    await client.end();
  }
}

updateAuraCommerce();
