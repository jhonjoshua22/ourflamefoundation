import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, MapPin, Mail, Heart, Users } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import defaultAvatar from "../assets/default-user.jpg";

const locations = [
  { id: "AF", lat: 33.9, lng: 67.7, names: ["AFGHANISTAN"] },
  { id: "AL", lat: 41.1, lng: 20.1, names: ["ALBANIA"] },
  { id: "DZ", lat: 28.0, lng: 1.6, names: ["ALGERIA"] },
  { id: "AS", lat: -14.2, lng: -170.1, names: ["AMERICAN SAMOA"] },
  { id: "AD", lat: 42.5, lng: 1.6, names: ["ANDORRA"] },
  { id: "AO", lat: -11.2, lng: 17.8, names: ["ANGOLA"] },
  { id: "AI", lat: 18.2, lng: -63.0, names: ["ANGUILLA"] },
  { id: "AQ", lat: -75.2, lng: 0.0, names: ["ANTARCTICA"] },
  { id: "AG", lat: 17.0, lng: -61.8, names: ["ANTIGUA AND BARBUDA"] },
  { id: "AR", lat: -38.4, lng: -63.6, names: ["ARGENTINA"] },
  { id: "AM", lat: 40.0, lng: 45.0, names: ["ARMENIA"] },
  { id: "AW", lat: 12.5, lng: -69.9, names: ["ARUBA"] },
  { id: "AU", lat: -25.2, lng: 133.7, names: ["AUSTRALIA"] },
  { id: "AT", lat: 47.5, lng: 14.5, names: ["AUSTRIA"] },
  { id: "AZ", lat: 40.1, lng: 47.5, names: ["AZERBAIJAN"] },
  { id: "BS", lat: 25.0, lng: -77.3, names: ["BAHAMAS"] },
  { id: "BH", lat: 25.9, lng: 50.5, names: ["BAHRAIN"] },
  { id: "BD", lat: 23.6, lng: 90.3, names: ["BD", "BANGLADESH"] },
  { id: "BB", lat: 13.1, lng: -59.5, names: ["BARBADOS"] },
  { id: "BY", lat: 53.7, lng: 27.9, names: ["BELARUS"] },
  { id: "BE", lat: 50.5, lng: 4.4, names: ["BELGIUM"] },
  { id: "BZ", lat: 17.1, lng: -88.4, names: ["BELIZE"] },
  { id: "BJ", lat: 9.3, lng: 2.3, names: ["BENIN"] },
  { id: "BM", lat: 32.3, lng: -64.7, names: ["BERMUDA"] },
  { id: "BT", lat: 27.5, lng: 90.4, names: ["BHUTAN"] },
  { id: "BO", lat: -16.2, lng: -63.5, names: ["BOLIVIA"] },
  { id: "BA", lat: 43.9, lng: 17.6, names: ["BOSNIA AND HERZEGOVINA"] },
  { id: "BW", lat: -22.3, lng: 24.6, names: ["BOTSWANA"] },
  { id: "BR", lat: -14.2, lng: -51.9, names: ["BR", "BRAZIL"] },
  { id: "BN", lat: 4.5, lng: 114.7, names: ["BRUNEI"] },
  { id: "BG", lat: 42.7, lng: 25.4, names: ["BULGARIA"] },
  { id: "BF", lat: 12.2, lng: -1.5, names: ["BURKINA FASO"] },
  { id: "BI", lat: -3.3, lng: 29.9, names: ["BURUNDI"] },
  { id: "KH", lat: 12.5, lng: 104.9, names: ["CAMBODIA"] },
  { id: "CM", lat: 7.3, lng: 12.3, names: ["CAMEROON"] },
  { id: "CA", lat: 56.1, lng: -106.3, names: ["CANADA"] },
  { id: "CV", lat: 16.0, lng: -24.0, names: ["CAPE VERDE"] },
  { id: "KY", lat: 19.3, lng: -81.2, names: ["CAYMAN ISLANDS"] },
  { id: "CF", lat: 6.6, lng: 20.9, names: ["CENTRAL AFRICAN REPUBLIC"] },
  { id: "TD", lat: 15.4, lng: 18.7, names: ["CHAD"] },
  { id: "CL", lat: -35.6, lng: -71.5, names: ["CHILE"] },
  { id: "CN", lat: 35.8, lng: 104.1, names: ["CN", "CHINA"] },
  { id: "CO", lat: 4.5, lng: -74.2, names: ["COLOMBIA"] },
  { id: "KM", lat: -11.6, lng: 43.3, names: ["COMOROS"] },
  { id: "CG", lat: -0.2, lng: 15.8, names: ["CONGO"] },
  { id: "CR", lat: 9.7, lng: -83.7, names: ["COSTA RICA"] },
  { id: "HR", lat: 45.1, lng: 15.2, names: ["CROATIA"] },
  { id: "CU", lat: 21.5, lng: -77.7, names: ["CUBA"] },
  { id: "CY", lat: 35.1, lng: 33.4, names: ["CYPRUS"] },
  { id: "CZ", lat: 49.8, lng: 15.4, names: ["CZECHIA", "CZECH REPUBLIC"] },
  { id: "DK", lat: 56.2, lng: 9.5, names: ["DENMARK"] },
  { id: "DJ", lat: 11.8, lng: 42.5, names: ["DJIBOUTI"] },
  { id: "DM", lat: 15.4, lng: -61.3, names: ["DOMINICA"] },
  { id: "DO", lat: 18.7, lng: -70.1, names: ["DOMINICAN REPUBLIC"] },
  { id: "EC", lat: -1.8, lng: -78.1, names: ["ECUADOR"] },
  { id: "EG", lat: 26.8, lng: 30.8, names: ["EGYPT"] },
  { id: "SV", lat: 13.7, lng: -88.8, names: ["EL SALVADOR"] },
  { id: "GQ", lat: 1.6, lng: 10.2, names: ["EQUATORIAL GUINEA"] },
  { id: "ER", lat: 15.1, lng: 39.7, names: ["ERITREA"] },
  { id: "EE", lat: 58.5, lng: 25.0, names: ["ESTONIA"] },
  { id: "ET", lat: 9.1, lng: 40.4, names: ["ETHIOPIA"] },
  { id: "FJ", lat: -17.7, lng: 178.0, names: ["FIJI"] },
  { id: "FI", lat: 61.9, lng: 25.7, names: ["FINLAND"] },
  { id: "FR", lat: 46.2, lng: 2.2, names: ["FRANCE"] },
  { id: "GA", lat: -0.8, lng: 11.6, names: ["GABON"] },
  { id: "GM", lat: 13.4, lng: -15.3, names: ["GAMBIA"] },
  { id: "GE", lat: 42.3, lng: 43.3, names: ["GE", "GEORGIA"] },
  { id: "DE", lat: 51.1, lng: 10.4, names: ["GERMANY"] },
  { id: "GH", lat: 7.9, lng: -1.0, names: ["GHANA"] },
  { id: "GR", lat: 39.0, lng: 21.8, names: ["GREECE"] },
  { id: "GL", lat: 71.7, lng: -42.6, names: ["GREENLAND"] },
  { id: "GD", lat: 12.1, lng: -61.6, names: ["GRENADA"] },
  { id: "GU", lat: 13.4, lng: 144.7, names: ["GUAM"] },
  { id: "GT", lat: 15.7, lng: -90.2, names: ["GUATEMALA"] },
  { id: "GN", lat: 9.9, lng: -9.6, names: ["GUINEA"] },
  { id: "GW", lat: 11.8, lng: -15.1, names: ["GUINEA-BISSAU"] },
  { id: "GY", lat: 4.8, lng: -58.9, names: ["GUYANA"] },
  { id: "HT", lat: 18.9, lng: -72.6, names: ["HAITI"] },
  { id: "HN", lat: 15.1, lng: -86.2, names: ["HONDURAS"] },
  { id: "HK", lat: 22.3, lng: 114.1, names: ["HK", "HONG KONG"] },
  { id: "HU", lat: 47.1, lng: 19.5, names: ["HUNGARY"] },
  { id: "IS", lat: 64.9, lng: -18.1, names: ["ICELAND"] },
  { id: "IN", lat: 21.0, lng: 78.0, names: ["IN", "INDIA"] },
  { id: "ID", lat: -0.7, lng: 113.9, names: ["INDONESIA"] },
  { id: "IR", lat: 32.4, lng: 53.6, names: ["IRAN"] },
  { id: "IQ", lat: 33.2, lng: 44.3, names: ["IRAQ"] },
  { id: "IE", lat: 53.3, lng: -6.2, names: ["IE", "IRELAND"] },
  { id: "IL", lat: 31.0, lng: 34.8, names: ["ISRAEL"] },
  { id: "IT", lat: 41.8, lng: 12.5, names: ["ITALY"] },
  { id: "JM", lat: 18.1, lng: -77.2, names: ["JAMAICA"] },
  { id: "JP", lat: 36.2, lng: 138.2, names: ["JP", "JAPAN"] },
  { id: "JO", lat: 30.5, lng: 36.2, names: ["JORDAN"] },
  { id: "KZ", lat: 48.0, lng: 66.9, names: ["KAZAKHSTAN"] },
  { id: "KE", lat: -1.2, lng: 36.8, names: ["KE", "KENYA"] },
  { id: "KI", lat: -3.3, lng: -168.7, names: ["KIRIBATI"] },
  { id: "KP", lat: 40.3, lng: 127.5, names: ["NORTH KOREA"] },
  { id: "KR", lat: 35.9, lng: 127.7, names: ["SOUTH KOREA"] },
  { id: "KW", lat: 29.3, lng: 47.4, names: ["KUWAIT"] },
  { id: "KG", lat: 41.2, lng: 74.7, names: ["KYRGYZSTAN"] },
  { id: "LA", lat: 19.8, lng: 102.4, names: ["LAOS"] },
  { id: "LV", lat: 56.8, lng: 24.6, names: ["LATVIA"] },
  { id: "LB", lat: 33.8, lng: 35.8, names: ["LEBANON"] },
  { id: "LS", lat: -29.6, lng: 28.2, names: ["LESOTHO"] },
  { id: "LR", lat: 6.4, lng: -9.4, names: ["LIBERIA"] },
  { id: "LY", lat: 26.3, lng: 17.2, names: ["LIBYA"] },
  { id: "LI", lat: 47.1, lng: 9.5, names: ["LIECHTENSTEIN"] },
  { id: "LT", lat: 55.1, lng: 23.8, names: ["LITHUANIA"] },
  { id: "LU", lat: 49.8, lng: 6.1, names: ["LUXEMBOURG"] },
  { id: "MO", lat: 22.1, lng: 113.5, names: ["MACAU"] },
  { id: "MG", lat: -18.7, lng: 46.8, names: ["MADAGASCAR"] },
  { id: "MW", lat: -13.2, lng: 34.3, names: ["MALAWI"] },
  { id: "MY", lat: 4.2, lng: 101.9, names: ["MALAYSIA"] },
  { id: "MV", lat: 3.2, lng: 73.0, names: ["MALDIVES"] },
  { id: "ML", lat: 17.5, lng: -3.9, names: ["MALI"] },
  { id: "MT", lat: 35.9, lng: 14.4, names: ["MALTA"] },
  { id: "MH", lat: 7.1, lng: 171.1, names: ["MARSHALL ISLANDS"] },
  { id: "MQ", lat: 14.6, lng: -61.0, names: ["MARTINIQUE"] },
  { id: "MR", lat: 21.0, lng: -10.9, names: ["MAURITANIA"] },
  { id: "MU", lat: -20.3, lng: 57.5, names: ["MAURITIUS"] },
  { id: "MX", lat: 23.6, lng: -102.5, names: ["MEXICO"] },
  { id: "FM", lat: 7.4, lng: 151.8, names: ["MICRONESIA"] },
  { id: "MD", lat: 47.4, lng: 28.3, names: ["MOLDOVA"] },
  { id: "MC", lat: 43.7, lng: 7.4, names: ["MONACO"] },
  { id: "MN", lat: 46.8, lng: 103.8, names: ["MONGOLIA"] },
  { id: "ME", lat: 42.7, lng: 19.3, names: ["MONTENEGRO"] },
  { id: "MS", lat: 16.7, lng: -62.1, names: ["MONTSERRAT"] },
  { id: "MA", lat: 31.7, lng: -7.0, names: ["MOROCCO"] },
  { id: "MZ", lat: -18.6, lng: 35.5, names: ["MOZAMBIQUE"] },
  { id: "MM", lat: 21.9, lng: 95.9, names: ["MYANMAR"] },
  { id: "NA", lat: -22.9, lng: 18.4, names: ["NAMIBIA"] },
  { id: "NR", lat: -0.5, lng: 166.9, names: ["NAURU"] },
  { id: "NP", lat: 28.3, lng: 84.1, names: ["NEPAL"] },
  { id: "NL", lat: 52.1, lng: 5.2, names: ["NETHERLANDS"] },
  { id: "NZ", lat: -40.9, lng: 174.8, names: ["NEW ZEALAND"] },
  { id: "NI", lat: 12.8, lng: -85.2, names: ["NICARAGUA"] },
  { id: "NE", lat: 17.6, lng: 8.0, names: ["NIGER"] },
  { id: "NG", lat: 9.0, lng: 8.6, names: ["NG", "NIGERIA"] },
  { id: "NU", lat: -19.0, lng: -169.8, names: ["NIUE"] },
  { id: "NO", lat: 60.4, lng: 8.4, names: ["NORWAY"] },
  { id: "OM", lat: 21.5, lng: 55.9, names: ["OMAN"] },
  { id: "PK", lat: 30.3, lng: 69.3, names: ["PK", "PAKISTAN"] },
  { id: "PW", lat: 7.5, lng: 134.5, names: ["PALAU"] },
  { id: "PA", lat: 8.5, lng: -80.7, names: ["PANAMA"] },
  { id: "PG", lat: -6.3, lng: 143.9, names: ["PAPUA NEW GUINEA"] },
  { id: "PY", lat: -23.4, lng: -58.4, names: ["PARAGUAY"] },
  { id: "PE", lat: -9.1, lng: -75.0, names: ["PERU"] },
  { id: "PH", lat: 13.0, lng: 122.0, names: ["PH", "PHILIPPINES"] },
  { id: "PL", lat: 51.9, lng: 19.1, names: ["POLAND"] },
  { id: "PT", lat: 39.3, lng: -8.2, names: ["PORTUGAL"] },
  { id: "PR", lat: 18.2, lng: -66.5, names: ["PUERTO RICO"] },
  { id: "QA", lat: 25.3, lng: 51.5, names: ["QA", "QATAR"] },
  { id: "RO", lat: 45.9, lng: 24.9, names: ["ROMANIA"] },
  { id: "RU", lat: 61.5, lng: 105.3, names: ["RUSSIA"] },
  { id: "RW", lat: -1.9, lng: 29.8, names: ["RWANDA"] },
  { id: "WS", lat: -13.7, lng: -172.1, names: ["SAMOA"] },
  { id: "SM", lat: 43.9, lng: 12.4, names: ["SAN MARINO"] },
  { id: "SA", lat: 23.8, lng: 45.0, names: ["SAUDI ARABIA"] },
  { id: "SN", lat: 14.4, lng: -14.4, names: ["SENEGAL"] },
  { id: "RS", lat: 44.0, lng: 21.0, names: ["SERBIA"] },
  { id: "SC", lat: -4.6, lng: 55.4, names: ["SEYCHELLES"] },
  { id: "SL", lat: 8.4, lng: -11.7, names: ["SIERRA LEONE"] },
  { id: "SG", lat: 1.3, lng: 103.8, names: ["SINGAPORE"] },
  { id: "SK", lat: 48.6, lng: 19.6, names: ["SLOVAKIA"] },
  { id: "SI", lat: 46.1, lng: 14.9, names: ["SLOVENIA"] },
  { id: "SB", lat: -9.6, lng: 160.1, names: ["SOLOMON ISLANDS"] },
  { id: "SO", lat: 5.1, lng: 46.1, names: ["SOMALIA"] },
  { id: "ZA", lat: -30.5, lng: 22.9, names: ["SOUTH AFRICA"] },
  { id: "ES", lat: 40.4, lng: -3.7, names: ["SPAIN"] },
  { id: "LK", lat: 7.8, lng: 80.7, names: ["SRI LANKA"] },
  { id: "SD", lat: 12.8, lng: 30.2, names: ["SUDAN"] },
  { id: "SR", lat: 3.9, lng: -56.0, names: ["SURINAME"] },
  { id: "SZ", lat: -26.5, lng: 31.4, names: ["ESWATINI"] },
  { id: "SE", lat: 60.1, lng: 18.6, names: ["SWEDEN"] },
  { id: "CH", lat: 46.8, lng: 8.2, names: ["SWITZERLAND"] },
  { id: "SY", lat: 34.8, lng: 38.9, names: ["SYRIA"] },
  { id: "TW", lat: 23.6, lng: 120.9, names: ["TAIWAN"] },
  { id: "TJ", lat: 38.8, lng: 71.2, names: ["TAJIKISTAN"] },
  { id: "TZ", lat: -6.3, lng: 34.8, names: ["TANZANIA"] },
  { id: "TH", lat: 15.8, lng: 100.9, names: ["THAILAND"] },
  { id: "TG", lat: 8.6, lng: 0.8, names: ["TOGO"] },
  { id: "TO", lat: -21.1, lng: -175.1, names: ["TONGA"] },
  { id: "TT", lat: 10.6, lng: -61.2, names: ["TRINIDAD AND TOBAGO"] },
  { id: "TN", lat: 33.8, lng: 9.5, names: ["TUNISIA"] },
  { id: "TR", lat: 38.9, lng: 35.2, names: ["TURKEY"] },
  { id: "TM", lat: 38.9, lng: 59.5, names: ["TURKMENISTAN"] },
  { id: "TV", lat: -7.1, lng: 177.6, names: ["TUVALU"] },
  { id: "UG", lat: 1.3, lng: 32.2, names: ["UGANDA"] },
  { id: "UA", lat: 48.3, lng: 31.1, names: ["UKRAINE"] },
  { id: "AE", lat: 23.4, lng: 53.8, names: ["UNITED ARAB EMIRATES"] },
  { id: "UK", lat: 54.0, lng: -2.0, names: ["UK", "UNITED KINGDOM", "GB", "GREAT BRITAIN"] },
  { id: "US", lat: 37.0, lng: -95.7, names: ["US", "USA", "UNITED STATES", "UNITED STATES OF AMERICA"] },
  { id: "UY", lat: -32.5, lng: -55.7, names: ["URUGUAY"] },
  { id: "UZ", lat: 41.3, lng: 64.5, names: ["UZBEKISTAN"] },
  { id: "VU", lat: -15.3, lng: 166.9, names: ["VANUATU"] },
  { id: "VE", lat: 6.4, lng: -66.5, names: ["VENEZUELA"] },
  { id: "VN", lat: 14.0, lng: 108.2, names: ["VIETNAM"] },
  { id: "YE", lat: 15.5, lng: 48.5, names: ["YEMEN"] },
  { id: "ZM", lat: -13.1, lng: 27.8, names: ["ZAMBIA"] },
  { id: "ZW", lat: -19.0, lng: 29.1, names: ["ZIMBABWE"] }
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
  const [viewMode, setViewMode] = useState<"global" | "team">("global");

  const fetchTeamData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // FETCH FROM THE LOGGED IN USER'S team_countries COLUMN
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("team_countries")
      .eq("id", user.id)
      .single();

    if (!error && profile?.team_countries) {
      // Assuming team_countries is a string like "US, GB, FR" or "UNITED STATES, JAPAN"
      const countryList = profile.team_countries
        .split(",")
        .map((c: string) => c.trim().toUpperCase());

      const mappedTeam = countryList
        .map(countryNameOrId => {
          const coords = locations.find(l => 
            l.id === countryNameOrId || 
            l.names.includes(countryNameOrId)
          );
          
          if (coords) {
            return { ...coords, name: countryNameOrId };
          }
          return null;
        })
        .filter(Boolean);
      
      setTeamLocations(mappedTeam);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

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
    
    markerLayerGroup.current = window.L.layerGroup().addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !markerLayerGroup.current) return;

    markerLayerGroup.current.clearLayers();

    const heartIcon = window.L.divIcon({
      className: 'custom-heart-icon',
      html: `
        <div class="heart-flicker">
          <svg viewBox="0 0 24 24" fill="#ea580c" stroke="none" width="30" height="30">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const displayList = viewMode === "team" ? teamLocations : locations;

    displayList.forEach((loc) => {
      window.L.marker([loc.lat, loc.lng], { icon: heartIcon })
        .addTo(markerLayerGroup.current)
        .bindPopup(`
          <div style="font-family: 'Inter', sans-serif; text-align: center; padding: 5px;">
            <b style="color: #ea580c; text-transform: uppercase; font-size: 10px; letter-spacing: 0.1em;">
              ${viewMode === 'team' ? `FAMILY_${loc.name || 'MEMBER'}` : `NODE_${loc.id}`}
            </b>
          </div>
        `);
    });

    setTimeout(() => {
      if(mapInstance.current) mapInstance.current.invalidateSize();
    }, 100);

  }, [viewMode, teamLocations]);

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
      
      <style>{`
        @keyframes heart-flicker {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 2px #ea580c); }
          50% { opacity: 0.6; transform: scale(0.9); filter: drop-shadow(0 0 8px #ea580c); }
          70% { opacity: 0.9; transform: scale(1.05); }
        }
        .heart-flicker {
          animation: heart-flicker 2s infinite ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="border-l-4 border-orange-600 pl-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
              Find Your <span className="text-orange-600 not-italic">Friends</span>
            </h2>
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mt-2">
              Strategic Infrastructure // Hearts Active
            </p>
          </div>

          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-border">
            <button 
              onClick={() => setViewMode("global")}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${viewMode === 'global' ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow-sm' : 'text-zinc-500'}`}
            >
              Global
            </button>
            <button 
              onClick={() => setViewMode("team")}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 ${viewMode === 'team' ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow-sm' : 'text-zinc-500'}`}
            >
              <Heart size={12} fill={viewMode === 'team' ? "#ea580c" : "none"} /> My Team
            </button>
          </div>
        </div>

        <div className="relative border border-border bg-white/5 shadow-2xl overflow-hidden group z-10 rounded-xl">
          <div 
            ref={mapRef} 
            className="w-full h-[600px] cursor-crosshair filter grayscale-[20%] invert-[5%] dark:invert-[90%] dark:hue-rotate-180" 
          />
          
          <div className="absolute top-4 right-4 z-[500] bg-background/90 backdrop-blur-md p-3 border border-border pointer-events-none text-right">
            <p className="text-[9px] font-bold text-orange-600 uppercase tracking-[0.2em]">
              {viewMode === 'team' ? "Your Personal Network" : "Our Flame Foundation"}
            </p>
            <p className="text-xs font-black text-foreground uppercase italic">
              Hearts Connected: {viewMode === 'team' ? teamLocations.length : locations.length}
            </p>
          </div>
        </div>

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

        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)} 
            />
            
            <div className="relative bg-white dark:bg-zinc-950 w-full max-w-xl rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="text-xl font-black uppercase italic text-zinc-900 dark:text-white">
                  Search <span className="text-orange-600 not-italic">Directory</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-orange-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

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
                      No hearts found for "{searchQuery}"
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
