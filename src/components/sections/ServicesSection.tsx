"use client";

import { motion } from "framer-motion";
import { 
  Monitor, 
  Briefcase, 
  Coffee, 
  Zap, 
  Layout, 
  PlaySquare 
} from "lucide-react";

const services = [
  { 
    title: "Website Design", 
    description: "Modern, aesthetic designs tailored to your brand identity.", 
    icon: Monitor,
    color: "#3cff7a"
  },
  { 
    title: "Business Websites", 
    description: "Professional, scalable digital solutions for growing businesses.", 
    icon: Briefcase,
    color: "#3c8cff"
  },
  { 
    title: "Restaurant & Cafe Websites", 
    description: "Delicious layouts that attract food lovers and simplify bookings.", 
    icon: Coffee,
    color: "#facc15"
  },
  { 
    title: "Landing Pages", 
    description: "High-conversion single-page experiences for maximum impact.", 
    icon: Zap,
    color: "#ef4444"
  },
  { 
    title: "Portfolio Websites", 
    description: "Showcase your work with award-winning layout designs.", 
    icon: Layout,
    color: "#a855f7"
  },
  { 
    title: "Animated Websites", 
    description: "Engaging 3D/2D animations that leave a lasting impression.", 
    icon: PlaySquare,
    color: "#ec4899"
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-40 bg-[#0a0a0a] overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#3cff7a 0.5px, transparent 0.5px)", backgroundSize: "30px 30px" }} 
        />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-glow text-accent uppercase font-bold tracking-[0.3em] mb-4 text-sm"
            >
                My Expertise
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-poppins font-black text-white leading-tight"
            >
                Digital <span className="text-white/40">Solutions</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                    y: -15, 
                    boxShadow: `0 20px 80px -20px ${service.color}33`,
                    borderColor: service.color
                }}
                className="group relative glass p-10 rounded-[32px] border border-white/5 transition-all duration-500 overflow-hidden"
              >
                {/* Neon Accent Glow */}
                <div 
                    className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: service.color }}
                />

                <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-transparent transition-all duration-500"
                    style={{ color: service.color }}
                >
                  <Icon className="w-10 h-10 transition-transform group-hover:scale-110" />
                </div>

                <h3 className="text-2xl font-bold font-poppins text-white mb-4 group-hover:text-glow transition-all">
                  {service.title}
                </h3>
                
                <p className="text-white/50 font-inter text-lg leading-relaxed">
                  {service.description}
                </p>
                
                {/* Detail Bar */}
                <div 
                    className="h-[2px] w-0 group-hover:w-full transition-all duration-700 mt-8 rounded-full"
                    style={{ backgroundColor: service.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
