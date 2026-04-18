"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { deleteProject } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";

export function ProjectActions({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setIsDeleting(true);
    const result = await deleteProject(id);
    
    if (result.success) {
      router.refresh();
    } else {
      alert("Failed to delete project: " + result.error);
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <Link href={`/admin/projects/${id}/edit`}>
        <button className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <Edit size={16} />
        </button>
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
      >
        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      </button>
    </div>
  );
}
