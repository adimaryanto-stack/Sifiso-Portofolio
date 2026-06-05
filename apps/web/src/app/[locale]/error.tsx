"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@sifiso/ui/components/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-10 border border-red-500/20">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase">
            Something went <span className="text-primary">wrong.</span>
          </h1>
          
          <p className="text-secondary text-lg mb-12">
            An unexpected error occurred in Sifiso's digital bridge. Don't worry, it's not your fault.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => reset()}
              className="h-16 px-10 rounded-2xl text-lg glow-red font-black uppercase tracking-widest flex items-center justify-center"
            >
              <RotateCcw className="mr-2 h-5 w-5" /> Try Again
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg border-border font-bold uppercase tracking-widest">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer subtle text */}
      <div className="py-8 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
        Error Log ID: {error.digest || "unknown_origin"}
      </div>
    </main>
  );
}
