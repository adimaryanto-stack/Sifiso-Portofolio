import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { ProjectDetailHero } from "@/components/sections/project-detail-hero"; // I will create this
import { ArrowLeft, ExternalLink, Calendar, User, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@sifiso/ui/components/button";
import { db } from "@/lib/db";
import { projects, type Project } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

async function getProject(slug: string) {
  console.log("🔍 Fetching project with slug:", slug);
  try {
    if (!slug) {
      console.error("❌ Error: slug is undefined! Check if params are awaited.");
      return null;
    }
    const results = await db.select().from(projects).where(and(eq(projects.slug, slug), eq(projects.isPublished, true))).limit(1);
    console.log("📦 DB Result:", results.length > 0 ? "Found" : "Not Found");
    return results[0];
  } catch (error) {
    console.error("Failed to fetch project", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description || "",
      images: project.thumbnailUrl ? [project.thumbnailUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <ProjectDetailHero project={project} />

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest italic">About the project</h2>
            <div className="prose prose-invert prose-xl max-w-none text-secondary">
              <p className="leading-relaxed">{project.description}</p>
              {project.brief && (
                <div className="mt-10">
                   <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">The Challenge</h3>
                   <p className="border-l-2 border-primary pl-8 py-2 italic">{project.brief}</p>
                </div>
              )}
            </div>
            
            {/* Gallery Section */}
            {project.processGallery && (project.processGallery as any[]).length > 0 && (
               <div className="mt-16 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {(project.processGallery as any[]).map((imgUrl, idx) => (
                        <div key={idx} className="aspect-video rounded-3xl bg-surface-elevated border border-border overflow-hidden group">
                           <img 
                             src={imgUrl} 
                             alt={`Process ${idx + 1}`} 
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="glass-card p-10 rounded-[2.5rem] space-y-10 border-primary/10">
              <div className="grid grid-cols-1 gap-8">
                <div className="flex items-center space-x-4">
                  <User className="text-primary/60" size={20} />
                  <div>
                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Client</div>
                    <div className="font-bold uppercase tracking-tight italic">{project.clientName || "Proprietary"}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="text-primary/60" size={20} />
                  <div>
                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Timeline</div>
                    <div className="font-bold">{project.timeline || "2024"}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Wrench className="text-primary/60" size={20} />
                  <div>
                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Technical Arsenal</div>
                    <div className="font-bold text-xs uppercase tracking-wider">{project.tools || "Next.js, Tailwind"}</div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5">
                 <Button className="w-full h-16 py-4 text-sm glow-red uppercase tracking-[0.3em] font-black group">
                    Live Experience 
                    <ExternalLink className="ml-3 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border bg-surface/20 py-32 px-6">
        <div className="container mx-auto text-center">
           <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Up Next</span>
           <Link href="/work" className="group inline-block">
              <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter hover:text-primary transition-colors duration-500 uppercase">
                Explore More Works
              </h2>
              <div className="mt-8 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-primary">
                 <ArrowLeft className="rotate-180" />
                 <span className="text-sm font-black uppercase tracking-[0.3em]">Back to Gallery</span>
              </div>
           </Link>
        </div>
      </footer>
    </main>
  );
}
