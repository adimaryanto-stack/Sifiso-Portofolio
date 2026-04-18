"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@sifiso/ui/components/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutPreview() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 aspect-square rounded-2xl overflow-hidden glass-card p-2">
              <div 
                className="w-full h-full rounded-xl bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop')" }}
              />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-2xl shadow-2xl z-20 border-primary/20">
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-black text-primary">5+</div>
                  <div className="text-xs text-secondary uppercase tracking-widest mt-1">Years Exp.</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">120+</div>
                  <div className="text-xs text-secondary uppercase tracking-widest mt-1">Completed</div>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase italic">
              Who Is <span className="text-primary italic">Sifiso?</span>
            </h2>
            <p className="text-xl text-secondary leading-relaxed mb-6">
              I am a multidisciplinary designer and developer based in the digital world. I specialize in crafting 
              <span className="text-foreground font-bold"> high-performance digital experiences</span> that bridge the gap between design and technology.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
               <div className="space-y-2">
                  <div className="text-primary font-black text-xs uppercase tracking-widest flex items-center">
                    <span className="w-8 h-px bg-primary/30 mr-3"></span>
                    01. Precision
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">Every pixel serves a purpose. No clutter, just high-impact digital solutions.</p>
               </div>
               <div className="space-y-2">
                  <div className="text-primary font-black text-xs uppercase tracking-widest flex items-center">
                    <span className="w-8 h-px bg-primary/30 mr-3"></span>
                    02. Soul
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">I don't just write code; I build personalities. Websites that feel alive and responsive.</p>
               </div>
               <div className="space-y-2">
                  <div className="text-primary font-black text-xs uppercase tracking-widest flex items-center">
                    <span className="w-8 h-px bg-primary/30 mr-3"></span>
                    03. Speed
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">Built for the modern web. Optimized for performance and instant interaction.</p>
               </div>
               <div className="space-y-2">
                  <div className="text-primary font-black text-xs uppercase tracking-widest flex items-center">
                    <span className="w-8 h-px bg-primary/30 mr-3"></span>
                    04. Vision
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">Forward-thinking architecture that scales with your ambition and growth.</p>
               </div>
            </div>

            <Link href="/about">
              <Button variant="outline" className="h-16 px-10 border-primary/30 hover:border-primary text-primary group rounded-2xl glow-red-hover">
                Dive deeper into my story
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
