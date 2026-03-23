"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="project-card relative w-full h-[500px] md:h-[600px] group cursor-pointer"
    >
        {/* Glow Shadow */}
        <div className="absolute inset-4 bg-accent/20 blur-[100px] group-hover:bg-accent/40 transition-colors duration-500 rounded-[40px]" />

        <div 
            style={{ transform: "translateZ(80px)" }}
            className="relative h-full w-full bg-[#111] rounded-[40px] border border-white/10 group-hover:border-accent/50 transition-all duration-700 overflow-hidden flex flex-col shadow-2xl"
        >
            {/* Video / Preview Container */}
            <div className="relative w-full h-2/3 overflow-hidden bg-black">
                {/* Simulated Video Preview using iframe */}
                <div className="w-full h-full transform transition-transform duration-[10000ms] ease-linear group-hover:scale-125">
                     <iframe 
                        src={project.link}
                        title={project.title}
                        className="w-[400%] h-[400%] absolute top-0 left-0 origin-top-left scale-[0.25] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
                    />
                </div>
                
                {/* Overlay with Glow */}
                <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent opacity-80" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100">
                    <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur-xl flex items-center justify-center border border-accent/40 shadow-[0_0_30px_rgba(60,255,122,0.3)]">
                        <Play className="text-accent fill-accent w-8 h-8 ml-1" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-10 flex flex-col flex-grow justify-between relative bg-linear-to-b from-transparent to-[#0a0a0a]">
                <div style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-3xl font-bold font-poppins text-white mb-4 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-white/60 font-inter text-lg leading-relaxed max-w-sm">
                        {project.description}
                    </p>
                </div>

                <div className="flex justify-between items-end" style={{ transform: "translateZ(50px)" }}>
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-3 text-white font-bold text-lg hover:text-accent transition-colors group/link"
                    >
                        Visit Website
                        <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover/link:rotate-0 transition-transform" />
                    </a>
                    
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 font-mono text-sm group-hover:border-accent group-hover:text-accent transition-all">
                        {project.id}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  const projects = [
    {
      id: "01",
      title: "Green Cafe Website",
      description: "A visually stunning aesthetic cafe website built with modern UI principles.",
      link: "https://pukodi123-cyber.github.io/green-",
    },
    {
      id: "02",
      title: "Green Caffeine Cafe",
      description: "Premium animated coffee shop experience with 3D interactions.",
      link: "https://green-caffeine-cafe.vercel.app",
    },
  ];

  return (
    <section id="portfolio" className="relative w-full py-40 bg-[#050505] overflow-hidden">
      {/* Background Cinematic Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-glow text-accent uppercase font-bold tracking-[0.3em] mb-4 text-sm">
                    Selected Work
                </h2>
                <h3 className="text-5xl md:text-7xl font-poppins font-black text-white leading-[1.1]">
                    Interactive <br /><span className="text-white/40 italic">Experiences</span>
                </h3>
            </motion.div>
            
            <motion.p 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-white/50 max-w-md text-lg font-inter"
            >
                Each project is a unique blend of creativity and engineering, focused on making a lasting impact.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
