"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Button } from "@sifiso/ui/components/button";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = () => {
    setEmail("admin@sifiso.pro");
    setPassword("SifisoAdmin2024!");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/admin",
    });

    if (error) {
      setError(error.message || "Invalid credentials");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-48 pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black italic tracking-tighter mb-4">
              ADMIN <span className="text-primary uppercase not-italic">Access</span>
            </h1>
            <p className="text-secondary">Enter your credentials to manage Sifiso's digital universe.</p>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] border-primary/10 backdrop-blur-2xl">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-xs mb-6 text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full bg-surface-elevated/50 border border-border rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white disabled:opacity-50"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary ml-1">Secret Key</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full bg-surface-elevated/50 border border-border rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary transition-all duration-300 focus:bg-black text-white disabled:opacity-50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-16 rounded-2xl text-lg glow-red font-black uppercase tracking-[0.2em] mt-4"
              >
                {isLoading ? "Validating..." : (
                  <>
                    Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              <div className="pt-4 border-t border-white/5 text-center">
                 <button 
                   type="button"
                   onClick={handleDemoLogin}
                   className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-colors py-2 px-4 bg-primary/10 rounded-full border border-primary/20"
                 >
                   ✨ Auto-fill Demo Credentials
                 </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="text-secondary hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
              ← Return to Public Site
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] -z-10" />
    </main>
  );
}
