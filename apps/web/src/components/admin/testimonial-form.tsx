"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@sifiso/ui/components/button";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonials";
import { ImageUpload } from "@/components/admin/image-upload";
import { type Testimonial } from "@/lib/db/schema";

export function TestimonialForm({ initialData }: { initialData?: Testimonial }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatarUrl || "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const data = {
      clientName: formData.get("clientName") as string,
      clientTitle: formData.get("clientTitle") as string,
      content: formData.get("content") as string,
      rating: parseInt(formData.get("rating") as string) || 5,
      isPublished: formData.get("isPublished") === "on",
      avatarUrl: avatarUrl,
    };

    const result = initialData 
      ? await updateTestimonial(initialData.id, data)
      : await createTestimonial(data);

    if (result.success) {
      router.push("/admin/testimonials");
      router.refresh();
    } else {
      setError(result.error || "Failed to save testimonial");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="clientName" className="text-sm font-medium">Client Name</label>
          <input 
            id="clientName" 
            name="clientName" 
            required 
            defaultValue={initialData?.clientName}
            className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="clientTitle" className="text-sm font-medium">Client Title/Company</label>
          <input 
            id="clientTitle" 
            name="clientTitle" 
            defaultValue={initialData?.clientTitle || ""}
            className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. CEO at TechCorp"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">Testimonial Content</label>
        <textarea 
          id="content" 
          name="content" 
          required
          rows={4}
          defaultValue={initialData?.content || ""}
          className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="What did the client say..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="rating" className="text-sm font-medium">Rating (1-5)</label>
        <input 
          id="rating" 
          name="rating" 
          type="number"
          min="1"
          max="5"
          defaultValue={initialData?.rating || 5}
          className="w-full md:w-1/3 bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Client Avatar</label>
        {avatarUrl && (
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border group bg-surface-elevated">
            <img 
              src={avatarUrl} 
              alt="Avatar preview" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-[10px] font-bold text-white uppercase tracking-widest text-center px-2">Preview</span>
            </div>
          </div>
        )}
        <ImageUpload onUploadSuccess={setAvatarUrl} />
      </div>

      <div className="flex items-center space-x-3">
        <input 
          type="checkbox" 
          id="isPublished" 
          name="isPublished" 
          defaultChecked
          className="w-5 h-5 accent-primary rounded cursor-pointer"
        />
        <label htmlFor="isPublished" className="text-sm font-medium cursor-pointer">
          Publish immediately
        </label>
      </div>

      <div className="pt-6 border-t border-border flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="glow-red min-w-[120px]"
        >
          {isSubmitting ? "Saving..." : "Add Testimonial"}
        </Button>
      </div>
    </form>
  );
}
