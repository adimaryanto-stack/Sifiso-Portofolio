"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function createProject(data: typeof projects.$inferInsert) {
  try {
    const [project] = await db
      .insert(projects)
      .values({
        ...data,
        id: data.id || uuidv4(),
      })
      .returning();
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Failed to create project", error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, data: Partial<typeof projects.$inferInsert>) {
  try {
    const [project] = await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, id)).returning();
    revalidatePath("/admin/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Failed to update project", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete project", error);
    return { success: false, error: error.message };
  }
}
