"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Instagram, Mail } from "lucide-react";
import Workspace3D from "./Workspace3D";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const parallaxX = (mousePosition.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) * 0.05;
  const parallaxY = (mousePosition.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) * 0.05;

  const { scrollY, scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.85]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  
  const [scrollVal, setScrollVal] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => setScrollVal(v));
  }, [scrollYProgress]);

  // Cinematic Background Scaling
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.3]);
  const bgOpacity = useTransform(scrollY, [0, 600], [0.2, 0.4]);
  const vignetteOpacity = useTransform(scrollY, [0, 600], [0, 0.4]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20">
      {/* Animated gradient background & particles */}
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0 hidden md:block"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-[80vw] h-[80vw] bg-accent/20 rounded-full blur-[120px] absolute -top-[40vw] -left-[40vw]"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[60vw] h-[60vw] bg-secondary/20 rounded-full blur-[100px] absolute -bottom-[30vw] -right-[20vw]"
        />
      </motion.div>

      {/* Cinematic Vignette Overlay */}
      <motion.div 
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 z-5 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" 
      />

      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full h-full"
      >
        {/* Left Side: Text & Buttons */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold font-poppins text-white leading-tight mb-4 tracking-tighter">
              Hi, I&apos;m <span className="text-glow text-accent inline-block pb-1">Popuri Jayesh</span>
              <br />
              <span className="text-3xl md:text-4xl text-secondary block mt-2">Creative Web Developer & Designer</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-xl">
              I build modern, animated, high-performance websites that help businesses grow online.
            </p>
            <p className="text-white/80 font-medium italic mb-10 max-w-xl text-lg relative before:-left-4 before:top-0 before:absolute before:content-[''] border-l-2 border-accent pl-4">
              &quot;I don&apos;t just build websites; I build experiences that leave a lasting impression.&quot;
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center md:justify-start"
          >
            <a href="#portfolio" className="hover-target inline-flex items-center justify-center bg-accent text-primary px-10 py-5 rounded-xl font-bold transition-all hover-glow soft-shadow w-full sm:w-auto hover:-translate-y-1 text-lg">
              View Projects
            </a>
            <a href="#contact" className="hover-target inline-flex items-center justify-center bg-transparent border-2 border-white/50 text-white px-10 py-5 rounded-xl font-bold transition-all hover:border-white hover:bg-white/10 hover:-translate-y-1 w-full sm:w-auto text-lg">
              Start a Project
            </a>
          </motion.div>
        </div>

        {/* Right Side: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center md:justify-start relative order-1 md:order-2 h-[400px] md:h-[600px] w-full"
        >
          {/* Subtle parallax background glow */}
          <motion.div
            style={{ x: isMounted ? parallaxX * 1.5 : 0, y: isMounted ? parallaxY * 1.5 : 0 }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/20 rounded-full blur-[120px] z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* ADVANCED 3D WORKSPACE SCENE */}
            <Workspace3D scrollProgress={scrollVal} mouseRotation={{ x: parallaxY * 0.01, y: parallaxX * 0.01 }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Separate Fixed Social Glass-Boxes */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-[100] pointer-events-none hidden xl:flex"
      >
        <a 
          href="https://www.instagram.com/jayeeshhh__" 
          target="_blank" 
          rel="noreferrer" 
          className="w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/20 hover:border-[#3cff7a] hover:bg-[#3cff7a]/10 hover:shadow-[0_0_20px_rgba(60,255,122,0.3)] transition-all pointer-events-auto hover:-translate-y-1 duration-300 relative group bg-black/40 backdrop-blur-md"
        >
          <Instagram className="text-white group-hover:text-[#3aff78] w-6 h-6 transition-colors" />
        </a>
        <a 
          href="mailto:popurijayesh0@gmail.com" 
          className="w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/20 hover:border-[#3c8cff] hover:bg-[#3c8cff]/10 hover:shadow-[0_0_20px_rgba(60,140,255,0.3)] transition-all pointer-events-auto hover:-translate-y-1 duration-300 relative group bg-black/40 backdrop-blur-md"
        >
          <Mail className="text-white group-hover:text-[#3c8bf9] w-6 h-6 transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}
