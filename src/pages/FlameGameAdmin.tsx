import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  Video, 
  Image as ImageIcon, 
  BarChart3,
  Loader2,
  AlertCircle
} from "lucide-react";

interface FlameGameItem {
  id?: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  families_impacted: number;
  reach_count: number;
  engagement: number;
  paid: number;      
  saved: number;     
  value: number;     
  description: string;
  is_active: boolean;
}

const FlameGameAdmin = () => {
  const [items, setItems] = useState<FlameGameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FlameGameItem | null>(null);

  const [formData, setFormData] = useState<FlameGameItem>({
    title: "",
    video_url: "",
    thumbnail_url: "",
    families_impacted: 0,
    reach_count: 0,
    engagement: 0,
    paid: 0,
    saved: 0,
    value: 0,
    description: "",
    is_active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("flame_game")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setItems(data);
    setLoading(false);
  };

  const handleOpenModal = (item: FlameGameItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: "", video_url: "", thumbnail_url: "",
        families_impacted: 0, reach_count: 0, engagement: 0,
        paid: 0, saved: 0, value: 0, description: "", is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingItem?.id) {
      const { error } = await supabase.from("flame_game").update(formData).eq("id", editingItem.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from("flame_game").insert([formData]);
      if (error) alert(error.message);
    }
    setIsModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this mission forever?")) return;
    await supabase.from("flame_game").delete().eq("id", id);
    fetchItems();
  };

  return (
    // Added pt-32 to push content below your fixed Navbar
    <div className="pt-32 p-6 bg-white dark:bg-black min-h-screen text-black dark:text-white relative">
      <div className="max-w-7xl mx-auto pb-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b-4 border-black dark:border-white pb-8">
          <div>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter">
              MISSION <span className="text-orange-600">CONTROL</span>
            </h1>
            <p className="bg-black text-white dark:bg-white dark:text-black inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              Flame Game Database v2.0
            </p>
          </div>
          
          {/* CRITICAL: High visibility button */}
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 bg-orange-600 text-white px-10 py-5 font-black uppercase text-sm tracking-widest transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_rgba(255,255,255,0.2)]"
          >
            <Plus size={24} strokeWidth={4} /> Create New Mission
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={64} />
            <span className="font-black uppercase italic tracking-[0.5em] animate-pulse">Scanning Bio-Signs...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <div key={item.id} className="group border-2 border-black dark:border-white/20 flex flex-col bg-zinc-50 dark:bg-zinc-900/50 hover:border-orange-600 transition-colors">
                <div className="aspect-video relative bg-black">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700"><Video size={48} /></div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                     <p className="text-white font-black uppercase italic text-lg truncate">{item.title}</p>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 ${item.is_active ? 'bg-green-500 text-black' : 'bg-red-600 text-white'}`}>
                      {item.is_active ? "Deployment Active" : "Internal Draft"}
                    </span>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">ID: {item.id?.slice(0,8)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-black/10 dark:border-white/10 py-4">
                    <div className="text-center">
                        <p className="text-orange-600 font-black text-xl">{item.reach_count.toLocaleString()}</p>
                        <p className="text-[8px] font-bold uppercase opacity-50">Reach</p>
                    </div>
                    <div className="text-center border-l border-black/10 dark:border-white/10">
                        <p className="text-orange-600 font-black text-xl">{item.families_impacted.toLocaleString()}</p>
                        <p className="text-[8px] font-bold uppercase opacity-50">Impact</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] py-4 hover:bg-orange-600 hover:text-white transition-all"
                    >
                      Modify Mission
                    </button>
                    <button 
                      onClick={() => item.id && handleDelete(item.id)}
                      className="bg-zinc-200 dark:bg-zinc-800 px-6 hover:bg-red-600 hover:text-white transition-all text-black dark:text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL - z-[110] TO BE ABOVE NAVBAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-white dark:bg-[#050505] w-full max-w-5xl max-h-[90vh] overflow-y-auto border-t-8 border-orange-600">
            <div className="sticky top-0 bg-white dark:bg-[#050505] p-6 border-b border-zinc-100 dark:border-white/10 flex justify-between items-center z-30">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                {editingItem ? "Edit Deployment" : "Initialize Deployment"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform text-orange-600">
                <X size={40} strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-orange-600">Mission Name</label>
                  <input 
                    required className="w-full bg-zinc-100 dark:bg-zinc-900 p-5 text-lg font-black uppercase italic outline-none focus:ring-2 focus:ring-orange-600 border-none"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-orange-600">Mission Briefing</label>
                  <textarea 
                    className="w-full bg-zinc-100 dark:bg-zinc-900 p-5 text-sm font-bold min-h-[150px] outline-none border-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500">Video Link</label>
                    <input className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 text-xs font-mono outline-none" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500">Poster Link</label>
                    <input className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 text-xs font-mono outline-none" value={formData.thumbnail_url} onChange={e => setFormData({...formData, thumbnail_url: e.target.value})} />
                  </div>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-900 p-6 grid grid-cols-2 gap-6 border-l-4 border-orange-600">
                   {[
                    { label: "Families", key: "families_impacted" },
                    { label: "Reach", key: "reach_count" },
                    { label: "Paid ($)", key: "paid" },
                    { label: "Saved ($)", key: "saved" },
                    { label: "Value ($)", key: "value" },
                    { label: "Engagement", key: "engagement" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-[8px] font-black uppercase text-zinc-400 block mb-1">{f.label}</label>
                      <input type="number" className="w-full bg-white dark:bg-black p-2 text-sm font-black outline-none border-none" value={formData[f.key as keyof FlameGameItem] as number} onChange={e => setFormData({...formData, [f.key]: Number(e.target.value)})} />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase">Live Status:</span>
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                        className={`flex-1 py-3 font-black uppercase text-xs border-2 transition-all ${formData.is_active ? 'bg-green-500 border-black text-black' : 'bg-transparent border-zinc-500 text-zinc-500'}`}
                    >
                        {formData.is_active ? "Live / Public" : "Draft / Private"}
                    </button>
                </div>

                <button type="submit" className="w-full bg-orange-600 text-white font-black uppercase py-6 tracking-[0.2em] shadow-xl hover:bg-black transition-all">
                   Save Mission Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlameGameAdmin;
