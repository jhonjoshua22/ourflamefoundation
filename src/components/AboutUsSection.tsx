import { useState } from "react";
import { Link } from "react-router-dom";
import clickSound from "../assets/button.m4a"; 

import {  
  ExternalLink, Copy, Check, Sparkles, ArrowRight, FolderOpen, FileText, Video, Flame, Star,
  Facebook, Twitter, Youtube, Linkedin, Github, MapPin, MessageCircle, Mail,
  Globe, ShieldCheck, layout, Layers
} from "lucide-react";

const AboutUsSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Clean");

  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const handleCopy = (e, url, name) => {
    e.preventDefault();
    playClickSound(); 
    navigator.clipboard.writeText(url);
    setCopiedIndex(name);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const commandments = [
    { id: "I", text: "Prioritize human legacy over capital" },
    { id: "II", text: "Drive progress through a relentless 24-hour innovation cycle" },
    { id: "III", text: "Lead as servants who empower the overlooked" },
    { id: "IV", text: "Operate with radical transparency" },
    { id: "V", text: "Use only ethical, sustainable capital" },
    { id: "VI", text: "Protect family sovereignty through decentralized tools" },
    { id: "VII", text: "Foster global-local impact via our Geo Leaders" },
    { id: "VIII", text: "Maintain a state of perpetual, high-speed incubation" },
    { id: "IX", text: "Build with open-source integrity" },
    { id: "X", text: "Ensure every member acts as a superhero, building for others to rise" }
  ];

  const linkCategories = {
    Clean: [
      { name: "Clean Software", url: "https://cleansoftware.vercel.app/" },
      { name: "Clean Education", url: "https://cleaneducation.vercel.app/" },
      { name: "Clean Pharma", url: "https://cleanpharma.vercel.app/" },
      { name: "Clean Hackney", url: "https://cleanhackney.vercel.app/" },
      { name: "Clean Law", url: "https://cleanlaw.vercel.app/" },
      { name: "Clean Film", url: "https://cleanfilm.vercel.app/" },
      { name: "Clean TV", url: "https://cleantv.vercel.app/" },
      { name: "Clean Data", url: "https://cleandata-two.vercel.app/" },
      { name: "Clean Energy", url: "https://cleanenergy-omega.vercel.app/" },
      { name: "Clean Music", url: "https://cleanmusic.vercel.app/" },
    ],
    Travel: [
      { name: "Ireland", url: "https://travelireland.vercel.app/" },
      { name: "England", url: "https://travelengland.vercel.app/" },
      { name: "Wales", url: "https://travelwales.vercel.app/" },
      { name: "Scotland", url: "https://travelscotland.vercel.app/" },
      { name: "Bulgaria", url: "https://travelbulgaria.vercel.app/" },
      { name: "Nigeria", url: "https://travelnigeria.vercel.app/" },
      { name: "Philippines", url: "https://travelphilippines.vercel.app/" },
    ],
    Gifts: [
      { name: "Easter Pack", url: "https://eastergiftpack.vercel.app/" },
      { name: "Christmas Pack", url: "https://christmasgiftpack.vercel.app/" },
      { name: "Birthday Pack", url: "https://birthdaygiftpack.vercel.app/" },
    ],
    Free: [
      { name: "Fraccounts", url: "https://fraccounts.vercel.app/" },
      { name: "Freebay", url: "https://freebay.vercel.app/" },
      { name: "Fruber", url: "https://fruber.vercel.app/" },
      { name: "Frainer", url: "https://frainer.vercel.app/" },
      { name: "Frov", url: "https://frov.vercel.app/" },
      { name: "Frifts", url: "https://frifts.vercel.app/" },
    ],
    "New Products": [
      { name: "Robots4Business", url: "https://jhonjoshua22.github.io/Robots4Business/" },
      { name: "2026 I Dream For", url: "https://2026idreamfor.vercel.app/" },
      { name: "Magic Money", url: "http://34.14.136.156:8080/login"},
      { name: "Flame Tablets", url: "https://flametablets.vercel.app/" },
    ],
    "Team Projects": [
      { name: "cheetahhpvq", url: "https://cheetahhpvq-develop-frontend.onrender.com" },
      { name: "crowd-fund", url: "https://crowd-funding-orpin.vercel.app/" },
      { name: "2026 I dream for", url: "https://2026idreamfor.vercel.app/" },
    ]
  };

  const brandFiles = [
    { name: "2026 Daily Timetable", path: "SchedulePDF", type: "pdf" }, 
    { name: "The Masterplan", path: "MasterplanPDF", type: "pdf" },
    { name: "Magic Worlds Guide", path: "MagicWorldsPDF", type: "pdf" },
    { name: "Flame Foundation Guide", path: "FlameFoundationPDF", type: "pdf" },
    { name: "Assets (GDrive)", path: "https://drive.google.com/drive/folders/1gyPVyYdPpXL-SbvInD6IWueCsK51k4sU?usp=drive_link", type: "drive" },
  ];

  const sociallinks = [
    { name: "Magic Worlds", href: "https://www.themagicworlds.org/", icon: Globe },
    { name: "Customer Service", href: "https://www.facebook.com/OurFlameFoundation/", icon: Facebook },
    { name: "News", href: "https://x.com/OurFlameFoundtn", icon: Twitter },
    { name: "TV", href: "https://www.youtube.com/@FlameFoundationTV", icon: Youtube },
    { name: "Teams", href: "https://www.linkedin.com/company/magic-worlds", icon: Linkedin },
    { name: "Code", href: "https://github.com/TheMagicWorlds", icon: Github },
  ];

  const steps = [
    { step: "01", title: "1-Click Entry", desc: "Sign up instantly with SSO or Video verification.", icon: <Video />, link: "/login" },
    { step: "02", title: "Daily Mission", desc: "Follow AI-monitored task programs with smart prompts.", icon: <Flame />, link: "/login" },
    { step: "03", title: "Claim Rewards", desc: "Saturday 0700 UTC: Enjoy your magical rewards.", icon: <Star />, link: "https://calendar.google.com" }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* SECTION 1: THE MANIFESTO (COMMANDMENTS) */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-orange-600 mb-4">Foundation Protocol</h2>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-none">
                The <span className="text-orange-600 not-italic uppercase">Commandments</span>.
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {commandments.map((cmd) => (
              <div key={cmd.id} className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl group hover:border-orange-600 transition-all duration-500">
                <div className="text-orange-600 font-black text-2xl mb-4 italic">{cmd.id}</div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
                  {cmd.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: NEW PRODUCTS (DIRECTORY) */}
        <div className="mb-32 bg-zinc-950 rounded-[4rem] p-8 md:p-16 border border-zinc-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-widest text-xs">
                  <Layers size={16} /> Ecosystem Infrastructure
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white leading-none">
                  Global <span className="text-orange-600">Product Directory</span>
                </h2>
             </div>
             
             {/* Tab Switcher */}
             <div className="flex flex-wrap gap-1 bg-black p-1 border border-zinc-800 rounded-xl w-full md:w-auto">
                {Object.keys(linkCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveTab(cat); playClickSound(); }}
                    className={`py-3 px-4 text-[9px] font-black uppercase tracking-widest transition-all rounded-lg ${activeTab === cat ? 'bg-orange-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {linkCategories[activeTab].map((link) => (
              <div key={link.name} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-600 transition-all">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={playClickSound}
                  className="flex flex-col p-8 h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Platform</span>
                    <ArrowRight size={18} className="text-zinc-700 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase italic group-hover:text-orange-600 transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-auto pt-4 border-t border-zinc-800 uppercase tracking-tighter">
                    {link.url.replace('https://', '')}
                  </p>
                </a>
                
                {(activeTab === 'New Products' || activeTab === 'Team Projects') && (
                  <button 
                    onClick={(e) => handleCopy(e, link.url, link.name)}
                    className="absolute right-4 top-4 p-2 text-zinc-600 hover:text-orange-600 bg-black/50 rounded-lg"
                  >
                    {copiedIndex === link.name ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: RESOURCES & SOCIALS (KEEPING ORIGINAL FOOTER LAYOUT) */}
        <div id="resources" className="space-y-4 mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Resources</h3>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
            {brandFiles.map((file) => (
              <a 
                key={file.name} 
                href={file.path} 
                target="_blank" 
                rel="noreferrer" 
                onClick={playClickSound}
                className="flex items-center gap-5 p-6 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
              >
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-orange-600">
                  {file.type === 'drive' ? <FolderOpen size={18}/> : <FileText size={18}/>}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{file.name}</p>
                </div>
                <ExternalLink size={14} className="text-zinc-300 group-hover:text-orange-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* WORKFLOW STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {steps.map((item, idx) => {
            const isExternal = item.link?.startsWith('http');
            const CardContent = (
              <div onClick={playClickSound} className="relative h-full p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm group transition-all duration-300 hover:border-orange-600/50 rounded-2xl cursor-pointer">
                <span className="text-6xl font-black text-zinc-900/5 dark:text-white/5 absolute top-4 right-4 group-hover:text-orange-600/10 transition-colors">
                  {item.step}
                </span>
                <div className="text-orange-600 mb-4 transition-transform group-hover:scale-110 duration-300">{item.icon}</div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 uppercase group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
            return isExternal ? <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">{CardContent}</a> : <Link key={idx} to={item.link || "#"} className="block h-full">{CardContent}</Link>;
          })}
        </div>

        {/* SOCIALS & SUPPORT */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-12">
          <div className="space-y-4">
            <h4 id="socials" className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">Socials</h4>
            <div className="grid grid-cols-2 gap-3">
              {sociallinks.map((link, i) => (
                <a key={i} href={link.href} onClick={playClickSound} target="_blank" rel="noreferrer" className="text-sm text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                  <link.icon size={16} className="text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">Foundation Support</h4>
            <div className="flex flex-col gap-3 text-sm text-zinc-500">
              <p className="flex items-center gap-2"><MapPin size={18} className="text-orange-600"/> UK, PH, IN, PK, BD, GE</p>
              <a href="https://wa.me/447762293742" onClick={playClickSound} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                  <MessageCircle size={18} className="text-orange-600"/> +44 7762 293742
              </a>
              <p className="flex items-center gap-2"><Mail size={18} className="text-orange-600"/> help@ourflamefoundation.org</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/login" 
            className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-12 py-5 hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition-all rounded-xl shadow-xl w-full sm:w-auto text-center"
          >
            Sign In to Magic Worlds
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
