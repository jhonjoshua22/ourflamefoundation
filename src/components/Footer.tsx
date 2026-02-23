import React, { useState } from "react";
import { 
  Facebook, Twitter, Youtube, Github, Linkedin, 
  Globe, MessageSquare, Shield, ScrollText, Mail, Phone, 
  MapPin, Send 
} from "lucide-react";
import logo from "../assets/ourflamelogo.png";

const UnifiedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/MagikWorlds/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/MagicWorlds3", label: "Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@MagicworldsTV", label: "Youtube" },
    { icon: MessageSquare, href: "https://discord.com/invite/NcNSaTVNdn", label: "Discord" },
    { icon: Github, href: "https://github.com/TheMagicWorlds", label: "Github" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/magic-worlds", label: "Linkedin" },
  ];

  const resources = [
    { name: "Magic Worlds", href: "https://www.themagicworlds.com/", icon: Globe },
    { name: "Customer Service", href: "https://www.facebook.com/MagikWorlds", icon: Facebook },
    { name: "News", href: "https://x.com/magicworlds3", icon: Twitter },
    { name: "TV", href: "https://www.youtube.com/@magicworldstv", icon: Youtube },
    { name: "Teams", href: "https://www.linkedin.com/company/magic-worlds", icon: Linkedin },
    { name: "Code", href: "https://github.com/TheMagicWorlds", icon: Github },
  ];

  return (
    /* ONLY ADDED THE ID HERE - DESIGN IS UNTOUCHED */
    <footer id="footer" className="bg-black text-zinc-300 pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* COLUMN 1: GIANT LOGO & BRAND */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex flex-col gap-8">
              <img 
                src={logo} 
                alt="Our Flame Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain brightness-110 drop-shadow-[0_0_15px_rgba(234,88,12,0.3)]" 
              />
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                  Our <span className="text-orange-600">Flame</span> <br /> 
                  <span className="text-2xl not-italic font-light tracking-[0.2em]">Foundation</span>
                </h2>
                <div className="h-1 w-20 bg-orange-600 mt-4" />
              </div>
              
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                A global incubator dedicated to reducing operational complexity for families. 
                Fusing AI, blockchain, and expert human support.
              </p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer" 
                   className="w-10 h-10 flex items-center justify-center border border-zinc-800 hover:border-orange-600 text-zinc-500 hover:text-white transition-all rounded-none">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CONTACT FORM */}
          <div className="lg:col-span-5 bg-zinc-900/30 p-8 md:p-10 border border-zinc-900">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.4em] mb-8">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" required placeholder="Full Name"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700 text-sm rounded-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" required placeholder="Email Address"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700 text-sm rounded-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea 
                required rows={3} placeholder="Your Message"
                className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-700 text-sm resize-none rounded-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] py-4 text-xs flex items-center justify-center gap-3 transition-all rounded-none">
                Submit <Send size={14} />
              </button>
            </form>
          </div>

          {/* COLUMN 3: DIRECTORY */}
          <div className="lg:col-span-3 space-y-12 lg:pl-10">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-900 pb-2">Resources</h4>
              <div className="flex flex-col gap-3">
                {resources.map((link, i) => (
                  <a key={i} href={link.href} className="text-[13px] text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-900 pb-2">Foundation Support</h4>
              <div className="flex flex-col gap-3 text-[13px] text-zinc-500">
                <p className="flex items-center gap-2"><MapPin size={14} className="text-orange-600"/> UK, PH, IN, PK, BD, GE</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-orange-600"/> +44 7762 293742</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-orange-600"/> mflynn1999@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a href="/terms" className="text-[10px] uppercase font-bold text-zinc-600 hover:text-zinc-400">Terms</a>
            <a href="/privacy" className="text-[10px] uppercase font-bold text-zinc-600 hover:text-zinc-400">Privacy</a>
          </div>
          <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em]">
            🄯; {currentYear} Our Flame Foundation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
