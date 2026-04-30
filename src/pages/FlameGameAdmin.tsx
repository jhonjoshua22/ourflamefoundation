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
  Eye,
  EyeOff,
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

  // Form State
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

    if (error) {
      console.error("Error fetching missions:", error.message);
    } else if (data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleOpenModal = (item: FlameGameItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({
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
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingItem?.id) {
      // UPDATE EXISTING
      const { error } = await supabase
        .from("flame_game")
        .update(formData)
        .eq("id", editingItem.id);
      
      if (error) alert("Update failed: " + error.message);
    } else {
      // CREATE NEW
      const { error } = await supabase
        .from("flame_game")
        .insert([formData]);
      
      if (error) alert("Creation failed: " + error.message);
    }

    setIsModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("CRITICAL: Are you sure you want to delete this mission? This cannot be undone.")) return;
    
    const { error } = await supabase
      .from("flame_game")
      .delete()
      .eq("id", id);
    
    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      fetchItems();
    }
  };

  return (
    <div className="p-6 bg-zinc-50 dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
              Flame Game <span className="text-orange-600">CMS</span>
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.3em] mt-2">Command Center / Content Management</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest transition-all shadow-lg shadow-orange-600/20 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> Add New Mission
          </button>
        </div>

        {/* Content Area */}
        {loading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-50">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black uppercase italic tracking-widest text-xs">Syncing with HQ...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/10 overflow-hidden group hover:border-orange-600/50 transition-colors">
                <div className="aspect-video relative bg-zinc-900 overflow-hidden">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700"><Video size={48} /></div>
                  )}
                  <div className="absolute top-4 right-4">
                    {item.is_active ? (
                      <span className="bg-green-500/10 text-green-500 text-[9px] font-black uppercase px-2 py-1 border border-green-500/30 backdrop-blur-md">Live</span>
                    ) : (
                      <span className="bg-zinc-500/10 text-zinc-400 text-[9px] font-black uppercase px-2 py-1 border border-zinc-500/30 backdrop-blur-md">Draft</span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase italic truncate mb-4 tracking-tighter">{item.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8">
                    <div className="border-l-2 border-orange-600 pl-3">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Reach</p>
                        <p className="font-black text-sm">{item.reach_count.toLocaleString()}</p>
                    </div>
                    <div className="border-l-2 border-orange-600 pl-3">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Impact</p>
                        <p className="font-black text-sm">{item.families_impacted.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-white/5 hover:bg-orange-600 hover:text-white p-4 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => item.id && handleDelete(item.id)}
                      className="w-14 flex items-center justify-center bg-zinc-100 dark:bg-white/5 hover:bg-red-600 hover:text-white transition-all text-zinc-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {items.length === 0 && !loading && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-200 dark:border-white/5">
                    <AlertCircle className="mx-auto text-zinc-500 mb-4" size={40} />
                    <p className="text-zinc-500 font-black uppercase italic tracking-widest">No Missions Found in Database</p>
                </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: Fullscreen Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0f0f0f] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-[#0f0f0f] border-b border-zinc-100 dark:border-white/10 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                {editingItem ? "Update Mission Specs" : "Initialize New Mission"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-red-500 transition-colors">
                <X size={32} strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-10">
              {/* SECTION: Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-orange-600"></div>
                    <p className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">Core Identity</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2">Mission Title</label>
                    <input 
                      required
                      placeholder="e.g. Operation Deep Sea"
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-sm font-bold outline-none focus:border-orange-600 transition-colors"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2">Visibility Status</label>
                    <select 
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-sm font-bold outline-none focus:border-orange-600 transition-colors appearance-none"
                      value={formData.is_active ? "true" : "false"}
                      onChange={e => setFormData({...formData, is_active: e.target.value === "true"})}
                    >
                      <option value="true">LIVE ON SITE</option>
                      <option value="false">HIDDEN / DRAFT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2">Mission Description / Intel</label>
                  <textarea 
                    placeholder="Enter detailed briefing..."
                    className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-sm font-medium outline-none focus:border-orange-600 min-h-[120px] transition-colors"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {/* SECTION: Media */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-orange-600"></div>
                    <p className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">Visual Assets</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 flex items-center gap-2">
                        <Video size={14} className="text-orange-600"/> MP4 Video URL
                    </label>
                    <input 
                      placeholder="https://..."
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-sm font-medium outline-none"
                      value={formData.video_url}
                      onChange={e => setFormData({...formData, video_url: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 flex items-center gap-2">
                        <ImageIcon size={14} className="text-orange-600"/> Thumbnail Image URL
                    </label>
                    <input 
                      placeholder="https://..."
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-sm font-medium outline-none"
                      value={formData.thumbnail_url}
                      onChange={e => setFormData({...formData, thumbnail_url: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Metrics */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-orange-600"></div>
                    <p className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">Impact Metrics</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Impact", key: "families_impacted" },
                    { label: "Reach", key: "reach_count" },
                    { label: "Engage", key: "engagement" },
                    { label: "Paid ($)", key: "paid" },
                    { label: "Saved ($)", key: "saved" },
                    { label: "Value ($)", key: "value" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[8px] font-black uppercase text-zinc-500 mb-2">{field.label}</label>
                      <input 
                        type="number"
                        className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-3 text-sm font-black outline-none focus:border-orange-600"
                        value={formData[field.key as keyof FlameGameItem] as number}
                        onChange={e => setFormData({...formData, [field.key]: Number(e.target.value)})}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-10">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-orange-600 text-white hover:bg-orange-500 p-6 transition-all font-black text-[14px] uppercase tracking-[0.4em] shadow-xl shadow-orange-600/10 disabled:opacity-50"
                >
                  <Save size={20} /> {editingItem ? "Commit Changes" : "Deploy Mission"}
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
