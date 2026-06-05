"use server";

import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    const data = await db.select().from(services).orderBy(desc(services.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Error fetching services:", error);
    return { success: false, error: error.message };
  }
}

export async function createService(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const iconName = formData.get("iconName") as string;
    const processStr = formData.get("process") as string;
    const benefitsStr = formData.get("benefits") as string;

    const process = processStr ? processStr.split("\n").map(s => s.trim()).filter(Boolean) : null;
    const benefits = benefitsStr ? benefitsStr.split("\n").map(s => s.trim()).filter(Boolean) : null;
    
    if (!title) {
      return { success: false, error: "Title is required" };
    }

    const [newService] = await db.insert(services).values({
      title,
      description: description || null,
      iconName: iconName || null,
      process: process || null,
      benefits: benefits || null,
      isActive: true,
      sortOrder: 0,
    }).returning();

    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");
    
    return { success: true, data: newService };
  } catch (error: any) {
    console.error("Error creating service:", error);
    return { success: false, error: error.message };
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const iconName = formData.get("iconName") as string;
    const isActiveStr = formData.get("isActive") as string;
    const isActive = isActiveStr === "true";
    const processStr = formData.get("process") as string;
    const benefitsStr = formData.get("benefits") as string;

    const process = processStr ? processStr.split("\n").map(s => s.trim()).filter(Boolean) : null;
    const benefits = benefitsStr ? benefitsStr.split("\n").map(s => s.trim()).filter(Boolean) : null;

    if (!title) {
      return { success: false, error: "Title is required" };
    }

    const [updated] = await db.update(services)
      .set({
        title,
        description: description || null,
        iconName: iconName || null,
        process: process || null,
        benefits: benefits || null,
        isActive,
      })
      .where(eq(services.id, id))
      .returning();

    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");

    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating service:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteService(id: string) {
  try {
    await db.delete(services).where(eq(services.id, id));
    
    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting service:", error);
    return { success: false, error: error.message };
  }
}

export async function reorderServices(updates: { id: string; sortOrder: number }[]) {
  try {
    for (const update of updates) {
      await db.update(services)
        .set({ sortOrder: update.sortOrder })
        .where(eq(services.id, update.id));
    }
    
    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");

    return { success: true };
  } catch (error: any) {
    console.error("Error reordering services:", error);
    return { success: false, error: error.message };
  }
}
