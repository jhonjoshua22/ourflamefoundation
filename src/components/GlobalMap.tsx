import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, MapPin, Mail, User } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png";
import defaultAvatar from "../assets/default-user.jpg";

const locations = [
  { id: "UK", lat: 54.0, lng: -2.0 },
  { id: "IE", lat: 53.3, lng: -6.2 }, 
  { id: "GE", lat: 42.3, lng: 43.3 },
  { id: "PK", lat: 30.3, lng: 69.3 },
  { id: "IN", lat: 21.0, lng: 78.0 },
  { id: "BD", lat: 23.6, lng: 90.3 },
  { id: "PH", lat: 13.0, lng: 122.0 },
  { id: "KE", lat: -1.2, lng: 36.8 }, 
  { id: "QA", lat: 25.3, lng: 51.5 }, 
  { id: "NG", lat: 9.0, lng: 8.6 }, 
  { id: "BR", lat: -14.2, lng: -51.9 }, 
  { id: "US", lat: 37.0, lng: -95.7 }, 
  { id: "HK", lat: 22.3, lng: 114.1 }, 
  { id: "CN", lat: 35.8, lng: 104.1 }, 
  { id: "JP", lat: 36.2, lng: 138.2 }, 
];

const GlobalMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  
  // Modal & Search States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.L || mapInstance.current) return;

    mapInstance.current = window.L.map(mapRef.current, {
      center: [20, 10], 
      zoom: 2, 
      dragging: true,      
      scrollWheelZoom: true, 
      zoomControl: true,    
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

    const flameIcon = window.L.icon({
      iconUrl: logo,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -15],
    });

    locations.forEach((loc) => {
      window.L.marker([loc.lat, loc.lng], { icon: flameIcon })
        .addTo(mapInstance.current)
        .bindPopup(`
          <div style="font-family: 'Inter', sans-serif; text-align: center; padding: 5px;">
            <b style="color: #ea580c; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">NODE_${loc.id}</b>
          </div>
        `);
    });

    setTimeout(() => {
      if(mapInstance.current) mapInstance.current.invalidateSize();
    }, 500);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Search Logic
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name, email, country, photo_url")
      .or(`display_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,country.ilike.%${searchQuery}%`)
      .limit(10);

    if (error) {
      console.error("Search error:", error);
    } else {
      setResults(data || []);
    }
    setLoading(false);
  };

  return (
    <section id="presence" className="bg-background py-20 border-t border-border transition-colors duration-500 relative z-0">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
            Find Your <span className="text-orange-600 not-italic">Friends</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mt-2">
            Strategic Infrastructure // Scale Active
          </p>
        </div>

        {/* Map Container */}
        <div className="relative border border-border bg-white/5 shadow-2xl overflow-hidden group z-10 rounded-xl">
          <div 
            ref={mapRef} 
            className="w-full h-[600px] cursor-crosshair filter grayscale-[20%] invert-[5%] dark:invert-[90%] dark:hue-rotate-180" 
          />
          
          <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border pointer-events-none">
            <p className="text-[9px] font-bold text-orange-600 uppercase tracking-[0.2em]">Our Flame Foundation</p>
            <p className="text-xs font-black text-foreground uppercase italic">Active Nodes: {locations.length}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-colors rounded-lg shadow-lg shadow-orange-600/20 w-full sm:w-auto text-center"
          >
            Find Friends
          </button>
          <Link 
            to="/login" 
            className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded-lg shadow-lg shadow-zinc-900/10 w-full sm:w-auto text-center"
          >
            Log In
          </Link>
        </div>

        {/* SEARCH MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)} 
            />
            
            <div className="relative bg-white dark:bg-zinc-950 w-full max-w-xl rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="text-xl font-black uppercase italic text-zinc-900 dark:text-white">
                  Search <span className="text-orange-600 not-italic">Directory</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-orange-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Search Input */}
              <div className="p-6">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, or country..."
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/50 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg hover:bg-orange-700"
                  >
                    Search
                  </button>
                </form>

                {/* Results Area */}
                <div className="mt-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {loading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-4">
                      {results.map((user, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-border/50 hover:border-orange-600/30 transition-all">
                          <img 
                            src={user.photo_url || defaultAvatar} 
                            alt={user.display_name} 
                            className="w-12 h-12 rounded-full object-cover border border-border"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-sm uppercase dark:text-white truncate">
                              {user.display_name || "Anonymous User"}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase font-bold">
                                <Mail size={10} /> {user.email}
                              </span>
                              {user.country && (
                                <span className="flex items-center gap-1 text-[10px] text-orange-600 uppercase font-black">
                                  <MapPin size={10} /> {user.country}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery && !loading ? (
                    <p className="text-center py-10 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      No nodes found for "{searchQuery}"
                    </p>
                  ) : (
                    <p className="text-center py-10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Enter a query to begin scan...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GlobalMap;
