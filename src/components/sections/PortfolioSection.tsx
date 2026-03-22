"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

export default function PortfolioSection() {
  const projects = [
    {
      title: "Green Cafe Website",
      description: "A visually stunning aesthetic cafe website built with modern UI principles.",
      link: "https://pukodi123-cyber.github.io/green-",
      color: "from-emerald-500 to-green-900",
    },
    {
      title: "Green Caffeine Cafe",
      description: "Premium animated coffee shop experience with 3D interactions.",
      link: "https://green-caffeine-cafe.vercel.app",
      color: "from-[#3cff7a] to-emerald-800",
    },
  ];

  return (
    <section id="portfolio" className="relative w-full py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-[#3c8cff] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                rotateX: -2,
                z: 50
              }}
              transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                rotateY: { type: "spring", stiffness: 300, damping: 20 },
                rotateX: { type: "spring", stiffness: 300, damping: 20 },
                duration: 0.5
              }}
              className="project-card group perspective-1000 relative"
            >
              <div className="glass rounded-[32px] overflow-hidden border border-white/10 group-hover:border-accent/60 transition-all duration-500 hover:shadow-[0_0_80px_rgba(60,255,122,0.2)] flex flex-col h-full bg-[#0f0f0f]">
                {/* Project live Video / iframe Preview */}
                <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden bg-[#111]">
                  <div className="absolute inset-0 w-full h-[300%] group-hover:-translate-y-2/3 transition-transform duration-[8000ms] ease-linear">
                    <iframe 
                       src={project.link}
                       title={project.title}
                       className="absolute inset-0 w-[400%] h-full origin-top-left scale-[0.25] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Decorative "Video" Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/40">
                     <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                        <Play className="text-white w-6 h-6 ml-1" />
                     </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 w-12 h-12 bg-[#0f0f0f] border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#3cff7a] transition-colors duration-300">
                    <ExternalLink className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-poppins text-white mb-3 group-hover:text-[#3cff7a] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 font-inter text-sm mb-8 flex-grow">
                    {project.description}
                  </p>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-[#3cff7a] transition-colors w-fit group/btn"
                  >
                    Visit Website
                    <motion.div
                      className="w-8 h-px bg-[#3cff7a] group-hover/btn:w-16 transition-all duration-300"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
