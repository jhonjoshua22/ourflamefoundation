import { useState } from "react";
// 1. Import your PDFs from the assets folder
import MagicWorldsPDF from "../assets/MagicWorldsBrandGuide.pdf";
import FlameFoundationPDF from "../assets/FlameFoundationBrandGuide.pdf";

import { 
  ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, 
  Copy, Check, Users, Sparkles, Bot, Scale, Plane, Gift, Package, Handshake,
  FileText, FolderOpen, ArrowRight
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
    { icon: <Heart />, title: "Fulfillment", text: "Deep fulfillment and sustainable profitability by empowering families to preserve the universe." },
    { icon: <Zap />, title: "Innovation", text: "Innovative products to global markets within a 24-hour cycle via open-source tech." },
    { icon: <Rocket />, title: "Hyperscale", text: "Utilizing hobbies, AGI, and blockchain to drive engagement and manage complexity." },
    { icon: <ShieldCheck />, title: "Leadership", text: "Nurturing local leaders and recruiting underappreciated talent via our SEND initiative." },
    { icon: <Globe />, title: "Inclusion", text: "A universal future where all sentient beings and AGIs hold citizenship and rights." },
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
    Partners: [
      { name: "2026 I Dream For", url: "https://2026idreamfor.vercel.app/" },
      { name: "Magic Money", url: "http://34.14.136.156:8080/login"},
      { name: "Flame Tablets", url: "https://flametablets.vercel.app/" },
    ]
  };

  const brandFiles = [
    { name: "Magic Worlds Guide", path: MagicWorldsPDF, type: "pdf" },
    { name: "Flame Foundation Guide", path: FlameFoundationPDF, type: "pdf" },
    { name: "Assets (GDrive)", path: "https://drive.google.com/drive/folders/1gyPVyYdPpXL-SbvInD6IWueCsK51k4sU?usp=drive_link", type: "drive" },
  ];

  return (
    <section id="about" className="py-24 bg-[#fafafa] dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black tracking-[0.3em] uppercase text-orange-600 mb-4">Vision & Infrastructure</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white italic">
              Our <span className="text-orange-600">Flame</span> Promises.
            </h1>
          </div>
          <div className="flex items-center gap-4 text-zinc-400 font-medium">
            <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-800" />
            Empowering Universal Growth
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column (Promises) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="grid gap-10">
              {promises.map((promise, i) => (
                <div key={i} className="group flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    {promise.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-100">{promise.title}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">{promise.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Incubator Highlight */}
            <div className="p-8 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xl relative overflow-hidden">
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10 rotate-12" />
              <h4 className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-6">
                <Users size={16}/> Incubator of Incubators
              </h4>
              <p className="text-lg font-medium leading-relaxed opacity-90 mb-6">
                A global collective of 100+ engineers building in public. We 10x every 2 months via AI, Blockchain, and Creative Hardware.
              </p>
              <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10 dark:border-black/10">
                {["Prediction", "Trustless", "Engaging", "Protection"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/20 dark:border-black/20 text-[10px] font-black uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Dynamic Links & Resources) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* The Tabbed Series Explorer */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-xl">
              <div className="flex flex-wrap gap-2 mb-6 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                {Object.keys(linkCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${activeTab === cat ? 'bg-white dark:bg-zinc-700 text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {linkCategories[activeTab].map((link) => (
                  <div key={link.name} className="group/item relative">
                    <a href={link.url} target="_blank" rel="noreferrer" 
                       className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-orange-50 dark:hover:bg-orange-950/20 border border-transparent hover:border-orange-200 transition-all">
                      <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{link.name}</span>
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-orange-600" />
                    </a>
                    {activeTab === 'Partners' && (
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
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 ml-4">Resources</h3>
              <div className="grid gap-3">
                {brandFiles.map((file) => (
                  <a key={file.name} href={file.path} target="_blank" rel="noreferrer"
                     className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                      {file.type === 'drive' ? <FolderOpen size={20}/> : <FileText size={20}/>}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase">{file.name}</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">{file.type === 'drive' ? 'Cloud Assets' : 'Documentation'}</p>
                    </div>
                    <ExternalLink size={14} className="text-zinc-300 group-hover:text-orange-600 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Conclusion / Master Bot Section */}
        <div className="mt-24 bg-gradient-to-b from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-[3rem] p-12 border border-orange-100 dark:border-zinc-800 relative overflow-hidden text-center">
          <Bot className="w-16 h-16 text-orange-600 mx-auto mb-8 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Supporting the <span className="text-orange-600 italic">Busy Family.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Extra tasks lead to excessive stress. Our Flame Foundation feeds into a dedicated 
            <strong> Magic World Master Bot</strong> to manage your life with precision.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Scale />, title: "Life Management", desc: "Money, jobs, legal prep, and stress coping." },
              { icon: <Heart />, title: "Modern Living", desc: "Relationships, relaxation, and sustainable fun." },
              { icon: <Globe />, title: "Universal Good", desc: "Improving the universe for all sentient beings." }
            ].map((box, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 text-left">
                <div className="text-orange-600 mb-4">{box.icon}</div>
                <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">{box.title}</h5>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
