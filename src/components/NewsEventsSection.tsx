import { Calendar, MapPin } from "lucide-react";
import cebu from "@/assets/cebu.jpeg";
import glow from "@/assets/glow.png";
import dewdrops from "@/assets/dewdrops.jpeg";

const NewsEventsSection = () => {
  const events = [
    {
      title: "Glow and Tell",
      description: "An empowering event for women owning their menopause journey.",
      date: "October 12, 2025",
      location: "Beverly Hills, CA",
      image: glow,
      type: "Event",
    },
    {
      title: "Relief Operations for Typhoon Tino",
      description: "Our team is currently on the ground delivering food, clean water, and medical supplies to affected families.",
      date: "December 13, 2025",
      location: "Cebu, Philippines",
      image: cebu,
      type: "News",
    },
    {
      title: "Dewdrops Care Development Foundation",
      description: "Providing children with essential tools for play, learning, and faith, ensuring every child feels like a hero.",
      date: "December 22, 2025",
      location: "Lagos, Nigeria",
      image: dewdrops,
      type: "Foundation",
    }
  ];

  return (
    <section id="news" className="py-24 bg-white dark:bg-black font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - Simple & Clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h4 className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              Updates & Engagements
            </h4>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
              News & <span className="text-orange-600 not-italic uppercase">Events</span>
            </h2>
          </div>
          <div className="h-[1px] flex-grow bg-zinc-100 dark:bg-zinc-800 hidden md:block mx-12 mb-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          {events.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-zinc-950 flex flex-col h-full transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              {/* Image Container - Sharp Edges */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-5 mb-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-orange-600" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange-600" />
                    {item.location}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight uppercase italic group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-10">
                  {item.description}
                </p>

                {/* Footer of Card */}
                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
                    {item.type}
                  </span>
                  <div className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700 group-hover:w-12 group-hover:bg-orange-600 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;
