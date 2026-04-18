"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";
import { Project } from "@/lib/db/schema";

export function WorkGalleryInteractive({ initialProjects }: { initialProjects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = initialProjects.filter(p => {
    const matchesFilter = filter === "All" || (p.category && p.category.includes(filter)) || (filter === "App Design" && p.category?.includes("App"));
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categories = ["All", "UI/UX Design", "Web Development", "Branding", "App Design", "3D Visualization"];

  return (
    <>
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 lg:mb-0"
        >
          <h1 className="text-5xl md:text-[8rem] font-black mb-6 italic tracking-tighter uppercase leading-[0.8] mix-blend-difference">
            THE <br />
            <span className="text-primary italic">GALLERY</span>
          </h1>
          <p className="text-secondary text-xl max-w-xl">
            From early concepts to high-performance deployments. Explore the full catalog of Sifiso's digital endeavors.
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-elevated/50 border border-border rounded-2xl py-6 pl-14 pr-6 focus:outline-none focus:border-primary transition-all text-sm font-bold uppercase tracking-widest"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Filters */}
      <section className="flex flex-wrap gap-4 mb-24 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 border ${
              filter === cat 
                ? "bg-primary border-primary shadow-2xl shadow-primary/40 glow-red text-white" 
                : "border-white/5 hover:border-primary/50 text-secondary bg-surface/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Status Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-32 bg-surface-elevated/20 rounded-[3rem] border border-dashed border-border">
           <h2 className="text-3xl font-bold text-secondary mb-8 italic uppercase tracking-tighter">No masterpieces found here.</h2>
           <Button variant="outline" onClick={() => {setFilter("All"); setSearchQuery("");}} className="h-16 px-12 rounded-full font-black uppercase tracking-widest text-xs">Reset All Filters</Button>
        </div>
      )}

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] bg-surface-elevated border border-border group-hover:border-primary/30 transition-colors">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Status Tag */}
                  <div className="absolute top-8 left-8 px-4 py-2 rounded-full text-[9px] font-black tracking-[0.2em] uppercase flex items-center shadow-2xl backdrop-blur-md bg-black/60 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                    Live Project
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 text-white">
                    <div className="flex flex-col items-center">
                       <span className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl">
                         Study Details
                       </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col px-4">
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3">{project.category || "Case Study"}</span>
                  <h3 className="text-3xl font-black group-hover:text-primary transition-colors italic uppercase tracking-tighter leading-none italic">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </>
  );
}
