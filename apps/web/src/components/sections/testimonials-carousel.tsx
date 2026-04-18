"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialProp {
  name: string;
  title: string;
  avatar?: string | null;
  content: string;
}

const fallbackTestimonials = [
  {
    name: "Jane Minoer",
    title: "Project Lead at CreativeCo",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2487&auto=format&fit=crop",
    content: "Sifiso's ability to translate complex requirements into elegant, high-performance web applications is truly exceptional. One of the best I've worked with.",
  },
  {
    name: "Seano Udstve",
    title: "Modern Management President",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2370&auto=format&fit=crop",
    content: "The 3D visualizations created for our product launch were stunning. It completely changed how our customers perceived the value of our offering.",
  },
];

export function TestimonialsCarousel({ data }: { data?: TestimonialProp[] }) {
  const displayData = data && data.length > 0 ? data : fallbackTestimonials;
  return (
    <section className="py-32 bg-background border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            CLIENT <span className="text-primary italic">FEEDBACK</span>
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Words from some of the people I've had the pleasure of working with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayData.map((item, index) => (
            <motion.div
              key={item.name + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all duration-700 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                 <span className="text-4xl font-black text-white/5 italic">"</span>
              </div>

              <div>
                <Quote className="w-12 h-12 text-primary/10 mb-8 group-hover:text-primary/40 transition-all duration-700" />
                <p className="text-xl leading-relaxed italic text-foreground/90 mb-10">
                   "{item.content}"
                </p>
              </div>
              
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary group-hover:scale-110 transition-transform duration-700">
                     <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </div>
                </div>
                <div>
                   <div className="font-black text-lg tracking-tight uppercase italic">{item.name}</div>
                   <div className="text-[10px] text-secondary uppercase tracking-[0.2em] font-black">{item.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
