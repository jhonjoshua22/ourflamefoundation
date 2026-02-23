import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle, ArrowUpRight } from "lucide-react";

// --- ASSET IMPORTS (Maintained) ---
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
  { image: community1, title: "FLAME JOBS", description: "Live Mon 10:00 EMEA" },
  { image: community2, title: "MAGIC MONEY", description: "Live daily 6:15 GMT" },
  { image: community3, title: "FLAME LEGAL", description: "Live daily 6:15 GMT" },
  { image: community5, title: "SUPERPETS", description: "Live daily 6:15 GMT" },
  { image: community6, title: "FREE HOLIDAYS", description: "Live daily 6:15 GMT" },
  { image: community7, title: "HAPPY HEALTH", description: "Live daily 6:15 GMT" },
  { image: community8, title: "PITCH YOUR IDEA", description: "Live daily 6:15 GMT" },
  { image: community9, title: "TOP SINGER MALE", description: "Live daily 6:15 GMT" },
  { image: community11, title: "FILM AUDITION", description: "Live daily 6:15 GMT" },
  { image: community12, title: "BOOK CONTRACT", description: "Live daily 6:15 GMT" },
];

const ourWorldItems = [
  { image: football, title: "FOOTBALL WORLD", description: "Live Wed 20:00 UTC" },
  { image: art, title: "ART WORLD", description: "Live Fri 10:00 UTC" },
  { image: writer, title: "WRITER WORLD", description: "Live Fri 10:00 UTC" },
  { image: fashion, title: "FASHION WORLD", description: "Live Thu 20:00 UTC" },
  { image: education, title: "EDUCATION WORLD", description: "Live Tue 20:00 UTC" },
  { image: badminton, title: "BADMINTON WORLD", description: "Live daily 6:15 GMT" },
];

const otherServiceItems = [
  { image: childsdream, title: "CHILD'S DREAM 2026", description: "Live daily 6:15 GMT" },
  { image: motel, title: "MO MOTELS", description: "Live daily 6:15 GMT" },
  { image: food, title: "MO FOOD", description: "Live daily 6:15 GMT" },
  { image: clothes, title: "MO CLOTHES", description: "Live daily 6:15 GMT" },
  { image: play2world, title: "PLAY2WORLD", description: "Live daily 6:15 GMT" },
  { image: joshua, title: "JOSHUA'S PRODUCTS", description: "Live daily 6:15 GMT" },
  { image: emeka, title: "EMEKA'S PRODUCTS", description: "Live daily 6:15 GMT" },
  { image: moyasis, title: "MOYASIS' PRODUCTS", description: "Live daily 6:15 GMT" },
  { image: homecare, title: "HOME CARE", description: "Live Sat 11:00 EMEA" },
  { image: aitraining, title: "AI TRAINING", description: "Live Fri 11:00 EMEA" },
];

const ItemCard = ({ item }) => (
  <a 
    href={YOUTUBE_LINK} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 rounded-none border border-zinc-200/10"
  >
    <img
      src={item.image}
      alt={item.title}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
    />
    {/* Permanent Overlay for Charity Look */}
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
  </a>
);

const CategorySection = ({ title, items }) => {
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
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-2"
          >
            {isExpanded ? "Collapse" : `View All ${items.length}`}
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {displayItems.map((item, index) => (
          <ItemCard key={`${title}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-white dark:bg-black font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Modern, Tight Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-[0.85]">
            Global <br /> <span className="text-orange-600 not-italic uppercase">Footprint</span>
          </h2>
          <div className="h-1 w-24 bg-orange-600 mt-8 mb-6" />
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed uppercase font-medium tracking-tight">
            Explore our ecosystem of training, community hubs, and essential foundations.
          </p>
        </div>

        {/* Dense Grid Sections */}
        <div className="space-y-4">
          <CategorySection title="Educational Framework" items={lessonItems} />
          <CategorySection title="The Worlds" items={ourWorldItems} />
          <CategorySection title="Humanitarian Services" items={otherServiceItems} />
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
