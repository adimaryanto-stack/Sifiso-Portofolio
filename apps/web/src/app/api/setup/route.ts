import { db } from "@/lib/db";
import { projects, services, testimonials, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Get the admin user we just created
    const adminUser = await db.query.user.findFirst({
      where: eq(user.email, "admin@sifiso.pro"),
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found. Please create it first." });
    }

    console.log("🌱 Seeding production data...");

    // 2. Seed Services
    const demoServices = [
      { title: "UI/UX Design", description: "Crafting intuitive digital experiences that delight users.", iconName: "Layout", sortOrder: 1 },
      { title: "Web Development", description: "Building high-performance, responsive web applications.", iconName: "Code", sortOrder: 2 },
      { title: "Brand Identity", description: "Visual storytelling that builds trust and recognition.", iconName: "Feather", sortOrder: 3 },
    ];
    await db.insert(services).values(demoServices).onConflictDoNothing();

    // 3. Seed Projects
    const demoProjects = [
      {
        title: "Lumina Intelligence",
        slug: "lumina-intelligence",
        description: "AI-driven analytics dashboard for enterprise energy management.",
        category: "Product Design",
        thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bbda38a5f9a2?q=80&w=2070",
        isFeatured: true,
        isPublished: true,
        sortOrder: 1,
        createdBy: adminUser.id,
      },
      {
        title: "Aura Skincare",
        slug: "aura-skincare",
        description: "E-commerce experience for a luxury sustainable beauty brand.",
        category: "E-Commerce",
        thumbnailUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2070",
        isFeatured: true,
        isPublished: true,
        sortOrder: 2,
        createdBy: adminUser.id,
      },
      {
        title: "Zenith Workspace",
        slug: "zenith-workspace",
        description: "Minimalist productivity tool for distributed creative teams.",
        category: "SaaS",
        thumbnailUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070",
        isFeatured: true,
        isPublished: true,
        sortOrder: 3,
        createdBy: adminUser.id,
      }
    ];
    await db.insert(projects).values(demoProjects).onConflictDoNothing();

    // 4. Seed Testimonials
    const demoTestimonials = [
      { clientName: "Sarah Chen", clientTitle: "CEO at TechFlow", content: "Sifiso's attention to detail and design intuition are unparalleled. They transformed our product into something truly world-class." },
      { clientName: "Marcus Thorne", clientTitle: "Director of Aura", content: "Working with Sifiso was a game-changer for our brand identity. The results exceeded all our expectations." },
    ];
    await db.insert(testimonials).values(demoTestimonials).onConflictDoNothing();

    return NextResponse.json({ message: "Production data seeded successfully!" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message || "Failed to seed data" });
  }
}
