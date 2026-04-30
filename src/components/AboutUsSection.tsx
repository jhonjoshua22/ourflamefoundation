import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import clickSound from "../assets/button.m4a"; 

import {  
  ExternalLink, Copy, Check, ArrowRight, FolderOpen, FileText, Video, Flame, Star, Layers, Loader2
} from "lucide-react";

const AboutUsSection = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Clean");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: dbData, error } = await supabase
      .from("aboutus")
      .select("*")
      .order("sort_order", { ascending: true });
    
    if (dbData) {
      setData(dbData);
      // Set the first available category as active if "Clean" doesn't exist
      const categories = [...new Set(dbData.filter(i => i.category === 'link').map(i => i.sub_category))];
      if (categories.length > 0 && !categories.includes("Clean")) {
        setActiveTab(categories[0]);
      }
    }
    setLoading(false);
  };

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

  // Filter groups from the main data state
  const commandments = data.filter(i => i.category === 'commandment');
  const resources = data.filter(i => i.category === 'resource');
  const steps = data.filter(i => i.category === 'step');
  const links = data.filter(i => i.category === 'link');

  // Group links by their sub_category
  const linkCategories = links.reduce((acc: any, link) => {
    const cat = link.sub_category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(link);
    return acc;
  }, {});

  const getIcon = (type) => {
    switch(type) {
      case 'video': return <Video />;
      case 'flame': return <Flame />;
      case 'star': return <Star />;
      case 'drive': return <FolderOpen size={18}/>;
      default: return <FileText size={18}/>;
    }
  };

  if (loading) return (
    <div className="py-24 flex flex-col items-center justify-center bg-black min-h-[400px]">
      <Loader2 className="animate-spin text-orange-600 mb-4" size={32} />
      <p className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Synchronizing Database...</p>
    </div>
  );

  return (
    <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* SECTION 1: THE COMMANDMENTS */}
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
                <div className="text-orange-600 font-black text-2xl mb-4 italic">{cmd.title}</div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
                  {cmd.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: PRODUCT DIRECTORY */}
        {Object.keys(linkCategories).length > 0 && (
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
              {linkCategories[activeTab]?.map((link) => (
                <div key={link.id} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-600 transition-all">
                  <a href={link.url} target="_blank" rel="noreferrer" onClick={playClickSound} className="flex flex-col p-8 h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Platform</span>
                      <ArrowRight size={18} className="text-zinc-700 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase italic group-hover:text-orange-600 transition-colors">{link.title}</h4>
                    <p className="text-[10px] text-zinc-500 mt-auto pt-4 border-t border-zinc-800 uppercase tracking-tighter">
                      {link.url?.replace('https://', '')}
                    </p>
                  </a>
                  <button onClick={(e) => handleCopy(e, link.url, link.title)} className="absolute right-4 top-4 p-2 text-zinc-600 hover:text-orange-600 bg-black/50 rounded-lg">
                    {copiedIndex === link.title ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: RESOURCES */}
        <div id="resources" className="space-y-4 mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">Resources</h3>
          <div className="grid md:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
            {resources.map((file) => (
              <a key={file.id} href={file.url} target="_blank" rel="noreferrer" onClick={playClickSound} className="flex items-center gap-5 p-6 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-orange-600">
                  {getIcon(file.icon_type)}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{file.title}</p>
                </div>
                <ExternalLink size={14} className="text-zinc-300 group-hover:text-orange-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* SECTION 4: STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {steps.map((item, idx) => (
            <Link key={idx} to={item.url || "#"} onClick={playClickSound} className="block h-full">
              <div className="relative h-full p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm group transition-all duration-300 hover:border-orange-600/50 rounded-2xl cursor-pointer">
                <span className="text-6xl font-black text-zinc-900/5 dark:text-white/5 absolute top-4 right-4 group-hover:text-orange-600/10 transition-colors">
                  {item.title}
                </span>
                <div className="text-orange-600 mb-4 transition-transform group-hover:scale-110 duration-300">{getIcon(item.icon_type)}</div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 uppercase group-hover:text-orange-600 transition-colors">{item.content.split('|')[0]}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{item.content.split('|')[1] || item.content}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/login" className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-12 py-5 hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition-all rounded-xl shadow-xl w-full sm:w-auto text-center">
            Sign In to Magic Worlds
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
