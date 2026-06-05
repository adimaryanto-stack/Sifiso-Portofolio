"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@sifiso/ui/components/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  seeWorkText?: string;
  availableText?: string;
}

export function Hero({
  title,
  description,
  ctaText,
  seeWorkText,
  availableText
}: HeroProps = {}) {
  // Split a title like "Modern Design & Development Portfolio" into
  // first word + rest for styling: "MODERN" in white, rest in primary
  const titleWords = (title || "I Design Websites").split(" ");
  const firstWord = titleWords[0];
  const restWords = titleWords.slice(1).join(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6"
          >
            {availableText || "Available for Projects"}
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 uppercase tracking-tighter">
            {firstWord}
            {restWords && (
              <>
                {" "}
                <span className="text-primary italic">{restWords}</span>
              </>
            )}
          </h1>

          <p className="text-xl text-secondary mb-10 max-w-lg leading-relaxed">
            {description || (
              <>
                Staring at my monitor making sure my pages are{" "}
                <span className="text-foreground font-bold italic tracking-wide">AWESOME...</span>
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/#work">
              <Button className="h-14 px-10 text-lg glow-red">
                {ctaText || "See my work"}
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline" className="h-14 px-10 text-lg border-border hover:bg-surface">
                {seeWorkText || "Contact me"}
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex items-center gap-2 mt-16 text-secondary/50"
          >
            <ArrowDown size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* Hero Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-full aspect-square glass-card rounded-[3rem] p-12 flex items-center justify-center overflow-hidden border-primary/20">
             <img 
               src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2370&auto=format&fit=crop" 
               alt="Modern Web Design" 
               className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[12rem] font-black text-white/5 select-none tracking-tighter">SIFISO</span>
             </div>
          </div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass-card px-6 py-4 rounded-2xl shadow-2xl border-primary/30 z-20 backdrop-blur-xl"
          >
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Expertise</div>
             <div className="text-sm font-bold">NEXT.JS ARCHITECT</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass-card px-6 py-4 rounded-2xl shadow-2xl border-primary/30 z-20 backdrop-blur-xl"
          >
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Philosophy</div>
             <div className="text-sm font-bold">LESS IS AWESOME</div>
          </motion.div>
          
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border border-primary/10 rounded-full animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 border border-secondary/5 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
