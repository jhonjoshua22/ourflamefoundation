import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Plus, Pencil, Trash2, Save, X, Video, 
  Image as ImageIcon, Loader2, Upload, BarChart3, Activity 
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
  const [modalMode, setModalMode] = useState<"video" | "stats" | null>(null);
  const [editingItem, setEditingItem] = useState<FlameGameItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<FlameGameItem>({
    title: "", video_url: "", thumbnail_url: "",
    families_impacted: 0, reach_count: 0, engagement: 0,
    paid: 0, saved: 0, value: 0,
    description: "", is_active: true,
  });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("flame_game").select("*").order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: "video_url" | "thumbnail_url") => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("flamegame").upload(`uploads/${fileName}`, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("flamegame").getPublicUrl(`uploads/${fileName}`);
      setFormData(prev => ({ ...prev, [field]: data.publicUrl }));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const openModal = (mode: "video" | "stats", item: FlameGameItem | null = null) => {
    setModalMode(mode);
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: "", video_url: "", thumbnail_url: "",
        families_impacted: 0, reach_count: 0, engagement: 0,
        paid: 0, saved: 0, value: 0,
        description: "", is_active: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingItem?.id) {
      await supabase.from("flame_game").update(formData).eq("id", editingItem.id);
    } else {
      await supabase.from("flame_game").insert([formData]);
    }
    setModalMode(null);
    fetchItems();
  };

  return (
    <div className="pt-32 p-6 bg-[#050505] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-10">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter">Flame <span className="text-orange-600">Game</span></h1>
          <button onClick={() => openModal("video")} className="bg-white text-black px-8 py-4 font-black uppercase text-xs hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2">
            <Plus size={18} strokeWidth={3} /> Add Video
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-white/5 overflow-hidden">
              <div className="aspect-video bg-black relative">
                {item.thumbnail_url && <img src={item.thumbnail_url} className="w-full h-full object-cover opacity-50" />}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-center font-black uppercase italic text-lg leading-tight">{item.title}</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase">
                  <div className="bg-black p-2 border border-white/5"><span className="text-orange-600">Reach:</span> {item.reach_count}</div>
                  <div className="bg-black p-2 border border-white/5"><span className="text-orange-600">Impact:</span> {item.families_impacted}</div>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => openModal("video", item)} className="flex-1 bg-white/5 hover:bg-white hover:text-black py-3 text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2">
                    <Video size={14} /> Edit Media
                  </button>
                  <button onClick={() => openModal("stats", item)} className="flex-1 bg-orange-600 py-3 text-[10px] font-black uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                    <BarChart3 size={14} /> Edit Stats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {modalMode && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0f0f0f] w-full max-w-2xl border border-white/10 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase italic tracking-widest">
                {modalMode === "video" ? "Video Details" : "Database Stats"}
              </h2>
              <button onClick={() => setModalMode(null)}><X size={24}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {modalMode === "video" ? (
                <>
                  <div className="space-y-4">
                    <input placeholder="Video Title" required className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-orange-600" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 p-4 font-bold min-h-[100px] outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 border border-dashed border-white/10">
                        <input type="file" accept="video/*" className="hidden" id="v-up" onChange={(e) => handleFileUpload(e, 'video_url')} />
                        <label htmlFor="v-up" className="cursor-pointer text-[10px] font-black uppercase flex flex-col items-center gap-2">
                          <Video size={20}/> {formData.video_url ? "Video Ready" : "Upload Video"}
                        </label>
                      </div>
                      <div className="bg-white/5 p-4 border border-dashed border-white/10">
                        <input type="file" accept="image/*" className="hidden" id="t-up" onChange={(e) => handleFileUpload(e, 'thumbnail_url')} />
                        <label htmlFor="t-up" className="cursor-pointer text-[10px] font-black uppercase flex flex-col items-center gap-2">
                          <ImageIcon size={20}/> {formData.thumbnail_url ? "Thumb Ready" : "Upload Thumb"}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Families Impacted", key: "families_impacted" },
                    { label: "Reach Count", key: "reach_count" },
                    { label: "Engagements", key: "engagement" },
                    { label: "Invested (Paid)", key: "paid" },
                    { label: "Saved", key: "saved" },
                    { label: "Value", key: "value" },
                  ].map((stat) => (
                    <div key={stat.key}>
                      <label className="text-[9px] font-black uppercase text-zinc-500 mb-1 block">{stat.label}</label>
                      <input type="number" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-orange-600" value={(formData as any)[stat.key]} onChange={e => setFormData({...formData, [stat.key]: Number(e.target.value)})} />
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={uploading} className="w-full bg-orange-600 text-white p-6 font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                {uploading ? "Uploading..." : "Sync Database"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlameGameAdmin;
