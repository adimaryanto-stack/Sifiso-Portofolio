import React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light-admin flex h-screen bg-background overflow-hidden text-foreground">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-surface/30">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
