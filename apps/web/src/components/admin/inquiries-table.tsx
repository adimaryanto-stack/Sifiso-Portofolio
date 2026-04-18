"use client";

import React, { useState } from "react";
import { InquiryActions } from "@/components/admin/inquiry-actions";
import { InquiryDetailModal } from "@/components/admin/inquiry-detail-modal";
import { markAsRead } from "@/lib/actions/inquiries";

export function InquiriesTable({ inquiries }: { inquiries: any[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const handleOpenDetail = async (inquiry: any) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.isRead) {
      await markAsRead(inquiry.id);
    }
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-elevated border-b border-border">
                <th className="px-6 py-4 font-medium text-secondary text-sm">Sender</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Contact</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Message Preview</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Status</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm">Date</th>
                <th className="px-6 py-4 font-medium text-secondary text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-secondary">
                    No inquiries found. Your inbox is empty.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr 
                    key={inquiry.id} 
                    onClick={() => handleOpenDetail(inquiry)}
                    className={`border-b border-border last:border-b-0 hover:bg-surface-elevated/50 transition-colors cursor-pointer ${!inquiry.isRead ? 'bg-surface-elevated/20' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className={`font-medium ${!inquiry.isRead ? 'text-primary' : ''}`}>{inquiry.name}</div>
                      <div className="text-secondary text-xs">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{inquiry.phoneNumber || "—"}</div>
                      <div className="text-secondary text-[10px] truncate max-w-[120px]">{inquiry.socialMedia || "—"}</div>
                    </td>
                    <td className="px-6 py-4 text-secondary max-w-xs truncate text-sm">
                      {inquiry.message}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inquiry.status === 'replied' ? 'bg-green-500/10 text-green-500' : !inquiry.isRead ? 'bg-primary/10 text-primary' : 'bg-surface-elevated text-secondary'}`}>
                        {inquiry.status || (inquiry.isRead ? 'Read' : 'Unread')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-secondary text-sm">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <InquiryActions id={inquiry.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInquiry && (
        <InquiryDetailModal 
          inquiry={selectedInquiry} 
          onClose={() => setSelectedInquiry(null)} 
        />
      )}
    </>
  );
}
