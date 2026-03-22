"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 bg-[#0f0f0f] flex items-center justify-center">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass p-12 md:p-20 rounded-[40px] border border-white/5 relative overflow-hidden group hover:border-[#3cff7a]/20 transition-all duration-500 soft-shadow"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[5px] bg-gradient-to-r from-transparent via-[#3cff7a] to-transparent opacity-50 group-hover:opacity-100 group-hover:w-[300px] transition-all duration-700" />

          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-8 group-hover:text-glow transition-all">
            Who Am I?
          </h2>
          <p className="text-xl md:text-3xl font-inter text-white/80 leading-relaxed font-light">
            I’m Popuri Jayesh, a second-year Computer Science Engineering student who loves designing modern websites that help businesses grow online.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
