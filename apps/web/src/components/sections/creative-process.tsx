"use client";

import React from "react";
import { motion } from "framer-motion";

export function CreativeProcess({ steps }: { steps: any[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Process</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            How we transform an abstract idea into a stunning digital experience.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:hidden"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } flex-row`}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="w-1/2 hidden md:block"></div>

                  {/* Node icon */}
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold text-lg z-10 -translate-x-1/2 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                    {step.stepNumber}
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}>
                    <div className="glass-card p-8 rounded-[2rem] hover:border-primary/30 transition-colors group">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      {step.subtitle && (
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary/80 mb-4">
                          {step.subtitle}
                        </h4>
                      )}
                      <p className="text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
