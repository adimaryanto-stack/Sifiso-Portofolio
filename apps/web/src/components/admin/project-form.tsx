"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@sifiso/ui/components/button";
import { createProject, updateProject } from "@/lib/actions/projects";
import { ImageUpload } from "@/components/admin/image-upload";
import { projects } from "@/lib/db/schema";

export function ProjectForm({ initialData }: { initialData?: typeof projects.$inferSelect }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnailUrl || "");
  const [heroImageUrl, setHeroImageUrl] = useState(initialData?.heroImageUrl || "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      isPublished: formData.get("isPublished") === "on",
      thumbnailUrl: thumbnailUrl,
    };

    const result = initialData 
      ? await updateProject(initialData.id, data)
      : await createProject(data);

    if (result.success) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setError(result.error || "Failed to create project");
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

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Project Title</label>
        <input 
          id="title" 
          name="title" 
          required 
          defaultValue={initialData?.title}
          className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          placeholder="e.g. Aura E-Commerce"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <input 
          id="category" 
          name="category" 
          defaultValue={initialData?.category || ""}
          className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          placeholder="e.g. Web Development"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea 
          id="description" 
          name="description" 
          rows={4}
          defaultValue={initialData?.description || ""}
          className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Brief overview of the project..."
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Project Thumbnail</label>
        {thumbnailUrl && (
          <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-2xl border border-border group">
            <img 
              src={thumbnailUrl} 
              alt="Thumbnail preview" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-xs font-bold text-white uppercase tracking-widest">Selected Image</span>
            </div>
          </div>
        )}
        <ImageUpload onUploadSuccess={setThumbnailUrl} />
      </div>

      <div className="flex items-center space-x-3">
        <input 
          type="checkbox" 
          id="isPublished" 
          name="isPublished" 
          defaultChecked={initialData?.isPublished || false}
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
          {isSubmitting ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
