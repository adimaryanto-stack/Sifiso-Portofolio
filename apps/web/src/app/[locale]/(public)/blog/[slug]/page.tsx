import React from "react";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post = null;
  try {
    const results = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, params.slug))
      .limit(1);
    
    if (results.length > 0) {
      post = results[0];
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }

  if (!post) {
    notFound();
  }

  // Very basic markdown rendering for MVP. 
  // For production, use `react-markdown` or similar.
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-6">{paragraph}</p>
    ));
  };

  return (
    <article className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link 
          href="/blog"
          className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span>Back to Journal</span>
        </Link>

        <header className="mb-16">
          <div className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-primary mb-6">
            <Calendar size={16} />
            <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMMM dd, yyyy") : "Draft"}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-secondary leading-relaxed border-l-4 border-primary pl-6">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none text-secondary">
          {renderContent(post.content)}
        </div>
      </div>
    </article>
  );
}
