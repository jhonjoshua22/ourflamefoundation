import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import cebu from "@/assets/cebu.jpeg";
import glow from "@/assets/glow.png";
import dewdrops from "@/assets/dewdrops.jpeg";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulated dynamic fetch
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
    <section id="news" className="py-24 bg-white dark:bg-black font-sans transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - Strictly Black/White */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white uppercase italic">
              <span className="text-orange-600 not-italic uppercase">Events</span>
            </h2>
          </div>
          <div className="h-[2px] flex-grow bg-black dark:bg-white hidden md:block mx-12 mb-4" />
        </div>

        {/* Dynamic Grid - No Grays */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black dark:bg-white border-2 border-black dark:border-white">
          {events.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-black flex flex-col h-full transition-colors hover:bg-orange-50/10"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden border-b-2 border-black dark:border-white">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-5 mb-8 text-[10px] font-black uppercase tracking-widest text-black dark:text-white">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-orange-600" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange-600" />
                    {item.location}
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-black dark:text-white tracking-tight leading-tight uppercase italic group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-black dark:text-white text-sm leading-relaxed mb-10 font-medium">
                  {item.description}
                </p>

                {/* Footer of Card */}
                <div className="mt-auto pt-6 border-t-2 border-black dark:border-white flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
                    {item.type}
                  </span>
                  <div className="w-8 h-[2px] bg-black dark:bg-white group-hover:w-12 group-hover:bg-orange-600 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Full Calendar Directed to Google Calendar Scheduling */}
        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="https://calendar.google.com/calendar/u/0/r?cid=ourflamefoundation@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-10 py-5 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all border-2 border-orange-600 w-full sm:w-auto text-center shadow-[8px_8px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)]"
          >
            Schedule on Calendar <ArrowRight size={14} />
          </a>
          <Link 
            to="/login" 
            className="inline-block bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-10 py-5 hover:bg-orange-600 hover:text-white transition-all border-2 border-black dark:border-white w-full sm:w-auto text-center shadow-[8px_8px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)]"
          >
            Member Log In
          </Link>
        </div>

      </div>
    </section>
  );
};

export default EventsSection;
