"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Code, Layers } from "lucide-react";
import Link from "next/link";

import * as Icons from "lucide-react";

interface ServiceProp {
  title: string;
  description: string;
  iconName?: string | null;
  slug?: string;
  color?: string;
}

const fallbackServices = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive, aesthetic, and user-centric interfaces that convert and delight.",
    iconName: "Monitor",
    color: "from-blue-500/20 to-transparent",
    slug: "ui-ux-design"
  },
  {
    title: "Web Development",
    description: "Building fast, scalable, and responsive web applications using modern technologies.",
    iconName: "Code",
    color: "from-red-500/20 to-transparent",
    slug: "web-development"
  },
];

export function ServicesGrid({ data }: { data?: ServiceProp[] }) {
  const displayServices = data && data.length > 0 ? data : fallbackServices;
  return (
    <section id="services" className="py-32 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            WHAT I CAN <span className="text-primary italic font-serif">DO</span>
          </h2>
          <p className="text-secondary text-lg">
            I offer a wide range of creative and technical services to help your business achieve its digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayServices.map((service, index) => {
            const Icon = (Icons as any)[service.iconName || "Monitor"] || Icons.Monitor;
            return (
              <motion.div
                key={service.title + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-12 rounded-[3rem] bg-surface border border-border hover:border-primary/50 transition-all duration-700 overflow-hidden"
              >
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] pointer-events-none`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                     <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700 border border-border">
                       <Icon className="w-8 h-8 text-primary" />
                     </div>
                     <span className="text-5xl font-black text-white/5 group-hover:text-primary/10 transition-colors duration-700 italic">0{index + 1}</span>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 group-hover:text-primary transition-colors italic uppercase tracking-tighter">{service.title}</h3>
                  <p className="text-secondary leading-relaxed text-lg mb-10 max-w-md">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-black tracking-[0.3em] text-primary uppercase group/link"
                  >
                    LEARN MORE
                    <div className="ml-4 w-12 h-px bg-primary/30 group-hover/link:w-20 group-hover/link:bg-primary transition-all duration-500" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
