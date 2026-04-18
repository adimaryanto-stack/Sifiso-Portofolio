import { db } from "./index";
import * as schema from "./schema";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(schema.projects);
  await db.delete(schema.services);

  // Seed Services
  await db.insert(schema.services).values([
    {
      id: uuidv4(),
      title: "UI/UX Design",
      description: "Creating intuitive, aesthetic, and user-centric interfaces.",
      iconName: "Monitor",
      sortOrder: 0,
    },
    {
      id: uuidv4(),
      title: "Web Development",
      description: "Building fast and scalable web applications.",
      iconName: "Codepen",
      sortOrder: 1,
    },
    {
      id: uuidv4(),
      title: "3D Visualization",
      description: "Bringing your products to life with stunning 3D renders.",
      iconName: "Layers",
      sortOrder: 2,
    }
  ]);

  // Seed Projects
  await db.insert(schema.projects).values([
    {
      id: uuidv4(),
      title: "Aura E-Commerce Realization",
      slug: "aura-ecommerce",
      category: "Digital Experience",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      brief: "A luxury fashion retail experience.",
      isFeatured: true,
      isPublished: true,
    },
    {
      id: uuidv4(),
      title: "Nebula Dashboard System",
      slug: "nebula-dashboard",
      category: "SaaS Platform",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop",
      brief: "Complex data visualization for fintech.",
      isFeatured: true,
      isPublished: true,
    },
    {
      id: uuidv4(),
      title: "Vortex Motion UI",
      slug: "vortex-motion",
      category: "Interaction Design",
      thumbnailUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2371&auto=format&fit=crop",
      brief: "Advanced micro-interactions and animations.",
      isFeatured: true,
      isPublished: true,
    }
  ]);

  console.log("✅ Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
