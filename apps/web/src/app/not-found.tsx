"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Glitchy Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[40vw] font-black italic tracking-tighter">LOST</span>
      </div>

      <div className="relative z-10 text-center">
        <div className="relative inline-block mb-12">
          <motion.div
            animate={{ 
              textShadow: [
                "2px 0 #DC2626", 
                "-2px 0 #00ffff", 
                "2px 0 #DC2626"
              ],
              clipPath: [
                "inset(10% 0 30% 0)",
                "inset(80% 0 10% 0)",
                "inset(40% 0 50% 0)",
                "inset(0% 0 0% 0)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "mirror",
              ease: "linear"
            }}
            className="text-[12rem] md:text-[20rem] leading-none font-black italic text-white tracking-widest"
          >
            404
          </motion.div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-bounce">
             <AlertCircle size={24} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-tight italic">
          SIGNAL <span className="text-primary">INTERRUPTED.</span>
        </h1>
        
        <p className="text-secondary text-xl max-w-lg mx-auto mb-16 font-medium leading-relaxed">
          The page you are looking for has drifted beyond our digital horizon. Let's get you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/">
            <Button className="h-20 px-12 text-xl glow-red uppercase tracking-[0.2em] font-black group">
              <ArrowLeft className="mr-3 h-6 w-6 group-hover:-translate-x-2 transition-transform" />
              Return Home
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="outline" className="h-20 px-12 text-xl border-border hover:bg-surface uppercase tracking-[0.2em] font-black">
              Help Sifiso
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Decorative pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse" />
    </div>
  );
}
