import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AboutPreview } from "@/components/sections/about-preview";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { ContactForm } from "@/components/sections/contact-form";
import { QuotesSection } from "@/components/sections/quotes-section";
import { CreativeProcess } from "@/components/sections/creative-process";
import { db } from "@/lib/db";
import { testimonials, services, quotes, creativeProcessSteps, projects, siteSettings } from "@/lib/db/schema";
import { desc, asc, eq } from "drizzle-orm";
import { WorkGalleryInteractive } from "@/components/sections/work-gallery-interactive";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch all data for homepage sections
  let allTestimonials: any[] = [];
  let allServices: any[] = [];
  let allQuotes: any[] = [];
  let allSteps: any[] = [];
  let featuredProjects: any[] = [];
  let generalInfo: any = null;

  try {
    const rawTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isPublished, true))
      .orderBy(desc(testimonials.createdAt))
      .limit(6);

    const rawServices = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.sortOrder))
      .limit(10);

    const rawQuotes = await db
      .select()
      .from(quotes)
      .where(eq(quotes.isActive, true))
      .orderBy(asc(quotes.sortOrder));

    const rawSteps = await db
      .select()
      .from(creativeProcessSteps)
      .where(eq(creativeProcessSteps.isActive, true))
      .orderBy(asc(creativeProcessSteps.stepNumber));

    const rawProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.isPublished, true))
      .orderBy(desc(projects.createdAt))
      .limit(6);

    const settingsResult = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "general_info"))
      .limit(1);

    if (settingsResult.length > 0) {
      generalInfo = settingsResult[0].value;
    }

    allTestimonials = rawTestimonials.map((t: any) => ({
      name: t.clientName || "Anonymous Client",
      title: t.clientTitle || "Partner",
      avatar:
        t.avatarUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(t.clientName || "A")}&background=random`,
      content: t.content || "No feedback provided.",
    }));

    allServices = rawServices.map((s: any) => ({
      title: s.title,
      description: s.description || "",
      iconName: s.iconName,
      slug: (s.title || "service").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));

    allQuotes = rawQuotes.map((q: any) => ({
      content: q.content,
      author: q.author,
    }));

    allSteps = rawSteps;
    featuredProjects = rawProjects;
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Modern Design & Development Portfolio"
        description="Multidisciplinary designer specializing in high-performance digital experiences."
        ctaText="View Work"
      />

      {/* Services Section */}
      <ServicesGrid data={allServices} />

      {/* About Preview */}
      <AboutPreview />

      {/* Inspirational Quotes */}
      <QuotesSection quotes={allQuotes} />

      {/* Featured Work */}
      {featuredProjects.length > 0 && (
        <section id="work" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">
                Selected{" "}
                <span className="text-primary italic font-serif">
                  Work
                </span>
              </h2>
            </div>
            <WorkGalleryInteractive initialProjects={featuredProjects} />
          </div>
        </section>
      )}

      {/* Creative Process */}
      <CreativeProcess steps={allSteps} />

      {/* Testimonials */}
      <TestimonialsCarousel data={allTestimonials} />

      {/* Contact Form */}
      <ContactForm generalInfo={generalInfo} />
    </>
  );
}
