import React from "react";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let posts: any[] = [];
  try {
    posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Blog Posts</h1>
          <p className="text-secondary font-medium mt-1">Manage your articles and publications.</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="flex items-center space-x-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:bg-primary transition-colors"
        >
          <Plus size={18} />
          <span>New Post</span>
        </Link>
      </div>

      <div className="glass-card rounded-[2rem] border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Title</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Status</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Date</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-secondary">
                      <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4">
                        <FileText size={24} />
                      </div>
                      <p className="font-medium">No blog posts found.</p>
                      <Link href="/admin/blog/new" className="text-primary font-bold mt-2 hover:underline">
                        Create your first post
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-bold text-lg group-hover:text-primary transition-colors">{post.title}</p>
                          <p className="text-sm text-secondary line-clamp-1">{post.excerpt || post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      {post.isPublished ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 uppercase tracking-wider border border-green-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary uppercase tracking-wider border border-border">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-secondary font-medium">
                        <Calendar size={14} />
                        <span>{format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end space-x-2">
                        {post.isPublished && (
                          <Link 
                            href={`/blog/${post.slug}`} 
                            target="_blank"
                            className="p-2 text-secondary hover:text-foreground bg-surface hover:bg-surface-elevated rounded-lg transition-colors border border-transparent hover:border-border"
                            title="View Public"
                          >
                            <Eye size={16} />
                          </Link>
                        )}
                        <Link 
                          href={`/admin/blog/${post.id}`} 
                          className="p-2 text-secondary hover:text-primary bg-surface hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
