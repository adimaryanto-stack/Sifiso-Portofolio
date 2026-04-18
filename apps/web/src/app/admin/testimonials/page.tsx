import { TestimonialActions } from "@/components/admin/testimonial-actions";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";
import { Plus } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  let allTestimonials: any[] = [];
  try {
    allTestimonials = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  } catch (error) {
    console.error("Failed to fetch testimonials", error);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-secondary mt-2">Manage client feedback and reviews.</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="flex items-center space-x-2">
            <Plus size={16} />
            <span>New Testimonial</span>
          </Button>
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-elevated border-b border-border">
                <th className="px-6 py-4 font-medium text-secondary text-sm">Client</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Rating</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Status</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Date</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-secondary">
                    No testimonials found. Add one to build trust.
                  </td>
                </tr>
              ) : (
                allTestimonials.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{item.clientName}</div>
                      <div className="text-secondary text-sm">{item.clientTitle || "—"}</div>
                    </td>
                    <td className="px-6 py-4 text-primary font-bold">{item.rating}/5</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.isPublished ? 'bg-green-500/10 text-green-500' : 'bg-secondary/10 text-secondary'}`}>
                        {item.isPublished ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-secondary text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <TestimonialActions id={item.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
