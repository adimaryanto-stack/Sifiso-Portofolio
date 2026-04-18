import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

const fallbackProjects = [
  {
    id: "1",
    title: "Aura E-Commerce Realization",
    category: "Web Development & Branding",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    slug: "aura-ecommerce"
  },
  {
    id: "2",
    title: "Nebula Dashboard Interface",
    category: "UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop",
    slug: "nebula-dashboard"
  },
  {
    id: "3",
    title: "Quantum Branding Identity",
    category: "Branding & 3D",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2371&auto=format&fit=crop",
    slug: "quantum-branding"
  },
  {
    id: "4",
    title: "Vertex Mobile Application",
    category: "App Design",
    imageUrl: "https://images.unsplash.com/photo-1616423485741-94fc31ad3105?q=80&w=2370&auto=format&fit=crop",
    slug: "vertex-mobile"
  }
];

export async function ProjectGallery() {
  // Fetch projects from DB
  let fetchedProjects: any[] = [];
  try {
    fetchedProjects = await db.select().from(projects).where(eq(projects.isPublished, true)).orderBy(desc(projects.createdAt)).limit(6);
  } catch (error) {
    console.error("Failed to fetch projects from DB:", error);
  }

  const displayProjects = fetchedProjects.length > 0 ? fetchedProjects : fallbackProjects;

  return (
    <section id="work" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
          <div>
             <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">SELECTED <span className="text-primary italic">WORK</span></h2>
             <p className="text-secondary text-lg max-w-xl">
               A showcase of digital experiences crafted with precision, blending aesthetics with robust engineering.
             </p>
          </div>
          <Link 
            href="/work"
            className="text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors border-b-2 border-primary pb-1 mt-6"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {displayProjects.map((project, index) => (
            <Link 
              key={project.id} 
              href={`/work/${project.slug}`}
              className={`group relative flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-elevated border border-border">
                {/* Image Placeholder */}
                <div 
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                   style={{ backgroundImage: `url(${project.imageUrl || project.thumbnailUrl || fallbackProjects[0].imageUrl})` }}
                />
                
                {/* Overlay highlight */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-primary/20 backdrop-blur-md">
                    View Project
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col space-y-2">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{project.category || 'Digital Experience'}</span>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
