"use server";

import { db } from "@/lib/db";
import { quotes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getQuotes() {
  try {
    const data = await db.select().from(quotes).orderBy(desc(quotes.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Error fetching quotes:", error);
    return { success: false, error: error.message };
  }
}

export async function createQuote(formData: FormData) {
  try {
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    
    if (!content || !author) {
      return { success: false, error: "Content and author are required" };
    }

    const [newQuote] = await db.insert(quotes).values({
      content,
      author,
      isActive: true,
      sortOrder: 0,
    }).returning();

    revalidatePath("/admin/quotes");
    revalidatePath("/");
    
    return { success: true, data: newQuote };
  } catch (error: any) {
    console.error("Error creating quote:", error);
    return { success: false, error: error.message };
  }
}

export async function updateQuote(id: string, formData: FormData) {
  try {
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const isActiveStr = formData.get("isActive") as string;
    
    const isActive = isActiveStr === "true";

    if (!content || !author) {
      return { success: false, error: "Content and author are required" };
    }

    const [updated] = await db.update(quotes)
      .set({
        content,
        author,
        isActive,
      })
      .where(eq(quotes.id, id))
      .returning();

    revalidatePath("/admin/quotes");
    revalidatePath("/");

    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating quote:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteQuote(id: string) {
  try {
    await db.delete(quotes).where(eq(quotes.id, id));
    
    revalidatePath("/admin/quotes");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting quote:", error);
    return { success: false, error: error.message };
  }
}

export async function reorderQuotes(updates: { id: string; sortOrder: number }[]) {
  try {
    for (const update of updates) {
      await db.update(quotes)
        .set({ sortOrder: update.sortOrder })
        .where(eq(quotes.id, update.id));
    }
    
    revalidatePath("/admin/quotes");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Error reordering quotes:", error);
    return { success: false, error: error.message };
  }
}
