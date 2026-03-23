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

    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Local knowledge fallback for stability
    const getLocalResponse = (query: string) => {
      const q = query.toLowerCase().trim();
      
      // Greetings
      if (["hi", "hello", "hey", "hola", "hi there", "hello there"].includes(q)) {
        return "Hey there! I'm PJ's digital assistant. How's your day going? What can I help you discover about PJ today?";
      }

      if (q.includes("who is pj") || q.includes("who are you") || q.includes("about pj")) {
        return "Popuri Jayesh (PJ) is a Creative Web Developer based in India. He specializes in high-end, animated portfolios using Next.js, Three.js, and Framer Motion. He's passionate about building cinematic digital experiences!";
      }
      if (q.includes("project") || q.includes("portfolio") || q.includes("work")) {
        return "PJ has worked on amazing projects like this 3D portfolio, cafe websites, and immersive interactive dashboards. You can see them all in the Portfolio section below!";
      }
      if (q.includes("tech") || q.includes("stack") || q.includes("skill")) {
        return "PJ's core stack includes React, Next.js, TypeScript, Three.js (React Three Fiber), Framer Motion, GSAP, and Tailwind CSS. He loves pushing the boundaries of the web!";
      }
      if (q.includes("contact") || q.includes("hire") || q.includes("email")) {
        return "You can reach PJ at popurijayesh0@gmail.com or click the WhatsApp button to chat directly. He's always open for exciting new projects!";
      }
      return null;
    };

    // Execute response
    (async () => {
      const lowerText = text.toLowerCase();
      let aiText = "";
      let commandExecuted = false;

      // 1. CHECK FOR COMMANDS FIRST (AUTHORITY)
      if (lowerText.includes("open instagram") || lowerText.includes("your instagram")) {
        aiText = "Right away! Opening PJ's Instagram for you. It's full of creative vibes.";
        window.open("https://www.instagram.com/jayeeshhh__", "_blank");
        commandExecuted = true;
      } else if (lowerText.includes("email pj") || lowerText.includes("message pj")) {
        aiText = "Consider it done. I'm opening your email client to message PJ directly.";
        window.location.href = "mailto:popurijayesh0@gmail.com";
        commandExecuted = true;
      } else if (lowerText.includes("portfolio") || lowerText.includes("show projects")) {
        aiText = "Check this out! I'm taking you straight to the Portfolio section.";
        const el = document.getElementById("portfolio");
        el?.scrollIntoView({ behavior: "smooth" });
        commandExecuted = true;
      } else if (lowerText.includes("contact") || lowerText.includes("hire")) {
        aiText = "Absolutely. Let's get your project started. Scrolling to the contact section now.";
        const el = document.getElementById("contact");
        el?.scrollIntoView({ behavior: "smooth" });
        commandExecuted = true;
      } else if (lowerText.includes("scroll to top") || lowerText.includes("home")) {
        aiText = "Back to the beginning! Zooming to the top.";
        window.scrollTo({ top: 0, behavior: "smooth" });
        commandExecuted = true;
      }

      // 2. IF NO COMMAND, TRY LOCAL KNOWLEDGE OR API
      if (!commandExecuted) {
        const fallback = getLocalResponse(text);
        if (fallback) {
          aiText = fallback;
        } else {
          try {
            const systemPrompt = "You are PJ's (Popuri Jayesh) authorized digital assistant and best friend. PJ is a Creative Web Developer based in India. Your tone is warm, extremely friendly, and professional. Be concise but helpful.";
            // Using qwen-72b as it is more stable and less likely to show deprecation notices on Pollinations
            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(text)}?system=${encodeURIComponent(systemPrompt)}&private=true&model=qwen`);
            
            if (response.ok) {
              aiText = await response.text();
            } else {
              // Try without system prompt if it fails
              const backupResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(text)}?private=true&model=qwen`);
              if (backupResponse.ok) {
                aiText = await backupResponse.text();
              } else {
                throw new Error("API Down");
              }
            }
          } catch (error) {
            console.error("AI Error:", error);
            aiText = "I'm having a little trouble connecting to my central memory right now, but I'm still here! Feel free to ask about PJ's projects or skills, or reach out to him via the contact form!";
          }
        }
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: "ai",
        text: aiText || "I'm thinking... but nothing came out. Can you try again?",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
    })();
  }, []);

  return (
    <div className="fixed bottom-32 right-6 z-[110] md:right-10 pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] md:h-[600px] glass rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden bg-black/60 backdrop-blur-3xl z-[110]"
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
