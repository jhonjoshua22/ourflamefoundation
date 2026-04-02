import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Added for local navigation
import logo from "../assets/ourflamelogo.png";

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
        `); // Removed "Node Active" line from the popup
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
        
        {/* Header - Changed from Global Presence to Find Your Friends */}
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
          
          {/* Flame Theme UI Overlay */}
          <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border pointer-events-none">
            <p className="text-[9px] font-bold text-orange-600 uppercase tracking-[0.2em]">Our Flame Foundation</p>
            <p className="text-xs font-black text-foreground uppercase italic">Active Nodes: {locations.length}</p>
          </div>
        </div>

        {/* CTA Buttons - Positioned beside each other */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/login" 
            className="inline-block bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-colors rounded-lg shadow-lg shadow-orange-600/20 w-full sm:w-auto text-center"
          >
            Find Friends
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

export default GlobalMap;
