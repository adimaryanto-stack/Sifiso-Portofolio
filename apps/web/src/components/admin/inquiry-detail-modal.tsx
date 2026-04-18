"use client";

import React from "react";
import { MessageSquare, Calendar, User, Mail, Phone, Share2, DollarSign, Clock } from "lucide-react";
import { Button } from "@sifiso/ui/components/button";

export function InquiryDetailModal({ inquiry, onClose }: { inquiry: any, onClose: () => void }) {
  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-surface border border-border w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">New Lead</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">{inquiry.name}</h2>
              <p className="text-secondary">{inquiry.email}</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-surface-elevated rounded-full transition-colors">
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                 <Phone className="w-4 h-4 text-primary" />
                 <span className="font-medium">{inquiry.phoneNumber || "No Phone"}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                 <Share2 className="w-4 h-4 text-primary" />
                 <span className="font-medium truncate max-w-[200px]">{inquiry.socialMedia || "No Social"}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                 <DollarSign className="w-4 h-4 text-primary" />
                 <span className="font-medium">{inquiry.budgetRange || "Negotiable"}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                 <Clock className="w-4 h-4 text-primary" />
                 <span className="font-medium">{inquiry.subject || "Custom Package"}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-elevated/50 border border-border rounded-3xl p-8 mb-10">
             <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                <MessageSquare className="w-3 h-3" />
                <span>Message Body</span>
             </div>
             <p className="text-lg leading-relaxed whitespace-pre-wrap">
                "{inquiry.message}"
             </p>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2 text-secondary text-xs">
                <Calendar className="w-4 h-4" />
                <span>Received on {new Date(inquiry.createdAt).toLocaleString()}</span>
             </div>
             <Button onClick={onClose} className="glow-red">Mark as Read</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
