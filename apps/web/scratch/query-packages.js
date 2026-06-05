const postgres = require('postgres');

const databaseUrl = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

const sql = postgres(databaseUrl, { ssl: 'require' });

async function run() {
  try {
    const packages = await sql`SELECT * FROM pricing_packages ORDER BY sort_order ASC`;
    console.log("Pricing Packages:", JSON.stringify(packages, null, 2));

    const steps = await sql`SELECT * FROM creative_process_steps ORDER BY sort_order ASC`;
    console.log("Creative Process Steps:", JSON.stringify(steps, null, 2));
  } catch (err) {
    console.error("Error querying database:", err);
  } finally {
    await sql.end();
  }
}

run();
