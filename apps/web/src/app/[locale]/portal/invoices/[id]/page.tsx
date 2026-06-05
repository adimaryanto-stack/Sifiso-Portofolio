import React from "react";
import { db } from "@/lib/db";
import { invoices, clients, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function InvoicePrintPage({ params }: { params: { id: string } }) {
  const invoiceResults = await db.select()
    .from(invoices)
    .where(eq(invoices.id, params.id))
    .limit(1);

  if (invoiceResults.length === 0) notFound();
  const invoice = invoiceResults[0];

  const clientResults = await db.select().from(clients).where(eq(clients.id, invoice.clientId)).limit(1);
  const client = clientResults[0];

  return (
    <div className="bg-white min-h-screen text-black p-12">
      <div className="max-w-3xl mx-auto border border-gray-200 p-12 relative shadow-lg">
        {/* Print Button (hidden when printing) */}
        <button 
          className="absolute top-4 right-4 print:hidden bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm"
          // @ts-ignore
          onClick="window.print()"
        >
          Print PDF
        </button>

        <div className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-1">SIFISO</h1>
            <p className="text-gray-500 font-medium">Design & Development</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-300 uppercase tracking-widest mb-2">Invoice</h2>
            <p className="font-mono font-bold text-lg">{invoice.invoiceNumber}</p>
          </div>
        </div>

        <div className="flex justify-between mb-16">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Billed To</h3>
            <p className="font-bold text-lg">{client?.companyName || "Valued Client"}</p>
            <p className="text-gray-600">{client?.phoneNumber}</p>
          </div>
          <div className="text-right space-y-2">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Date Issued</p>
              <p className="font-medium">{format(new Date(invoice.createdAt), "MMMM dd, yyyy")}</p>
            </div>
            {invoice.dueDate && (
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-4">Due Date</p>
                <p className="font-medium">{format(new Date(invoice.dueDate), "MMMM dd, yyyy")}</p>
              </div>
            )}
          </div>
        </div>

        <table className="w-full text-left mb-16">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="py-3 font-bold uppercase tracking-widest text-sm text-gray-500">Description</th>
              <th className="py-3 font-bold uppercase tracking-widest text-sm text-gray-500 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-4 font-medium">Professional Services rendered for Project</td>
              <td className="py-4 font-mono font-bold text-right">{invoice.amount} {invoice.currency}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Status</p>
            <p className={`font-bold uppercase tracking-wider ${invoice.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
              {invoice.status}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount Due</p>
            <p className="text-3xl font-black font-mono">{invoice.amount} <span className="text-lg">{invoice.currency}</span></p>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          const btn = document.querySelector('button');
          if(btn) btn.addEventListener('click', () => window.print());
        `
      }} />
    </div>
  );
}
