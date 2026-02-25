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
      center: [25, 60], 
      zoom: 3,
      dragging: false,      
      scrollWheelZoom: true, 
      zoomControl: true,    
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    // Keeping the "Green/Blue" map tiles as requested, but the UI is back to Flame theme
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
            <b style="color: #ea580c; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">${loc.id}</b><br/>
            <span style="font-weight: 900; font-size: 14px; color: #000; text-transform: uppercase;">${loc.name}</span>
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

  return (
    <section className="bg-background py-20 border-t border-border transition-colors duration-500 relative z-0">
      <div className="container mx-auto px-6">
        
        {/* Header - Back to Flame Theme */}
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
            Global <span className="text-orange-600 not-italic">Presence</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mt-2">
            Strategic Infrastructure // Scale Active
          </p>
        </div>

        {/* Map Container - Lowered z-index and removed brand-clashing colors */}
        <div className="relative border border-border bg-white/5 shadow-2xl overflow-hidden group z-10">
          <div 
            ref={mapRef} 
            className="w-full h-[600px] cursor-crosshair" 
          />
          
          {/* Flame Theme UI Overlay */}
          <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border pointer-events-none">
            <p className="text-[9px] font-bold text-orange-600 uppercase tracking-[0.2em]">Our Flame Foundation</p>
            <p className="text-xs font-black text-foreground uppercase italic">Live Presence</p>
          </div>
        </div>

        {/* Legend Grid - Back to Flame Theme (Black/Orange) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {locations.map((loc) => (
            <div key={loc.id} className="p-4 border border-border bg-white/5 flex flex-col hover:border-orange-600 transition-all group">
              <span className="text-[10px] font-mono text-orange-600 font-bold tracking-tighter">NODE_{loc.id}</span>
              <span className="text-sm font-black uppercase text-foreground italic">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
