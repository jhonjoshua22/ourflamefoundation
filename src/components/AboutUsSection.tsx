import { useState } from "react";
import { Link } from "react-router-dom";
import clickSound from "../assets/button.m4a"; 

import {  
  ExternalLink, Copy, Check, Users, Sparkles, ArrowRight, FolderOpen, FileText, Video, Flame, Star,
  Facebook, Twitter, Youtube, Linkedin, Github, MapPin, MessageCircle, Mail, ChevronRight
} from "lucide-react";

// Tier Asset Imports
import partnerImg from "../assets/partners.jpg"; 
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png";

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
    "I. Prioritize human legacy over capital;",
    "II. Drive progress through a relentless 24-hour innovation cycle;",
    "III. Lead as servants who empower the overlooked;",
    "IV. Operate with radical transparency;",
    "V. Use only ethical, sustainable capital;",
    "VI. Protect family sovereignty through decentralized tools;",
    "VII. Foster global-local impact via our Geo Leaders;",
    "VIII. Maintain a state of perpetual, high-speed incubation;",
    "IX. Build with open-source integrity; and",
    "X. Ensure every member acts as a superhero, building the foundation for others to rise."
  ];

  const tiers = [
    { role: "Partner", image: partnerImg, price: "Forever Free", benefit: "Ethical stakeholder support.", button: "I'm Partner" },
    { role: "Normies", image: scoutImg, price: "From $1 pm", benefit: "Enjoy life, work, and family.", button: "I'm Normal" },
    { role: "Superheros", image: stormtrooperImg, price: "From $5 pm", benefit: "10x Superbot powers for good.", button: "I'm SuperHero" },
    { role: "Angels", image: angelImg, price: "From $50 pm", benefit: "Fuel the mission, share magic.", button: "I'm Angel" },
    { role: "SuperFarmers", image: farmerImg, price: "From $500 pm", benefit: "Boost ecosystem growth.", button: "I'm SuperFarmer" },
  ];

  const brandFiles = [
    { name: "2026 Daily Timetable", path: "SchedulePDF", type: "pdf" }, 
    { name: "The Masterplan", path: "MasterplanPDF", type: "pdf" },
    { name: "Magic Worlds Guide", path: "MagicWorldsPDF", type: "pdf" },
    { name: "Flame Foundation Guide", path: "FlameFoundationPDF", type: "pdf" },
    { name: "Assets (GDrive)", path: "https://drive.google.com/drive/folders/1gyPVyYdPpXL-SbvInD6IWueCsK51k4sU?usp=drive_link", type: "drive" },
  ];

  const steps = [
    { step: "01", title: "1-Click Entry", desc: "Sign up instantly with SSO or Video verification.", icon: <Video />, link: "/login" },
    { step: "02", title: "Daily Mission", desc: "Follow AI-monitored task programs with smart prompts.", icon: <Flame />, link: "/login" },
    { step: "03", title: "Claim Rewards", desc: "Saturday 0700 UTC: Enjoy your magical rewards.", icon: <Star />, link: "https://calendar.google.com" }
  ];

  const sociallinks = [
    { name: "Magic Worlds", href: "https://www.themagicworlds.org/", icon: Globe },
    { name: "Customer Service", href: "https://www.facebook.com/OurFlameFoundation/", icon: Facebook },
    { name: "News", href: "https://x.com/OurFlameFoundtn", icon: Twitter },
    { name: "TV", href: "https://www.youtube.com/@FlameFoundationTV", icon: Youtube },
    { name: "Teams", href: "https://www.linkedin.com/company/magic-worlds", icon: Linkedin },
    { name: "Code", href: "https://github.com/TheMagicWorlds", icon: Github },
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

  return (
    <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-orange-600 mb-4">Vision & Infrastructure</h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-none">
              New <span className="text-orange-600 not-italic uppercase">Products</span>.
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
            <span className="h-[1px] w-12 bg-zinc-200 dark:bg-zinc-800" />
            Empowering Universal Growth
          </div>
        </div>

        {/* Grid: Commandments & Tab UI */}
        <div className="grid lg:grid-cols-12 gap-px bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 mb-24">
          <div className="lg:col-span-7 bg-white dark:bg-black p-8 md:p-12 space-y-12">
            <div className="space-y-6">
              <h4 className="font-black text-2xl text-zinc-900 dark:text-zinc-100 uppercase italic tracking-tight mb-6">The Flame Commandments</h4>
              <div className="space-y-4">
                {commandments.map((commandment, i) => (
                  <p key={i} className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                    {commandment}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-10 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 relative overflow-hidden">
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10 rotate-12" />
              <h4 className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                <Users size={14}/> Incubator of Incubators
              </h4>
              <p className="text-2xl font-black leading-tight uppercase italic mb-8">
                A global collective of 100+ engineers building in public. We 10x every 2 months via AI, Blockchain, and Creative Hardware.
              </p>
              <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10 dark:border-zinc-200">
                {["Prediction", "Trustless", "Engaging", "Protection"].map(tag => (
                  <span key={tag} className="px-3 py-1 border border-white/20 dark:border-zinc-300 text-[9px] font-black uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 space-y-12">
            <div className="space-y-6">
              <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-zinc-200/50 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800 gap-1">
                {Object.keys(linkCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveTab(cat); playClickSound(); }}
                    className={`py-3 px-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-white dark:bg-zinc-700 text-orange-600' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 max-h-[400px] overflow-y-auto custom-scrollbar">
                {linkCategories[activeTab].map((link) => (
                  <div key={link.name} className="group/item relative bg-white dark:bg-black">
                    <a href={link.url} target="_blank" rel="noreferrer" onClick={playClickSound}
                       className="flex items-center justify-between p-7 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                      <span className="text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300">{link.name}</span>
                      <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-orange-600" />
                    </a>
                    {(activeTab === 'New Products' || activeTab === 'Team Projects') && (
                      <button 
                        onClick={(e) => handleCopy(e, link.url, link.name)}
                        className="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-orange-600"
                      >
                        {copiedIndex === link.name ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tiers Section - BIG PHOTOS & CENTERED */}
        <div id="tiers" className="mt-24 space-y-12">
          <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 text-center">Membership Tiers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {tiers.map((tier, i) => (
              <div key={i} className={`p-10 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] flex flex-col items-center text-center group hover:border-orange-600 transition-all duration-500 ${i === 4 ? 'md:col-start-2' : ''}`}>
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl mb-8 bg-zinc-100 dark:bg-zinc-800 transform group-hover:scale-105 transition-transform duration-500">
                  <img src={tier.image} alt={tier.role} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic mb-2">{tier.role}</h4>
                <p className="text-orange-600 font-bold text-sm mb-4 tracking-widest">{tier.price}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic mb-8 leading-relaxed h-12 flex items-center justify-center">"{tier.benefit}"</p>
                <Link 
                  to="/login" 
                  onClick={playClickSound}
                  className="mt-auto w-full py-4 text-[10px] font-black uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition-all shadow-lg"
                >
                  {tier.button} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div id="resources" className="space-y-4 mt-24 mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Resources</h3>
          <div className="grid gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
            {brandFiles.map((file) => (
              <a 
                key={file.name} 
                href={file.path} 
                target="_blank" 
                rel="noreferrer" 
                onClick={playClickSound}
                className="flex items-center gap-5 p-5 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
              >
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-orange-600">
                  {file.type === 'drive' ? <FolderOpen size={18}/> : <FileText size={18}/>}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{file.name}</p>
                  <p className="text-[9px] text-zinc-400 uppercase tracking-tighter mt-1">
                    {file.type === 'drive' ? 'Cloud Assets' : 'Documentation'}
                  </p>
                </div>
                <ExternalLink size={14} className="text-zinc-300 group-hover:text-orange-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Process Steps */}
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

        {/* Directory/Footer Inserts */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-12">
          <div className="space-y-4">
            <h4 id="socials" className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">Socials</h4>
            <div className="flex flex-col gap-3">
              {sociallinks.map((link, i) => (
                <a key={i} href={link.href} onClick={playClickSound} target="_blank" rel="noreferrer" className="text-base text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                  <link.icon size={18} className="text-zinc-400 group-hover:text-orange-600 transition-colors" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">Foundation Support</h4>
            <div className="flex flex-col gap-3 text-base text-zinc-500">
              <p className="flex items-center gap-2"><MapPin size={18} className="text-orange-600"/> UK, PH, IN, PK, BD, GE</p>
              <a href="https://wa.me/447762293742" onClick={playClickSound} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                  <MessageCircle size={18} className="text-orange-600"/> +44 7762 293742
              </a>
              <p className="flex items-center gap-2"><Mail size={18} className="text-orange-600"/> help@ourflamefoundation.org</p>
            </div>
          </div>
        </div>

        {/* Final Action CTA */}
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
