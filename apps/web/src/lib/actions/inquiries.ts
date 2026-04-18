"use server";

import { db } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
  try {
    await db.update(inquiries).set({ isRead: true }).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to mark inquiry as read", error);
    return { success: false, error: error.message };
  }
}

export async function markAsReplied(id: string) {
  try {
    await db.update(inquiries).set({ isRead: true, status: "replied" }).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to mark inquiry as replied", error);
    return { success: false, error: error.message };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await db.delete(inquiries).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete inquiry", error);
    return { success: false, error: error.message };
  }
}

export async function sendInquiry(data: typeof inquiries.$inferInsert) {
  try {
    await db.insert(inquiries).values(data);
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send inquiry", error);
    return { success: false, error: error.message };
  }
}
