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
            <b style="color: #ea580c; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">NODE_${loc.id}</b><br/>
            <span style="font-weight: 900; font-size: 14px; color: #000; text-transform: uppercase;">Node Active</span>
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
        <div className="relative border border-border bg-white
