"use server";

import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSetting(key: string) {
  try {
    const data = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    return { success: true, data: data.length > 0 ? data[0].value : null };
  } catch (error: any) {
    console.error(`Failed to fetch setting ${key}`, error);
    return { success: false, error: error.message };
  }
}

export async function updateSeoSettings(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const generator = formData.get("generator") as string;

    const seoData = { title, description, generator };

    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, "seo_metadata")).limit(1);
    
    if (existing.length > 0) {
      await db.update(siteSettings).set({ value: seoData }).where(eq(siteSettings.key, "seo_metadata"));
    } else {
      await db.insert(siteSettings).values({ key: "seo_metadata", value: seoData });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update SEO settings", error);
    return { success: false, error: error.message };
  }
}

export async function updateGeneralSettings(formData: FormData) {
  try {
    const bio = formData.get("bio") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const twitter = formData.get("twitter") as string;

    const generalData = { bio, email, github, linkedin, twitter };

    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, "general_info")).limit(1);
    
    if (existing.length > 0) {
      await db.update(siteSettings).set({ value: generalData }).where(eq(siteSettings.key, "general_info"));
    } else {
      await db.insert(siteSettings).values({ key: "general_info", value: generalData });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update General settings", error);
    return { success: false, error: error.message };
  }
}
