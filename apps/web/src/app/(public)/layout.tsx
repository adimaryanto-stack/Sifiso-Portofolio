import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PublicTransition } from "@/components/layout/public-transition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <PublicTransition>
        <main className="flex-grow">
          {children}
        </main>
      </PublicTransition>
      <Footer />
    </div>
  );
}
