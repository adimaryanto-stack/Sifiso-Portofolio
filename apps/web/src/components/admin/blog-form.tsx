"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@sifiso/ui/components/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { createPost, updatePost } from "@/lib/actions/blog";
import Image from "next/image";

export function BlogForm({ post }: { post?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [isPublished, setIsPublished] = useState(post?.isPublished || false);

  const generateSlug = (val: string) => {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!post) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("isPublished", isPublished ? "true" : "false");

    startTransition(async () => {
      let result;
      if (post) {
        result = await updatePost(post.id, formData);
      } else {
        result = await createPost(formData);
      }

      if (result.success) {
        router.push("/admin/blog");
      } else {
        setError(result.error as string);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/blog" className="p-2 rounded-full hover:bg-surface border border-transparent hover:border-border transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">
              {post ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-secondary font-medium mt-1">
              {post ? "Update your blog post details below." : "Create a new blog post."}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-medium text-sm">
            {error}
          </div>
        )}

        <div className="glass-card rounded-[2rem] p-8 border-border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-secondary">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors font-medium"
                placeholder="The Future of Web Design"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-secondary">Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors font-medium"
                placeholder="the-future-of-web-design"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-secondary">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors font-medium resize-none"
              placeholder="A brief summary of this article..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-secondary">Content (Markdown) *</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono text-sm resize-y"
              placeholder="## Introduction\n\nWrite your markdown content here..."
            />
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary bg-surface"
            />
            <label htmlFor="isPublished" className="text-sm font-bold cursor-pointer">
              Publish this post immediately
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            disabled={isPending}
            className="flex items-center space-x-2 px-8 py-6 rounded-xl font-bold uppercase tracking-wider"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span>{post ? "Save Changes" : "Create Post"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
