"use server";

import { db } from "@/lib/db";
import { projectImages, projects, blogPosts } from "@/lib/db/schema";
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

    // Get all project thumbnails, heroes, and process gallery images
    const allProjects = await db.select().from(projects);
    const projectExtraImages: any[] = [];
    allProjects.forEach((p: any) => {
      if (p.thumbnailUrl) {
        projectExtraImages.push({
          id: `proj-thumb-${p.id}`,
          imageUrl: p.thumbnailUrl,
          caption: "Project Thumbnail",
          sortOrder: null,
          createdAt: p.createdAt,
          projectId: p.id,
          projectTitle: p.title,
          projectSlug: p.slug,
          isReadOnly: true,
        });
      }
      if (p.heroImageUrl) {
        projectExtraImages.push({
          id: `proj-hero-${p.id}`,
          imageUrl: p.heroImageUrl,
          caption: "Project Hero Image",
          sortOrder: null,
          createdAt: p.createdAt,
          projectId: p.id,
          projectTitle: p.title,
          projectSlug: p.slug,
          isReadOnly: true,
        });
      }
      if (p.processGallery && Array.isArray(p.processGallery)) {
        (p.processGallery as string[]).forEach((imgUrl, idx) => {
          projectExtraImages.push({
            id: `proj-proc-${p.id}-${idx}`,
            imageUrl: imgUrl,
            caption: `Process Image ${idx + 1}`,
            sortOrder: null,
            createdAt: p.createdAt,
            projectId: p.id,
            projectTitle: p.title,
            projectSlug: p.slug,
            isReadOnly: true,
          });
        });
      }
    });

    // Get all blog post cover images
    const allBlogPosts = await db.select().from(blogPosts);
    const blogImages: any[] = [];
    allBlogPosts.forEach((b: any) => {
      if (b.coverImage) {
        blogImages.push({
          id: `blog-cover-${b.id}`,
          imageUrl: b.coverImage,
          caption: "Blog Cover Image",
          sortOrder: null,
          createdAt: b.createdAt,
          projectId: `blog-${b.id}`,
          projectTitle: `Blog: ${b.title}`,
          projectSlug: `blog/${b.slug}`,
          isReadOnly: true,
        });
      }
    });

    // Merge and sort all images
    const allMergedImages = [
      ...images.map((img: any) => ({ ...img, isReadOnly: false })),
      ...projectExtraImages,
      ...blogImages
    ];

    allMergedImages.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return { success: true, images: allMergedImages };
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
