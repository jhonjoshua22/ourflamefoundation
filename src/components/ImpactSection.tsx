import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle, ArrowUpRight, X, Youtube, Calendar } from "lucide-react";
import clickSound from "@/assets/button.m4a";

// --- ASSET IMPORTS ---
import community1 from "@/assets/jobs.png";
import community2 from "@/assets/money.jpeg";
import community3 from "@/assets/legal.png";
import community5 from "@/assets/superpets.jpeg";
import community6 from "@/assets/holidays.jpeg";
import community7 from "@/assets/health.jpeg";
import community9 from "@/assets/malesinger.jpeg";
import community11 from "@/assets/film.jpeg";
import community12 from "@/assets/bookcontract.jpeg";
import joshua from "@/assets/joshua.png";
import moyasis from "@/assets/moyasis.png";
import emeka from "@/assets/emeka.png";
import food from "@/assets/food.png";
import childsdream from "@/assets/childsdream.png";
import motel from "@/assets/motel.png";
import clothes from "@/assets/clothes.png";
import play2world from "@/assets/play2world.png";
import education from "@/assets/education.png";
import football from "@/assets/football.png";
import art from "@/assets/art.png";
import writer from "@/assets/writer.png";
import badminton from "@/assets/badminton.png";
import fashion from "@/assets/fashion.png";
import aitraining from "@/assets/aitraining.jpeg";
import homecare from "@/assets/homecare.jpeg";

const YOUTUBE_LINK = "https://www.youtube.com/@MagicworldsTV/playlists";
const CALENDLY_LINK = "https://calendly.com/ourflamefoundation/30min?back=1";

const playClickSound = () => {
  new Audio(clickSound).play().catch(() => {});
};

// 7 MAIN BUNDLES REGROUPED
const bundleItems = [
  { 
    image: childsdream, 
    title: "Crisis & Education", 
    description: "Mondays 21:00 UTC", 
    details: "Crisis Packages & Education Workshops. Dedicated to immediate humanitarian relief and fundamental learning frameworks." 
  },
  { 
    image: community7, 
    title: "Healthy Life", 
    description: "Tuesdays 21:00 UTC", 
    details: "Healthy Life Workshops. Focusing on physical wellness, mental health, and sustainable lifestyle choices for families." 
  },
  { 
    image: community2, 
    title: "Magic Money & Jobs", 
    description: "Wednesdays 21:00 UTC", 
    details: "Magic Money & Flame Jobs Workshops. Fusing financial literacy with live job opportunities and economic empowerment." 
  },
  { 
    image: community3, 
    title: "Legal & Gov", 
    description: "Thursdays 21:00 UTC", 
    details: "Legal & Gov Workshops. Helping families navigate complex institutional systems, rights, and governmental paperwork." 
  },
  { 
    image: aitraining, 
    title: "Space & Robots", 
    description: "Fridays 21:00 UTC", 
    details: "Space & Robots Workshops. Exploring AI training, future tech, and the expanding horizons of science and robotics." 
  },
  { 
    image: community6, 
    title: "Love Workshops", 
    description: "Saturdays 21:00 UTC", 
    details: "Love & Relationship Workshops. Community-driven sessions on empathy, spiritual retreats, and family bonding." 
  },
  { 
    image: community11, 
    title: "Entertainment Bundle", 
    description: "Sundays 21:00 UTC", 
    details: "Film, Music, Fashion, Sport, and Gaming. A weekly showcase of creative worlds including Film Auditions, Top Singer, and Gaming leagues." 
  },
];

const productItems = [
  { image: food, title: "MO FOOD", description: "Essential Nutrition", details: "Direct supply of nutritional essentials for the community." },
  { image: clothes, title: "MO CLOTHES", description: "Flame Apparel", details: "Sustainable and affordable community clothing lines." },
  { image: motel, title: "MO MOTELS", description: "Community Stays", details: "Temporary accommodation and shelter solutions." },
  { image: joshua, title: "JOSHUA'S PRODUCTS", description: "Signature Line", details: "Bespoke products curated by Joshua." },
  { image: emeka, title: "EMEKA'S PRODUCTS", description: "Signature Line", details: "Bespoke products curated by Emeka." },
  { image: moyasis, title: "MOYASIS' PRODUCTS", description: "Signature Line", details: "Bespoke products curated by Moyasis." },
  { image: play2world, title: "PLAY2WORLD", description: "Gaming Tech", details: "Interactive hardware and digital assets for the gaming ecosystem." },
];

const ourWorldItems = [
  { image: football, title: "FOOTBALL WORLD", description: "Sports Ecosystem", details: "Global scouting and training for the beautiful game." },
  { image: art, title: "ART WORLD", description: "Creative Expression", details: "Galleries, training, and digital art marketplaces." },
  { image: writer, title: "WRITER WORLD", description: "Literary Hub", details: "From Book Contracts to creative writing workshops." },
  { image: fashion, title: "FASHION WORLD", description: "Design Lab", details: "Modern aesthetics meeting sustainable production." },
  { image: badminton, title: "BADMINTON WORLD", description: "Athletic Hub", details: "Community sports and professional training tracks." },
  { image: community5, title: "SUPERPETS", description: "Animal Welfare", details: "Training and care for our non-human companions." },
];

const ItemCard = ({ item, onClick }) => (
  <button 
    onClick={() => {
      playClickSound();
      onClick(item);
    }}
    className="group relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 rounded-none border border-zinc-200/10 text-left outline-none"
  >
    <img
      src={item.image}
      alt={item.title}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
    
    <div className="absolute bottom-0 left-0 p-6 w-full">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-black text-white uppercase italic tracking-tight leading-none mb-2">
            {item.title}
          </h3>
          <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em]">
            {item.description}
          </p>
        </div>
        <ArrowUpRight size={20} className="text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0" />
      </div>
    </div>
    
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayCircle size={48} className="text-orange-600 drop-shadow-2xl" />
    </div>
  </button>
);

const CategorySection = ({ title, items, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? items : items.slice(0, 3);

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-4">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xs font-black tracking-[0.4em] uppercase text-orange-600">
          {title}
        </h3>
        {items.length > 3 && (
          <button 
            onClick={() => {
              playClickSound();
              setIsExpanded(!isExpanded);
            }}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2"
          >
            {isExpanded ? "Collapse" : `View All ${items.length}`}
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {displayItems.map((item, index) => (
          <ItemCard key={`${title}-${index}`} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
};

const ImpactSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    playClickSound();
    setSelectedItem(null);
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-black font-sans relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-[0.85]">
            Global <br /> <span className="text-orange-600 not-italic uppercase">Ecosystem</span>
          </h2>
          <div className="h-1 w-24 bg-orange-600 mt-8 mb-6" />
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed uppercase font-medium tracking-tight">
            Explore our scheduled training bundles, specialized worlds, and product lines.
          </p>
        </div>

        <div className="space-y-4">
          <CategorySection title="Weekly Training Bundles" items={bundleItems} onItemClick={setSelectedItem} />
          <CategorySection title="Product Ecosystem" items={productItems} onItemClick={setSelectedItem} />
          <CategorySection title="The Worlds" items={ourWorldItems} onItemClick={setSelectedItem} />
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-[110] p-2 bg-black/50 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto h-full max-h-[400px] md:max-h-none">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-orange-600 font-black tracking-widest text-[10px] mb-2 uppercase">{selectedItem.description}</span>
                <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase italic mb-6 leading-none tracking-tighter">{selectedItem.title}</h2>
                <div className="overflow-y-auto max-h-[250px] pr-4 custom-scrollbar mb-8">
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedItem.details}
                  </p>
                </div>

                {/* Button Group Container */}
                <div className="mt-auto space-y-3">
                  <a 
                    href={YOUTUBE_LINK} 
                    onClick={playClickSound}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest text-xs transition-colors"
                  >
                    <Youtube size={18} /> Watch Live Workshops
                  </a>
                  
                  <a 
                    href={CALENDLY_LINK} 
                    onClick={playClickSound}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-black uppercase tracking-widest text-xs transition-all"
                  >
                    <Calendar size={18} /> Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={handleClose} />
        </div>
      )}
    </section>
  );
};

export default ImpactSection;
