"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Code, Palette, Box, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@sifiso/ui/components/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-12 group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden glass-card p-2 mb-12"
            >
              <div 
                className="w-full h-full rounded-2xl bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop')" }}
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-4xl font-black text-primary mb-2">5+</div>
                <div className="text-xs uppercase tracking-widest text-secondary">Years in Design</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-4xl font-black text-primary mb-2">120+</div>
                <div className="text-xs uppercase tracking-widest text-secondary">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Skills */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter">
                CREATING <span className="text-primary italic">AWESOME</span> <br />
                THINGS SINCE 2018.
              </h1>
              
              <div className="prose prose-invert prose-lg max-w-none text-secondary">
                <p>
                  Hello, I'm Sifiso. I'm a multidisciplinary designer and developer who is passionate about creating digital experiences that leave an impact. My journey started with a simple curiosity for how things work on the internet, which quickly evolved into a dedicated career in UI/UX Design and Web Development.
                </p>
                <p>
                  I believe that good design is invisible, but great design is felt. My goal is to bridge the gap between complex technology and human intuition. Every project I take on is a new puzzle, and I pride myself on finding the most aesthetic and efficient solution possible.
                </p>
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest border-l-4 border-primary pl-6">The Workflow</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { icon: Palette, title: "Design Strategy", desc: "Crafting visual languages that communicate your brand values." },
                    { icon: Code, title: "Modern Code", desc: "Building scalable and maintainable applications with the latest tech." },
                    { icon: Box, title: "3D Visualization", desc: "Adding depth and dimension to digital products." },
                    { icon: Rocket, title: "Optimization", desc: "Ensuring lighting fast performance and accessibility." }
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-4 p-4 rounded-2xl hover:bg-surface-elevated/50 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center text-primary border border-border">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                 <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest border-l-4 border-primary pl-6">Technical Arsenal</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 bg-surface-elevated/20 p-8 rounded-[2rem] border border-border">
                    {[
                      { name: "NEXT.JS / REACT", level: "95%" },
                      { name: "TYPESCRIPT / JS", level: "90%" },
                      { name: "FIGMA / UI DESIGN", level: "98%" },
                      { name: "BLENDER / 3D", level: "85%" },
                      { name: "POSTGRES / DB", level: "88%" },
                      { name: "TAILWIND / CSS", level: "95%" },
                    ].map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                           <span>{skill.name}</span>
                           <span className="text-primary">{skill.level}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: skill.level }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className="h-full bg-primary"
                           />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="mt-16 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/get-started">
                  <Button className="h-16 px-10 text-lg glow-red uppercase tracking-widest font-black">
                    Let's Collaborate
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button variant="outline" className="h-16 px-10 text-lg border-border hover:bg-surface uppercase tracking-widest font-bold">
                    Send me a message
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
