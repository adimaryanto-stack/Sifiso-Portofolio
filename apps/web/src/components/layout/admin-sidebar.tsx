"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Layers,
  DollarSign,
  MessageSquareQuote,
  GitBranch,
  FileText,
  Globe
} from "lucide-react";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  // Check if a nav item is the current active page
  function isActive(href: string) {
    // Strip locale prefix for comparison (e.g. /en/admin -> /admin)
    const cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/)/, "");
    if (href === "/admin") return cleanPath === "/admin";
    return cleanPath.startsWith(href);
  }

  const mainNav = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
    { name: "Creative Process", href: "/admin/creative-process", icon: GitBranch },
  ];

  const contentNav = [
    { name: "Quotes", href: "/admin/quotes", icon: MessageSquareQuote },
    { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  ];

  const systemNav = [
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Settings & SEO", href: "/admin/settings", icon: Settings },
  ];

  function NavItem({ item }: { item: { name: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> } }) {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-all group ${
          active
            ? "bg-primary/10 text-primary font-semibold"
            : "text-secondary hover:text-foreground hover:bg-surface-elevated"
        }`}
      >
        <Icon size={16} className={active ? "text-primary" : "group-hover:text-primary transition-colors"} />
        <span>{item.name}</span>
      </Link>
    );
  }

  function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
      <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary/50 select-none">
        {children}
      </p>
    );
  }

  return (
    <aside className="h-full w-60 bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-border shrink-0">
        <Link href="/admin" className="flex items-center">
          <span className="text-lg font-black tracking-tight">
            Sifiso<span className="text-primary italic">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation — scrollable on very short screens */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 min-h-0">
        <SectionLabel>Main</SectionLabel>
        <div className="space-y-0.5">
          {mainNav.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        <SectionLabel>Content</SectionLabel>
        <div className="space-y-0.5">
          {contentNav.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        <SectionLabel>System</SectionLabel>
        <div className="space-y-0.5">
          {systemNav.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </nav>

      {/* Footer actions — always pinned at bottom */}
      <div className="px-3 py-3 border-t border-border shrink-0 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-blue-500 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <Globe size={16} />
          <span className="font-semibold">Preview Site</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all group"
        >
          <LogOut size={16} className="group-hover:text-red-500 transition-colors" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
