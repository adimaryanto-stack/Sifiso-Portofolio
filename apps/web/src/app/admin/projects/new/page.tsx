import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center space-x-4">
        <Link href="/admin/projects" className="p-2 border border-border rounded-xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">New Project</h1>
          <p className="text-secondary mt-1">Add a new project to your portfolio.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
