const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const { pgTable, text, jsonb } = require("drizzle-orm/pg-core");

const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
});

async function main() {
  const connectionString = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
  const client = postgres(connectionString);
  const db = drizzle(client);

  try {
    const results = await db.select().from(siteSettings);
    console.log("Drizzle returned records:");
    results.forEach(r => {
      console.log(`KEY: ${r.key}`);
      console.log("TYPE OF VALUE:", typeof r.value);
      console.log("VALUE:", r.value);
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
