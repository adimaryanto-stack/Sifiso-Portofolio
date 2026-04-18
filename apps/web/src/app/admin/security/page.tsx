import React from "react";
import { db } from "@/lib/db";
import { loginLogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { format } from "date-fns";
import { Shield, Clock, Monitor, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LoginHistoryPage() {
  let logs: any[] = [];
  
  try {
    logs = await db.select().from(loginLogs).orderBy(desc(loginLogs.timestamp)).limit(50);
  } catch (error) {
    console.error("Failed to fetch login logs:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black italic tracking-tight">SECURITY ANALYTICS</h1>
        <p className="text-secondary mt-2">Monitor recent access attempts to your admin dashboard.</p>
      </div>

      <div className="glass-card rounded-[2rem] border-primary/5 p-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 text-[10px] font-black uppercase tracking-widest text-secondary">
                <th className="px-4 py-6">Timestamp</th>
                <th className="px-4 py-6">Email Address</th>
                <th className="px-4 py-6">Status</th>
                <th className="px-4 py-6">IP Address</th>
                <th className="px-4 py-6">Device Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-6 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                       <Clock size={14} className="text-primary" />
                       <span>{log.timestamp ? format(new Date(log.timestamp), "MMM d, HH:mm:ss") : "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-sm font-bold text-foreground">{log.email}</td>
                  <td className="px-4 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      log.status === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-sm text-secondary">
                    <div className="flex items-center space-x-2">
                       <MapPin size={14} />
                       <span>{log.ipAddress || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-sm text-secondary max-w-xs truncate">
                    <div className="flex items-center space-x-2">
                       <Monitor size={14} />
                       <span title={log.userAgent}>{log.userAgent || "Generic Browser"}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-4 py-20 text-center text-secondary italic">
                    No login records found. Check your database connection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
