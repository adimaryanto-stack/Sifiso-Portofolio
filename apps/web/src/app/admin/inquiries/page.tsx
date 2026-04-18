import { InquiriesTable } from "@/components/admin/inquiries-table";
import { db } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function InquiriesAdminPage() {
  let allInquiries: any[] = [];
  try {
    allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error("Failed to fetch inquiries", error);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Inquiries</h1>
          <p className="text-secondary mt-2">Manage contact form submissions.</p>
        </div>
      </div>

      <InquiriesTable inquiries={allInquiries} />
    </div>
  );
}
