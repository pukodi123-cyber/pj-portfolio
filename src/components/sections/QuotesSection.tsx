"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function QuotesSection() {
  const quotes = [
    "Your website is the digital face of your business.",
    "A great website doesn’t just look good — it sells.",
    "In today's world, if your business is not online, it is invisible.",
    "First impressions online happen in 3 seconds.",
  ];

  return (
    <section className="relative w-full py-24 bg-[#0f0f0f] overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {quotes.map((quote, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            className="flex flex-col relative"
          >
            <div className="glass p-10 rounded-3xl border border-white/10 hover:border-[#3c8cff]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(60,140,255,0.15)] flex flex-col h-full bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
              {/* Subtle edge highlight */}
              <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-[#3c8cff]/50 to-transparent group-hover:via-[#3c8cff] transition-all duration-500" />
              
              <Quote className="text-[#3c8cff]/40 w-10 h-10 mb-4 group-hover:text-[#3c8cff]" />
              <p className="font-playfair text-2xl text-white/90 leading-relaxed italic relative z-10 group-hover:text-white transition-colors">
                &quot;{quote}&quot;
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
