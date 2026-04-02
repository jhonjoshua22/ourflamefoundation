import { useState } from "react";
import { Link } from "react-router-dom";
import clickSound from "../assets/button.m4a"; 

import {  
  ExternalLink, Copy, Check, Users, Sparkles, Bot, Scale, Heart, Globe, ArrowRight, FolderOpen, FileText
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

  const brandFiles = [
    { name: "2026 Daily Timetable", path: SchedulePDF, type: "pdf" }, 
    { name: "The Masterplan", path: MasterplanPDF, type: "pdf" },
    { name: "Magic Worlds Guide", path: MagicWorldsPDF, type: "pdf" },
    { name: "Flame Foundation Guide", path: FlameFoundationPDF, type: "pdf" },
    { name: "Assets (GDrive)", path: "https://drive.google.com/drive/folders/1gyPVyYdPpXL-SbvInD6IWueCsK51k4sU?usp=drive_link", type: "drive" },
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

        <div className="grid lg:grid-cols-12 gap-px bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 mb-24">
          
          {/* Left Column (Commandments + Incubator) */}
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

            {/* Incubator Highlight */}
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

          {/* Right Column (Dynamic Links) */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 space-y-12">
            
            <div className="space-y-6">
              {/* Tab UI toggler */}
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

              {/* Links List */}
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

        {/* Master Bot Section */}
        <div className="mt-24 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 p-12 md:p-20 border-t-8 border-orange-600 relative overflow-hidden text-center">
          <Bot className="w-16 h-16 text-orange-600 mx-auto mb-10" />
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-8">
            Supporting the <br/><span className="text-orange-600 not-italic uppercase">Busy Family.</span>
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 text-lg max-w-3xl mx-auto leading-relaxed mb-16 font-medium uppercase tracking-tight">
            Extra tasks lead to excessive stress. Our Flame Foundation feeds into a dedicated 
            <span className="text-white dark:text-black font-black"> Magic World Master Bot</span> to manage your life with precision.
          </p>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/10 dark:bg-zinc-200 border border-white/10 dark:border-zinc-200">
            {[
              { icon: <Scale size={24}/>, title: "Life Management", desc: "Money, jobs, legal prep, and stress coping." },
              { icon: <Heart size={24}/>, title: "Modern Living", desc: "Relationships, relaxation, and sustainable fun." },
              { icon: <Globe size={24}/>, title: "Universal Good", desc: "Improving the universe for all sentient beings." }
            ].map((box, i) => (
              <div key={i} className="bg-zinc-900 dark:bg-white p-10 text-left hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-colors">
                <div className="text-orange-600 mb-6">{box.icon}</div>
                <h5 className="font-black uppercase italic text-xl tracking-tight mb-3">{box.title}</h5>
                <p className="text-xs uppercase font-medium text-zinc-400 dark:text-zinc-500 leading-relaxed tracking-wider">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section - Your exact setup positioned at the bottom */}
        <div id="resources" className="space-y-4 mt-24">
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

        {/* Action CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/signin" 
            className="inline-block bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-colors rounded-lg shadow-lg shadow-orange-600/20 w-full sm:w-auto text-center"
          >
            More Info
          </Link>
          <Link 
            to="/signin" 
            className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded-lg shadow-lg shadow-zinc-900/10 w-full sm:w-auto text-center"
          >
            Sign In
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
