process.env.POSTGRES_URL = "postgresql://neondb_owner:npg_JnjCOp1T3ZMx@ep-odd-boat-aofdbo2c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
import { auth } from "../src/lib/auth";

async function seed() {
  console.log("🌱 Seeding admin user...");
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@sifiso.pro",
        password: "SifisoAdmin2024!",
        name: "Admin Sifiso",
      },
    });
    console.log("✅ Admin user created successfully:", user);
  } catch (error) {
    console.error("❌ Failed to seed admin user:", error);
  }
}

seed();
