"use server";

import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTestimonial(data: typeof testimonials.$inferInsert) {
  try {
    const [testimonial] = await db.insert(testimonials).values(data).returning();
    revalidatePath("/admin/testimonials");
    return { success: true, testimonial };
  } catch (error: any) {
    console.error("Failed to create testimonial", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete testimonial", error);
    return { success: false, error: error.message };
  }
}

export async function updateTestimonial(id: string, data: Partial<typeof testimonials.$inferInsert>) {
  try {
    const [testimonial] = await db.update(testimonials).set(data).where(eq(testimonials.id, id)).returning();
    revalidatePath("/admin/testimonials");
    return { success: true, testimonial };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
