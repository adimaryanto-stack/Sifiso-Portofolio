"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap, BarChart, Shield, Cpu, Monitor, Code, Layers, Smartphone } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@sifiso/ui/components/button";

const servicesDetails = {
  "ui-ux-design": {
    title: "UI/UX Design",
    longDesc: "Elevate your digital product with user-centric design that balances aesthetics and functionality. My UI/UX process is focused on creating interfaces that users love to interact with.",
    process: ["Empathize & Research", "Information Architecture", "Visual Interface Design", "Interactive Prototyping"],
    benefits: ["Higher conversion rates", "Reduced user churn", "Strong brand recognition", "Seamless user journeys"],
    icon: Monitor,
    color: "text-blue-500"
  },
  "web-development": {
    title: "Web Development",
    longDesc: "Transforming vision into reality with high-performance, scalable web applications. I focus on clean code, lighting-fast load times, and flawless performance across all devices.",
    process: ["Tech Stack Selection", "Architecture Design", "Responsive Frontend Dev", "API & Database Integration"],
    benefits: ["Blazing fast speeds", "SEO optimization native", "Scalable architecture", "Mobile-first experience"],
    icon: Code,
    color: "text-red-500"
  },
  "3d-visualization": {
    title: "3D Visualization",
    longDesc: "Bring depth and realism to your ideas with professional 3D rendering and motion. Perfect for product launches, architectural previews, or immersive digital assets.",
    process: ["Modeling & Texturing", "Lighting Studio Setup", "Animation & Motion", "Post-Processing Render"],
    benefits: ["Stunning photorealistic visuals", "Dynamic product showcases", "Enhanced user engagement", "Competitive market edge"],
    icon: Layers,
    color: "text-purple-500"
  },
  "branding-identity": {
    title: "Branding & Identity",
    longDesc: "Defining who you are and how you communicate. I craft unique brand identities that resonate with your target audience and stand the test of time in a digital-first world.",
    process: ["Brand Discovery", "Logo & Visual Identity", "Typography & Color", "Brand Guidelines"],
    benefits: ["Clear brand positioning", "Consistent visual language", "Professional market presence", "Strong emotional connection"],
    icon: Smartphone,
    color: "text-green-500"
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "ui-ux-design";
  
  const detail = servicesDetails[slug as keyof typeof servicesDetails] || servicesDetails["ui-ux-design"];
  const Icon = detail.icon;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <Link href="/services" className="inline-flex items-center text-secondary hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
                <div className={`w-20 h-20 rounded-2xl bg-surface-elevated flex items-center justify-center mb-8 border border-border shadow-2xl ${detail.color}`}>
                   <Icon size={40} />
                </div>
                <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-12 leading-none uppercase">
                  {detail.title.split(' ')[0]} <br />
                  <span className="text-primary">{detail.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                
                <div className="max-w-4xl text-2xl text-secondary leading-relaxed mb-16">
                   {detail.longDesc}
                </div>
             </motion.div>
          </div>

          <div className="lg:col-span-7">
             <h2 className="text-3xl font-black mb-8 italic uppercase tracking-widest border-l-4 border-primary pl-6">The Process</h2>
             <div className="space-y-6">
                {detail.process.map((step, i) => (
                  <div key={i} className="flex items-center space-x-6 p-8 rounded-3xl bg-surface-elevated/30 border border-border group hover:border-primary/50 transition-colors">
                    <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">0{i + 1}</div>
                    <div className="text-xl font-bold">{step}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="lg:col-span-5">
             <div className="glass-card p-10 rounded-[2.5rem] border-primary/10 backdrop-blur-xl">
                <h2 className="text-2xl font-black mb-8 uppercase tracking-widest">Key Benefits</h2>
                <div className="space-y-6">
                   {detail.benefits.map((benefit, i) => (
                     <div key={i} className="flex items-start space-x-4">
                        <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={20} />
                        <div className="text-lg text-secondary font-medium">{benefit}</div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 pt-10 border-t border-border">
                  <Link href="/get-started">
                    <Button className="w-full h-16 text-lg glow-red font-black uppercase tracking-widest">
                       Book This Service
                    </Button>
                  </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
