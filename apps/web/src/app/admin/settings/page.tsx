"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@sifiso/ui/components/button";
import { ArrowLeft, Save, Globe, Info } from "lucide-react";
import Link from "next/link";
import { updateSeoSettings } from "@/lib/actions/settings";

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateSeoSettings(formData);

    if (result.success) {
      setStatus({ type: "success", message: "SEO settings updated successfully!" });
    } else {
      setStatus({ type: "error", message: result.error || "Failed to update settings." });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tight">SITE SETTINGS</h1>
          <p className="text-secondary mt-2">Configure global SEO and metadata for your portfolio.</p>
        </div>
        <Link href="/admin" className="p-4 border border-border rounded-2xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="glass-card rounded-[2.5rem] border-primary/5 overflow-hidden">
        <div className="p-8 border-b border-border/50 bg-primary/5 flex items-center space-x-4">
           <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Globe size={24} />
           </div>
           <div>
              <h2 className="text-lg font-bold">Search Engine Optimization</h2>
              <p className="text-xs text-secondary italic">Optimize how your site appears in search results</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary flex items-center">
                Global Meta Title
                <Info size={12} className="ml-2 opacity-50" />
              </label>
              <input
                name="title"
                type="text"
                placeholder="Sifiso — Modern Design & Development Portfolio"
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all font-bold"
                defaultValue="Sifiso — Modern Design & Development Portfolio"
              />
              <p className="text-[10px] text-secondary">Recommended: 50-60 characters</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary">
                Meta Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="A collection of crafted digital experiences..."
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all text-sm leading-relaxed"
                defaultValue="Creative developer and designer specializing in high-end digital experiences and modern web applications."
              />
              <p className="text-[10px] text-secondary">Recommended: 150-160 characters</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary">
                Meta Generator / Keywords
              </label>
              <input
                name="generator"
                type="text"
                placeholder="Next.js, Tailwind, Creative Development"
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm"
                defaultValue="Next.js, React, Framer Motion, Portfolio"
              />
            </div>
          </div>

          {status && (
            <div className={`p-4 rounded-2xl flex items-center space-x-3 text-sm font-bold ${
              status.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
              <span>{status.type === "success" ? "✓" : "⚠"}</span>
              <span>{status.message}</span>
            </div>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="h-16 px-10 rounded-2xl glow-red-hover flex items-center space-x-3 w-full sm:w-auto"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" />
              ) : (
                <Save size={18} />
              )}
              <span className="uppercase font-black text-xs tracking-widest">Update Meta Settings</span>
            </Button>
          </div>
        </form>
      </div>
      
      <div className="p-8 rounded-[2.5rem] border border-dashed border-border bg-surface/10">
         <h3 className="text-sm font-black uppercase tracking-widest mb-4">Web Vitals Tip</h3>
         <p className="text-sm text-secondary leading-relaxed">
            Good SEO starts with descriptive titles. Ensure your Meta Title contains your primary keywords like <strong>Design</strong>, <strong>Development</strong>, or <strong>Portfolio</strong>.
         </p>
      </div>
    </div>
  );
}
