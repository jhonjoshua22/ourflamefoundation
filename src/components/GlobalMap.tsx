import React, { useEffect, useRef } from "react";
import logo from "../assets/ourflamelogo.png";

const locations = [
  { id: "UK", name: "United Kingdom", lat: 54.0, lng: -2.0, details: "Strategic HQ" },
  { id: "GE", name: "Georgia", lat: 42.3, lng: 43.3, details: "Regional Hub" },
  { id: "PK", name: "Pakistan", lat: 30.3, lng: 69.3, details: "Community Outreach" },
  { id: "IN", name: "India", lat: 21.0, lng: 78.0, details: "Impact Programs" },
  { id: "BD", name: "Bangladesh", lat: 23.6, lng: 90.3, details: "Education Center" },
  { id: "PH", name: "Philippines", lat: 13.0, lng: 122.0, details: "Innovation Lab" },
];

const GlobalMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.L || mapInstance.current) return;

    mapInstance.current = window.L.map(mapRef.current, {
      center: [25, 40],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    // CHANGE: Switched to a Light Grey theme ('light_all') 
    // This is clean, modern, and high-contrast for your logos
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(mapInstance.current);

    const flameIcon = window.L.icon({
      iconUrl: logo,
      iconSize: [45, 45], // Slightly larger for better visibility on light background
      iconAnchor: [22, 22],
      popupAnchor: [0, -20],
    });

    locations.forEach((loc) => {
      const marker = window.L.marker([loc.lat, loc.lng], { icon: flameIcon }).addTo(mapInstance.current);
      
      marker.bindPopup(`
        <div style="padding: 5px; font-family: sans-serif;">
          <strong style="color: #ea580c; text-transform: uppercase; font-size: 10px;">${loc.id}</strong><br/>
          <span style="font-weight: bold; font-size: 14px; color: #1a1a1a;">${loc.name}</span><br/>
          <small style="color: #71717a;">${loc.details}</small>
        </div>
      `);
    });

    // Ensure the map doesn't stay grey/black by forcing a recalculation
    setTimeout(() => {
      if(mapInstance.current) mapInstance.current.invalidateSize();
    }, 200);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="bg-white py-20 border-t border-zinc-100">
      <div className="container mx-auto px-6">
        
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-zinc-900">
            Global <span className="text-orange-600 not-italic">Presence</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 mt-2">
            Foundation Node Tracking Interface
          </p>
        </div>

        {/* Map Container - Lightened the borders and shadow */}
        <div className="relative border border-zinc-200 bg-zinc-50 shadow-xl overflow-hidden group">
          <div 
            ref={mapRef} 
            className="w-full h-[600px] transition-all duration-700"
          />
          
          {/* HUD Overlay - Swapped to Dark Text for Light Map */}
          <div className="absolute top-6 right-6 z-[1000] pointer-events-none text-right">
            <div className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest">System Status</div>
            <div className="text-xl font-black text-zinc-900 italic">LIVE_FEED</div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          {locations.map((loc) => (
            <div key={loc.id} className="border border-zinc-100 p-4 bg-zinc-50/50 flex items-center gap-3 hover:border-orange-500 transition-colors">
              <div className="w-1.5 h-6 bg-orange-600" />
              <div>
                <span className="block text-xs font-black text-zinc-900">{loc.id}</span>
                <span className="block text-[9px] uppercase text-zinc-400 tracking-tighter">{loc.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
