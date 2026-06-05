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
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Dashboard</h1>
          <p className="text-secondary mt-1 font-medium">Welcome back, Sifiso. Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/" target="_blank" className="flex items-center space-x-2 px-5 py-2.5 bg-surface border border-border rounded-xl text-sm font-bold hover:text-primary hover:border-primary/50 transition-colors">
            <span>View Site</span>
            <ExternalLink size={14} />
          </Link>
          <Link href="/admin/projects/new" className="flex items-center space-x-2 px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:bg-primary transition-colors">
            <Plus size={16} />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <div className="glass-card rounded-[2rem] p-6 border-border flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FolderKanban size={64} />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <FolderKanban size={20} />
            </div>
            <h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-1">Total Projects</h3>
            <p className="text-5xl font-black tracking-tighter">{totalProjects}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-[2rem] p-6 border-border flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-red-500">
            <Mail size={64} />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
              <Mail size={20} />
            </div>
            <h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-1">Unread Inquiries</h3>
            <p className="text-5xl font-black tracking-tighter text-red-500">{unreadInquiries}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-[2rem] p-6 border-border flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Quote size={64} />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
              <Quote size={20} />
            </div>
            <h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-1">Social Proof</h3>
            <p className="text-5xl font-black tracking-tighter">{totalTestimonials}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-[2rem] p-6 border-border flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart size={64} />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
              <BarChart size={20} />
            </div>
            <h3 className="text-secondary text-sm font-bold uppercase tracking-wider mb-1">Page Views</h3>
            <p className="text-5xl font-black tracking-tighter text-blue-500">{totalPageViews}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 border-border min-h-[400px] flex flex-col">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold">Recent Activity</h3>
             <span className="text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 bg-surface-elevated rounded-full border border-border">Timeline</span>
           </div>
           <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-2xl bg-surface/30">
             <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center text-secondary mb-4">
               <BarChart size={24} />
             </div>
             <p className="text-secondary font-medium mb-1">No recent activity found.</p>
             <p className="text-xs text-secondary/60 max-w-xs">Events like new inquiries and project updates will appear here soon.</p>
           </div>
         </div>
         
         <div className="glass-card rounded-[2rem] p-8 border-border flex flex-col">
           <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
           <div className="flex flex-col space-y-3 flex-1">
             <Link href="/admin/projects/new" className="group">
               <div className="w-full flex items-center justify-between px-5 py-4 bg-surface hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl font-bold text-sm transition-all">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Plus size={16} />
                   </div>
                   <span>Add Project</span>
                 </div>
               </div>
             </Link>
             <Link href="/admin/inquiries" className="group">
               <div className="w-full flex items-center justify-between px-5 py-4 bg-surface hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl font-bold text-sm transition-all">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Mail size={16} />
                   </div>
                   <span>Review Inquiries</span>
                 </div>
                 {unreadInquiries > 0 && (
                   <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
                     {unreadInquiries}
                   </span>
                 )}
               </div>
             </Link>
             <Link href="/admin/settings" className="group">
               <div className="w-full flex items-center justify-between px-5 py-4 bg-surface hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl font-bold text-sm transition-all">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Settings size={16} />
                   </div>
                   <span>Site Settings</span>
                 </div>
               </div>
             </Link>
           </div>
         </div>
      </div>
    </div>
  );
}
