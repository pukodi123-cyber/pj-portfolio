"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import QuotesSection from "@/components/sections/QuotesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Cinematic smooth scroll using Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      
      <motion.div
        className={`flex flex-col min-h-screen bg-primary selection:bg-[#3cff7a] selection:text-black transition-all duration-1000 ${loading ? 'blur-xl opacity-40 pointer-events-none overflow-hidden h-screen' : 'blur-none opacity-100 pointer-events-auto h-auto'}`}
      >
        <Navbar />
        <WhatsAppButton />
        <CustomCursor />
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <QuotesSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        
        <footer className="py-8 bg-black text-center text-gray-400 border-t border-white/5">
          <p className="font-inter">
            © {new Date().getFullYear()} Popuri Jayesh. All rights reserved.
          </p>
          <div className="flex gap-4 justify-center mt-4">
             <a href="https://www.instagram.com/jayeeshhh__" target="_blank" rel="noreferrer" className="hover:text-[#3cff7a] transition-colors">
                Instagram
             </a>
             <a href="mailto:popurijayesh0@gmail.com" className="hover:text-[#3cff7a] transition-colors">
                Email
             </a>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
