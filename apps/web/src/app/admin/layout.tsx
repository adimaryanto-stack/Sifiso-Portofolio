import React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTransition } from "@/components/admin/admin-transition";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light-admin flex h-screen bg-background overflow-hidden text-foreground">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-surface/30 min-h-0">
        <div className="p-6 lg:p-8 max-w-[1400px]">
          <AdminTransition>
            {children}
          </AdminTransition>
        </div>
      </main>
    </div>
  );
}
