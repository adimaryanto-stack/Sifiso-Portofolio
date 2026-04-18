import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { ContactForm } from "@/components/sections/contact-form";
import { db } from "@/lib/db";
import { testimonials, services } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

import { unstable_noStore as noStore } from 'next/cache';

export default async function Home() {
  // Force this component to bypass any Vercel/Next.js caching mechanisms
  noStore();
  
  // Explicitly pull fresh data from Neon
  const rawTestimonials = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).limit(10);
  const rawServices = await db.select().from(services).orderBy(desc(services.createdAt)).limit(10);

  // Map database fields to UI component props with extreme safety
  const allTestimonials = rawTestimonials.map(t => ({
    name: t.clientName || "Anonymous Client",
    title: t.clientTitle || "Partner",
    avatar: t.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.clientName || 'A')}&background=random`,
    content: t.content || "No feedback provided."
  }));

  const allServices = rawServices.map(s => ({
    title: s.title,
    description: s.description || "",
    iconName: s.iconName,
    slug: (s.title || "service").toLowerCase().replace(/\s+/g, '-'),
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      
      <div className="relative z-10">
        {/* About Section */}
        <AboutPreview />
 
        {/* Project Gallery */}
        <ProjectGallery />
 
        {/* Services Section */}
        <ServicesGrid data={allServices as any} />
 
        {/* Testimonials */}
        <TestimonialsCarousel data={allTestimonials as any} />
 
        {/* Contact form */}
        <ContactForm />
      </div>

      <footer className="py-12 border-t border-border bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-secondary text-sm">
          <div className="text-center md:text-left">
            <span className="text-xl font-black text-white tracking-tighter">
              Sifiso<span className="text-primary">...</span>
            </span>
            <p className="mt-2 text-muted-foreground max-w-xs">
              Designing digital dreams into high-performance realities.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 font-bold tracking-widest text-xs uppercase mb-4">
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Dribbble</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
              <a href="mailto:adimaryanto@gmail.com" className="hover:text-primary transition-colors">Email</a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">WhatsApp</a>
              <Link href="/login" className="hover:text-primary transition-colors border-l border-border pl-8">Admin Login</Link>
            </div>
            <p className="text-muted-foreground">© {new Date().getFullYear()} Sifiso Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
