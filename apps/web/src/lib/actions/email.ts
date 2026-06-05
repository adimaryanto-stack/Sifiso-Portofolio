"use server";

import { Resend } from "resend";

export async function sendInquiryNotification(inquiryData: { name: string; email: string; message: string; subject?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Email notification skipped.");
    return { success: false, error: "RESEND_API_KEY not set" };
  }

  try {
    const resend = new Resend(apiKey);
    
    // We send this to the site owner (using a verified email on Resend or default test email if not set)
    // The "from" address must be a verified domain on Resend (e.g. Acme <onboarding@resend.dev> for testing)
    const toEmail = process.env.ADMIN_EMAIL || "delivered@resend.dev"; 
    
    await resend.emails.send({
      from: "Sifiso Portfolio <onboarding@resend.dev>", // Replace with verified domain in production
      to: toEmail,
      subject: `New Inquiry: ${inquiryData.subject || "No Subject"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${inquiryData.name}</p>
        <p><strong>Email:</strong> ${inquiryData.email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0;">
          ${inquiryData.message}
        </blockquote>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send email notification", error);
    return { success: false, error: error.message };
  }
}
