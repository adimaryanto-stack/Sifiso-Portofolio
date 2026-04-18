import { auth } from "../lib/auth";
import { db } from "../lib/db";
import { user } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seed() {
  const email = "admin@sifiso.pro";
  const password = "SifisoAdmin2024!";

  const existing = await db.select().from(user).where(eq(user.email, email)).limit(1);
  
  if (existing.length > 0) {
    console.log("Admin user already exists.");
    return;
  }

  try {
    // We use Better Auth's internal method or just create via DB if we have hashed password
    // Better Auth doesn't have a simple "create user" server-side easily without a request in some versions
    // But we can try to use the api
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: "Sifiso Admin",
      }
    });
    console.log("Admin user created successfully.");
  } catch (e) {
    console.error("Failed to create admin user:", e);
  }
}

seed().then(() => process.exit());
