import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added for routing
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import cebu from "@/assets/cebu.jpeg";
import glow from "@/assets/glow.png";
import dewdrops from "@/assets/dewdrops.jpeg";

const EventsSection = () => {
  // Setup state to make the calendar dynamic
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulated dynamic fetch from a calendar API or backend
    const fetchCalendarEvents = async () => {
      const mockCalendarData = [
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
      setEvents(mockCalendarData);
    };

    fetchCalendarEvents();
  }, []);

  return (
    <section id="news" className="py-24 bg-white dark:bg-black font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - Renamed to Events */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
              <span className="text-orange-600 not-italic uppercase">Events</span>
            </h2>
          </div>
          <div className="h-[1px] flex-grow bg-zinc-100 dark:bg-zinc-800 hidden md:block mx-12 mb-4" />
        </div>

        {/* Dynamic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          {events.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-zinc-950 flex flex-col h-full transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              {/* Image Container */}
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

        {/* CTA Section - Full Calendar & Login */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/calendar" 
            className="flex items-center justify-center gap-2 bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-colors rounded-lg shadow-lg shadow-orange-600/20 w-full sm:w-auto text-center"
          >
            Full Calendar <ArrowRight size={14} />
          </Link>
          <Link 
            to="/login" 
            className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded-lg shadow-lg shadow-zinc-900/10 w-full sm:w-auto text-center"
          >
            Log In
          </Link>
        </div>

      </div>
    </section>
  );
};

export default EventsSection;
