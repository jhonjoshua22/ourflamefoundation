import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { 
  Send, MapPin, Mail, MessageCircle
} from "lucide-react";
import { supabase } from "../lib/supabaseClient"; 
import logo from "../assets/ourflamelogo.png";
import clickSound from "../assets/button.m4a";

// Helper to get Lucide Icon by string name
const DynamicIcon = ({ name, size = 18 }: { name: string, size?: number }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <LucideIcons.Globe size={size} />;
  return <IconComponent size={size} />;
};

const UnifiedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dynamic Data States
  const [dbLinks, setDbLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase.from("footer").select("*").order("sort_order", { ascending: true });
      if (data) setDbLinks(data);
    };
    fetchFooter();
  }, []);

  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playClickSound();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([formData]);
      if (error) throw error;
      alert("Thank you for reaching out!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered lists from DB
  const brandDesc = dbLinks.find(l => l.category === 'brand')?.value || "A global incubator...";
  const socialLinks = dbLinks.filter(l => l.category === 'social');
  const resources = dbLinks.filter(l => l.category === 'resource');
  const legalLinks = dbLinks.filter(l => l.category === 'legal');

  return (
    <footer id="footer" className="bg-black text-zinc-300 pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* COLUMN 1: BRAND */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex flex-col gap-8">
              <img src={logo} alt="Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                  Our <span className="text-orange-600">Flame</span> <br /> 
                  <span className="text-2xl not-italic font-light tracking-[0.2em]">Foundation</span>
                </h2>
                <div className="h-1 w-20 bg-orange-600 mt-4" />
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{brandDesc}</p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.value} onClick={playClickSound} target="_blank" rel="noreferrer" 
                   className="w-10 h-10 flex items-center justify-center border border-zinc-800 hover:border-orange-600 text-zinc-500 hover:text-white transition-all">
                  <DynamicIcon name={social.icon_name} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CONTACT */}
          <div id="contacts" className="lg:col-span-5 bg-zinc-900/30 p-8 md:p-10 border border-zinc-900">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.4em] mb-8">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" required placeholder="Full Name"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none text-sm"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" required placeholder="Email Address"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea 
                required rows={3} placeholder="Your Message"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none text-sm resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] py-4 text-xs flex items-center justify-center gap-3 transition-all"
              >
                {isSubmitting ? "Sending..." : "Submit"} <Send size={14} />
              </button>
            </form>
          </div>

          {/* COLUMN 3: DIRECTORY */}
          <div className="lg:col-span-3 space-y-12 lg:pl-10">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-900 pb-2">Resources</h4>
              <div className="flex flex-col gap-3">
                {resources.map((link, i) => (
                  <a key={i} href={link.value} target="_blank" onClick={playClickSound} className="text-[13px] text-zinc-500 hover:text-orange-600 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-900 pb-2">Foundation Support</h4>
              <div className="flex flex-col gap-3 text-[13px] text-zinc-500">
                <p className="flex items-center gap-2"><MapPin size={14} className="text-orange-600"/> UK, PH, IN, PK, BD, GE</p>
                <a href="https://wa.me/447762293742" onClick={playClickSound} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                    <MessageCircle size={14} className="text-orange-600"/> +44 7762 293742
                </a>
                <p className="flex items-center gap-2"><Mail size={14} className="text-orange-600"/> help@ourflamefoundation.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            {legalLinks.map((link, i) => (
              <a key={i} href={link.value} onClick={playClickSound} className="text-[10px] uppercase font-bold text-zinc-600 hover:text-zinc-400">
                {link.label}
              </a>
            ))}
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
