import React from "react";
import { getInvoices } from "@/lib/actions/clients";
import { Receipt, DollarSign, FileText } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminInvoicesPage() {
  const { data: invoices = [] } = await getInvoices();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Invoices</h1>
          <p className="text-secondary font-medium mt-1">Manage billing and proposals.</p>
        </div>
      </div>

      <div className="glass-card rounded-[2rem] border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Invoice #</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Amount</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary">Status</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!invoices || invoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-secondary">
                      <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4">
                        <Receipt size={24} />
                      </div>
                      <p className="font-medium">No invoices found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                invoices.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-surface/50 transition-colors group">
                    <td className="p-6">
                      <span className="font-bold text-lg">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center space-x-1 font-mono">
                        <DollarSign size={14} className="text-secondary" />
                        <span className="font-bold">{invoice.amount}</span>
                        <span className="text-xs text-secondary">{invoice.currency}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        invoice.status === 'paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                        invoice.status === 'overdue' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <a 
                        href={`/portal/invoices/${invoice.id}`}
                        target="_blank"
                        className="text-sm font-bold text-primary hover:underline flex items-center justify-end space-x-1"
                      >
                        <FileText size={14} />
                        <span>Print PDF</span>
                      </a>
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
