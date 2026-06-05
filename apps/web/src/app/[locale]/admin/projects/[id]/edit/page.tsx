import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let projectData;
  try {
    const results = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    projectData = results[0];
  } catch (error) {
    console.error("Failed to fetch project for edit", error);
  }

  if (!projectData) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center space-x-4">
        <Link href="/admin/projects" className="p-2 border border-border rounded-xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="text-secondary mt-1">Update details for "{projectData.title}".</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8">
        <ProjectForm initialData={projectData} />
      </div>
    </div>
  );
}
