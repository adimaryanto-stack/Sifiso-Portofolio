import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-border rounded-md ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-6 h-32">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-10 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 h-[400px]">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="space-y-4">
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 h-[400px]">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="space-y-3">
             <Skeleton className="h-12 w-full rounded-xl" />
             <Skeleton className="h-12 w-full rounded-xl" />
             <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-32 rounded-xl" />
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border bg-surface-elevated/50">
          <div className="grid grid-cols-4 gap-4">
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 border-b border-border last:border-0">
            <div className="grid grid-cols-4 gap-4 items-center">
               <Skeleton className="h-6 w-32" />
               <Skeleton className="h-4 w-24" />
               <Skeleton className="h-4 w-24" />
               <div className="flex justify-end">
                 <Skeleton className="h-8 w-8 rounded-lg" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
