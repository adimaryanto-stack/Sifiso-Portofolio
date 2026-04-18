"use server";

import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
