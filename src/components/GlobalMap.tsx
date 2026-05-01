import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, MapPin, Mail, Heart } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import defaultAvatar from "../assets/default-user.jpg";

// Dictionary for your specific list + major hubs (Fast lookup)
const geoReference = [
  { id: "United Kingdom", code: "UK", lat: 54.0, lng: -2.0 },
  { id: "Ireland", code: "IE", lat: 53.3, lng: -6.2 }, 
  { id: "Georgia", code: "GE", lat: 42.3, lng: 43.3 },
  { id: "Pakistan", code: "PK", lat: 30.3, lng: 69.3 },
  { id: "India", code: "IN", lat: 21.0, lng: 78.0 },
  { id: "Bangladesh", code: "BD", lat: 23.6, lng: 90.3 },
  { id: "Philippines", code: "PH", lat: 13.0, lng: 122.0 },
  { id: "Kenya", code: "KE", lat: -1.2, lng: 36.8 }, 
  { id: "Qatar", code: "QA", lat: 25.3, lng: 51.5 }, 
  { id: "Nigeria", code: "NG", lat: 9.0, lng: 8.6 }, 
  { id: "Brazil", code: "BR", lat: -14.2, lng: -51.9 }, 
  { id: "United States", code: "US", lat: 37.0, lng: -95.7 }, 
  { id: "Hong Kong", code: "HK", lat: 22.3, lng: 114.1 }, 
  { id: "China", code: "CN", lat: 35.8, lng: 104.1 }, 
  { id: "Japan", code: "JP", lat: 36.2, lng: 138.2 },
  { id: "France", code: "FR", lat: 46.2, lng: 2.2 },
  { id: "Germany", code: "DE", lat: 51.1, lng: 10.4 },
  { id: "Italy", code: "IT", lat: 41.8, lng: 12.5 },
  { id: "Spain", code: "ES", lat: 40.4, lng: -3.7 },
  { id: "Netherlands", code: "NL", lat: 52.1, lng: 5.2 }
];

const GlobalMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerLayerGroup = useRef<any>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [teamLocations, setTeamLocations] = useState<any[]>([]);
  const [globalLocations, setGlobalLocations] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"global" | "team">("global");

  // Dynamic Coordinate Resolver (List first, then API)
  const resolveCoords = async (countryName: string) => {
    if (!countryName) return null;

    // 1. Try hardcoded list
    const match = geoReference.find(l => 
      l.id.toLowerCase() === countryName.toLowerCase() || 
      l.code.toLowerCase() === countryName.toLowerCase()
    );
    if (match) return { lat: match.lat, lng: match.lng, label: match.id };

    // 2. Try OpenStreetMap API for unknown countries
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryName)}&format=json&limit=1`);
      const data = await resp.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), label: countryName };
      }
    } catch (e) {
      console.error("Geocode error", e);
    }
    return null;
  };

  const fetchGlobalData = async () => {
    const { data, error } = await supabase.from("profiles").select("country").not("country", "is", null);
    if (!error && data) {
      const uniqueCountries = Array.from(new Set(data.map(p => p.country)));
      const mapped = await Promise.all(uniqueCountries.map(c => resolveCoords(c)));
      setGlobalLocations(mapped.filter(Boolean));
    }
  };

  const fetchTeamData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("team_countries").eq("id", user.id).single();
    if (profile?.team_countries) {
      const countryList = profile.team_countries.split(",").map(c => c.trim());
      const mapped = await Promise.all(countryList.map(c => resolveCoords(c)));
      setTeamLocations(mapped.filter(Boolean));
    }
  };

  useEffect(() => {
    fetchGlobalData();
    fetchTeamData();
  }, []);

  // Init Leaflet
  useEffect(() => {
    if (!window.L || mapInstance.current) return;

    mapInstance.current = window.L.map(mapRef.current, {
      center: [20, 10], zoom: 2, dragging: true, scrollWheelZoom: true,
      zoomControl: true, attributionControl: false,
    });

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);
    markerLayerGroup.current = window.L.layerGroup().addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, []);

  // Sync Markers
  useEffect(() => {
    if (!mapInstance.current || !markerLayerGroup.current) return;

    markerLayerGroup.current.clearLayers();
    const displayList = viewMode === "team" ? teamLocations : globalLocations;

    const heartIcon = window.L.divIcon({
      className: 'custom-heart-icon',
      html: `
        <div class="heart-flicker">
          <svg viewBox="0 0 24 24" fill="#ea580c" width="30" height="30">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      `,
      iconSize: [30, 30], iconAnchor: [15, 15],
    });

    displayList.forEach((loc) => {
      window.L.marker([loc.lat, loc.lng], { icon: heartIcon })
        .addTo(markerLayerGroup.current)
        .bindPopup(`<b style="color: #ea580c; text-transform: uppercase;">${loc.label}</b>`);
    });

    setTimeout(() => { if(mapInstance.current) mapInstance.current.invalidateSize(); }, 100);
  }, [viewMode, teamLocations, globalLocations]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    const { data } = await supabase.from("profiles").select("display_name, email, country, photo_url")
      .or(`display_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,country.ilike.%${searchQuery}%`).limit(10);
    setResults(data || []);
    setLoading(false);
  };

  return (
    <section id="presence" className="bg-background py-20 border-t border-border relative z-0 pt-6">
      <style>{`
        @keyframes heart-flicker {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 2px #ea580c); }
          50% { opacity: 0.6; transform: scale(0.9); filter: drop-shadow(0 0 8px #ea580c); }
        }
        .heart-flicker { animation: heart-flicker 2s infinite ease-in-out; display: flex; align-items: center; justify-content: center; }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="border-l-4 border-orange-600 pl-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
              <p>Main Dashboard </p>
              <p className="text-orange-600 not-italic">Our Flame Foundation Expands All Over the World</p>
            </h2>
          </div>

          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-border">
            <button onClick={() => setViewMode("global")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg ${viewMode === 'global' ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow-sm' : 'text-zinc-500'}`}>Global</button>
            <button onClick={() => setViewMode("team")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'team' ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow-sm' : 'text-zinc-500'}`}><Heart size={12} fill={viewMode === 'team' ? "#ea580c" : "none"} /> My Team</button>
          </div>
        </div>

        <div className="relative border border-border bg-white/5 shadow-2xl overflow-hidden rounded-xl">
          <div ref={mapRef} className="w-full h-[600px] cursor-crosshair filter dark:invert-[90%] dark:hue-rotate-180" />
          <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border text-right">
            <p className="text-xs font-black text-foreground uppercase italic">Hearts: {viewMode === 'team' ? teamLocations.length : globalLocations.length}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white text-xs font-black uppercase px-8 py-4 rounded-lg shadow-lg">Find Friends</button>
          <Link to="/login" className="bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase px-8 py-4 rounded-lg">Log In</Link>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="relative bg-white dark:bg-zinc-950 w-full max-w-xl rounded-2xl border border-border p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic">Search <span className="text-orange-600">Directory</span></h3>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSearch} className="relative">
                <input type="text" placeholder="Search..." className="w-full bg-zinc-100 dark:bg-zinc-900 border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              </form>
              <div className="mt-6 max-h-[400px] overflow-y-auto">
                {results.map((user, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 mb-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-border">
                    <img src={user.photo_url || defaultAvatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-black text-sm uppercase">{user.display_name}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase">{user.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GlobalMap;
