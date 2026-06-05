import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ContactForm } from "@/components/sections/contact-form";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { testimonials, services } from "@/lib/db/schema";
import { desc, asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const t = await getTranslations("Index");
  
  // Explicitly pull fresh data from Neon
  const rawTestimonials = await db.select().from(testimonials).where(eq(testimonials.isPublished, true)).orderBy(desc(testimonials.createdAt)).limit(10);
  const rawServices = await db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.sortOrder)).limit(10);

  // Map database fields to UI component props with extreme safety
  const allTestimonials = rawTestimonials.map((t: any) => ({
    name: t.clientName || "Anonymous Client",
    title: t.clientTitle || "Partner",
    avatar: t.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.clientName || 'A')}&background=random`,
    content: t.content || "No feedback provided."
  }));

  const allServices = rawServices.map((s: any) => ({
    title: s.title,
    description: s.description || "",
    iconName: s.iconName,
    slug: (s.title || "service").toLowerCase().replace(/\s+/g, '-'),
  }));

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mt-24">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] glow-text">
          {t("title").split(" ")[0]} <span className="text-primary italic block md:inline">{t("title").split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="text-secondary text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto md:mx-0">
          {t("description")}
        </p>
        <div className="pt-4">
          <Button size="lg" className="px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-primary/20 glow-red">
            {t("hero_cta")}
          </Button>
        </div>
      </div>
    </div>
  );
}
