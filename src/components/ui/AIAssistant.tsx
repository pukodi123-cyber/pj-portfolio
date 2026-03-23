"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { useCallback } from "react";
import Image from "next/image";

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
  timestamp: number;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "Hey friend! I'm your digital companion in PJ's universe. I have full authority to show you anything or answer any questions you have. What should we explore first?",
      timestamp: 1711152000000,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickReplies = [
    "Who is PJ?",
    "View Projects",
    "Hire for Project",
    "Tech Stack"
  ];

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;

    const msgTimestamp = Date.now();
    const userMessage: Message = {
      id: msgTimestamp.toString(),
      role: "user",
      text,
      timestamp: msgTimestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I'm on it! I can help with anything from technical details to personal stories. What's on your mind, buddy?";
      const lowerText = text.toLowerCase();

      // COMMANDS WITH AUTHORITY
      if (lowerText.includes("open instagram") || lowerText.includes("your instagram")) {
        aiText = "Right away! Opening PJ's Instagram for you. It's full of creative vibes.";
        window.open("https://www.instagram.com/jayeeshhh__", "_blank");
      } else if (lowerText.includes("email") || lowerText.includes("message")) {
        aiText = "Consider it done. I'm opening your email client to message PJ directly.";
        window.location.href = "mailto:popurijayesh0@gmail.com";
      } else if (lowerText.includes("portfolio") || lowerText.includes("show projects")) {
        aiText = "Check this out! I'm taking you straight to the Portfolio section.";
        const el = document.getElementById("portfolio");
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (lowerText.includes("contact") || lowerText.includes("hire")) {
        aiText = "Absolutely. Let's get your project started. Scrolling to the contact section now.";
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (lowerText.includes("scroll to top") || lowerText.includes("home")) {
        aiText = "Back to the beginning! Zooming to the top.";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // CONVERSATIONAL BRAIN
      else if (lowerText.includes("who are you") || lowerText.includes("about you")) {
        aiText = "I'm PJ's digital shadow and your new friend! I'm here to make sure you have the best experience possible. Think of me as the key to this whole digital world.";
      } else if (lowerText.includes("who is pj") || lowerText.includes("who made you")) {
        aiText = "Popuri Jayesh made me! He's a creative soul who loves turning code into art. He's also a great guy to work with - very detail-oriented and visionary.";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        aiText = "Hey there! How's your day going? I'm ready for whatever you need. Commands, questions, or just a chat - I'm here!";
      } else if (lowerText.includes("tech") || lowerText.includes("stack") || lowerText.includes("build")) {
        aiText = "Everything you see here is built with cutting-edge tech like Next.js 16, Three.js, and Framer Motion. PJ loves using tools that allow for maximum creativity without compromising performance.";
      } else if (lowerText.includes("joke")) {
        aiText = "Why did the web developer walk out of the restaurant? Because of the table layout! 😂 Need something more serious?";
      } else if (lowerText.includes("future") || lowerText.includes("ai")) {
        aiText = "The future is where creativity meets automation. PJ and I believe in building tools that empower human imagination, not replace it.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: aiText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
      // OPTIONAL: Voice Feedback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiText);
        utterance.rate = 1.1;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  }, []);

  return (
    <div className="fixed bottom-32 right-6 z-100 md:right-10 pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] md:h-[600px] glass rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden bg-black/60 backdrop-blur-3xl z-100"
          >
            {/* Header */}
            <div className="p-6 bg-accent/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border border-accent/30 overflow-hidden bg-black">
                   <Image 
                     src="/ai-avatar.png" 
                     alt="AI Avatar" 
                     fill 
                     className="object-cover scale-125"
                   />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm tracking-tight">PJ Assistant</h4>
                   <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] text-accent/80 font-mono uppercase tracking-widest">Online</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="grow overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: m.role === "ai" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "ai" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl ${
                    m.role === "ai" 
                    ? "bg-white/5 border border-white/5 text-white/90 rounded-tl-none" 
                    : "bg-accent/20 border border-accent/20 text-accent rounded-tr-none"
                  }`}>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    <span className="text-[9px] opacity-40 mt-1 block">
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar pb-4">
               {quickReplies.map((reply) => (
                 <button
                   key={reply}
                   onClick={() => handleSend(reply)}
                   className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 text-[10px] text-white/50 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all uppercase tracking-widest font-bold"
                 >
                   {reply}
                 </button>
               ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-black/40 border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative flex items-center gap-2"
              >
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask PJ's Assistant..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-transparent transition-all placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group w-16 h-16 rounded-[24px] bg-black border-2 border-accent/20 flex items-center justify-center shadow-[0_0_30px_rgba(60,255,122,0.2)] overflow-hidden transition-all duration-500 hover:border-accent"
      >
        <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
        <AnimatePresence mode="wait">
           {isOpen ? (
             <motion.div
               key="close"
               initial={{ opacity: 0, rotate: -90 }}
               animate={{ opacity: 1, rotate: 0 }}
               exit={{ opacity: 0, rotate: 90 }}
             >
               <X className="w-8 h-8 text-accent" />
             </motion.div>
           ) : (
             <motion.div
               key="open"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="relative"
             >
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-accent/20 blur-2xl rounded-full" />
                <Bot className="w-8 h-8 text-accent relative z-10" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-accent animate-pulse" />
             </motion.div>
           )}
        </AnimatePresence>
        
        {/* Glow pulsing effect */}
        {!isOpen && (
           <div className="absolute inset-0 rounded-[24px] border-2 border-accent/50 animate-ping opacity-20 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
