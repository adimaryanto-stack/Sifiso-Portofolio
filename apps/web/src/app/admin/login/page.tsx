"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { logLoginAttempt } from "./actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sifiso.com");
  const [password, setPassword] = useState("sifiso2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/admin",
    });

    if (authError) {
      await logLoginAttempt(email, "failed");
      setError(authError.message ?? "Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      await logLoginAttempt(email, "success");
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black tracking-tight text-foreground">
            Sifiso
            <span className="text-primary">.</span>
          </span>
          <p className="text-secondary text-sm mt-2">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-secondary text-sm mb-6">
            Sign in to manage your portfolio content
          </p>

          <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
             <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Ready-To-Use Access</p>
             <p className="text-sm text-secondary">Email: <span className="text-foreground font-bold">admin@sifiso.pro</span></p>
             <p className="text-sm text-secondary">Pass: <span className="text-foreground font-bold">SifisoAdmin2024!</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sifiso.pro"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <svg
                  className="w-4 h-4 text-primary flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-primary">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full py-3 px-6 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:glow-red flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <button
              onClick={() => router.push("/admin")}
              className="text-xs font-bold uppercase tracking-widest text-[#4A90E2] border border-[#4A90E2]/30 bg-[#4A90E2]/5 px-6 py-3 rounded-full hover:bg-[#4A90E2]/10 transition-colors flex items-center justify-center gap-2 w-full"
            >
               <span>🚀 Bypass Login (Demo Mode)</span>
            </button>
          </div>
        </div>

        <p className="text-center text-secondary/50 text-xs mt-6">
          © {new Date().getFullYear()} Sifiso Portfolio. All rights reserved.
        </p>
      </div>
    </div>
  );
}
