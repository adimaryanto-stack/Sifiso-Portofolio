import React from "react";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    posts = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt));
  } catch (error) {
    console.error("Failed to fetch published posts:", error);
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            The <span className="text-primary italic">Journal</span>
          </h1>
          <p className="text-secondary text-xl md:text-2xl max-w-2xl">
            Thoughts, insights, and stories on design, engineering, and digital experiences.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-secondary">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-surface-elevated rounded-3xl border border-border hover:border-primary/50 transition-colors overflow-hidden"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                    <Calendar size={14} />
                    <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMM dd, yyyy") : "Draft"}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-secondary mb-8 line-clamp-3 flex-1">
                    {post.excerpt || post.content.substring(0, 150) + "..."}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest mt-auto">
                    <span>Read Article</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
