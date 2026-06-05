import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSetting } from "@/lib/actions/settings";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  const seoRes = await getSetting("seo_metadata");
  const generalRes = await getSetting("general_info");

  const initialSeo = seoRes.success ? seoRes.data : null;
  const initialGeneral = generalRes.success ? generalRes.data : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tight">SITE SETTINGS</h1>
          <p className="text-secondary mt-2">Configure global SEO and general information.</p>
        </div>
        <Link href="/admin" className="p-4 border border-border rounded-2xl hover:bg-surface-elevated transition-colors text-secondary hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <SettingsForm initialSeo={initialSeo} initialGeneral={initialGeneral} />
      
      <div className="p-8 rounded-[2.5rem] border border-dashed border-border bg-surface/10">
         <h3 className="text-sm font-black uppercase tracking-widest mb-4">Web Vitals Tip</h3>
         <p className="text-sm text-secondary leading-relaxed">
            Good SEO starts with descriptive titles. Ensure your Meta Title contains your primary keywords like <strong>Design</strong>, <strong>Development</strong>, or <strong>Portfolio</strong>.
         </p>
      </div>
    </div>
  );
}
