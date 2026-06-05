import { db } from "@/lib/db";
import { pricingPackages } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PricingManager } from "@/components/admin/pricing-manager";

export const dynamic = "force-dynamic";

export default async function PricingAdminPage() {
  let allPackages: any[] = [];
  try {
    allPackages = await db.select().from(pricingPackages).orderBy(asc(pricingPackages.sortOrder));
  } catch (error) {
    console.error("Failed to fetch pricing packages", error);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pricing Packages</h1>
      </div>
      
      <PricingManager initialPackages={allPackages} />
    </div>
  );
}
