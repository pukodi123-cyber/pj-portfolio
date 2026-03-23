"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919381722155?text=Hi%20PJ,%20I'm%20interested%20in%20building%20a%20website!"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0, x: 50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.5, delay: 2.5 }}
      className="fixed bottom-10 right-10 z-[100] w-20 h-20 glass rounded-[24px] flex items-center justify-center border border-white/10 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition-all duration-500 shadow-2xl group cursor-pointer group hover:shadow-[0_0_50px_rgba(37,211,102,0.3)] backdrop-blur-3xl bg-black/40"
    >
      <div className="absolute inset-0 rounded-[24px] bg-[#25D366] animate-pulse opacity-5 group-hover:opacity-15 pointer-events-none transition-opacity" />
      <MessageCircle className="text-[#25D366] w-10 h-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(37,211,102,0.5)]" />
      
      {/* Tooltip */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 px-6 py-3 bg-black/80 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#25D366] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden lg:block border border-[#25D366]/20 shadow-2xl translate-x-10 group-hover:translate-x-0">
        Chat Offline? <span className="text-white ml-2">Click Here</span>
      </div>
    </motion.a>
  );
}
