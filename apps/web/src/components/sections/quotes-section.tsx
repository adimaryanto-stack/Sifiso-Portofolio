"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function QuotesSection({ quotes }: { quotes: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!quotes || quotes.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000); // rotate every 8 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  if (!quotes || quotes.length === 0) return null;

  return (
    <section className="py-24 bg-surface-elevated overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="absolute top-0 left-0 text-[10rem] font-serif text-primary/10 leading-none -translate-x-1/2 -translate-y-1/4 select-none pointer-events-none">
          &ldquo;
        </div>
        
        <div className="min-h-[200px] flex items-center justify-center text-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-4xl font-serif italic text-foreground leading-relaxed">
                &ldquo;{quotes[currentIndex].content}&rdquo;
              </h3>
              <p className="text-sm font-black uppercase tracking-widest text-primary">
                — {quotes[currentIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {quotes.length > 1 && (
          <div className="flex justify-center mt-12 space-x-3">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-secondary"
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
