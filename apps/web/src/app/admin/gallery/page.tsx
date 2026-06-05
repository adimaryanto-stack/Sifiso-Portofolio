import React from "react";
import { GalleryGrid } from "@/components/admin/gallery-grid";
import { getAllImages, getProjectsList } from "@/lib/actions/gallery";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const [imagesResult, projectsResult] = await Promise.all([
    getAllImages(),
    getProjectsList(),
  ]);

  return (
    <GalleryGrid
      initialImages={(imagesResult.images || []) as any}
      projects={(projectsResult.projects || []) as any}
    />
  );
}
