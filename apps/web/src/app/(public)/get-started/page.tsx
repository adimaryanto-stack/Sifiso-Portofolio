import React from "react";
import { db } from "@/lib/db";
import { pricingPackages } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { GetStartedClient } from "./get-started-client";

export const dynamic = "force-dynamic";

export default async function GetStartedPage() {
  let dbPackages: any[] = [];
  try {
    dbPackages = await db
      .select()
      .from(pricingPackages)
      .where(eq(pricingPackages.isActive, true))
      .orderBy(asc(pricingPackages.sortOrder));
  } catch (error) {
    console.error("Failed to fetch pricing packages for public site:", error);
  }

  return (
    <div className="min-h-screen">
      <GetStartedClient dbPackages={dbPackages} />
    </div>
  );
}
