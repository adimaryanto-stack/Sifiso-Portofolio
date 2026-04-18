"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/db/schema";

export function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-[2000ms]"
        style={{ backgroundImage: `url(${project.heroImageUrl || project.thumbnailUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-20 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5 }}
        >
          <Link href="/work" className="inline-flex items-center text-secondary hover:text-white transition-colors mb-12 group text-xs font-black tracking-[0.3em] uppercase">
            <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-2 transition-transform" />
            Back to Creations
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-6">
             <div className="w-12 h-px bg-primary" />
             <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">{project.category || "Project Detail"}</span>
          </div>
          <h1 className="text-5xl md:text-[10rem] font-black italic tracking-tighter leading-[0.85] uppercase mb-4">
            {project.title}
          </h1>
        </motion.div>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-[25%] hidden lg:block" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-[50%] hidden lg:block" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-[75%] hidden lg:block" />
    </div>
  );
}
