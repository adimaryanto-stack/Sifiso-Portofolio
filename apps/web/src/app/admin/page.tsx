import React from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { projects, inquiries, testimonials, pageViews } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";
import { FolderKanban, Mail, Quote, BarChart, Plus, Settings, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch some quick stats
  let totalProjects = 0;
  let unreadInquiries = 0;
  let totalTestimonials = 0;
  let totalPageViews = 0;
  
  try {
    const projectsResult = await db.select({ value: count() }).from(projects);
    const inquiriesResult = await db.select({ value: count() }).from(inquiries).where(eq(inquiries.isRead, false));
    const testimonialsResult = await db.select({ value: count() }).from(testimonials);
    const pageViewsResult = await db.select({ value: count() }).from(pageViews);
    
    totalProjects = Number(projectsResult[0]?.value) || 0;
    unreadInquiries = Number(inquiriesResult[0]?.value) || 0;
    totalTestimonials = Number(testimonialsResult[0]?.value) || 0;
    totalPageViews = Number(pageViewsResult[0]?.value) || 0;
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Dashboard</h1>
          <p className="text-secondary mt-0.5 text-sm font-medium">Welcome back, Sifiso. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank" className="flex items-center gap-1.5 px-4 py-2 bg-surface border border-border rounded-xl text-xs font-bold hover:text-primary hover:border-primary/50 transition-colors">
            <span>View Site</span>
            <ExternalLink size={12} />
          </Link>
          <Link href="/admin/projects/new" className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-xl text-xs font-bold hover:bg-primary transition-colors">
            <Plus size={14} />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FolderKanban size={48} />
          </div>
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
              <FolderKanban size={16} />
            </div>
            <h3 className="text-secondary text-[11px] font-bold uppercase tracking-wider mb-0.5">Total Projects</h3>
            <p className="text-4xl font-black tracking-tighter">{totalProjects}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-5 border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-red-500">
            <Mail size={48} />
          </div>
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
              <Mail size={16} />
            </div>
            <h3 className="text-secondary text-[11px] font-bold uppercase tracking-wider mb-0.5">Unread Inquiries</h3>
            <p className="text-4xl font-black tracking-tighter text-red-500">{unreadInquiries}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-5 border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Quote size={48} />
          </div>
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-3">
              <Quote size={16} />
            </div>
            <h3 className="text-secondary text-[11px] font-bold uppercase tracking-wider mb-0.5">Social Proof</h3>
            <p className="text-4xl font-black tracking-tighter">{totalTestimonials}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-5 border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart size={48} />
          </div>
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
              <BarChart size={16} />
            </div>
            <h3 className="text-secondary text-[11px] font-bold uppercase tracking-wider mb-0.5">Page Views</h3>
            <p className="text-4xl font-black tracking-tighter text-blue-500">{totalPageViews}</p>
          </div>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
         <div className="lg:col-span-2 glass-card rounded-2xl p-6 border-border flex flex-col">
           <div className="flex items-center justify-between mb-5">
             <h3 className="text-lg font-bold">Recent Activity</h3>
             <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2.5 py-0.5 bg-surface-elevated rounded-full border border-border">Timeline</span>
           </div>
           <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-xl bg-surface/30 min-h-[180px]">
             <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center text-secondary mb-3">
               <BarChart size={20} />
             </div>
             <p className="text-secondary text-sm font-medium mb-0.5">No recent activity found.</p>
             <p className="text-[11px] text-secondary/60 max-w-xs">Events like new inquiries and project updates will appear here soon.</p>
           </div>
         </div>
         
         <div className="glass-card rounded-2xl p-6 border-border flex flex-col">
           <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
           <div className="flex flex-col gap-2 flex-1">
             <Link href="/admin/projects/new" className="group">
               <div className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl font-bold text-sm transition-all">
                 <div className="flex items-center gap-2.5">
                   <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Plus size={14} />
                   </div>
                   <span className="text-[13px]">Add Project</span>
                 </div>
               </div>
             </Link>
             <Link href="/admin/inquiries" className="group">
               <div className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl font-bold text-sm transition-all">
                 <div className="flex items-center gap-2.5">
                   <div className="w-7 h-7 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Mail size={14} />
                   </div>
                   <span className="text-[13px]">Review Inquiries</span>
                 </div>
                 {unreadInquiries > 0 && (
                   <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                     {unreadInquiries}
                   </span>
                 )}
               </div>
             </Link>
             <Link href="/admin/settings" className="group">
               <div className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl font-bold text-sm transition-all">
                 <div className="flex items-center gap-2.5">
                   <div className="w-7 h-7 rounded-md bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Settings size={14} />
                   </div>
                   <span className="text-[13px]">Site Settings</span>
                 </div>
               </div>
             </Link>
           </div>
         </div>
      </div>
    </div>
  );
}
