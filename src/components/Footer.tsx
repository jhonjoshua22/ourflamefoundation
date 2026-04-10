import React, { useState } from "react";
import { 
  Facebook, Twitter, Youtube, Github, Linkedin, 
  Globe, MessageSquare, Send 
} from "lucide-react";

// 1. IMPORTING FROM THE CORRECT LIB FOLDER
import { supabase } from "../lib/supabaseClient"; 
import clickSound from "../assets/button.m4a";

const UnifiedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playClickSound();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      alert("Thank you for reaching out! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting message:", error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/OurFlameFoundation/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/OurFlameFoundtn", label: "Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@FlameFoundationTV", label: "Youtube" },
    { icon: MessageSquare, href: "https://discord.com/invite/NcNSaTVNdn", label: "Discord" },
    { icon: Github, href: "https://github.com/TheMagicWorlds", label: "Github" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/magic-worlds", label: "Linkedin" },
  ];

  return (
    <footer id="footer" className="bg-black text-zinc-300 pt-24 pb-12 border-t border-zinc-900 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid lg:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* COLUMN 1: GIANT LOGO & BRAND */}
          <div className="lg:col-span-6 space-y-10">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                  Our <span className="text-orange-600">Flame</span> <br /> 
                  <span className="text-2xl not-italic font-light tracking-[0.2em]">Foundation</span>
                </h2>
                <div className="h-1 w-20 bg-orange-600 mt-4" />
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                We are dedicated to helping families save the universe while enjoying 
                <span className="text-white font-bold"> magical rewards</span>. Complete your daily missions, 
                support the ecosystem, and unlock your physical and digital perks everyday at 0700 UTC.
              </p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} onClick={playClickSound} target="_blank" rel="noreferrer" 
                   className="w-10 h-10 flex items-center justify-center border border-zinc-800 hover:border-orange-600 text-zinc-500 hover:text-white transition-all rounded-none">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CONTACT FORM */}
          <div id="contacts" className="lg:col-span-6 bg-zinc-900/30 p-8 md:p-10 border border-zinc-900">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.4em] mb-8">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" required placeholder="Full Name"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700 text-sm rounded-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={isSubmitting}
              />
              <input 
                type="email" required placeholder="Email Address"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700 text-sm rounded-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={isSubmitting}
              />
              <textarea 
                required rows={3} placeholder="Your Message"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700 text-sm resize-none rounded-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] py-4 text-xs flex items-center justify-center gap-3 transition-all rounded-none ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Sending..." : "Submit"} <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a href="/terms" onClick={playClickSound} className="text-[10px] uppercase font-bold text-zinc-600 hover:text-zinc-400">Terms</a>
            <a href="/privacy" onClick={playClickSound} className="text-[10px] uppercase font-bold text-zinc-600 hover:text-zinc-400">Privacy</a>
          </div>
          <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em]">
            🄯 {currentYear} Our Flame Foundation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
