import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function Footer() {
  let settings: any = {};
  try {
    const results = await db.select().from(siteSettings).where(eq(siteSettings.key, "general_info")).limit(1);
    if (results.length > 0) {
      settings = results[0].value;
    }
  } catch (error) {
    console.error("Failed to fetch general settings for footer:", error);
  }

  const email = settings.email || "adimaryanto@gmail.com";
  const bio = settings.bio || "Designing digital dreams into high-performance realities.";
  const github = settings.github || "";
  const linkedin = settings.linkedin || "";
  const twitter = settings.twitter || "";
  const dribbble = settings.dribbble || "";
  const logoType = settings.logoType || "text";
  const logoText = settings.logoText || "Sifiso";
  const logoUrl = settings.logoUrl || "";
  
  let whatsapp = settings.whatsapp || "";
  let whatsappLink = "";
  if (whatsapp) {
    if (whatsapp.startsWith("http://") || whatsapp.startsWith("https://")) {
      whatsappLink = whatsapp;
    } else {
      const cleanNumber = whatsapp.replace(/[^0-9]/g, "");
      whatsappLink = `https://wa.me/${cleanNumber}`;
    }
  } else {
    whatsappLink = "https://wa.me/6281234567890";
  }

  return (
    <footer className="py-12 border-t border-border bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-secondary text-sm">
        <div className="text-center md:text-left">
          {logoType === "image" && logoUrl ? (
            <img 
              src={logoUrl} 
              alt={logoText} 
              className="h-8 w-auto object-contain max-w-[120px] mb-2 mx-auto md:mx-0"
            />
          ) : (
            <span className="text-xl font-black text-white tracking-tighter">
              {logoText}<span className="text-primary">...</span>
            </span>
          )}
          <p className="mt-2 text-muted-foreground max-w-xs">
            {bio}
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 font-bold tracking-widest text-xs uppercase mb-4">
            {dribbble && <a href={dribbble} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Dribbble</a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>}
            {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>}
            {github && <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>}
            {email && <a href={`mailto:${email}`} className="hover:text-primary transition-colors">Email</a>}
            {whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">WhatsApp</a>}
            <Link href="/login" className="hover:text-primary transition-colors border-l border-border pl-8">Admin Login</Link>
          </div>
          <p className="text-muted-foreground">© {new Date().getFullYear()} Sifiso Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
