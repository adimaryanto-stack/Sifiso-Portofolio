"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Code, Layers, Smartphone, ArrowRight, CheckCircle2, Box } from "lucide-react";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";
import Image from "next/image";

const iconMap: Record<string, any> = {
  Monitor: Monitor,
  Code: Code,
  Layers: Layers,
  Smartphone: Smartphone,
};

export function ServicesContent({ services, pricing }: { services: any[], pricing: any[] }) {
  const images = [
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2370&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2372&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2370&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2371&auto=format&fit=crop"
  ];

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

        <div className="grid grid-cols-1 gap-24 mb-32">
          {services.map((service, index) => {
            const Icon = service.iconName && iconMap[service.iconName] ? iconMap[service.iconName] : Box;
            return (
              <motion.div 
                 key={service.id}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/2">
                  <div className={`w-24 h-24 rounded-3xl bg-surface-elevated flex items-center justify-center mb-8 border border-border shadow-2xl text-primary`}>
                     <Icon size={48} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">{service.title}</h2>
                  <p className="text-xl text-secondary mb-10 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Dynamic features based on description if available, otherwise omitted for dynamic ones since we don't have a features array in schema. Or we can just skip it. */}
                  
                  <Link href={`/get-started?service=${service.id}`}>
                    <Button variant="outline" className="h-14 px-10 border-primary/30 hover:border-primary text-primary group">
                      Inquire Service
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="lg:w-1/2 w-full aspect-video rounded-3xl glass-card overflow-hidden border-border relative group">
                   <Image 
                     src={images[index % images.length]} 
                     alt={service.title} 
                     fill
                     sizes="(max-width: 1024px) 100vw, 50vw"
                     className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                      <Icon size={150} />
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Packages Section */}
        {pricing && pricing.length > 0 && (
          <div className="py-24 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                Transparent <span className="text-primary">Pricing</span>
              </h2>
              <p className="text-xl text-secondary leading-relaxed">
                Choose the package that best suits your project needs. No hidden fees, just clear and honest value.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-8 rounded-[2rem] border ${
                    pkg.isPopular ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(var(--primary),0.15)]" : "border-border bg-surface-elevated"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute top-0 right-8 -translate-y-1/2">
                      <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                        {pkg.badge}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-8">
                    <span className="text-4xl font-black text-primary tracking-tighter">{pkg.price}</span>
                  </div>

                  <ul className="space-y-4 mb-10 min-h-[200px]">
                    {(pkg.features || []).map((feature: string, fIndex: number) => (
                      <li key={fIndex} className="flex items-start text-secondary">
                        <CheckCircle2 className="text-primary w-5 h-5 mr-3 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/get-started?package=${pkg.id}`} className="block">
                    <Button className={`w-full h-14 text-sm font-bold tracking-widest uppercase ${
                      pkg.isPopular ? "glow-red" : "bg-surface hover:bg-surface-elevated text-foreground border border-border"
                    }`}>
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA */}
        <div className="mt-24 p-16 rounded-[3rem] bg-gradient-to-br from-surface to-black border border-primary/10 text-center relative overflow-hidden">
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
