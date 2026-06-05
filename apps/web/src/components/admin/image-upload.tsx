"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { supabaseClient } from "@/lib/supabase-client";
import { Button } from "@sifiso/ui/components/button";
import Image from "next/image";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  defaultImage?: string;
  bucketName?: string;
}

export function ImageUpload({ onUploadSuccess, defaultImage, bucketName = "portfolio" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Optional: add constraint on file size e.g. < 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append("file", file);

      // Upload the file to local API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to upload file to local storage");
      }

      const data = await response.json();
      
      // Update parent state
      setPreview(data.url);
      onUploadSuccess(data.url);
      
    } catch (err: any) {
      console.error("Upload error:", err);
      // More descriptive error if the bucket doesn't exist
      if (err.message?.includes("Bucket not found") || err.statusCode === 404) {
        setError(`Storage bucket '${bucketName}' does not exist. Please create it in your Supabase dashboard and make it public.`);
      } else {
         setError(err.message || "An error occurred during upload.");
      }
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadSuccess(""); // Send empty string back
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-surface-elevated/50 transition-all text-secondary"
        >
          <UploadCloud className="mb-2 h-8 w-8 text-primary" />
          <p className="font-medium text-foreground">Click to upload image</p>
          <p className="text-xs mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border group bg-surface-elevated">
          {/* Using simple img tag to avoid domain configs in next.config.mjs initially */}
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
    </div>
  );
}
