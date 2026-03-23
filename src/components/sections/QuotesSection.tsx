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
    <section className="relative w-full py-40 bg-[#050505] overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {quotes.map((quote, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="glass p-12 md:p-16 rounded-[48px] border border-white/5 group-hover:border-secondary/30 transition-all duration-700 bg-black/40 backdrop-blur-3xl h-full flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Visual Accent */}
                <div 
                    className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 blur-[60px] group-hover:bg-secondary/20 transition-all duration-700 rounded-full"
                />

                <div className="relative z-10">
                    <Quote className="text-secondary/30 w-16 h-16 mb-8 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    <p className="text-3xl md:text-4xl font-poppins font-black text-white/90 leading-tight tracking-tighter">
                        &quot;{quote}&quot;
                    </p>
                </div>
                
                {/* Bottom Decorative Line */}
                <div className="w-20 h-1 bg-secondary/20 rounded-full mt-10 group-hover:w-full group-hover:bg-secondary/60 transition-all duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
