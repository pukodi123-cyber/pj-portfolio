"use client";

import { motion, Variants } from "framer-motion";
import { Monitor, Coffee, Zap, Briefcase, PlaySquare, Rocket } from "lucide-react";

const services = [
  { title: "Website Design", description: "Modern, aesthetic designs tailored to your brand.", icon: Monitor },
  { title: "Restaurant / Cafe Websites", description: "Delicious layouts that attract food lovers.", icon: Coffee },
  { title: "Landing Pages", description: "High-conversion pages that turn clicks into clients.", icon: Zap },
  { title: "Portfolio Websites", description: "Showcase your work with an award-winning layout.", icon: Briefcase },
  { title: "Animated Websites", description: "Engaging 3D/2D animations that wow visitors.", icon: PlaySquare },
  { title: "Startup Websites", description: "Scalable websites built to launch your big idea.", icon: Rocket },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
            Services
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl border border-white/5 transition-all duration-300 hover:border-[#3cff7a] hover:shadow-[0_0_30px_rgba(60,255,122,0.15)] flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#3cff7a]/10 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#3c8cff] group-hover:text-[#3cff7a] transition-colors" />
                </div>
                <h3 className="text-xl font-bold font-poppins text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-inter text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
