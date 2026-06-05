"use client";

import React, { useState, useTransition } from "react";
import {
  Trash2,
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  FolderKanban,
  Search,
  Eye,
  Pencil,
  Check,
  Plus,
} from "lucide-react";
import { Button } from "@sifiso/ui/components/button";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  deleteImage,
  addImageToProject,
  updateImageCaption,
} from "@/lib/actions/gallery";

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number | null;
  createdAt: any;
  projectId: string;
  projectTitle: string | null;
  projectSlug: string | null;
  isReadOnly?: boolean;
}

interface ProjectOption {
  id: string;
  title: string;
}

interface GalleryGridProps {
  initialImages: GalleryImage[];
  projects: ProjectOption[];
}

export function GalleryGrid({ initialImages, projects }: GalleryGridProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionValue, setCaptionValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter images
  const filteredImages = images.filter((img) => {
    const matchesProject =
      filter === "all" || img.projectId === filter;
    const matchesSearch =
      !searchQuery ||
      (img.caption || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.projectTitle || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  // Get unique projects from images for filter tabs
  const projectsInGallery = Array.from(
    new Map(
      images.map((img) => [
        img.projectId,
        { id: img.projectId, title: img.projectTitle || "Untitled" },
      ])
    ).values()
  );

  async function handleUploadSubmit() {
    if (!selectedProject || !uploadedUrl) return;

    startTransition(async () => {
      const result = await addImageToProject({
        projectId: selectedProject,
        imageUrl: uploadedUrl,
        caption: uploadCaption || undefined,
      });

      if (result.success) {
        // Add to local state
        const project = projects.find((p) => p.id === selectedProject);
        setImages((prev) => [
          {
            id: result.image?.id || Date.now().toString(),
            imageUrl: uploadedUrl,
            caption: uploadCaption || null,
            sortOrder: 0,
            createdAt: new Date(),
            projectId: selectedProject,
            projectTitle: project?.title || null,
            projectSlug: null,
          },
          ...prev,
        ]);
        setShowUpload(false);
        setUploadedUrl("");
        setUploadCaption("");
        setSelectedProject("");
      }
    });
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteImage(id);
      if (result.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
      setDeletingId(null);
    });
  }

  async function handleSaveCaption(id: string) {
    startTransition(async () => {
      const result = await updateImageCaption(id, captionValue);
      if (result.success) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, caption: captionValue } : img
          )
        );
        setEditingCaption(null);
      }
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Image Gallery</h1>
          <p className="text-secondary mt-2">
            {images.length} image{images.length !== 1 ? "s" : ""} across{" "}
            {projectsInGallery.length} project
            {projectsInGallery.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center space-x-2"
        >
          {showUpload ? (
            <>
              <X size={16} />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Upload Image</span>
            </>
          )}
        </Button>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div className="bg-surface border border-border rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="text-lg font-bold mb-4">Upload New Image</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Upload area */}
            <div>
              <ImageUpload
                onUploadSuccess={(url) => setUploadedUrl(url)}
                defaultImage={uploadedUrl || undefined}
                hideGalleryOption={true}
              />
            </div>

            {/* Right: Meta fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">
                  Assign to Project *
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
                >
                  <option value="">Select a project…</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">
                  Caption (optional)
                </label>
                <input
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Describe this image…"
                  className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <Button
                onClick={handleUploadSubmit}
                disabled={!selectedProject || !uploadedUrl || isPending}
                className="w-full flex items-center justify-center space-x-2 mt-4"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Upload size={16} />
                )}
                <span>{isPending ? "Saving…" : "Save to Gallery"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
          />
          <input
            type="text"
            placeholder="Search by caption or project…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary transition-colors text-sm"
          />
        </div>

        {/* Project filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-surface-elevated border border-border text-secondary hover:text-foreground"
            }`}
          >
            All
          </button>
          {projectsInGallery.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilter(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === p.id
                  ? "bg-primary text-white"
                  : "bg-surface-elevated border border-border text-secondary hover:text-foreground"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-lg font-bold mb-2">No images found</h3>
          <p className="text-secondary text-sm max-w-sm mx-auto">
            {images.length === 0
              ? "Upload your first image to start building your gallery."
              : "No images match your current filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Image */}
              <div
                className="aspect-[4/3] bg-surface-elevated cursor-pointer overflow-hidden"
                onClick={() => setLightboxImage(image.imageUrl)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.caption || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

               {/* Overlay actions */}
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setLightboxImage(image.imageUrl)}
                  className="p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                  title="Preview"
                >
                  <Eye size={14} />
                </button>
                {!image.isReadOnly && (
                  <>
                    <button
                      onClick={() => {
                        setEditingCaption(image.id);
                        setCaptionValue(image.caption || "");
                      }}
                      className="p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                      title="Edit caption"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      disabled={deletingId === image.id}
                      className="p-2 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-colors backdrop-blur-sm disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === image.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                {editingCaption === image.id ? (
                  <div className="flex gap-2">
                    <input
                      value={captionValue}
                      onChange={(e) => setCaptionValue(e.target.value)}
                      className="flex-1 bg-surface-elevated border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-primary"
                      placeholder="Add caption…"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveCaption(image.id);
                        if (e.key === "Escape") setEditingCaption(null);
                      }}
                    />
                    <button
                      onClick={() => handleSaveCaption(image.id)}
                      className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    {image.caption && (
                      <p className="text-sm font-medium truncate mb-1">
                        {image.caption}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-secondary">
                      <FolderKanban size={12} />
                      <span className="truncate">
                        {image.projectTitle || "Unknown project"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={lightboxImage}
            alt="Full preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
