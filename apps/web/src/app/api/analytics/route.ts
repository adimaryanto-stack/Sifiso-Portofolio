import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pageViews } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Get IP address (useful for basic deduplication/analytics if needed later)
    let ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0].trim();
    }
    
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Insert page view asynchronously (don't block the response)
    // For Vercel/Edge compatibility we use await to ensure it completes before lambda dies
    await db.insert(pageViews).values({
      path,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track analytics:", error);
    return NextResponse.json({ error: "Failed to track analytics" }, { status: 500 });
  }
}
