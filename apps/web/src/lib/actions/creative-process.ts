"use server";

import { db } from "@/lib/db";
import { creativeProcessSteps } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCreativeProcessSteps() {
  try {
    const data = await db.select().from(creativeProcessSteps).orderBy(desc(creativeProcessSteps.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Error fetching creative process steps:", error);
    return { success: false, error: error.message };
  }
}

export async function createProcessStep(formData: FormData) {
  try {
    const stepNumber = formData.get("stepNumber") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const iconName = formData.get("iconName") as string;
    
    if (!stepNumber || !title) {
      return { success: false, error: "Step Number and Title are required" };
    }

    const [newStep] = await db.insert(creativeProcessSteps).values({
      stepNumber,
      title,
      subtitle: subtitle || null,
      description: description || null,
      iconName: iconName || null,
      isActive: true,
      sortOrder: 0,
    }).returning();

    revalidatePath("/admin/creative-process");
    revalidatePath("/");
    
    return { success: true, data: newStep };
  } catch (error: any) {
    console.error("Error creating creative process step:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProcessStep(id: string, formData: FormData) {
  try {
    const stepNumber = formData.get("stepNumber") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const iconName = formData.get("iconName") as string;
    const isActiveStr = formData.get("isActive") as string;
    
    const isActive = isActiveStr === "true";

    if (!stepNumber || !title) {
      return { success: false, error: "Step Number and Title are required" };
    }

    const [updated] = await db.update(creativeProcessSteps)
      .set({
        stepNumber,
        title,
        subtitle: subtitle || null,
        description: description || null,
        iconName: iconName || null,
        isActive,
      })
      .where(eq(creativeProcessSteps.id, id))
      .returning();

    revalidatePath("/admin/creative-process");
    revalidatePath("/");

    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating creative process step:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProcessStep(id: string) {
  try {
    await db.delete(creativeProcessSteps).where(eq(creativeProcessSteps.id, id));
    
    revalidatePath("/admin/creative-process");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting creative process step:", error);
    return { success: false, error: error.message };
  }
}

export async function reorderProcessSteps(updates: { id: string; sortOrder: number }[]) {
  try {
    for (const update of updates) {
      await db.update(creativeProcessSteps)
        .set({ sortOrder: update.sortOrder })
        .where(eq(creativeProcessSteps.id, update.id));
    }
    
    revalidatePath("/admin/creative-process");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Error reordering creative process steps:", error);
    return { success: false, error: error.message };
  }
}
