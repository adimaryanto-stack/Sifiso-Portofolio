"use server";

import { db } from "@/lib/db";
import { loginLogs } from "@/lib/db/schema";
import { headers } from "next/headers";

export async function logLoginAttempt(email: string, status: "success" | "failed") {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "unknown";
  const ipAddress = headersList.get("x-forwarded-for") || "127.0.0.1";

  try {
    await db.insert(loginLogs).values({
      email,
      status,
      userAgent,
      ipAddress,
    });
  } catch (error) {
    console.error("Failed to log login attempt:", error);
  }
}
