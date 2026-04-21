import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-secondary text-sm">
        <div className="text-center md:text-left">
          <span className="text-xl font-black text-white tracking-tighter">
            Sifiso<span className="text-primary">...</span>
          </span>
          <p className="mt-2 text-muted-foreground max-w-xs">
            Designing digital dreams into high-performance realities.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 font-bold tracking-widest text-xs uppercase mb-4">
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Dribbble</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            <a href="mailto:adimaryanto@gmail.com" className="hover:text-primary transition-colors">Email</a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">WhatsApp</a>
            <Link href="/login" className="hover:text-primary transition-colors border-l border-border pl-8">Admin Login</Link>
          </div>
          <p className="text-muted-foreground">© {new Date().getFullYear()} Sifiso Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
