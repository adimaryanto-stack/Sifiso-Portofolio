import { db } from "@/lib/db";
import { quotes } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { QuotesManager } from "@/components/admin/quotes-manager";

export const dynamic = "force-dynamic";

export default async function QuotesAdminPage() {
  let allQuotes: any[] = [];
  try {
    allQuotes = await db.select().from(quotes).orderBy(asc(quotes.sortOrder));
  } catch (error) {
    console.error("Failed to fetch quotes", error);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Quotes</h1>
      </div>
      
      <QuotesManager initialQuotes={allQuotes} />
    </div>
  );
}
