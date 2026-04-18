import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import path from "path";

async function main() {
  // Use absolute path to the root database, handles running from root or apps/web
  const dbPath = process.cwd().endsWith("apps/web") || process.cwd().endsWith("apps\\web")
    ? path.resolve(process.cwd(), "../../sifiso-local.db") 
    : path.resolve(process.cwd(), "sifiso-local.db");
    
  const sqlite = new Database(dbPath);
  const db = drizzle(sqlite, { schema });

  console.log("🌱 Starting seeding process...");

  // 1. Clear existing data
  console.log("🧹 Clearing old data...");
  sqlite.prepare("DELETE FROM projects").run();
  sqlite.prepare("DELETE FROM testimonials").run();
  sqlite.prepare("DELETE FROM inquiries").run();
  sqlite.prepare("DELETE FROM site_settings").run();

  // 2. Insert dummy projects
  console.log("📁 Inserting professional projects...");
  const dummyProjects = [
    {
      id: uuidv4(),
      title: "Zenith Real Estate Platform",
      slug: "zenith-real-estate",
      description: "A high-end luxury real estate platform featuring immersive 3D walkthroughs and AI-powered property matching.",
      category: "Web Development",
      thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
      tools: "Next.js 15, Three.js, Tailwind, Supabase",
      clientName: "Zenith Luxury Group",
    },
    {
      id: uuidv4(),
      title: "Aura Skincare E-commerce",
      slug: "aura-skincare",
      description: "Minimalist e-commerce experience for an organic skincare brand focusing on smooth transitions and storytelling.",
      category: "UI/UX Design",
      thumbnailUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
      tools: "Figma, React, Framer Motion",
      clientName: "Aura Organics",
    },
    {
      id: uuidv4(),
      title: "Nova Fintech Dashboard",
      slug: "nova-fintech",
      description: "Complex data visualization dashboard for crypto asset management with real-time analytics and dark-mode aesthetic.",
      category: "App Design",
      thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
      tools: "TypeScript, D3.js, Shadcn UI",
      clientName: "Nova Capital",
    },
    {
      id: uuidv4(),
      title: "Vanguard Tech Branding",
      slug: "vanguard-branding",
      description: "Complete visual identity system for a cybersecurity firm including logo, typography, and digital guidelines.",
      category: "Branding",
      thumbnailUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
      tools: "Adobe Illustrator, Cinema 4D",
      clientName: "Vanguard Security",
    },
    {
      id: uuidv4(),
      title: "Arcana 3D Product Site",
      slug: "arcana-3d",
      description: "Interactive 3D product showcase for a revolutionary ergonomic chair design using WebGL technology.",
      category: "3D Visualization",
      thumbnailUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
      tools: "React Three Fiber, Spline",
      clientName: "Arcana Labs",
    }
  ];

  for (const project of dummyProjects) {
    sqlite.prepare(`
      INSERT INTO projects (id, title, slug, description, category, thumbnail_url, is_published, is_featured, tools, client_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      project.id, 
      project.title, 
      project.slug, 
      project.description, 
      project.category, 
      project.thumbnailUrl, 
      project.isPublished ? 1 : 0, 
      project.isFeatured ? 1 : 0, 
      project.tools, 
      project.clientName
    );
  }

  // 3. Insert dummy testimonials
  console.log("⭐ Inserting testimonials...");
  const dummyTestimonials = [
    {
      id: uuidv4(),
      clientName: "Alexander Wright",
      clientTitle: "CEO at Zenith Luxury",
      content: "Sifiso's ability to combine high-performance code with world-class design is unparalleled. Our engagement rates soared by 40% after the redesign.",
      rating: 5,
      isPublished: true,
    },
    {
      id: uuidv4(),
      clientName: "Sarah Chen",
      clientTitle: "Creative Director, Aura",
      content: "The attention to detail and smooth animations in our new e-commerce store have set a new standard for our industry. Truly exceptional work.",
      rating: 5,
      isPublished: true,
    },
    {
      id: uuidv4(),
      clientName: "Marcus Thorne",
      clientTitle: "Managing Partner, Nova",
      content: "Professional, communicative, and technically brilliant. Sifiso delivered a complex fintech dashboard ahead of schedule.",
      rating: 5,
      isPublished: true,
    }
  ];

  for (const t of dummyTestimonials) {
    sqlite.prepare(`
      INSERT INTO testimonials (id, client_name, client_title, content, rating, is_published)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(t.id, t.clientName, t.clientTitle, t.content, t.rating, t.isPublished ? 1 : 0);
  }

  // 4. Insert dummy inquiries
  console.log("📩 Inserting inquiries...");
  const dummyInquiries = [
    {
       id: uuidv4(),
       name: "Jonathan Doe",
       email: "john@startup.com",
       message: "Hey! We are looking for a developer to help us build a luxury watch marketplace. Your portfolio is exactly the style we need.",
       status: "unread",
       isRead: 0
    },
    {
       id: uuidv4(),
       name: "Elena Ross",
       email: "elena@fashionbrand.it",
       message: "I saw your Zenith Real Estate project and was blown away. Do you have availability for a fashion brand web experience next month?",
       status: "unread",
       isRead: 0
    },
    {
       id: uuidv4(),
       name: "David Kim",
       email: "david@vibrant.agency",
       message: "We're an agency looking for a freelance 3D developer for a one-off campaign. Let's chat!",
       status: "unread",
       isRead: 0
    }
  ];

  for (const i of dummyInquiries) {
    sqlite.prepare(`
      INSERT INTO inquiries (id, name, email, message, status, is_read)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(i.id, i.name, i.email, i.message, i.status, i.isRead);
  }

  // 5. Insert SEO settings
  console.log("🔍 Setting up default SEO...");
  sqlite.prepare(`
    INSERT INTO site_settings (key, value)
    VALUES (?, ?)
  `).run("seo_metadata", JSON.stringify({
    title: "Sifiso — Modern Design & Development Portfolio",
    description: "Creative developer and designer specializing in high-end digital experiences.",
    generator: "Next.js, Tailwind, Framer Motion"
  }));

  console.log("✅ Seeding completed! Database is ready for review.");
}

main().catch(console.error);
