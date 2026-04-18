/**
 * Seed admin user via Better Auth HTTP endpoint
 * Run AFTER starting the dev server: npx tsx src/lib/db/seed-admin-http.ts
 */

const BASE_URL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const ADMIN_EMAIL = "admin@sifiso.dev";
const ADMIN_PASSWORD = "Sifiso@2024!";
const ADMIN_NAME = "Sifiso Admin";

async function seedAdmin() {
  console.log("🌱 Seeding admin user via HTTP...");
  console.log(`   URL: ${BASE_URL}`);

  const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": BASE_URL,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    }),
  });

  let data: Record<string, unknown> | null = null;
  const rawText = await res.text();
  try {
    data = JSON.parse(rawText);
  } catch {
    // Response wasn't valid JSON
  }

  if (res.ok && data) {
    console.log("✅ Admin user created successfully!");
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
  } else if (res.status === 422 || rawText.includes("already")) {
    console.log("ℹ️  Admin user already exists — skipping.");
  } else {
    console.error("❌ Failed:", res.status, res.statusText);
    console.error("   Body:", rawText.slice(0, 500));
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Network error:", err.message);
  console.log("👉 Make sure the dev server is running: npm run dev");
  process.exit(1);
});
