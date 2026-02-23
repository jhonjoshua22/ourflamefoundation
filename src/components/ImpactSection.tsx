import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle, ExternalLink } from "lucide-react";

// --- ASSET IMPORTS ---
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

// --- DATA ARRAYS ---
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

// --- COMPONENTS ---

const ItemCard = ({ item }) => (
  <a 
    href={YOUTUBE_LINK} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex flex-col bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
  >
    {/* Image Container */}
    <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Play Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <PlayCircle className="text-orange-600 w-8 h-8" />
        </div>
      </div>
    </div>

    {/* Content Area */}
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-orange-600 transition-colors">
          {item.title}
        </h3>
        <ExternalLink size={14} className="text-zinc-400 group-hover:text-orange-400 shrink-0" />
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-auto">
        {item.description}
      </p>
    </div>
  </a>
);

const CategorySection = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? items : items.slice(0, 3);

  return (
    <div className="mb-24 last:mb-0">
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-sm font-black tracking-[0.2em] uppercase text-orange-600 whitespace-nowrap">
          {title}
        </h3>
        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayItems.map((item, index) => (
          <ItemCard key={`${title}-${index}`} item={item} />
        ))}
      </div>
      
      {items.length > 3 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 px-8 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-full font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm active:scale-95"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={18} /></>
            ) : (
              <>Browse All {items.length} <ChevronDown size={18} /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-zinc-50/50 dark:bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Modern Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-widest mb-6">
            Impact Report 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-zinc-900 dark:text-white">
            Making a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">Difference</span> Together
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our interactive lessons, global worlds, and professional services. 
            Click any item to view the official playlist.
          </p>
        </div>

        {/* Content Sections */}
        <CategorySection title="Educational Lessons" items={lessonItems} />
        <CategorySection title="Our Worlds" items={ourWorldItems} />
        <CategorySection title="Specialized Services" items={otherServiceItems} />
      </div>
    </section>
  );
};

export default ImpactSection;
