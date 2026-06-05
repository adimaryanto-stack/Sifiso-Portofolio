"use server";

import { db } from "@/lib/db";
import { blogPosts, blogCategories, postCategories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  try {
    const data = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed to fetch posts", error);
    return { success: false, error: error.message };
  }
}

export async function getPost(id: string) {
  try {
    const data = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return { success: true, data: data[0] };
  } catch (error: any) {
    console.error("Failed to fetch post", error);
    return { success: false, error: error.message };
  }
}

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const isPublished = formData.get("isPublished") === "true";

    const data = await db.insert(blogPosts).values({
      title,
      slug,
      excerpt,
      content,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    }).returning();

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, data: data[0] };
  } catch (error: any) {
    console.error("Failed to create post", error);
    return { success: false, error: error.message };
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const isPublished = formData.get("isPublished") === "true";

    const data = await db.update(blogPosts).set({
      title,
      slug,
      excerpt,
      content,
      isPublished,
      updatedAt: new Date(),
    }).where(eq(blogPosts.id, id)).returning();

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return { success: true, data: data[0] };
  } catch (error: any) {
    console.error("Failed to update post", error);
    return { success: false, error: error.message };
  }
}

export async function deletePost(id: string) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete post", error);
    return { success: false, error: error.message };
  }
}
