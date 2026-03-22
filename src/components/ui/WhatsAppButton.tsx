"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919381722155?text=Hi%20PJ,%20I'm%20interested%20in%20building%20a%20website!"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.5, delay: 2 }}
      className="fixed bottom-8 right-8 z-100 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer group"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      <MessageCircle className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-white/10">
        Chat with me instantly
      </span>
    </motion.a>
  );
}
