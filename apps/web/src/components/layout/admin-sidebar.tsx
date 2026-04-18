"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Mail, 
  Quote, 
  FolderKanban,
  Settings,
  LogOut,
  ShieldAlert,
  ExternalLink
} from "lucide-react";

export function AdminSidebar() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
    { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
    { name: "Security Logs", href: "/admin/security", icon: ShieldAlert },
    { name: "Image Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="h-full w-64 bg-surface border-r border-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="text-xl font-black">Sifiso<span className="text-primary italic">Admin</span></span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-secondary hover:text-foreground hover:bg-surface-elevated rounded-xl transition-all group"
            >
              <Icon size={20} className="group-hover:text-primary transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-3 px-4 py-3 text-secondary hover:text-foreground hover:bg-surface-elevated rounded-xl transition-all group mb-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#4A90E2] transition-colors"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <span className="font-bold text-[#4A90E2]">Preview Web</span>
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center space-x-3 px-4 py-3 text-secondary hover:text-foreground hover:bg-surface-elevated rounded-xl transition-all group"
        >
          <Settings size={20} className="group-hover:text-primary transition-colors" />
          <span className="font-medium">Settings & SEO</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all group mt-2"
        >
          <LogOut size={20} className="group-hover:text-red-500 transition-colors" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
