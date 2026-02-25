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

    // INITIALIZE LOCKED MAP
    mapInstance.current = window.L.map(mapRef.current, {
      center: [25, 60], // Centered between Europe and SE Asia
      zoom: 3,
      dragging: false,      // PREVENTS PANNING (Locked in)
      scrollWheelZoom: true, // ALLOWS ZOOMING
      zoomControl: true,    // SHOWS +/- BUTTONS
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    // Green/Blue Natural Tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

    const flameIcon = window.L.icon({
      iconUrl: logo,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -15],
    });

    locations.forEach((loc) => {
      window.L.marker([loc.lat, loc.lng], { icon: flameIcon })
        .addTo(mapInstance.current)
        .bindPopup(`
          <div style="font-family: sans-serif; text-align: center;">
            <b style="color: #166534; text-transform: uppercase; font-size: 10px;">${loc.id}</b><br/>
            <span style="font-weight: 900; font-size: 14px;">${loc.name}</span>
          </div>
        `);
    });

    // Fix for potential rendering issues on GitHub/Vercel
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

  return (
    <section className="bg-white py-16 border-t border-zinc-200">
      <div className="container mx-auto px-6">
        
        <div className="mb-10 border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-zinc-900">
            Global <span className="text-green-600 not-italic">Reach</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mt-2">
            Static Viewport // Interactive Scale
          </p>
        </div>

        {/* Map Frame with "Locked" indicator */}
        <div className="relative border-2 border-zinc-100 shadow-2xl rounded-sm overflow-hidden group">
          <div 
            ref={mapRef} 
            className="w-full h-[600px] cursor-default" 
          />
          
          {/* Top Right UI Overlay */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/80 backdrop-blur-md p-2 border border-zinc-200 pointer-events-none">
            <p className="text-[9px] font-bold text-green-700 uppercase tracking-widest">Map Status</p>
            <p className="text-xs font-black text-zinc-900">POSITION_LOCKED</p>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {locations.map((loc) => (
            <div key={loc.id} className="p-4 bg-zinc-50 border border-zinc-100 flex flex-col hover:border-green-600 transition-all group">
              <span className="text-[10px] font-mono text-green-600 font-bold">NODE_{loc.id}</span>
              <span className="text-sm font-black uppercase text-zinc-800">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
