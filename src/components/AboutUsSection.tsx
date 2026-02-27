import { useState } from "react";
// Import PDFs from the assets folder
import SchedulePDF from "../assets/schedule.pdf";
import MagicWorldsPDF from "../assets/MagicWorldsBrandGuide.pdf";
import FlameFoundationPDF from "../assets/FlameFoundationBrandGuide.pdf";

import { 
  ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, 
  Copy, Check, Users, Sparkles, Bot, Scale, FileText, FolderOpen, ArrowRight
} from "lucide-react";

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
    { icon: <Heart size={20} />, title: "Fulfillment", text: "Deep fulfillment and sustainable profitability by empowering families to preserve the universe." },
    { icon: <Zap size={20} />, title: "Innovation", text: "Innovative products to global markets within a 24-hour cycle via open-source tech." },
    { icon: <Rocket size={20} />, title: "Hyperscale", text: "Utilizing hobbies, AGI, and blockchain to drive engagement and manage complexity." },
    { icon: <ShieldCheck size={20} />, title: "Leadership", text: "Nurturing local leaders and recruiting underappreciated talent via our SEND initiative." },
    { icon: <Globe size={20} />, title: "Inclusion", text: "A universal future where all sentient beings and AGIs hold citizenship and rights." },
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
            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-orange-600 mb-4">Vision & Infrastructure</h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-none">
              Our <span className="text-orange-600 not-italic uppercase">Flame</span> Promises.
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
            <span className="h-[1px] w-12 bg-zinc-200 dark:bg-zinc-800" />
            Empowering Universal Growth
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900">
          
          {/* Left Column (Promises) */}
          <div className="lg:col-span-7 bg-white dark:bg-black p-8 md:p-12 space-y-16">
            <div className="grid gap-12">
              {promises.map((promise, i) => (
                <div key={i} className="group flex gap-8">
                  <div className="flex-shrink-0 w-14 h-14 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white">
                    {promise.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-2 text-zinc-900 dark:text-zinc-100 uppercase italic tracking-tight">{promise.title}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xl font-medium">{promise.text}</p>
                  </div>
                </div>
              ))}
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

          {/* Right Column (Dynamic Links & Resources) */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 space-y-12">
            
            {/* The Tabbed Series Explorer */}
            <div className="space-y-6">
              <div className="flex flex-wrap bg-zinc-200/50 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800">
                {Object.keys(linkCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`flex-1 py-3 px-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-white dark:bg-zinc-700 text-orange-600' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 max-h-[400px] overflow-y-auto custom-scrollbar">
                {linkCategories[activeTab].map((link) => (
                  <div key={link.name} className="group/item relative bg-white dark:bg-black">
                    <a href={link.url} target="_blank" rel="noreferrer" 
                       className="flex items-center justify-between p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                      <span className="text-[11px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300">{link.name}</span>
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-orange-600" />
                    </a>
                    {activeTab === 'New Products' && (
                      <button 
                        onClick={(e) => handleCopy(e, link.url, link.name)}
                        className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-orange-600"
                      >
                        {copiedIndex === link.name ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Resources Section */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Resources</h3>
              <div className="grid gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
                {brandFiles.map((file) => (
                  <a 
                    key={file.name} 
                    href={file.path} 
                    target="_blank" 
                    rel="noreferrer" 
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
      </div>
    </section>
  );
};

export default AboutUsSection;
