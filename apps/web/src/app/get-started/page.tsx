"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Target, Shield, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@sifiso/ui/components/button";

const tiers = [
  {
    name: "Starter",
    price: "$1,500",
    description: "Perfect for single-page applications or simple portfolio designs.",
    features: ["Custom UI/UX Design", "Next.js Development", "Basic SEO Setup", "3 Revisions", "1 week support"],
    icon: Target,
    button: "Select Starter"
  },
  {
    name: "Professional",
    price: "$3,500",
    description: "Ideal for growing businesses that need a robust digital presence.",
    features: ["Up to 5 Pages", "Full Responsive Design", "Database Integration", "Basic 3D Elements", "SEO & Optimization", "1 Month Support"],
    icon: Zap,
    button: "Select Professional",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$6,500+",
    description: "Complex solutions for large-scale platforms and established brands.",
    features: ["Unlimited Pages", "Custom Dashboard", "Advanced 3D/Motion", "Full Multi-user Auth", "Priority Support", "Maintenance Plan"],
    icon: Shield,
    button: "Contact for Enterprise"
  }
];

import { sendInquiry } from "@/lib/actions/inquiries";

export default function GetStartedPage() {
  const [selectedTier, setSelectedTier] = useState<string>("Custom / Individual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      socialMedia: formData.get("socialMedia") as string,
      subject: (formData.get("projectType") as string) + " - " + (formData.get("package") as string),
      message: formData.get("message") as string,
      budgetRange: formData.get("budget") as string,
    };

    const result = await sendInquiry(data);
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Pricing & Quotation</span>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 italic">
             INVEST IN <br /> <span className="text-primary">AWESOMENESS.</span>
          </h1>
          <p className="text-secondary text-xl leading-relaxed">
             Transparent pricing for high-performance outcomes. Choose the package that fits your ambition.
          </p>
        </motion.div>

        {/* Dynamic Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[2.5rem] border ${
                tier.popular 
                  ? "bg-surface border-primary/40 shadow-2xl shadow-primary/10" 
                  : "bg-surface/50 border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-surface-elevated flex items-center justify-center text-primary border border-border mb-6`}>
                   <tier.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-secondary text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-10">
                 <div className="flex items-baseline">
                    <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                    <span className="text-secondary text-sm ml-2 uppercase tracking-widest">Base</span>
                 </div>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center space-x-3 text-sm text-secondary">
                    <Check className="text-primary h-4 w-4" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => handleSelectTier(tier.name)}
                className={`w-full h-14 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] ${
                  tier.popular ? "glow-red" : "bg-surface-elevated border-border"
              }`}>
                {tier.button}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Form */}
        <div ref={formRef} className="mt-32 max-w-4xl mx-auto scroll-mt-32">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6 italic uppercase">Not finding what you <span className="text-primary">need?</span></h2>
              <p className="text-secondary">Fill out this quick form and I'll get back to you with a custom quote within 24 hours.</p>
           </div>

            <div className="glass-card p-12 rounded-[3rem] border-primary/10">
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-2xl text-sm mb-8 animate-in fade-in duration-300">
                   {error}
                </div>
              )}
              {isSuccess ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="py-20 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 italic uppercase">Quote Request Sent!</h3>
                  <p className="text-secondary text-lg max-w-sm mx-auto mb-10">
                    Your request for the <span className="text-primary font-bold">{selectedTier} Package</span> has been sent and Sifiso will contact you via email or WhatsApp soon.
                  </p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>Send Another Request</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Selected Package</label>
                      <input type="hidden" name="package" value={selectedTier} />
                      <div className="flex items-center justify-between w-full bg-primary/10 border border-primary/30 rounded-2xl px-6 py-5 text-primary font-bold">
                         <span>{selectedTier} Package</span>
                         <Check size={16} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Project Type</label>
                      <select name="projectType" className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white appearance-none">
                        <option>Portfolio / Individual Website</option>
                        <option>Saas Platform</option>
                        <option>E-Commerce realization</option>
                        <option>3D Visualization Package</option>
                        <option>Full Branding Identity</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Estimated Budget Reach</label>
                      <select name="budget" className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white appearance-none">
                        <option>$1,500 - $3,000</option>
                        <option>$3,000 - $6,000</option>
                        <option>$6,000 - $10,000</option>
                        <option>$10,000+</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Preferred Timeline</label>
                      <select name="timeline" className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white appearance-none">
                        <option>ASAP (Rush)</option>
                        <option>1 - 2 Months</option>
                        <option>3 - 4 Months</option>
                        <option>Not decided</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Details Section */}
                  <div className="pt-8 border-t border-border">
                    <p className="text-secondary text-xs uppercase font-black tracking-widest mb-8">Personal Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Your Full Name</label>
                        <input 
                          name="name"
                          required
                          className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Your Email</label>
                        <input 
                          name="email"
                          type="email"
                          required
                          className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">WhatsApp Number</label>
                        <input 
                          name="phoneNumber"
                          type="tel"
                          required
                          className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white"
                          placeholder="+62 8..."
                        />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Social Media (Optional)</label>
                         <input 
                           name="socialMedia"
                           className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white"
                           placeholder="LinkedIn / Dribbble URL"
                         />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Your Vision & Scope</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-surface-elevated/50 border border-border rounded-[2rem] px-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white resize-none"
                      placeholder="Briefly describe what you're looking to build..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-20 px-12 rounded-[2rem] text-xl glow-red w-full font-black uppercase tracking-[0.2em]"
                  >
                    {isSubmitting ? "Processing..." : (
                      <span className="flex items-center">
                        Get My Quote <ArrowRight className="ml-3 h-6 w-6" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
           </div>
        </div>
      </div>
    </main>
  );
}
