"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const waText = `*New Website Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Mobile:* ${formData.mobile}%0A*Project Details:* ${formData.details}`;
    const waUrl = `https://wa.me/919381722155?text=${waText}`;

    // Send email via FormSubmit (silent, behind scenes)
    try {
        await fetch("https://formsubmit.co/ajax/popurijayesh0@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...formData, _subject: `PJ Portfolio Inquiry: ${formData.name}` }),
        });
    } catch (err) {
        console.error("Email send failed", err);
    }

    // Success animation flow
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#3cff7a", "#3c8cff", "#ffffff"],
        });

        // Open WhatsApp after a short delay
        setTimeout(() => {
           window.open(waUrl, "_blank");
        }, 1500);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative w-full py-40 bg-[#060606] overflow-hidden">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <h2 className="text-glow text-accent uppercase font-bold tracking-[0.3em] mb-4 text-sm">
                    Contact
                </h2>
                <h3 className="text-5xl md:text-7xl font-poppins font-black text-white mb-6 tracking-tighter">
                    Start Your <span className="text-white/40 italic">Project</span>
                </h3>
                <p className="text-white/50 text-xl font-inter max-w-xl mx-auto">
                    Let&apos;s turn your vision into a stunning digital reality.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
            >
                {/* GLASSMORPHISM FORM */}
                <div className="glass p-8 md:p-16 rounded-[48px] border border-white/10 soft-shadow group hover:border-accent/30 transition-all duration-700 bg-black/40 backdrop-blur-3xl min-h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.form 
                                key="contact-form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="w-full space-y-8"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-white/60 font-bold ml-4 text-sm tracking-widest uppercase">Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            name="name" 
                                            placeholder="Your Name"
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-white/20 text-lg"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-white/60 font-bold ml-4 text-sm tracking-widest uppercase">Email</label>
                                        <input 
                                            required
                                            type="email" 
                                            name="email" 
                                            placeholder="Your Email"
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-white/20 text-lg"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-white/60 font-bold ml-4 text-sm tracking-widest uppercase">Mobile Number</label>
                                    <input 
                                        required
                                        type="tel" 
                                        name="mobile" 
                                        placeholder="+91 00000 00000"
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-white/20 text-lg"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-white/60 font-bold ml-4 text-sm tracking-widest uppercase">Project Details</label>
                                    <textarea 
                                        required
                                        name="details" 
                                        rows={4}
                                        placeholder="Tell me about your business..."
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-white/20 text-lg resize-none"
                                    />
                                </div>

                                <div className="flex justify-center pt-6">
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group/btn relative overflow-hidden bg-accent px-12 py-5 rounded-2xl font-black text-black text-xl flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_40px_rgba(60,255,122,0.3)]"
                                    >
                                        <span className="relative z-10">{isSubmitting ? "Sourcing Particles..." : "Start My Website"}</span>
                                        <Send className="w-6 h-6 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        
                                        {/* Hover Effect */}
                                        <motion.div 
                                            className="absolute inset-0 bg-white"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "0%" }}
                                            transition={{ duration: 0.3 }}
                                            style={{ mixBlendMode: 'overlay' }}
                                        />
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div 
                                key="success-screen"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center flex flex-col items-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 animate-bounce">
                                    <CheckCircle className="text-accent w-12 h-12" />
                                </div>
                                <h4 className="text-5xl font-black text-white mb-6 text-glow">
                                    Success!
                                </h4>
                                <p className="text-2xl text-white/70 max-w-md font-inter leading-relaxed">
                                    Your request has been sent! <br /> I&apos;ll contact you soon.
                                </p>
                                <p className="text-white/40 mt-10 text-lg">
                                    WhatsApp is opening automatically...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ANIMATED CARTOON CHARACTER ON SUBMIT */}
                <AnimatePresence>
                    {isSubmitting && (
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.5 }}
                            animate={{ opacity: 1, y: -400, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[100] w-64 h-64 pointer-events-none"
                        >
                            <div className="relative w-full h-full drop-shadow-[0_0_30px_rgba(60,255,122,0.5)]">
                                <Image 
                                    src="/cartoon-pj.png" 
                                    alt="PJ Cartoon" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
