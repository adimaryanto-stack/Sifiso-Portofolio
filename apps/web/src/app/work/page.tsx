import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { WorkGalleryInteractive } from "@/components/sections/work-gallery-interactive";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Selection of Crafted Creations",
  description: "Explore the full catalog of Sifiso's digital endeavors, from UI/UX design to full-scale web development.",
};

export const revalidate = 3600;

async function getPublishedProjects() {
  try {
    return await db.select().from(projects).where(eq(projects.isPublished, true)).orderBy(desc(projects.createdAt));
  } catch (error) {
    console.error("Failed to fetch works", error);
    return [];
  }
}

export default async function WorkPage() {
  const allWorks = await getPublishedProjects();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-24">
        <WorkGalleryInteractive initialProjects={allWorks} />
      </main>
    </div>
  );
}
