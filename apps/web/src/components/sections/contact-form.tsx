"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@sifiso/ui/components/button";
import { Send, CheckCircle2 } from "lucide-react";
import { sendInquiry } from "@/lib/actions/inquiries";
import { v4 as uuidv4 } from "uuid";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      id: uuidv4(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      status: "new",
      isRead: false,
      createdAt: new Date(),
    };

    try {
      const result = await sendInquiry(data as any);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">
              Ready to <br />
              <span className="text-primary italic">Level Up?</span>
            </h2>
            <p className="text-xl text-secondary leading-relaxed mb-12 max-w-md">
              Have a project in mind? Or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas or original opportunities.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Direct Contact</div>
                <div className="flex flex-col space-y-4">
                  <a href="mailto:adimaryanto@gmail.com" className="text-2xl font-bold hover:text-primary transition-colors">adimaryanto@gmail.com</a>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors">WhatsApp: +62 812 3456 7890</a>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Socials</div>
                <div className="flex flex-wrap gap-4 text-sm font-black uppercase tracking-widest">
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">Dribbble</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">LinkedIn</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">Twitter</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl border-primary/10 shadow-2xl relative"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                <p className="text-secondary max-w-xs mx-auto mb-8">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Name</label>
                    <input 
                      name="name"
                      required
                      className="w-full bg-surface-elevated/50 border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-surface-elevated"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Email</label>
                    <input 
                      name="email"
                      type="email"
                      required
                      className="w-full bg-surface-elevated/50 border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-surface-elevated"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Subject</label>
                    <input 
                      name="subject"
                      required
                      className="w-full bg-surface-elevated/50 border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-surface-elevated"
                      placeholder="What's this about?"
                    />
                  </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-surface-elevated/50 border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-surface-elevated resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 py-4 text-lg glow-red uppercase tracking-widest font-black"
                >
                  {isSubmitting ? "Sending..." : (
                    <span className="flex items-center justify-center">
                      Send Message <Send className="ml-3 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
