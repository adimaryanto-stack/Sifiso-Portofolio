import React from "react";
import { getClients } from "@/lib/actions/clients";
import Link from "next/link";
import { Plus, Users, Building, Phone } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const { data: clients = [] } = await getClients();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Clients</h1>
          <p className="text-secondary font-medium mt-1">Manage portal access for your clients.</p>
        </div>
      </div>

      <div className="glass-card rounded-[2rem] border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Company / Client</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Status</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!clients || clients.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-secondary">
                      <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4">
                        <Users size={24} />
                      </div>
                      <p className="font-medium">No clients found.</p>
                      <p className="text-sm mt-1">Clients will be added when they sign up or are assigned.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                clients.map((client: any) => (
                  <tr key={client.id} className="hover:bg-surface/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{client.companyName || "N/A"}</span>
                        <div className="flex items-center space-x-2 text-sm text-secondary">
                          <Phone size={14} />
                          <span>{client.phoneNumber || "No phone"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 uppercase tracking-wider border border-green-500/20">
                        {client.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-sm text-secondary font-medium">
                        {format(new Date(client.createdAt), "MMM dd, yyyy")}
                      </span>
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
