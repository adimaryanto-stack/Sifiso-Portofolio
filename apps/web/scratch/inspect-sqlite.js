const Database = require("better-sqlite3");
const path = require("path");

async function main() {
  const dbPath = path.resolve(__dirname, "../../../sifiso-local.db");
  console.log("Connecting to SQLite at:", dbPath);

  try {
    const db = new Database(dbPath);
    
    // Check tables
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log("Tables in SQLite:", tables.map(t => t.name));

    if (tables.some(t => t.name === 'services')) {
      const services = db.prepare("SELECT * FROM services").all();
      console.log(`Services count: ${services.length}`);
    }

    if (tables.some(t => t.name === 'testimonials')) {
      const testimonials = db.prepare("SELECT * FROM testimonials").all();
      console.log(`Testimonials count: ${testimonials.length}`);
    }

    if (tables.some(t => t.name === 'site_settings')) {
      const settings = db.prepare("SELECT * FROM site_settings").all();
      console.log("Site settings:", settings);
    }
  } catch (err) {
    console.error("SQLite error:", err);
  }
}

main();
