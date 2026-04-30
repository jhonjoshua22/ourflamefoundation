import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Play, 
  Users, 
  Globe, 
  Flame, 
  ChevronRight, 
  Loader2 
} from "lucide-react";

const FlameGame: React.FC = () => {
  const [gameData, setGameData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameContent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("flame_game")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setGameData(data);
      }
      setLoading(false);
    };

    fetchGameContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-orange-600 animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6 lg:px-20 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">
          The <span className="text-orange-600 not-italic">Flame</span> Game
        </h2>
        <div className="h-1 w-32 bg-orange-600 mb-8"></div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Dynamic Video / Game List */}
        <div className="lg:col-span-8 space-y-12">
          {gameData.map((item) => (
            <div key={item.id} className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden">
              {/* Video/Thumbnail Container */}
              <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                {item.video_url ? (
                  <video 
                    src={item.video_url} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    poster={item.thumbnail_url}
                    controls
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Flame size={60} className="text-zinc-800" />
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform pointer-events-none">
                  <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.4)]">
                    <Play fill="black" size={32} className="ml-1 text-black" />
                  </div>
                </div>
              </div>

              {/* Content Details from DB */}
              <div className="p-8">
                <h3 className="text-2xl font-black uppercase italic mb-4">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl">
                  {item.description}
                </p>
                
                {/* Stats Bar */}
                <div className="flex flex-wrap gap-8 py-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Impacted Families</span>
                    <span className="text-xl font-black text-white">{item.families_impacted?.toLocaleString()}+</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Global Reach</span>
                    <span className="text-xl font-black text-white">{item.reach_count?.toLocaleString()}+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Info / CTA */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-orange-600 p-8 rounded-none">
            <h4 className="text-black font-black uppercase text-xl mb-4 leading-tight">Join the Movement</h4>
            <p className="text-black/80 text-xs font-bold uppercase tracking-wider mb-6">
              Our data is verified on-chain to ensure transparency in every flame ignited.
            </p>
            <button className="w-full bg-black text-white py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors">
              Play Now <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8">
            <h4 className="text-white font-black uppercase text-sm mb-6 tracking-widest">Live Metrics</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Users className="text-orange-600" size={24} />
                <div>
                  <p className="text-white text-xs font-black uppercase">Active Players</p>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-tighter">Updating Live...</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="text-orange-600" size={24} />
                <div>
                  <p className="text-white text-xs font-black uppercase">Nodes Active</p>
                  <p className="text-zinc-500 text-[10px] font-bold tracking-tighter">Global Foundation Grid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FlameGame;
