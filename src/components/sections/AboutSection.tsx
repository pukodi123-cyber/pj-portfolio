"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: <Code2 className="w-8 h-8" />, title: "Modern Tech", desc: "Next.js & TypeScript" },
    { icon: <Palette className="w-8 h-8" />, title: "UHD Design", desc: "Visual Experiences" },
    { icon: <Zap className="w-8 h-8" />, title: "Performance", desc: "Fast & Responsive" },
  ];

  return (
    <section id="about" className="relative w-full py-40 bg-[#050505] overflow-hidden">
      {/* Cinematic Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Interactive Bio */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-glow text-accent uppercase font-bold tracking-[0.4em] mb-6 inline-block border-l-2 border-accent pl-4"
                >
                    The Developer
                </motion.div>
                
                <h2 className="text-5xl md:text-7xl font-poppins font-black text-white mb-8 leading-[1.1] tracking-tighter">
                   I Forge Digital <br /> <span className="text-secondary italic">Realities</span>
                </h2>
                
                <p className="text-xl md:text-2xl font-inter text-white/70 leading-relaxed mb-10 font-light max-w-xl">
                   I&apos;m <span className="text-white font-semibold">Popuri Jayesh</span>, a Computer Science Engineering student passionate about building visually stunning and high-performance websites.
                </p>
                
                <p className="text-lg md:text-xl font-inter text-white/50 leading-relaxed mb-12 font-light max-w-xl">
                   I focus on combining modern design, smooth animations, and powerful functionality to create digital experiences that help businesses stand out online.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 + 0.5 }}
                            className="p-6 rounded-[24px] bg-white/5 border border-white/10 hover:border-accent/40 transition-colors group"
                        >
                            <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <h4 className="text-white font-bold mb-1">{stat.title}</h4>
                            <p className="text-white/40 text-sm">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Right: Modern 3D/Visual Representation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative hidden lg:block"
            >
                <div className="aspect-square relative flex items-center justify-center">
                    {/* Abstract rotating circles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-full h-full border border-white/5 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[80%] h-[80%] border-2 border-accent/20 border-dashed rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[60%] h-[60%] border border-secondary/20 rounded-full"
                    />
                    
                    {/* Glowing Core */}
                    <div className="w-[40%] h-[40%] bg-accent/20 rounded-full blur-[60px] animate-pulse" />
                    <div className="w-40 h-40 glass rounded-3xl flex items-center justify-center rotate-12 group hover:rotate-0 transition-all duration-700 bg-black/40 border-accent/40 border-2 shadow-[0_0_50px_rgba(60,255,122,0.2)]">
                        <span className="text-5xl font-black text-accent drop-shadow-[0_0_10px_rgba(60,255,122,0.5)]">PJ</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
