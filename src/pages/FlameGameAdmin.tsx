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
  EyeOff
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
      // Update
      const { error } = await supabase
        .from("flame_game")
        .update(formData)
        .eq("id", editingItem.id);
      if (error) alert(error.message);
    } else {
      // Create
      const { error } = await supabase
        .from("flame_game")
        .insert([formData]);
      if (error) alert(error.message);
    }

    setIsModalOpen(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mission?")) return;
    
    const { error } = await supabase
      .from("flame_game")
      .delete()
      .eq("id", id);
    
    if (error) alert(error.message);
    fetchItems();
  };

  return (
    <div className="p-6 bg-zinc-50 dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Flame Game <span className="text-orange-600">CMS</span>
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Manage Global Missions & Stats</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest transition-all"
          >
            <Plus size={16} /> Add New Mission
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 opacity-50 font-black uppercase italic tracking-widest">Syncing with HQ...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/10 overflow-hidden group">
                <div className="aspect-video relative bg-black">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-800"><Video size={48} /></div>
                  )}
                  <div className="absolute top-4 right-4">
                    {item.is_active ? (
                      <span className="bg-green-500/20 text-green-500 text-[8px] font-black uppercase px-2 py-1 border border-green-500/50">Active</span>
                    ) : (
                      <span className="bg-zinc-500/20 text-zinc-500 text-[8px] font-black uppercase px-2 py-1 border border-zinc-500/50">Draft</span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-black uppercase italic truncate mb-2">{item.title}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6 opacity-60">
                    <div className="text-[10px] font-bold uppercase"><span className="text-orange-600 block">Reach</span> {item.reach_count.toLocaleString()}</div>
                    <div className="text-[10px] font-bold uppercase"><span className="text-orange-600 block">Impact</span> {item.families_impacted.toLocaleString()}</div>
                  </div>

                  <div className="flex gap-2 border-t border-zinc-100 dark:border-white/5 pt-4">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-white/5 hover:bg-orange-600 hover:text-white p-3 transition-all font-black text-[10px] uppercase"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => item.id && handleDelete(item.id)}
                      className="w-12 flex items-center justify-center bg-zinc-100 dark:bg-white/5 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f0f0f] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10 rounded-none shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-[#0f0f0f] border-b border-zinc-100 dark:border-white/10 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">
                {editingItem ? "Edit Mission Data" : "Initiate New Mission"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Content */}
              <div className="space-y-4">
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest border-b border-orange-600/20 pb-2">Basic Info</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2">Mission Title</label>
                    <input 
                      required
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-xs font-bold outline-none focus:border-orange-600"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2">Visibility</label>
                    <select 
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-xs font-bold outline-none focus:border-orange-600"
                      value={formData.is_active ? "true" : "false"}
                      onChange={e => setFormData({...formData, is_active: e.target.value === "true"})}
                    >
                      <option value="true">PUBLISHED (Live on Site)</option>
                      <option value="false">DRAFT (Hidden)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2">Description</label>
                  <textarea 
                    className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-xs font-bold outline-none focus:border-orange-600 min-h-[100px]"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {/* Assets */}
              <div className="space-y-4">
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest border-b border-orange-600/20 pb-2">Media Assets</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2 flex items-center gap-2"><Video size={12}/> Video URL (MP4)</label>
                    <input 
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-xs font-bold outline-none"
                      value={formData.video_url}
                      onChange={e => setFormData({...formData, video_url: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2 flex items-center gap-2"><ImageIcon size={12}/> Thumbnail/Poster URL</label>
                    <input 
                      className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-xs font-bold outline-none"
                      value={formData.thumbnail_url}
                      onChange={e => setFormData({...formData, thumbnail_url: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="space-y-4">
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest border-b border-orange-600/20 pb-2 flex items-center gap-2"><BarChart3 size={12}/> Impact & Financials</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { label: "Families Impacted", key: "families_impacted" },
                    { label: "Reach Count", key: "reach_count" },
                    { label: "Engagements", key: "engagement" },
                    { label: "Paid ($)", key: "paid" },
                    { label: "Saved ($)", key: "saved" },
                    { label: "Value ($)", key: "value" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[8px] font-black uppercase text-zinc-500 mb-2">{field.label}</label>
                      <input 
                        type="number"
                        className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-4 text-xs font-bold outline-none"
                        value={formData[field.key as keyof FlameGameItem] as number}
                        onChange={e => setFormData({...formData, [field.key]: Number(e.target.value)})}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-orange-600 hover:text-white p-5 transition-all font-black text-[12px] uppercase tracking-[0.2em]"
                >
                  <Save size={18} /> {editingItem ? "Update Mission" : "Deploy Mission"}
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
