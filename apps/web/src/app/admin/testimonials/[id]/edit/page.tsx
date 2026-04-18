import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let testimonialData;
  try {
    const results = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    testimonialData = results[0];
  } catch (error) {
    console.error("Failed to fetch testimonial for edit", error);
  }

  if (!testimonialData) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center space-x-4">
        <Link href="/admin/testimonials" className="p-2 border border-border rounded-xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Testimonial</h1>
          <p className="text-secondary mt-1">Update feedback from "{testimonialData.clientName}".</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8">
        <TestimonialForm initialData={testimonialData} />
      </div>
    </div>
  );
}
