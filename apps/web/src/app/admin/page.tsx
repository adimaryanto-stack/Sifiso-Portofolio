import React from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { projects, inquiries, testimonials } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch some quick stats
  let totalProjects = 0;
  let unreadInquiries = 0;
  let totalTestimonials = 0;
  
  try {
    const projectsResult = await db.select({ value: count() }).from(projects);
    const inquiriesResult = await db.select({ value: count() }).from(inquiries).where(eq(inquiries.isRead, false));
    const testimonialsResult = await db.select({ value: count() }).from(testimonials);
    
    totalProjects = Number(projectsResult[0]?.value) || 0;
    unreadInquiries = Number(inquiriesResult[0]?.value) || 0;
    totalTestimonials = Number(testimonialsResult[0]?.value) || 0;
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-secondary mt-2">Welcome back, Sifiso. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-secondary text-sm font-medium mb-2">Total Projects</h3>
          <p className="text-4xl font-black">{totalProjects}</p>
        </div>
        
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-secondary text-sm font-medium mb-2">Unread Inquiries</h3>
          <p className="text-4xl font-black text-primary">{unreadInquiries}</p>
        </div>
        
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-secondary text-sm font-medium mb-2">Social Proof</h3>
          <p className="text-4xl font-black">{totalTestimonials}</p>
        </div>
        
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-secondary text-sm font-medium mb-2">Page Views (Mkt)</h3>
          <p className="text-4xl font-black text-foreground">1.2k</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 min-h-[400px]">
           <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
           <div className="flex items-center justify-center h-full text-secondary">
             <p>Activity timeline will appear here.</p>
           </div>
         </div>
         
         <div className="bg-surface border border-border rounded-2xl p-6">
           <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
           <div className="flex flex-col space-y-3">
             <Link href="/admin/projects/new">
               <button className="w-full text-left px-4 py-3 bg-surface-elevated hover:bg-primary/20 hover:text-primary border border-border rounded-xl font-medium transition-colors">
                 Add New Project
               </button>
             </Link>
             <Link href="/admin/testimonials">
               <button className="w-full text-left px-4 py-3 bg-surface-elevated hover:bg-primary/20 hover:text-primary border border-border rounded-xl font-medium transition-colors">
                 Manage Testimonials
               </button>
             </Link>
             <Link href="/admin/inquiries">
               <button className="w-full text-left px-4 py-3 bg-surface-elevated hover:bg-primary/20 hover:text-primary border border-border rounded-xl font-medium transition-colors">
                 Reply to Inquiries
               </button>
             </Link>
           </div>
         </div>
      </div>
    </div>
  );
}
