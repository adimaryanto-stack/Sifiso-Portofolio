"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@sifiso/ui/components/button";
import { Save, Globe, Info, User, Loader2 } from "lucide-react";
import { updateSeoSettings, updateGeneralSettings } from "@/lib/actions/settings";

export function SettingsForm({ initialSeo, initialGeneral }: { initialSeo: any, initialGeneral: any }) {
  const [loadingSeo, startSeoTransition] = useTransition();
  const [loadingGeneral, startGeneralTransition] = useTransition();
  const [statusSeo, setStatusSeo] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [statusGeneral, setStatusGeneral] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSeoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusSeo(null);
    const formData = new FormData(e.currentTarget);
    startSeoTransition(async () => {
      const result = await updateSeoSettings(formData);
      if (result.success) {
        setStatusSeo({ type: "success", message: "SEO settings updated successfully!" });
        setTimeout(() => setStatusSeo(null), 3000);
      } else {
        setStatusSeo({ type: "error", message: result.error || "Failed to update settings." });
      }
    });
  }

  async function handleGeneralSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusGeneral(null);
    const formData = new FormData(e.currentTarget);
    startGeneralTransition(async () => {
      const result = await updateGeneralSettings(formData);
      if (result.success) {
        setStatusGeneral({ type: "success", message: "General info updated successfully!" });
        setTimeout(() => setStatusGeneral(null), 3000);
      } else {
        setStatusGeneral({ type: "error", message: result.error || "Failed to update info." });
      }
    });
  }

  return (
    <div className="space-y-12">
      {/* SEO Form */}
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

        <form onSubmit={handleSeoSubmit} className="p-8 space-y-8">
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
                defaultValue={initialSeo?.title || "Sifiso — Modern Design & Development Portfolio"}
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
                defaultValue={initialSeo?.description || "Creative developer and designer specializing in high-end digital experiences and modern web applications."}
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
                defaultValue={initialSeo?.generator || "Next.js, React, Framer Motion, Portfolio"}
              />
            </div>
          </div>

          {statusSeo && (
            <div className={`p-4 rounded-2xl flex items-center space-x-3 text-sm font-bold ${
              statusSeo.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
              <span>{statusSeo.type === "success" ? "✓" : "⚠"}</span>
              <span>{statusSeo.message}</span>
            </div>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loadingSeo}
              className="h-16 px-10 rounded-2xl glow-red-hover flex items-center space-x-3 w-full sm:w-auto"
            >
              {loadingSeo ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span className="uppercase font-black text-xs tracking-widest">Update Meta Settings</span>
            </Button>
          </div>
        </form>
      </div>

      {/* General Form */}
      <div className="glass-card rounded-[2.5rem] border-primary/5 overflow-hidden">
        <div className="p-8 border-b border-border/50 bg-primary/5 flex items-center space-x-4">
           <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <User size={24} />
           </div>
           <div>
              <h2 className="text-lg font-bold">General Information</h2>
              <p className="text-xs text-secondary italic">Your personal info and social links used across the site</p>
           </div>
        </div>

        <form onSubmit={handleGeneralSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3 sm:col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-secondary flex items-center">
                Short Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                placeholder="I build things for the web."
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all text-sm leading-relaxed"
                defaultValue={initialGeneral?.bio || ""}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary">
                Public Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="hello@example.com"
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm"
                defaultValue={initialGeneral?.email || ""}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary">
                Twitter/X URL
              </label>
              <input
                name="twitter"
                type="url"
                placeholder="https://twitter.com/..."
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm"
                defaultValue={initialGeneral?.twitter || ""}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary">
                GitHub URL
              </label>
              <input
                name="github"
                type="url"
                placeholder="https://github.com/..."
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm"
                defaultValue={initialGeneral?.github || ""}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-secondary">
                LinkedIn URL
              </label>
              <input
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full px-6 py-4 bg-surface border border-border rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm"
                defaultValue={initialGeneral?.linkedin || ""}
              />
            </div>
          </div>

          {statusGeneral && (
            <div className={`p-4 rounded-2xl flex items-center space-x-3 text-sm font-bold ${
              statusGeneral.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
              <span>{statusGeneral.type === "success" ? "✓" : "⚠"}</span>
              <span>{statusGeneral.message}</span>
            </div>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loadingGeneral}
              className="h-16 px-10 rounded-2xl glow-red-hover flex items-center space-x-3 w-full sm:w-auto"
            >
              {loadingGeneral ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span className="uppercase font-black text-xs tracking-widest">Update Info</span>
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
}
