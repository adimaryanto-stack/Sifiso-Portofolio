import { ProjectActions } from "@/components/admin/project-actions";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";
import { Plus } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  let allProjects: any[] = [];
  try {
    allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-secondary mt-2">Manage your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="flex items-center space-x-2">
            <Plus size={16} />
            <span>New Project</span>
          </Button>
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-elevated border-b border-border">
                <th className="px-6 py-4 font-medium text-secondary text-sm">Title</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Category</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Status</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Date</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-secondary">
                    No projects found. Create one to get started.
                  </td>
                </tr>
              ) : (
                allProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border last:border-b-0 hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{project.title}</td>
                    <td className="px-6 py-4 text-secondary">{project.category || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.isPublished ? 'bg-green-500/10 text-green-500' : 'bg-secondary/10 text-secondary'}`}>
                        {project.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-secondary text-sm">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ProjectActions id={project.id} />
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
