import React, { useState } from "react";
import { 
  Facebook, Twitter, Youtube, Github, Linkedin, 
  Globe, MessageSquare, Shield, ScrollText, Mail, Phone, 
  MapPin, Send 
} from "lucide-react";
import logo from "../assets/ourflamelogo.png";

const Footer = () => {
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
    <footer className="bg-zinc-950 text-zinc-300 pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Top Section: Brand & Contact Form */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Mission (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Our Flame Logo" className="w-16 h-16 object-contain" />
                <h2 className="text-3xl font-bold tracking-tighter text-white uppercase italic">
                  Our <span className="text-orange-600">Flame</span> Foundation
                </h2>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                A global incubator dedicated to reducing operational complexity for families. 
                Fusing AI, blockchain, and expert human support to empower communities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-zinc-900 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest">Global Locations</h4>
                  <p className="text-zinc-500 text-sm">UK, Philippines, India, Pakistan, Bangladesh, Georgia & more.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-zinc-900 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest">24/7 Support</h4>
                  <p className="text-zinc-500 text-sm">+44 7762 293742 (Please leave a message)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer" 
                   className="w-10 h-10 flex items-center justify-center bg-zinc-900 hover:bg-orange-600 text-zinc-400 hover:text-white transition-all">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form (7 Columns) */}
          <div className="lg:col-span-7 bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-[80px] -z-10" />
            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-tight">
              Get In <span className="text-orange-600 italic">Touch</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                <input 
                  type="text" required placeholder="John Doe"
                  className="w-full bg-zinc-800 border-zinc-700 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-600"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                <input 
                  type="email" required placeholder="john@example.com"
                  className="w-full bg-zinc-800 border-zinc-700 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-600"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Message</label>
                <textarea 
                  required rows={4} placeholder="How can we help or how would you like to get involved?"
                  className="w-full bg-zinc-800 border-zinc-700 text-white p-4 focus:border-orange-600 outline-none transition-all placeholder:text-zinc-600 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button type="submit" className="md:col-span-2 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] py-5 px-8 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-zinc-900">
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Resources</h4>
            <div className="flex flex-col gap-3">
              {resources.slice(0, 3).map((link, i) => (
                <a key={i} href={link.href} className="text-sm text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2">
                  <link.icon size={12}/> {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4 pt-8 md:pt-0">
            <h4 className="text-white font-black text-xs uppercase tracking-widest invisible hidden md:block">&nbsp;</h4>
            <div className="flex flex-col gap-3">
              {resources.slice(3).map((link, i) => (
                <a key={i} href={link.href} className="text-sm text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2">
                  <link.icon size={12}/> {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Legal</h4>
            <div className="flex flex-col gap-3">
              <a href="https://ourflamefoundation.vercel.app/terms" className="text-sm text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2">
                <ScrollText size={12}/> Terms of Service
              </a>
              <a href="https://ourflamefoundation.vercel.app/privacy" className="text-sm text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2">
                <Shield size={12}/> Privacy Policy
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">Reach Us</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:mflynn1999@gmail.com" className="text-sm text-zinc-500 hover:text-orange-600 transition-colors truncate">
                mflynn1999@gmail.com
              </a>
              <span className="text-sm text-zinc-500">+44 7762 293742</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
            &copy; {currentYear} <span className="text-zinc-400">Our Flame Foundation</span>. All rights reserved.
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 animate-pulse">
            Improving lives via expert support & modern tools
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
