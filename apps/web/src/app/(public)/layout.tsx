import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PublicTransition } from "@/components/layout/public-transition";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let generalInfo: any = null;
  try {
    const results = await db.select().from(siteSettings).where(eq(siteSettings.key, "general_info")).limit(1);
    if (results.length > 0) {
      generalInfo = results[0].value;
    }
  } catch (error) {
    console.error("Failed to fetch general settings for public layout:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar generalInfo={generalInfo} />
      <PublicTransition>
        <main className="flex-grow">
          {children}
        </main>
      </PublicTransition>
      <Footer />
    </div>
  );
}
