import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, MapPin, Mail, Heart, User, Shield, Trophy, ChevronLeft, ChevronRight, Filter, ChevronDown, Loader2, Globe } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import defaultAvatar from "../assets/default-user.jpg";

// Dictionary expanded - fallback for common issues or speed
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
  const [worldLocations, setWorldLocations] = useState<any[]>([]);
  const [tribeLocations, setTribeLocations] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"global" | "team" | "world" | "tribes">("global");

  const [uniqueWorlds, setUniqueWorlds] = useState<string[]>([]);
  const [uniqueTribes, setUniqueTribes] = useState<string[]>([]);

  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [selectedUserForTeam, setSelectedUserForTeam] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // Helper to fetch all rows by bypassing the 1000 limit
  const fetchAllRows = async (tableName: string, selectQuery: string, filterCallback?: (query: any) => any) => {
    let allData: any[] = [];
    let rangeStart = 0;
    const rangeStep = 1000;
    let hasMore = true;

    while (hasMore) {
      let query = supabase.from(tableName).select(selectQuery).range(rangeStart, rangeStart + rangeStep - 1);
      if (filterCallback) query = filterCallback(query);
      
      const { data, error } = await query;
      if (error || !data) {
        hasMore = false;
        break;
      }

      allData = [...allData, ...data];
      if (data.length < rangeStep) {
        hasMore = false;
      } else {
        rangeStart += rangeStep;
      }
    }
    return allData;
  };

  const getDominantColor = (rows: any[]) => {
    const counts: Record<string, { count: number; color: string }> = {};
    
    rows.forEach(row => {
      const tribe = row.tribe_id || "None";
      const color = row.tribe_color || "#ea580c";
      
      if (!counts[tribe]) {
        counts[tribe] = { count: 0, color };
      }
      counts[tribe].count++;
    });

    const dominant = Object.values(counts).reduce((prev, current) => 
      (current.count > prev.count) ? current : prev, 
      { count: 0, color: "#ea580c" }
    );

    return dominant.color;
  };

  const resolveCoords = async (name: string) => {
    if (!name) return null;
    const cleanName = name.trim();
    
    const match = geoReference.find(l => 
      l.id.toLowerCase() === cleanName.toLowerCase() || 
      l.code.toLowerCase() === cleanName.toLowerCase()
    );
    if (match) return { lat: match.lat, lng: match.lng, label: match.id };

    try {
      // Small delay to respect Nominatim usage policy
      await new Promise(resolve => setTimeout(resolve, 250));
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanName)}&format=json&limit=1`);
      const data = await resp.json();
      if (data && data.length > 0) {
        return { 
          lat: parseFloat(data[0].lat), 
          lng: parseFloat(data[0].lon), 
          label: cleanName 
        };
      }
    } catch (e) {
      console.error("Geocode error for:", cleanName, e);
    }
    return null;
  };

  const processUserData = (user: any, totalCount: number) => {
    const followers = Number(user.facebook || 0);
    const team = Number(user.referral_count || 0);
    const calculatedValue = totalCount > 0 
      ? ((team + 5) * (followers + 100)) / totalCount * 100
      : 0;

    return {
      ...user,
      display_name: user.display_name || (user.email ? user.email.split('@')[0] : "Anonymous"),
      followersNum: followers,
      paidNum: Number(user.paid || 0),
      savedNum: Number(user.saved || 0),
      teamNum: team,
      engagementNum: Number(user.engagement || 0),
      valueNum: calculatedValue
    };
  };

  const fetchGlobalData = async () => {
    // FETCH ALL ROWS WITHOUT 1000 LIMIT TO FIND ALL UNIQUE COUNTRIES
    const data = await fetchAllRows("profiles", "country, tribe_id, tribe_color", (q) => q.not("country", "is", null));
    
    setTotalUsers(data.length);

    if (data.length > 0) {
      const countryGroups: Record<string, any[]> = {};
      data.forEach(p => {
        const c = p.country.trim();
        if (!countryGroups[c]) countryGroups[c] = [];
        countryGroups[c].push(p);
      });

      const mapped = [];
      const uniqueCountries = Object.keys(countryGroups);
      
      for (const country of uniqueCountries) {
        const coords = await resolveCoords(country);
        if (coords) {
          mapped.push({ 
            ...coords, 
            color: getDominantColor(countryGroups[country]) 
          });
        }
      }
      setGlobalLocations(mapped);
    }
  };

  const fetchWorldAndTribeFilters = async () => {
    // FETCH ALL ROWS WITHOUT 1000 LIMIT
    const worldsData = await fetchAllRows("profiles", "worlds", (q) => q.not("worlds", "is", null));
    if (worldsData) {
      const worldsList = Array.from(new Set(worldsData.map(p => p.worlds))).filter(Boolean) as string[];
      setUniqueWorlds(worldsList);
    }

    const tribesData = await fetchAllRows("profiles", "tribe_id", (q) => q.not("tribe_id", "is", null));
    if (tribesData) {
      const tribesList = Array.from(new Set(tribesData.map(p => p.tribe_id))).filter(Boolean) as string[];
      setUniqueTribes(tribesList);
    }
  };

  const handleWorldSelection = async (worldName: string) => {
    setViewMode("world");
    const data = await fetchAllRows("profiles", "country, tribe_id, tribe_color", (q) => 
      q.eq("worlds", worldName).not("country", "is", null)
    );
    
    if (data) {
      const countryGroups: Record<string, any[]> = {};
      data.forEach(p => {
        const c = p.country.trim();
        if (!countryGroups[c]) countryGroups[c] = [];
        countryGroups[c].push(p);
      });

      const mapped = [];
      for (const c in countryGroups) {
        const res = await resolveCoords(c);
        if (res) {
          mapped.push({ 
            ...res, 
            color: getDominantColor(countryGroups[c]) 
          });
        }
      }
      setWorldLocations(mapped);
    }
  };

  const handleTribeSelection = async (tribeId: string) => {
    setViewMode("tribes");
    const data = await fetchAllRows("profiles", "country, tribe_id, tribe_color", (q) => 
      q.eq("tribe_id", tribeId).not("country", "is", null)
    );
    
    if (data) {
      const countryGroups: Record<string, any[]> = {};
      data.forEach(p => {
        const c = p.country.trim();
        if (!countryGroups[c]) countryGroups[c] = [];
        countryGroups[c].push(p);
      });

      const mapped = [];
      for (const c in countryGroups) {
        const res = await resolveCoords(c);
        if (res) {
          mapped.push({ 
            ...res, 
            color: getDominantColor(countryGroups[c]) 
          });
        }
      }
      setTribeLocations(mapped);
    }
  };

  const fetchTeamData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const totalCount = count || 0;

    if (user) {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profile) {
        setCurrentUserData(processUserData(profile, totalCount));
        if (profile.team_countries) {
          const countryList = profile.team_countries.split(",").map(c => c.trim()).filter(Boolean);
          const mapped = [];
          for (const c of countryList) {
             const res = await resolveCoords(c);
             if (res) {
               mapped.push({ ...res, color: profile.tribe_color || "#ea580c" });
             }
          }
          setTeamLocations(mapped);
        }
      }
    }

    const { data: topUsers } = await supabase
      .from("profiles")
      .select("*")
      .in("Performance", ["Green", "Amber"])
      .neq("id", user?.id || "")
      .limit(10);
    
    if (topUsers) {
      setTopPerformers(topUsers.map(u => processUserData(u, totalCount)));
    }
  };

  const fetchUserTeam = async (user: any) => {
    setLoadingTeam(true);
    setSelectedUserForTeam(user);
    setIsTeamModalOpen(true);

    const data = await fetchAllRows("profiles", "*", (q) => q.eq("referred_by", user.id));

    if (data) {
      setTeamMembers(data.map(u => processUserData(u, totalUsers)));
    } else {
      setTeamMembers([]);
    }
    setLoadingTeam(false);
  };

  useEffect(() => {
    fetchGlobalData();
    fetchTeamData();
    fetchWorldAndTribeFilters();
  }, []);

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

  useEffect(() => {
    if (!mapInstance.current || !markerLayerGroup.current) return;
    markerLayerGroup.current.clearLayers();
    
    let displayList = [];
    if (viewMode === "global") displayList = globalLocations;
    else if (viewMode === "team") displayList = teamLocations;
    else if (viewMode === "world") displayList = worldLocations;
    else if (viewMode === "tribes") displayList = tribeLocations;

    displayList.forEach((loc) => {
      const activeColor = loc.color || "#ea580c";
      
      const heartIcon = window.L.divIcon({
        className: 'custom-heart-icon',
        html: `
          <div class="heart-flicker" style="--glow-color: ${activeColor}">
            <svg viewBox="0 0 24 24" fill="${activeColor}" width="30" height="30">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>`,
        iconSize: [30, 30], iconAnchor: [15, 15],
      });

      window.L.marker([loc.lat, loc.lng], { icon: heartIcon })
        .addTo(markerLayerGroup.current)
        .bindPopup(`<b style="color: ${activeColor}; text-transform: uppercase;">${loc.label}</b>`);
    });
    setTimeout(() => { if(mapInstance.current) mapInstance.current.invalidateSize(); }, 100);
  }, [viewMode, teamLocations, globalLocations, worldLocations, tribeLocations]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*")
      .or(`display_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,country.ilike.%${searchQuery}%`).limit(10);
    setResults(data || []);
    setLoading(false);
  };

  const UserRow = ({ user, isSelf = false }: { user: any, isSelf?: boolean }) => (
    <tr className={`${isSelf ? 'bg-orange-950/20 border-l-4 border-orange-600' : 'hover:bg-zinc-900/40'} transition-colors group`}>
      <td className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 shadow-lg">
            <img src={user.photo_url || defaultAvatar} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user.id}`} className="font-black text-sm uppercase italic tracking-tighter text-zinc-200 group-hover:text-orange-500 transition-colors">
                {user.display_name}
              </Link>
              <div className={`w-2.5 h-2.5 rounded-full ${
                user.Performance === 'Green' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                user.Performance === 'Amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                user.Performance === 'Red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-zinc-600'
              }`} />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1 text-[9px] font-black uppercase" style={{ color: user.tribe_color || "#3b82f6" }}>
                <Shield size={10} fill="currentColor" /> {user.tribe_id || "NO TRIBE"}
              </div>
              <div className="text-[9px] text-orange-500 uppercase font-black opacity-80">• {user.rank || "Normie"}</div>
              {user.country && <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">• {user.country}</span>}
            </div>
          </div>
        </div>
      </td>
      <td className="p-5 font-black text-white text-sm">
        <button 
          onClick={() => fetchUserTeam(user)}
          className="hover:text-orange-500 transition-colors cursor-pointer"
        >
          {(user.teamNum || 0).toLocaleString()}
        </button>
      </td>
      <td className="p-5 font-black text-white text-sm">{(user.paidNum || 0).toLocaleString()}</td>
      <td className="p-5 font-black text-white text-sm">{(user.savedNum || 0).toLocaleString()}</td>
      <td className="p-5 font-black text-zinc-400 text-sm">{(user.followersNum || 0).toLocaleString()}</td>
      <td className="p-5 text-blue-400 font-mono font-bold text-sm">{user.engagementNum || 0}%</td>
      <td className="p-5 text-right text-purple-400 font-black italic text-sm">
        ${(user.valueNum || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
    </tr>
  );

  return (
    <section id="presence" className="bg-background py-20 border-t border-border relative z-0 pt-[10vh]">
      <style>{`
        @keyframes heart-flicker {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 2px var(--glow-color)); }
          50% { opacity: 0.6; transform: scale(0.9); filter: drop-shadow(0 0 8px var(--glow-color)); }
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
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1 relative border border-border bg-white/5 shadow-2xl overflow-hidden rounded-xl">
            <div ref={mapRef} className="w-full h-[600px] cursor-crosshair filter dark:invert-[90%] dark:hue-rotate-180" />
            <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border text-right">
              <p className="text-xs font-black text-foreground uppercase italic">Hearts: {
                viewMode === 'team' ? teamLocations.length : 
                viewMode === 'world' ? worldLocations.length :
                viewMode === 'tribes' ? tribeLocations.length :
                globalLocations.length
              }</p>
            </div>
          </div>

          <div className="w-full lg:w-72 flex flex-col gap-3">
            <div className="mb-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col gap-1">
              <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 px-2 py-1 flex items-center gap-2">
                <Filter size={10} /> Selection Filters
              </h4>
              <div className="grid grid-cols-2 gap-1 mb-1">
                <button 
                  onClick={() => setViewMode("global")} 
                  className={`w-full py-2 px-3 text-[10px] font-black uppercase rounded-lg transition-all text-center ${viewMode === 'global' ? 'bg-orange-600 text-white shadow-lg' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                >
                  Global
                </button>
                <button 
                  onClick={() => setViewMode("team")} 
                  className={`w-full py-2 px-3 text-[10px] font-black uppercase rounded-lg transition-all flex items-center justify-center gap-2 ${viewMode === 'team' ? 'bg-orange-600 text-white shadow-lg' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                >
                  <Heart size={10} fill={viewMode === 'team' ? "white" : "none"} /> My Team
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="relative group">
                  <button className={`w-full py-2 px-3 text-[10px] font-black uppercase rounded-lg transition-all flex items-center justify-between gap-2 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 ${viewMode === 'world' ? 'border border-orange-600 text-orange-600' : ''}`}>
                    World <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-0 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[600] max-h-40 overflow-y-auto">
                    {uniqueWorlds.map((world) => (
                      <button 
                        key={world} 
                        onClick={() => handleWorldSelection(world)}
                        className="w-full text-left px-3 py-2 text-[10px] font-black uppercase text-zinc-400 hover:bg-zinc-800 hover:text-orange-500"
                      >
                        {world}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <button className={`w-full py-2 px-3 text-[10px] font-black uppercase rounded-lg transition-all flex items-center justify-between gap-2 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 ${viewMode === 'tribes' ? 'border border-orange-600 text-orange-600' : ''}`}>
                    Teams <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-0 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[600] max-h-40 overflow-y-auto">
                    {uniqueTribes.map((tribe) => (
                      <button 
                        key={tribe} 
                        onClick={() => handleTribeSelection(tribe)}
                        className="w-full text-left px-3 py-2 text-[10px] font-black uppercase text-zinc-400 hover:bg-zinc-800 hover:text-orange-500"
                      >
                        {tribe}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Operation Console</h4>
            {[
              { label: "New Game", color: "bg-orange-600" },
              { label: "Edit/Stop Game", color: "bg-zinc-900" },
              { label: "New Comms", color: "bg-orange-600" },
              { label: "Edit Stop Comms", color: "bg-zinc-900" },
              { label: "Other", color: "bg-zinc-800" }
            ].map((btn, i) => (
              <button key={i} className={`${btn.color} text-white text-[10px] font-black uppercase py-4 px-6 rounded-lg shadow-lg border border-white/5 hover:scale-[1.02] transition-transform`}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-6">
          <div className="p-6 border-b border-zinc-800 bg-black/40">
            <h3 className="text-xl font-black uppercase italic text-orange-600">Personnel Data Stream</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 text-[10px] uppercase text-zinc-400 border-b border-zinc-800 text-left font-black tracking-widest sticky top-0 z-20 backdrop-blur-md">
                  <th className="p-5">Tribes / Recruits</th>
                  <th className="p-5">Team</th>
                  <th className="p-5">Invested</th>
                  <th className="p-5">Saved</th>
                  <th className="p-5">Followers</th>
                  <th className="p-5">Engagement</th>
                  <th className="p-5 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {currentUserData && <UserRow user={currentUserData} isSelf={true} />}
                {topPerformers.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isTeamModalOpen && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsTeamModalOpen(false)} />
            <div className="relative bg-zinc-950 w-full max-w-6xl rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-black/40">
                <div>
                  <h3 className="text-xl font-black uppercase italic text-orange-600">
                    Team: <span className="text-white">{selectedUserForTeam?.display_name}</span>
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Direct Recruits Found: {teamMembers.length}</p>
                </div>
                <button onClick={() => setIsTeamModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="overflow-x-auto flex-1">
                {loadingTeam ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                    <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Scanning Network...</p>
                  </div>
                ) : teamMembers.length > 0 ? (
                  <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                      <tr className="bg-zinc-900/80 text-[10px] uppercase text-zinc-400 border-b border-zinc-800 text-left font-black tracking-widest sticky top-0 z-20 backdrop-blur-md">
                        <th className="p-5">Recruits</th>
                        <th className="p-5">Team</th>
                        <th className="p-5">Invested</th>
                        <th className="p-5">Saved</th>
                        <th className="p-5">Followers</th>
                        <th className="p-5">Engagement</th>
                        <th className="p-5 text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/50">
                      {teamMembers.map((member) => (
                        <UserRow key={member.id} user={member} />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-zinc-500 font-black uppercase text-xs">No direct recruits found for this user.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-12">
          <Link 
            to="/scoretable" 
            className="flex items-center gap-3 bg-white text-black text-[10px] font-black uppercase px-10 py-4 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-xl"
          >
            <Trophy size={16} /> View Full Scoretable
          </Link>
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
