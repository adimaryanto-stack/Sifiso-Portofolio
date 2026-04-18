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

export async function sendInquiry(data: typeof inquiries.$inferInsert) {
  try {
    // 1. Save to Database
    const [inserted] = await db.insert(inquiries).values(data).returning();
    
    // 2. Send Email Notification
    const apiKey = process.env.RESEND_API_KEY;
    
    if (apiKey) {
      const resend = new Resend(apiKey);
      try {
        const emailResponse = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "adimaryanto@gmail.com",
          subject: `New Inquiry: ${data.subject || "Portfolio Contact"}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">New Inquiry from ${data.name}</h2>
              <div style="margin-top: 20px;">
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.phoneNumber ? `<p><strong>WhatsApp/Phone:</strong> ${data.phoneNumber}</p>` : ""}
                ${data.budgetRange ? `<p><strong>Budget Range:</strong> ${data.budgetRange}</p>` : ""}
                ${data.subject ? `<p><strong>Project Type:</strong> ${data.subject}</p>` : ""}
              </div>
              <div style="margin-top: 20px; background: #f9f9f9; padding: 20px; border-radius: 8px;">
                <p style="margin-top: 0; font-weight: bold;">Message:</p>
                <p style="white-space: pre-wrap;">${data.message}</p>
              </div>
              <footer style="margin-top: 30px; font-size: 11px; color: #888; border-top: 1px solid #eee; pt: 10px;">
                Sent from Sifiso Portfolio Production System.
              </footer>
            </div>
          `,
        });

        if (emailResponse.error) {
          console.error("Resend API Error:", emailResponse.error);
        } else {
          console.log("✅ Email sent successfully via Resend:", emailResponse.data?.id);
        }
      } catch (emailError) {
        console.error("Critical Email Exception:", emailError);
      }
    } else {
      console.warn("⚠️ skipping email: RESEND_API_KEY not found in environment.");
    }

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: any) {
    console.error("DB/General Error in sendInquiry:", error);
    return { success: false, error: error.message };
  }
}
