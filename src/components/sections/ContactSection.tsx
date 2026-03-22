"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const waText = `*New Website Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Details:* ${formData.details}`;
    const waUrl = `https://wa.me/919381722155?text=${waText}`;

    try {
      // 1. Send Background Email via FormSubmit
      await fetch("https://formsubmit.co/ajax/popurijayesh0@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, _subject: `Website Inquiry: ${formData.name}` }),
      });

      // 2. SEND AUTOMATED BACKGROUND MESSAGE VIA WEBHOOK (Make.com)
      await fetch("https://hook.eu1.make.com/iyquotmlzwmtynzmlv3psagd51j47uqy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (e) {
      console.error("Background notification failed", e);
    }

    // Success transition
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3cff7a", "#3c8cff", "#ffffff"],
      });

      // Force open WhatsApp immediately
      window.open(waUrl, "_blank");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative w-full py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
            Let&apos;s Build Together
          </h2>
          <div className="w-24 h-1 bg-[#3cff7a] mx-auto rounded-full" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="glass p-8 md:p-12 rounded-[40px] border border-white/10 soft-shadow"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 font-medium">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3cff7a] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 font-medium">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3cff7a] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 font-medium">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3cff7a] transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 font-medium">Project Details</label>
                  <textarea
                    required
                    name="details"
                    rows={4}
                    onChange={handleChange}
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3cff7a] transition-colors resize-none"
                    placeholder="Tell me about your business and what kind of website you need..."
                  />
                </div>

                <div className="mt-4 relative flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`nav-button relative w-full md:w-auto px-12 py-4 bg-[#3cff7a] text-black font-bold rounded-full transition-all hover-glow overflow-hidden ${
                      isSubmitting ? "opacity-90 cursor-not-allowed scale-95" : "hover:scale-105"
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Start My Website"}
                  </button>

                  {/* Character pop up animation */}
                  <AnimatePresence>
                    {isSubmitting && (
                      <motion.div
                        className="absolute bottom-16 w-16 h-16 pointer-events-none z-50 rounded-full border border-[#3cff7a] bg-[#1a1a1a] flex items-center justify-center p-1"
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 1, 0], y: -200, x: [0, -20, 20, 0], scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      >
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <div className="w-full h-full rounded-full bg-linear-to-tr from-accent to-secondary flex items-center justify-center p-[2px] shadow-[0_0_30px_rgba(60,255,122,0.3)]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                               <div className="w-6 h-6 bg-accent rounded-full animate-pulse blur-[2px]" />
                            </div>
                         </div>
                         
                         {/* Sparkles */}
                         <motion.div 
                           className="absolute -right-4 -top-4 w-4 h-4 rounded-full bg-white blur-[2px]"
                           animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                           transition={{ repeat: Infinity, duration: 0.3 }}
                         />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 bg-[#3cff7a]/20 rounded-full flex items-center justify-center border border-[#3cff7a] animate-pulse">
                  <svg className="w-10 h-10 text-[#3cff7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold font-poppins text-white mt-4 text-glow">
                  Thank You!
                </h3>
                <p className="text-xl text-gray-300 max-w-md">
                   Project received. I will reach out shortly.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4">
                  <a 
                    href={`https://wa.me/919381722155?text=${encodeURIComponent(`*New Website Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-10 py-4 bg-accent text-black font-bold rounded-full hover-glow transition-all hover:scale-105"
                  >
                    Open WhatsApp to Complete
                  </a>
                  <p className="text-sm text-gray-500">
                    If WhatsApp didn&apos;t open automatically, click the button above.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
