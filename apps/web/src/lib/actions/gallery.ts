"use server";

import { db } from "@/lib/db";
import { projectImages, projects } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function getAllImages() {
  try {
    // Get all project images
    const images = await db
      .select({
        id: projectImages.id,
        imageUrl: projectImages.imageUrl,
        caption: projectImages.caption,
        sortOrder: projectImages.sortOrder,
        createdAt: projectImages.createdAt,
        projectId: projectImages.projectId,
        projectTitle: projects.title,
        projectSlug: projects.slug,
      })
      .from(projectImages)
      .leftJoin(projects, eq(projectImages.projectId, projects.id))
      .orderBy(desc(projectImages.createdAt));

    return { success: true, images };
  } catch (error: any) {
    console.error("Failed to fetch gallery images", error);
    return { success: false, images: [], error: error.message };
  }
}

export async function addImageToProject(data: {
  projectId: string;
  imageUrl: string;
  caption?: string;
}) {
  try {
    const [image] = await db
      .insert(projectImages)
      .values({
        id: uuidv4(),
        projectId: data.projectId,
        imageUrl: data.imageUrl,
        caption: data.caption || null,
        sortOrder: 0,
      })
      .returning();

    revalidatePath("/admin/gallery");
    revalidatePath("/admin/projects");
    return { success: true, image };
  } catch (error: any) {
    console.error("Failed to add image", error);
    return { success: false, error: error.message };
  }
}

export async function updateImageCaption(id: string, caption: string) {
  try {
    await db
      .update(projectImages)
      .set({ caption })
      .where(eq(projectImages.id, id));

    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update caption", error);
    return { success: false, error: error.message };
  }
}

export async function deleteImage(id: string) {
  try {
    await db.delete(projectImages).where(eq(projectImages.id, id));
    revalidatePath("/admin/gallery");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete image", error);
    return { success: false, error: error.message };
  }
}

export async function getProjectsList() {
  try {
    const allProjects = await db
      .select({ id: projects.id, title: projects.title })
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return { success: true, projects: allProjects };
  } catch (error: any) {
    console.error("Failed to fetch projects list", error);
    return { success: false, projects: [], error: error.message };
  }
}
