import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle, ExternalLink } from "lucide-react";

// --- ASSET IMPORTS (Maintained as requested) ---
import community1 from "@/assets/jobs.png";
import community2 from "@/assets/money.jpeg";
import community3 from "@/assets/legal.png";
import community5 from "@/assets/superpets.jpeg";
import community6 from "@/assets/holidays.jpeg";
import community7 from "@/assets/health.jpeg";
import community8 from "@/assets/pitch.jpeg";
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

const lessonItems = [
  { image: community1, title: "FLAME JOBS", description: "Live every Monday 10:00 EMEA" },
  { image: community2, title: "MAGIC MONEY TRAINING", description: "Live daily every 6:15GMT" },
  { image: community3, title: "FLAME LEGAL", description: "Live daily every 6:15GMT" },
  { image: community5, title: "SUPERPETS TRAINING", description: "Live daily every 6:15GMT" },
  { image: community6, title: "FREE HOLIDAYS", description: "Live daily every 6:15GMT" },
  { image: community7, title: "HAPPY HEALTH TRAINING", description: "Live daily every 6:15GMT" },
  { image: community8, title: "PITCH YOUR IDEA", description: "Live daily every 6:15GMT" },
  { image: community9, title: "TOP SINGER COMPETITION MALE", description: "Live daily every 6:15GMT" },
  { image: community11, title: "FILM AUDITION", description: "Live daily every 6:15GMT" },
  { image: community12, title: "BOOK CONTRACT PROCESS", description: "Live daily every 6:15GMT" },
];

const otherServiceItems = [
  { image: childsdream, title: "EVERY CHILD'S DREAM 2026", description: "Live daily every 6:15GMT" },
  { image: motel, title: "MO MOTELS", description: "Live daily every 6:15GMT" },
  { image: food, title: "MO FOOD", description: "Live daily every 6:15GMT" },
  { image: clothes, title: "MO CLOTHES", description: "Live daily every 6:15GMT" },
  { image: play2world, title: "PLAY2WORLD", description: "Live daily every 6:15GMT" },
  { image: joshua, title: "JOSHUA'S PRODUCTS", description: "Live daily every 6:15GMT" },
  { image: emeka, title: "EMEKA'S PRODUCTS", description: "Live daily every 6:15GMT" },
  { image: moyasis, title: "MOYASIS' PRODUCTS", description: "Live daily every 6:15GMT" },
  { image: homecare, title: "HOME CARE", description: "Live every Saturday 11:00 EMEA" },
  { image: aitraining, title: "AI TRAINING", description: "Live every Friday 11:00 EMEA" },
];

const ourWorldItems = [
  { image: football, title: "FOOTBALL WORLD", description: "Live every Wednesday 20:00 UTC" },
  { image: art, title: "ART WORLD", description: "Live every Friday 10:00 UTC" },
  { image: writer, title: "WRITER WORLD", description: "Live every Friday 10:00 UTC" },
  { image: fashion, title: "FASHION WORLD", description: "Live every Thursday 20:00 UTC" },
  { image: education, title: "EDUCATION WORLD", description: "Live every Tuesday 20:00 UTC" },
  { image: badminton, title: "BADMINTON WORLD", description: "Live daily every 6:15GMT" },
];

const ItemCard = ({ item }) => (
  <a 
    href={YOUTUBE_LINK} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex flex-row items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 hover:border-orange-600 rounded-none h-24 overflow-hidden"
  >
    {/* Compact Image Square */}
    <div className="relative aspect-square h-full overflow-hidden bg-zinc-100 shrink-0">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    {/* Content Area - Streamlined */}
    <div className="px-4 py-2 flex flex-col justify-center overflow-hidden">
      <h3 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-tight group-hover:text-orange-600 transition-colors truncate">
        {item.title}
      </h3>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mt-1">
        {item.description}
      </p>
    </div>
    
    <div className="ml-auto pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <PlayCircle size={18} className="text-orange-600" />
    </div>
  </a>
);

const CategorySection = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Show 6 items by default for better density (3 per row on desktop)
  const displayItems = isExpanded ? items : items.slice(0, 6);

  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-orange-600 whitespace-nowrap">
          {title}
        </h3>
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayItems.map((item, index) => (
          <ItemCard key={`${title}-${index}`} item={item} />
        ))}
      </div>
      
      {items.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all rounded-none"
        >
          {isExpanded ? (
            <>Collapse Details <ChevronUp size={14} /></>
          ) : (
            <>View More from {title} ({items.length}) <ChevronDown size={14} /></>
          )}
        </button>
      )}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 bg-white dark:bg-black font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Simplified, Professional Header */}
        <div className="border-l-4 border-orange-600 pl-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            Impact <span className="text-orange-600 not-italic uppercase">Report 2026</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-4 max-w-2xl leading-relaxed">
            Direct access to our training, community hubs, and essential services. 
            All sessions are archived on our official media channels.
          </p>
        </div>

        {/* Modular Content Sections */}
        <div className="space-y-16">
          <CategorySection title="Educational Framework" items={lessonItems} />
          <CategorySection title="Operational Worlds" items={ourWorldItems} />
          <CategorySection title="Specialized Foundations" items={otherServiceItems} />
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
