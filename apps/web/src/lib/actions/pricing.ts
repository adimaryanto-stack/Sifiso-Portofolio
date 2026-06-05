"use server";

import { db } from "@/lib/db";
import { pricingPackages } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPricingPackages() {
  try {
    const data = await db.select().from(pricingPackages).orderBy(desc(pricingPackages.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Error fetching pricing packages:", error);
    return { success: false, error: error.message };
  }
}

export async function createPricingPackage(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const badge = formData.get("badge") as string;
    const featuresStr = formData.get("features") as string; // comma separated or JSON string
    
    if (!name || !price) {
      return { success: false, error: "Name and price are required" };
    }

    let features = [];
    if (featuresStr) {
      features = featuresStr.split("\n").map(f => f.trim()).filter(f => f);
    }

    const [newPackage] = await db.insert(pricingPackages).values({
      name,
      price,
      badge: badge || null,
      features,
      isPopular: false,
      isActive: true,
      sortOrder: 0,
    }).returning();

    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/services");
    
    return { success: true, data: newPackage };
  } catch (error: any) {
    console.error("Error creating pricing package:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePricingPackage(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const badge = formData.get("badge") as string;
    const featuresStr = formData.get("features") as string;
    const isActiveStr = formData.get("isActive") as string;
    const isPopularStr = formData.get("isPopular") as string;
    
    const isActive = isActiveStr === "true";
    const isPopular = isPopularStr === "true";

    if (!name || !price) {
      return { success: false, error: "Name and price are required" };
    }

    let features = [];
    if (featuresStr) {
      features = featuresStr.split("\n").map(f => f.trim()).filter(f => f);
    }

    const [updated] = await db.update(pricingPackages)
      .set({
        name,
        price,
        badge: badge || null,
        features,
        isActive,
        isPopular,
        updatedAt: new Date(),
      })
      .where(eq(pricingPackages.id, id))
      .returning();

    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/services");

    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating pricing package:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePricingPackage(id: string) {
  try {
    await db.delete(pricingPackages).where(eq(pricingPackages.id, id));
    
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/services");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting pricing package:", error);
    return { success: false, error: error.message };
  }
}

export async function reorderPricingPackages(updates: { id: string; sortOrder: number }[]) {
  try {
    for (const update of updates) {
      await db.update(pricingPackages)
        .set({ sortOrder: update.sortOrder })
        .where(eq(pricingPackages.id, update.id));
    }
    
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    revalidatePath("/services");

    return { success: true };
  } catch (error: any) {
    console.error("Error reordering pricing packages:", error);
    return { success: false, error: error.message };
  }
}
