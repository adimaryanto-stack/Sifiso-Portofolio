"use client";

import React from "react";
import { Button } from "@sifiso/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function GalleryAdminPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Image Gallery</h1>
          <p className="text-secondary mt-2">Manage your portfolio images.</p>
        </div>
        <Link href="/admin" className="p-2 border border-border rounded-xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
      </div>
      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <p className="text-secondary mb-4">Gallery functionality is under construction.</p>
        <Button disabled className="glow-red">Upload Image (Coming Soon)</Button>
      </div>
    </div>
  );
}
