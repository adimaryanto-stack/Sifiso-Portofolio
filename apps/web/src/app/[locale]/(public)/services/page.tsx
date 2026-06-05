import { db } from "@/lib/db";
import { services, pricingPackages } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { ServicesContent } from "./services-content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const dbServices = await db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.sortOrder));
  const dbPricing = await db.select().from(pricingPackages).where(eq(pricingPackages.isActive, true)).orderBy(asc(pricingPackages.sortOrder));

  return <ServicesContent services={dbServices} pricing={dbPricing} />;
}
