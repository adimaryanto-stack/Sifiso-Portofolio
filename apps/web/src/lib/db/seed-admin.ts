/**
 * Seed admin user via Better Auth
 * Run: npx tsx src/lib/db/seed-admin.ts
 *
 * This uses Better Auth's internal API to ensure the password is
 * properly hashed with scrypt (matching what Better Auth expects at login).
 */

import { auth } from "../auth";

async function seedAdmin() {
  const ADMIN_EMAIL = "admin@sifiso.dev";
  const ADMIN_PASSWORD = "Sifiso@2024!";
  const ADMIN_NAME = "Sifiso Admin";

  console.log("🌱 Seeding admin user...");

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      },
    });

    if (result) {
      console.log("✅ Admin user created successfully!");
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Password: ${ADMIN_PASSWORD}`);
    }
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };

    if (err?.status === 422 || err?.message?.includes("already exists")) {
      console.log("ℹ️  Admin user already exists — skipping.");
    } else {
      console.error("❌ Failed to create admin user:", error);
      process.exit(1);
    }
  }

  process.exit(0);
}

seedAdmin();
