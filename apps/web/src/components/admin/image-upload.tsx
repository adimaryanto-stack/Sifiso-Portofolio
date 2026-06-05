"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@sifiso/ui/components/button";
import { getAllImages } from "@/lib/actions/gallery";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  defaultImage?: string;
  bucketName?: string;
  hideGalleryOption?: boolean;
}

export function ImageUpload({ 
  onUploadSuccess, 
  defaultImage, 
  bucketName = "portfolio",
  hideGalleryOption = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery selector modal state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGalleryImages = async () => {
    setIsLoadingGallery(true);
    try {
      const res = await getAllImages();
      if (res.success && res.images) {
        setGalleryImages(res.images);
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to upload file to local storage");
      }

      const data = await response.json();
      
      setPreview(data.url);
      onUploadSuccess(data.url);
      
    } catch (err: any) {
      console.error("Upload error:", err);
      if (err.message?.includes("Bucket not found") || err.statusCode === 404) {
        setError(`Storage bucket '${bucketName}' does not exist. Please create it in your Supabase dashboard and make it public.`);
      } else {
         setError(err.message || "An error occurred during upload.");
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadSuccess("");
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      
      {!preview ? (
        <div className="space-y-3">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-surface-elevated/50 transition-all text-secondary"
          >
            <UploadCloud className="mb-2 h-8 w-8 text-primary" />
            <p className="font-medium text-foreground">Click to upload image</p>
            <p className="text-xs mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
          </div>
          
          {!hideGalleryOption && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowGalleryModal(true);
                fetchGalleryImages();
              }}
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2 border-border hover:bg-surface-elevated/50 transition-all"
            >
              <ImageIcon className="h-4 w-4 text-primary" />
              <span>Choose from Gallery</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border group bg-surface-elevated">
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Button type="button" variant="ghost" onClick={removeImage} className="text-white hover:text-red-500">
               <X className="h-6 w-6 mr-2" />
               Remove Image
             </Button>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="mt-2 flex items-center text-sm text-primary">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Uploading...
        </div>
      )}

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface border border-border w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 text-foreground">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Select Image from Gallery</h3>
                <p className="text-xs text-secondary mt-1">Choose an existing image uploaded across your portfolio</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="p-2 rounded-lg bg-surface-elevated hover:bg-border text-secondary hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-border bg-surface-elevated/20">
              <input
                type="text"
                placeholder="Search images by caption or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-sm transition-colors text-foreground"
              />
            </div>

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0 bg-background/50">
              {isLoadingGallery ? (
                <div className="h-48 flex items-center justify-center text-primary">
                  <Loader2 className="animate-spin h-8 w-8 mr-2" />
                  <span>Loading gallery...</span>
                </div>
              ) : (
                <>
                  {galleryImages.length === 0 ? (
                    <div className="h-48 flex flex-col items-center justify-center text-secondary">
                      <p className="italic">No images found in gallery.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {galleryImages
                        .filter(img => 
                          !searchQuery || 
                          (img.caption || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (img.projectTitle || "").toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(img => (
                          <div 
                            key={img.id}
                            onClick={() => {
                              setPreview(img.imageUrl);
                              onUploadSuccess(img.imageUrl);
                              setShowGalleryModal(false);
                            }}
                            className="group relative aspect-square bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300"
                          >
                            <img 
                              src={img.imageUrl} 
                              alt={img.caption || "Gallery image"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                              <p className="text-white text-xs font-bold truncate">{img.caption || "Untitled"}</p>
                              <p className="text-[10px] text-primary truncate mt-0.5">{img.projectTitle || "Static Asset"}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex justify-end bg-surface-elevated/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowGalleryModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
