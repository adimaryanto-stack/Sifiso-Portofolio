import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { ServicesManager } from "@/components/admin/services-manager";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  let allServices: any[] = [];
  try {
    allServices = await db.select().from(services).orderBy(asc(services.sortOrder));
  } catch (error) {
    console.error("Failed to fetch services", error);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
      </div>
      
      <ServicesManager initialServices={allServices} />
    </div>
  );
}
