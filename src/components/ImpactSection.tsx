import React, { useState } from "react";
import { ChevronDown, ChevronUp, PlayCircle, ArrowUpRight, X, Calendar, Youtube } from "lucide-react";

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
// This link forces an event creation screen that invites your gmail account automatically
const BOOKING_LINK = "https://calendar.google.com/calendar/u/0/r/eventedit?add=ourflamefoundation@gmail.com";

const lessonItems = [
  { image: community1, title: "FLAME JOBS", description: "Live Mon 10:00 EMEA", details: "Description coming soon" },
  { image: community2, title: "MAGIC MONEY", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: community3, title: "FLAME LEGAL", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: community5, title: "SUPERPETS", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { 
    image: community6, 
    title: "FREE HOLIDAYS", 
    description: "Live daily 6:15 GMT", 
    details: "Our holiday and travel brand offers free services to cashstrapped families especially during school holidays when the travelling industry price gouge. We have properties with our partners around the world and our top partners must be willing to offer accommodation when safe and feasible on a couch surfing or room sharing or airbed providing basis. On a bigger scale we have retreats to help stressed families refind their spirituality and understand that the rat race is a bad choice not an essential. Dates & details to follow" 
  },
  { image: community7, title: "HAPPY HEALTH", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: community8, title: "PITCH YOUR IDEA", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: community9, title: "TOP SINGER MALE", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: community11, title: "FILM AUDITION", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: community12, title: "BOOK CONTRACT", description: "Live daily 6:15 GMT", details: "Description coming soon" },
];

const ourWorldItems = [
  { image: football, title: "FOOTBALL WORLD", description: "Live Wed 20:00 UTC", details: "Description coming soon" },
  { image: art, title: "ART WORLD", description: "Live Fri 10:00 UTC", details: "Description coming soon" },
  { image: writer, title: "WRITER WORLD", description: "Live Fri 10:00 UTC", details: "Description coming soon" },
  { image: fashion, title: "FASHION WORLD", description: "Live Thu 20:00 UTC", details: "Description coming soon" },
  { image: education, title: "EDUCATION WORLD", description: "Live Tue 20:00 UTC", details: "Description coming soon" },
  { image: badminton, title: "BADMINTON WORLD", description: "Live daily 6:15 GMT", details: "Description coming soon" },
];

const otherServiceItems = [
  { image: childsdream, title: "CHILD'S DREAM 2026", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: motel, title: "MO MOTELS", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: food, title: "MO FOOD", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: clothes, title: "MO CLOTHES", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: play2world, title: "PLAY2WORLD", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: joshua, title: "JOSHUA'S PRODUCTS", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: emeka, title: "EMEKA'S PRODUCTS", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: moyasis, title: "MOYASIS' PRODUCTS", description: "Live daily 6:15 GMT", details: "Description coming soon" },
  { image: homecare, title: "HOME CARE", description: "Live Sat 11:00 EMEA", details: "Description coming soon" },
  { image: aitraining, title: "AI TRAINING", description: "Live Fri 11:00 EMEA", details: "Description coming soon" },
];

const ItemCard = ({ item, onClick }) => (
  <button 
    onClick={() => onClick(item)}
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
          <ItemCard key={`${title}-${index}`} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
};

const ImpactSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="impact" className="py-24 bg-white dark:bg-black font-sans relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-[0.85]">
            Global <br /> <span className="text-orange-600 not-italic uppercase">Footprint</span>
          </h2>
          <div className="h-1 w-24 bg-orange-600 mt-8 mb-6" />
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed uppercase font-medium tracking-tight">
            Explore our ecosystem of training, community hubs, and essential foundations.
          </p>
        </div>

        <div className="space-y-4">
          <CategorySection title="Educational Framework" items={lessonItems} onItemClick={setSelectedItem} />
          <CategorySection title="The Worlds" items={ourWorldItems} onItemClick={setSelectedItem} />
          <CategorySection title="Humanitarian Services" items={otherServiceItems} onItemClick={setSelectedItem} />
        </div>

        {/* --- TRUSTPILOT WIDGET --- */}
        <div className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 text-center">Community Verified</p>
            <div 
              className="trustpilot-widget" 
              data-locale="en-US" 
              data-template-id="56278e9abfbbba0bdcd568bc" 
              data-businessunit-id="699ebadf007f4226955833d3" 
              data-style-height="52px" 
              data-style-width="100%" 
              data-token="4e8d4fbe-5696-46e2-b37e-ae0f6476f3a2"
            >
                <a href="https://www.trustpilot.com/review/ourflamefoundation.vercel.app" target="_blank" rel="noopener noreferrer">Trustpilot</a>
            </div>
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
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

                <div className="mt-auto space-y-3">
                  <a 
                    href={YOUTUBE_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest text-xs transition-colors"
                  >
                    <Youtube size={18} /> Watch on YouTube
                  </a>
                  <a 
                    href={BOOKING_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    <Calendar size={18} /> Choose Date & Book
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Click Outside to Close */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedItem(null)} />
        </div>
      )}
    </section>
  );
};

export default ImpactSection;
