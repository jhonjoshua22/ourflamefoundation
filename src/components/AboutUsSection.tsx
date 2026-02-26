import { useState } from "react";
// Import PDFs from the assets folder
import SchedulePDF from "../assets/schedule.pdf";
import MagicWorldsPDF from "../assets/MagicWorldsBrandGuide.pdf";
import FlameFoundationPDF from "../assets/FlameFoundationBrandGuide.pdf";

import { 
  ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, 
  Copy, Check, Users, Sparkles, Bot, Scale, FileText, FolderOpen, ArrowRight, Target, Star, Shield
} from "lucide-react";

// CUSTOM RANK VECTORS
const RankIcon = ({ type }) => {
  if (type === "Bronze") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-orange-700/20 stroke-orange-600 stroke-2 animate-pulse">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
  if (type === "Silver") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-zinc-400/20 stroke-zinc-400 stroke-2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-yellow-500/20 stroke-yellow-500 stroke-2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
};

const AboutUsSection = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Clean");

  const handleCopy = (e, url, name) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setCopiedIndex(name);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const promises = [
    { icon: <Heart size={20} />, title: "Fulfillment", text: "Deep fulfillment and sustainable profitability by empowering families to preserve the universe.", rank: "Bronze Scout" },
    { icon: <Zap size={20} />, title: "Innovation", text: "Innovative products to global markets within a 24-hour cycle via open-source tech.", rank: "Silver Trooper" },
    { icon: <Rocket size={20} />, title: "Hyperscale", text: "Utilizing hobbies, AGI, and blockchain to drive engagement and manage complexity.", rank: "Gold Angel" },
    { icon: <ShieldCheck size={20} />, title: "Leadership", text: "Nurturing local leaders and recruiting underappreciated talent via our SEND initiative.", rank: "Silver Trooper" },
    { icon: <Globe size={20} />, title: "Inclusion", text: "A universal future where all sentient beings and AGIs hold citizenship and rights.", rank: "Bronze Scout" },
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
    ]
  };

  const brandFiles = [
    { name: "2026 Daily Timetable", path: SchedulePDF, type: "pdf" }, 
    { name: "Magic Worlds Guide", path: MagicWorldsPDF, type: "pdf" },
    { name: "Flame Foundation Guide", path: FlameFoundationPDF, type: "pdf" },
    { name: "Assets (GDrive)", path: "https://drive.google.com/drive/folders/1gyPVyYdPpXL-SbvInD6IWueCsK51k4sU?usp=drive_link", type: "drive" },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-orange-600 mb-4 animate-bounce">Mission Objectives</h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-none">
              The <span className="text-orange-600 not-italic uppercase">Flame</span> Ranks.
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
            <span className="h-[1px] w-12 bg-zinc-200 dark:bg-zinc-800" />
            Progression: Scout → Trooper → Angel
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900">
          
          {/* Left Column (Promises / Missions) */}
          <div className="lg:col-span-7 bg-white dark:bg-black p-8 md:p-12 space-y-16">
            <div className="grid gap-12">
              {promises.map((promise, i) => (
                <div key={i} className="group flex gap-8 relative">
                  <div className="flex-shrink-0 w-14 h-14 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-orange-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white group-hover:rotate-12">
                    {promise.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] font-black bg-orange-600/10 text-orange-600 px-2 py-0.5 uppercase tracking-tighter">
                            {promise.rank}
                        </span>
                    </div>
                    <h4 className="font-black text-xl mb-2 text-zinc-900 dark:text-zinc-100 uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">{promise.title}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xl font-medium">{promise.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gamified Highlight Box */}
            <div className="p-10 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-l-4 border-orange-600 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                 <RankIcon type="Bronze" />
              </div>
              <h4 className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                <Target size={14} className="animate-spin-slow"/> Current Deployment
              </h4>
              <p className="text-2xl font-black leading-tight uppercase italic mb-8">
                Building the Infrastructure of the Future. Every task completed earns you Flame Cred.
              </p>
              <div className="w-full bg-white/10 h-1 mb-8">
                <div className="bg-orange-600 h-full w-1/3 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Column (Inventory / Links) */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Access Terminal</h3>
              <div className="flex flex-wrap bg-zinc-200/50 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800">
                {Object.keys(linkCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`flex-1 py-3 px-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-orange-600 text-white scale-105 shadow-lg z-10' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 max-h-[400px] overflow-y-auto custom-scrollbar">
                {linkCategories[activeTab].map((link) => (
                  <div key={link.name} className="group/item relative bg-white dark:bg-black overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-0 bg-orange-600/5 group-hover/item:w-full transition-all duration-300" />
                    <a href={link.url} target="_blank" rel="noreferrer" 
                       className="relative flex items-center justify-between p-5 hover:pl-8 transition-all">
                      <span className="text-[11px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300">{link.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] font-bold text-orange-600 opacity-0 group-hover/item:opacity-100 tracking-tighter transition-opacity">LAUNCH_FILE</span>
                        <ArrowRight size={14} className="text-orange-600 -translate-x-4 group-hover/item:translate-x-0 transition-transform" />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources with Gamified Icons */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Mission Intel</h3>
              <div className="grid gap-4">
                {brandFiles.map((file) => (
                  <a 
                    key={file.name} 
                    href={file.path} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-5 p-4 bg-white dark:bg-black border border-zinc-100 dark:border-zinc-900 hover:border-orange-600 transition-all group hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]"
                  >
                    <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-orange-600 group-hover:rotate-[360deg] transition-transform duration-700">
                      {file.type === 'drive' ? <FolderOpen size={18}/> : <FileText size={18}/>}
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{file.name}</p>
                    </div>
                    <ExternalLink size={14} className="text-zinc-300 group-hover:text-orange-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Master Bot Section (Final Boss Style) */}
        <div className="mt-24 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 p-12 md:p-20 border-t-8 border-orange-600 relative overflow-hidden text-center group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.1)_0%,transparent_70%)]" />
          <Bot className="w-20 h-20 text-orange-600 mx-auto mb-10 group-hover:scale-125 transition-transform duration-500" />
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-8 relative">
            The <span className="text-orange-600 not-italic uppercase">Master Bot.</span>
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 text-lg max-w-3xl mx-auto leading-relaxed mb-16 font-medium uppercase tracking-tight relative">
             Command your life through the <span className="text-white dark:text-black font-black">Flame Network</span>. Precision management for the ultimate family unit.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { icon: <Scale size={24}/>, title: "Tactical Prep", desc: "Money, jobs, and legal readiness." },
              { icon: <Heart size={24}/>, title: "Morale Boost", desc: "Relationships and sustainable joy." },
              { icon: <Globe size={24}/>, title: "Galaxy Good", desc: "Universal sentience protection." }
            ].map((box, i) => (
              <div key={i} className="bg-white/5 dark:bg-zinc-100 p-8 text-left hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-help">
                <div className="mb-6">{box.icon}</div>
                <h5 className="font-black uppercase italic text-xl tracking-tight mb-3">{box.title}</h5>
                <p className="text-[10px] uppercase font-medium leading-relaxed tracking-wider opacity-70">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
