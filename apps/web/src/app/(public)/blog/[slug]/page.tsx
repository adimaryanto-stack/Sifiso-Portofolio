import React from "react";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  let post = null;
  try {
    const results = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
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

  const parseMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (key: string | number) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 mb-6 space-y-2 text-secondary">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{parseInlineStyles(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const parseInlineStyles = (str: string): React.ReactNode[] => {
      const parts = str.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={idx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("# ")) {
        flushList(index);
        elements.push(
          <h1 key={index} className="text-3xl font-black mt-8 mb-4 text-white uppercase tracking-wider italic">
            {parseInlineStyles(trimmed.slice(2))}
          </h1>
        );
      } else if (trimmed.startsWith("## ")) {
        flushList(index);
        elements.push(
          <h2 key={index} className="text-2xl font-black mt-8 mb-4 text-white uppercase tracking-wider italic">
            {parseInlineStyles(trimmed.slice(3))}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushList(index);
        elements.push(
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-white uppercase tracking-wider italic">
            {parseInlineStyles(trimmed.slice(4))}
          </h3>
        );
      } else if (trimmed.startsWith("* ")) {
        currentList.push(trimmed.slice(2));
      } else if (trimmed.startsWith("- ")) {
        currentList.push(trimmed.slice(2));
      } else if (trimmed.length > 0) {
        flushList(index);
        elements.push(
          <p key={index} className="mb-6 leading-relaxed text-secondary text-lg">
            {parseInlineStyles(trimmed)}
          </p>
        );
      } else {
        flushList(index);
      }
    });

    flushList("end");
    return elements;
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

        {post.coverImage && (
          <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-border mb-12 bg-surface shadow-2xl">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}

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
          {parseMarkdown(post.content)}
        </div>
      </div>
    </article>
  );
}
