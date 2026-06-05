"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "id" : "en";
    startTransition(() => {
      // Very basic locale switching
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.replace(newPathname);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors bg-surface-elevated px-3 py-1.5 rounded-full border border-border hover:border-primary/50"
    >
      <span>{locale === "en" ? "EN" : "ID"}</span>
    </button>
  );
}
