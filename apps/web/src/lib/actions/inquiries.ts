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

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInquiry(data: typeof inquiries.$inferInsert) {
  try {
    // 1. Save to Database
    const [inserted] = await db.insert(inquiries).values(data).returning();
    
    // 2. Send Email Notification (if API key is set)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: "adimaryanto@gmail.com",
          subject: `New Inquiry: ${data.subject || "No Subject"}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #000;">New Inquiry from ${data.name}</h2>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.budgetRange ? `<p><strong>Budget Range:</strong> ${data.budgetRange}</p>` : ""}
              <p><strong>Message:</strong></p>
              <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                ${data.message.replace(/\n/g, "<br>")}
              </div>
              <p style="font-size: 12px; color: #666; margin-top: 20px;">
                Sent from your Sifiso Portfolio. You can manage this inquiry in your <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/inquiries">Admin Dashboard</a>.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification", emailError);
        // We don't return error here because the DB insert succeeded
      }
    }

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send inquiry", error);
    return { success: false, error: error.message };
  }
}
