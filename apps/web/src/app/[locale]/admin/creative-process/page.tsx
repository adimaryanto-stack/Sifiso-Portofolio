import { db } from "@/lib/db";
import { creativeProcessSteps } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { CreativeProcessManager } from "@/components/admin/creative-process-manager";

export const dynamic = "force-dynamic";

export default async function CreativeProcessAdminPage() {
  let allSteps: any[] = [];
  try {
    allSteps = await db.select().from(creativeProcessSteps).orderBy(asc(creativeProcessSteps.sortOrder));
  } catch (error) {
    console.error("Failed to fetch creative process steps", error);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Creative Process</h1>
        <p className="text-secondary mt-2">Manage the timeline of your creative process.</p>
      </div>
      
      <CreativeProcessManager initialSteps={allSteps} />
    </div>
  );
}
