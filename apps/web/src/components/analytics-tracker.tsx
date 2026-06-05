"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Only track if we haven't tracked this path in this session yet
    // to prevent double-counting on strict mode or rapid navigation
    if (pathname && !trackedPaths.current.has(pathname)) {
      trackedPaths.current.add(pathname);

      fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: pathname }),
      }).catch((err) => {
        // Silently fail for analytics
        console.error("Analytics tracking failed");
      });
    }
  }, [pathname]);

  return null;
}
