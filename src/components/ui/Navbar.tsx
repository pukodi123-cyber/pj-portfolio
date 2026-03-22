"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* DP Format Photo */}
        <div className="w-12 h-12 rounded-full border-2 border-accent overflow-hidden relative group">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img 
            src="/pj-dp.jpg" 
            alt="PJ" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div>
          <h1 className="text-xl font-poppins font-bold text-white tracking-widest uppercase">PJ</h1>
          <div className="h-0.5 w-full bg-accent mt-0.5 rounded-full" />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-inter text-white/70 hover:text-accent transition-colors tracking-widest uppercase"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="md:hidden">
         {/* Simple dot or small indicator if needed, or keeping it minimal */}
         <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </div>
    </motion.nav>
  );
}
