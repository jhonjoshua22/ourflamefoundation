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
    // 1. Ensure Leaflet is loaded from your index.html script tags
    if (!window.L || mapInstance.current) return;

    // 2. Initialize the map
    mapInstance.current = window.L.map(mapRef.current, {
      center: [25, 40],
      zoom: 2,
      zoomControl: false, // Keeps it clean
      attributionControl: false,
      scrollWheelZoom: false, // Prevents accidental scrolling while browsing
    });

    // 3. Add a high-quality Dark Mode theme (No API Key required)
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(mapInstance.current);

    // 4. Create custom Flame Icon
    const flameIcon = window.L.icon({
      iconUrl: logo,
      iconSize: [35, 35],
      iconAnchor: [17, 17],
      popupAnchor: [0, -15],
    });

    // 5. Add markers
    locations.forEach((loc) => {
      const marker = window.L.marker([loc.lat, loc.lng], { icon: flameIcon })
        .addTo(mapInstance.current);
      
      marker.bindPopup(`
        <div style="background: #0a0a0a; color: white; padding: 5px; border: 1px solid #ea580c; font-family: sans-serif;">
          <strong style="color: #ea580c; text-transform: uppercase; font-size: 10px;">${loc.id}</strong><br/>
          <span style="font-weight: bold; font-size: 14px;">${loc.name}</span><br/>
          <small style="color: #a1a1aa;">${loc.details}</small>
        </div>
      `);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="bg-background py-20 border-t border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Industrial Header */}
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
            Global <span className="text-orange-600 not-italic">Presence</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mt-2">
            Live Foundation Node Tracking
          </p>
        </div>

        {/* Map Container - Leaflet mounts here */}
        <div className="relative border border-border bg-black overflow-hidden group">
          <div 
            ref={mapRef} 
            className="w-full h-[500px] grayscale-[0.6] hover:grayscale-0 transition-all duration-700"
          />
          
          {/* HUD Styling Overlay */}
          <div className="absolute top-4 right-4 z-[1000] pointer-events-none text-right">
            <div className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest">System Status</div>
            <div className="text-xl font-black text-white italic">ONLINE</div>
          </div>
        </div>

        {/* Quick List Footer */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4">
          {locations.map((loc) => (
            <div key={loc.id} className="border border-border p-3 bg-white/5 flex items-center gap-3">
              <div className="w-1 h-4 bg-orange-600" />
              <div>
                <span className="block text-[10px] font-black text-foreground">{loc.id}</span>
                <span className="block text-[8px] uppercase text-muted-foreground tracking-tighter">{loc.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
