"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Monitor, Code, Layers, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";

const services = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive, aesthetic, and user-centric interfaces that convert and delight.",
    icon: Monitor,
    color: "text-blue-500",
    slug: "ui-ux-design",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    title: "Web Development",
    description: "Building fast, scalable, and responsive web applications using modern technologies.",
    icon: Code,
    color: "text-red-500",
    slug: "web-development",
    features: ["Frontend (React/Next.js)", "Backend (Node.js)", "Performance SEO", "CMS Integration"]
  },
  {
    title: "3D Visualization",
    description: "Bringing your products to life with stunning 3D renders and interactive visualizations.",
    icon: Layers,
    color: "text-purple-500",
    slug: "3d-visualization",
    features: ["Product Modeling", "Architectural Renders", "Motion Graphics", "AR Experiences"]
  },
  {
    title: "Branding & Identity",
    description: "Defining your brand's voice and visual language to stand out in a crowded market.",
    icon: Smartphone,
    color: "text-green-500",
    slug: "branding-identity",
    features: ["Logo Design", "Brand Guidelines", "Visual Strategy", "Social Media Kits"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 pt-32 pb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-3xl mb-24 px-4"
        >
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 leading-none">
            SOLUTIONS FOR THE <span className="text-primary italic">DIGITAL AGE.</span>
          </h1>
          <p className="text-secondary text-2xl leading-relaxed">
            I offer a wide range of creative and technical services designed to push boundaries and exceed expectations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-24">
          {services.map((service, index) => (
            <motion.div 
               key={service.slug}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2">
                <div className={`w-24 h-24 rounded-3xl bg-surface-elevated flex items-center justify-center mb-8 border border-border shadow-2xl ${service.color}`}>
                   <service.icon size={48} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">{service.title}</h2>
                <p className="text-xl text-secondary mb-10 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="grid grid-cols-2 gap-4 mb-10">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center space-x-3 text-secondary">
                      <CheckCircle2 className="text-primary h-5 w-5" />
                      <span className="font-bold text-sm tracking-wide">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/services/${service.slug}`}>
                  <Button variant="outline" className="h-14 px-10 border-primary/30 hover:border-primary text-primary group">
                    Explore Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="lg:w-1/2 w-full aspect-video rounded-3xl glass-card overflow-hidden border-border relative group">
                 <img 
                   src={index === 0 ? "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2370&auto=format&fit=crop" :
                        index === 1 ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2372&auto=format&fit=crop" :
                        index === 2 ? "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2370&auto=format&fit=crop" :
                        "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2371&auto=format&fit=crop"} 
                   alt={service.title} 
                   className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <service.icon size={150} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-32 p-16 rounded-[3rem] bg-gradient-to-br from-surface to-black border border-primary/10 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-10 italic uppercase">Need a custom <span className="text-primary">solution?</span></h2>
              <Link href="/get-started">
                <Button className="h-20 px-16 text-xl glow-red uppercase tracking-[0.2em] font-black">
                  Start Your Project
                </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
