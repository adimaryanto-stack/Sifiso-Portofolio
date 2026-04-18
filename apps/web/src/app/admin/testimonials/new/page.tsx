import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center space-x-4">
        <Link href="/admin/testimonials" className="p-2 border border-border rounded-xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">New Testimonial</h1>
          <p className="text-secondary mt-1">Add client feedback to your portfolio.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
