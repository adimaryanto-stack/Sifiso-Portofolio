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
    <div className="relative z-10">
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
    </div>
  );
}
