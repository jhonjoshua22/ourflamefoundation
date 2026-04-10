import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, ExternalLink } from "lucide-react";

// Asset Imports
import cebu from "@/assets/cebu.jpeg";
import glow from "@/assets/glow.png";
import dewdrops from "@/assets/dewdrops.jpeg";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  // Replace this with your actual free Calendly link
  const CALENDLY_URL = "https://calendly.com/ourflamefoundation/30min?back=1"; 

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const mockCalendarData = [
        {
          title: "Glow and Tell",
          description: "An empowering event for women owning their menopause journey. Join us for a session of clarity and community.",
          date: "October 12, 2025",
          location: "Beverly Hills, CA",
          image: glow,
          type: "Event",
        },
        {
          title: "Relief Operations: Typhoon Tino",
          description: "Our team is deployed on the ground delivering food, clean water, and medical supplies to affected families.",
          date: "December 13, 2025",
          location: "Cebu, Philippines",
          image: cebu,
          type: "News",
        },
        {
          title: "Dewdrops Care Development",
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
        
        {/* Header - High Contrast Protocol */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-white">
                Global Operations
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white uppercase italic leading-none">
              Join Our <span className="text-orange-600 not-italic">Events</span>
            </h2>
          </div>
          <div className="h-[2px] flex-grow bg-black dark:bg-white hidden md:block mx-12 mb-4" />
        </div>

        {/* Dynamic Grid - Full Color Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black dark:bg-white border-4 border-black dark:border-white shadow-[20px_20px_0px_rgba(234,88,12,0.1)]">
          {events.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-black flex flex-col h-full transition-all duration-300"
            >
              {/* Image Container - ✅ FULL COLOR */}
              <div className="relative aspect-square overflow-hidden border-b-4 border-black dark:border-white bg-black">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest shadow-lg">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex flex-col gap-3 mb-8 text-[10px] font-black uppercase tracking-widest text-black dark:text-white">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-orange-600" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-orange-600" />
                    {item.location}
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-6 text-black dark:text-white tracking-tight leading-none uppercase italic group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-black dark:text-white text-sm leading-relaxed mb-10 font-bold border-l-2 border-orange-600 pl-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Free Booking via Calendly */}
        <div className="mt-24 flex flex-col items-center space-y-8">
          <div className="text-center space-y-2">
            <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs">Secure Your Slot</p>
            <h3 className="text-3xl font-black text-black dark:text-white uppercase italic">Collaborate with the Foundation</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
            {/* THIS IS THE BOOKING BUTTON */}
            <a 
              href={CALENDLY_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-orange-600 text-white text-sm font-black uppercase tracking-[0.2em] px-12 py-6 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all border-4 border-orange-600 w-full sm:w-auto text-center shadow-[12px_12px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Book Strategic Session <ArrowRight size={18} strokeWidth={3} />
            </a>

            <Link 
              to="/login" 
              className="inline-block bg-black dark:bg-white text-white dark:text-black text-sm font-black uppercase tracking-[0.2em] px-12 py-6 hover:bg-orange-600 hover:text-white transition-all border-4 border-black dark:border-white w-full sm:w-auto text-center shadow-[12px_12px_0px_rgba(234,88,12,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Operative Login
            </Link>
          </div>
          
          <p className="text-[9px] font-black uppercase tracking-widest text-black dark:text-white opacity-50">
            System Synchronized with ourflamefoundation@gmail.com
          </p>
        </div>

      </div>
    </section>
  );
};

export default EventsSection;
