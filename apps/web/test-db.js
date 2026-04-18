const postgres = require('postgres');

async function testConnection() {
  const connectionString = "postgres://postgres.spcfqhirxemnfxvykdsu:hRe3PPSKccWr1nhN@3.106.102.114:6543/postgres?options=project%3Dspcfqhirxemnfxvykdsu";
  console.log("Connecting (via IP:6543) to:", connectionString.replace(/:[^@]+@/, ":****@"));
  
  const sql = postgres(connectionString, { 
    prepare: false,
    ssl: 'require' 
  });
  
  try {
    const result = await sql`select 1 as result`;
    console.log("✅ Success:", result);
  } catch (err) {
    console.error("❌ Error:", err.message);
    if (err.message.includes("ENOTFOUND")) {
        console.log("Suggestions: DNS issues. Try using an IP or checking your network.");
    }
  } finally {
    await sql.end();
  }
}

testConnection();
