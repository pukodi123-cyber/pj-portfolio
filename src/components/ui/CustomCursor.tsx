"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over link, button, or interactive element
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".hover-target")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }

      if (target.closest(".project-card")) {
        setPreview(true);
      } else {
        setPreview(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: hovered ? 1.5 : preview ? 2 : 1,
          backgroundColor: hovered ? "rgba(60, 255, 122, 0.1)" : "transparent",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#3cff7a] pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: preview ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      {/* Preview Icon (Eye) */}
      <motion.div
        className="fixed top-0 left-0 text-white pointer-events-none z-[10000] flex items-center justify-center font-semibold text-[10px]"
        initial={{ opacity: 0 }}
        animate={{
          x: position.x - 12,
          y: position.y - 10,
          opacity: preview ? 1 : 0,
          scale: preview ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      >
        VIEW
      </motion.div>
    </>
  );
}
