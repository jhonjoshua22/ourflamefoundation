import React, { useEffect, useRef } from "react";
import logo from "../assets/ourflamelogo.png";

const locations = [
  { id: "UK", name: "United Kingdom", lat: 54.0, lng: -2.0, details: "Strategic HQ" },
  { id: "IE", name: "Ireland", lat: 53.3, lng: -6.2, details: "Data Sovereignty" }, // Added
  { id: "GE", name: "Georgia", lat: 42.3, lng: 43.3, details: "Regional Hub" },
  { id: "PK", name: "Pakistan", lat: 30.3, lng: 69.3, details: "Community Outreach" },
  { id: "IN", name: "India", lat: 21.0, lng: 78.0, details: "Impact Programs" },
  { id: "BD", name: "Bangladesh", lat: 23.6, lng: 90.3, details: "Education Center" },
  { id: "PH", name: "Philippines", lat: 13.0, lng: 122.0, details: "Innovation Lab" },
  { id: "KE", name: "Kenya", lat: -1.2, lng: 36.8, details: "East Africa Node" }, // Added
  { id: "QA", name: "Qatar", lat: 25.3, lng: 51.5, details: "Energy Sector" }, // Added
  { id: "NG", name: "Nigeria", lat: 9.0, lng: 8.6, details: "West Africa Node" }, // Added
  { id: "BR", name: "Brazil", lat: -14.2, lng: -51.9, details: "LATAM Growth" }, // Added
  { id: "US", name: "USA", lat: 37.0, lng: -95.7, details: "Tech Integration" }, // Added
  { id: "HK", name: "Hong Kong", lat: 22.3, lng: 114.1, details: "Financial Gateway" }, // Added
  { id: "CN", name: "China", lat: 35.8, lng: 104.1, details: "Global Logistics" }, // Added
  { id: "JP", name: "Japan", lat: 36.2, lng: 138.2, details: "Robotics/AI Research" }, // Added
];

const GlobalMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.L || mapInstance.current) return;

    mapInstance.current = window.L.map(mapRef.current, {
      center: [20, 10], // Adjusted center to balance Americas and Asia
      zoom: 2, // Slightly zoomed out to see all nodes at once
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
            <b style="color: #ea580c; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">NODE_${loc.id}</b><br/>
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
    <section id="presence" className="bg-background py-20 border-t border-border transition-colors duration-500 relative z-0">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
            Global <span className="text-orange-600 not-italic">Presence</span>
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
          
          {/* Flame Theme UI Overlay */}
          <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border pointer-events-none">
            <p className="text-[9px] font-bold text-orange-600 uppercase tracking-[0.2em]">Our Flame Foundation</p>
            <p className="text-xs font-black text-foreground uppercase italic">Active Nodes: {locations.length}</p>
          </div>
        </div>

        {/* Legend Grid - Now dynamic for all locations */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {locations.map((loc) => (
            <div key={loc.id} className="p-4 border border-border bg-white/5 flex flex-col hover:border-orange-600 hover:bg-orange-600/5 transition-all group">
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
