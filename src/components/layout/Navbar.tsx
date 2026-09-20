"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Join Us", href: "/join" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show public navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center px-4 pt-4 transition-all duration-300 pointer-events-none">
      <header 
        className={`pointer-events-auto transition-all duration-500 w-full ${
          scrolled 
            ? "max-w-4xl glassmorphism-strong rounded-full border border-glass-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2" 
            : "max-w-7xl glassmorphism rounded-2xl border border-transparent py-4"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 text-neon-cyan hover:text-white transition-colors duration-300">
              <Image src="/logo.png" alt="Coder Hub Logo" width={40} height={40} className="h-10 w-auto rounded-md object-contain" />
              <span className="font-mono font-bold text-xl tracking-tight hidden sm:block text-glow">Coder Hub</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium font-mono transition-all duration-300 ${
                      isActive 
                        ? "text-neon-cyan text-glow" 
                        : "text-slate-300 hover:text-white hover:text-glow"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glassmorphism border-t border-glass-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium font-mono ${
                      isActive 
                        ? "text-neon-cyan bg-white/5" 
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </div>
  );
}
