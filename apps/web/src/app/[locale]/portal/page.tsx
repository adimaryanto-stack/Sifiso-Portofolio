import React from "react";
import { db } from "@/lib/db";
import { clients, projectMilestones, invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LayoutDashboard, CheckCircle2, Circle, Clock, Receipt } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClientPortalPage() {
  const session = await auth.api.getSession({
    headers: headers()
  });

  if (!session) {
    redirect("/login");
  }

  // Find if user is a client
  const clientResults = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);
  
  if (clientResults.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">Access Denied</h1>
          <p className="text-secondary text-lg">Your account does not have client portal access.</p>
        </div>
      </div>
    );
  }

  const client = clientResults[0];

  // Fetch milestones and invoices
  const milestones = await db.select().from(projectMilestones).where(eq(projectMilestones.projectId, "1")); // Dummy project ID for MVP
  const clientInvoices = await db.select().from(invoices).where(eq(invoices.clientId, client.id));

  return (
    <div className="min-h-screen pt-32 pb-24 bg-surface">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Welcome, <span className="text-primary italic">{client.companyName || session.user.name}</span>
          </h1>
          <p className="text-secondary">Track your active projects and billing.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="glass-card rounded-[2rem] p-8 border-border">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center">
                <LayoutDashboard className="mr-3 text-primary" size={20} />
                Project Milestones
              </h2>
              
              {milestones.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                  <p className="text-secondary font-medium">No active milestones for your project.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {milestones.map((m, i) => (
                    <div key={m.id} className="flex items-start space-x-4">
                      <div className="mt-1">
                        {m.status === 'completed' ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : m.status === 'in_progress' ? (
                          <Clock className="text-yellow-500" size={20} />
                        ) : (
                          <Circle className="text-border" size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-bold ${m.status === 'completed' ? 'text-secondary line-through' : 'text-foreground'}`}>
                          {m.title}
                        </h3>
                        <p className="text-sm text-secondary mt-1">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card rounded-[2rem] p-8 border-border">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center">
                <Receipt className="mr-3 text-primary" size={20} />
                Invoices
              </h2>
              
              {clientInvoices.length === 0 ? (
                <p className="text-sm text-secondary text-center py-4">No invoices due.</p>
              ) : (
                <div className="space-y-4">
                  {clientInvoices.map((inv) => (
                    <div key={inv.id} className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{inv.invoiceNumber}</span>
                        <span className="font-mono text-sm">{inv.amount} {inv.currency}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          inv.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {inv.status}
                        </span>
                        {inv.status !== 'paid' && (
                          <button className="text-xs font-bold text-primary hover:underline">Pay Now</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
