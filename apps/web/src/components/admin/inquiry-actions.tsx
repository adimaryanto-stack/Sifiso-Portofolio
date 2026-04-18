"use client";

import React from "react";
import { Eye, CheckCircle, Trash2 } from "lucide-react";
import { markAsReplied, deleteInquiry } from "@/lib/actions/inquiries";
import { useRouter } from "next/navigation";

export function InquiryActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleReplied() {
    const result = await markAsReplied(id);
    if (result.success) router.refresh();
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const result = await deleteInquiry(id);
      if (result.success) router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <button className="p-2 text-secondary hover:text-white rounded-lg transition-colors" title="View Details">
        <Eye size={16} />
      </button>
      <button 
        onClick={handleReplied}
        className="p-2 text-secondary hover:text-green-500 rounded-lg transition-colors" 
        title="Mark as Replied"
      >
        <CheckCircle size={16} />
      </button>
      <button 
        onClick={handleDelete}
        className="p-2 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" 
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
