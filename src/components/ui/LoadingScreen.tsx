"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // High-speed, high-end feel
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => onComplete(), 600);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
      >
        {/* Cinematic Glitch/Scanline Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />
        <div className="absolute top-0 left-0 w-full h-px bg-accent/20 animate-scanline z-0" />
        
        {/* Centered Large-Scale Minimalist Number */}
        <div className="relative z-10 font-poppins flex flex-col items-center">
            <motion.h2 
              className="text-[18vw] font-black italic tracking-tighter text-glow leading-none select-none"
              style={{
                 WebkitTextFillColor: "transparent",
                 WebkitTextStroke: "1px rgba(255,255,255,0.2)"
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {progress < 10 ? `0${progress}` : progress}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex flex-col items-center gap-1"
            >
              <div className="h-[2px] w-20 bg-accent animate-pulse shadow-[0_0_15px_rgba(60,255,122,0.8)]" />
              <div className="text-white/40 font-mono text-[10px] tracking-[0.6em] uppercase mt-2">
                Deploying Experience
              </div>
            </motion.div>
        </div>

        {/* Surgical-Thin Grid Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[20px_20px]" />

        {/* Bottom Detailed Loading List (Moncy-Style Premium Detail) */}
        <div className="absolute bottom-12 left-12 flex flex-col gap-1 text-[10px] font-mono text-white/30 tracking-widest uppercase">
            <div className={progress > 10 ? "text-accent transition-colors" : ""}>{"> COMPILING_SHADERS"}</div>
            <div className={progress > 40 ? "text-accent transition-colors" : ""}>{"> INIT_MOTION_ENGINE"}</div>
            <div className={progress > 70 ? "text-accent transition-colors" : ""}>{"> ALLOC_MEMORY"}</div>
            <div className={progress === 100 ? "text-accent transition-colors" : ""}>{"> SYSTEM_STABLE - READY"}</div>
        </div>

        {/* Global Minimalist Bar at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5">
          <motion.div
            className="h-full bg-linear-to-r from-accent to-secondary shadow-[0_-5px_20px_rgba(60,255,122,0.3)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        <style jsx global>{`
          @keyframes scanline {
            0% { top: -10%; }
            100% { top: 110%; }
          }
          .animate-scanline {
            animation: scanline 8s linear infinite;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
