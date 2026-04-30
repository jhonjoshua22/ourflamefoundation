import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Plus, Pencil, Trash2, Save, X, Video, 
  Image as ImageIcon, Loader2, Upload, BarChart3 
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
  const [uploading, setUploading] = useState(false);

  // Initial State for Form
  const initialForm: FlameGameItem = {
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
  };

  const [formData, setFormData] = useState<FlameGameItem>(initialForm);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: "video_url" | "thumbnail_url") => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("flamegame")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("flamegame").getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, [field]: data.publicUrl }));
      
    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenModal = (item: FlameGameItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData(initialForm);
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
    if (!confirm("Are you sure you want to delete this video and its stats?")) return;
    await supabase.from("flame_game").delete().eq("id", id);
    fetchItems();
  };

  return (
    // pt-32 ensures content starts below your fixed Navbar
    <div className="pt-32 p-6 bg-[#050505] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto pb-20">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-10 gap-6">
          <div>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
              Flame <span className="text-orange-600">Admin</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] mt-4 text-[10px]">Content & Stats Manager</p>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="bg-white text-black px-10 py-5 font-black uppercase text-xs tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
          >
            <Plus size={20} strokeWidth={3} /> Add New Video
          </button>
        </div>

        {/* LISTING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-white/5 flex flex-col group">
              <div className="aspect-video bg-black relative overflow-hidden">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-800"><Video size={48} /></div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-orange-600 text-[9px] font-black uppercase tracking-widest">
                  {item.is_active ? 'Live' : 'Hidden'}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-black uppercase italic mb-6 line-clamp-1">{item.title}</h3>
                
                {/* READ-ONLY STATS VIEW */}
                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-8">
                  <div className="bg-zinc-900 p-4">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Impact</p>
                    <p className="text-lg font-black text-orange-600">{Number(item.families_impacted).toLocaleString()}</p>
                  </div>
                  <div className="bg-zinc-900 p-4">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Reach</p>
                    <p className="text-lg font-black text-orange-600">{Number(item.reach_count).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-auto flex gap-4 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => handleOpenModal(item)}
                    className="flex-1 bg-white text-black py-4 font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Pencil size={14} /> Edit Stats & Info
                  </button>
                  <button onClick={() => item.id && handleDelete(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL - z-[120] to stay above Navbar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0f0f0f] w-full max-w-4xl my-auto border border-white/10 shadow-2xl">
            <div className="sticky top-0 bg-[#0f0f0f] border-b border-white/10 p-8 flex justify-between items-center z-10">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Edit Video Stats</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-orange-600 transition-colors"><X size={32}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-orange-600 tracking-widest block mb-2">Video Title</label>
                  <input required className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-orange-600 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">Impact</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-orange-600 outline-none" value={formData.families_impacted} onChange={e => setFormData({...formData, families_impacted: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">Reach</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-orange-600 outline-none" value={formData.reach_count} onChange={e => setFormData({...formData, reach_count: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">Engagements</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold" value={formData.engagement} onChange={e => setFormData({...formData, engagement: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">Value ($)</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold" value={formData.value} onChange={e => setFormData({...formData, value: Number(e.target.value)})} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 block mb-2">Description</label>
                  <textarea className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold min-h-[100px] outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest border-b border-white/5 pb-2">Media Uploads</p>
                  
                  <div className="bg-white/5 p-4 border border-dashed border-white/20">
                    <label className="text-[9px] font-black uppercase text-zinc-500 block mb-3">Video File</label>
                    <input type="file" accept="video/*" className="hidden" id="v-up" onChange={(e) => handleFileUpload(e, 'video_url')} disabled={uploading} />
                    <label htmlFor="v-up" className="w-full bg-white text-black p-4 text-[10px] font-black uppercase flex items-center justify-center gap-3 cursor-pointer hover:bg-orange-600 hover:text-white transition-all">
                      {uploading ? <Loader2 className="animate-spin" size={16}/> : <Video size={16}/>}
                      {formData.video_url ? "Video Loaded" : "Upload Video"}
                    </label>
                    <p className="text-[8px] mt-2 opacity-50 truncate">{formData.video_url}</p>
                  </div>

                  <div className="bg-white/5 p-4 border border-dashed border-white/20">
                    <label className="text-[9px] font-black uppercase text-zinc-500 block mb-3">Poster Image</label>
                    <input type="file" accept="image/*" className="hidden" id="t-up" onChange={(e) => handleFileUpload(e, 'thumbnail_url')} disabled={uploading} />
                    <label htmlFor="t-up" className="w-full bg-white text-black p-4 text-[10px] font-black uppercase flex items-center justify-center gap-3 cursor-pointer hover:bg-orange-600 hover:text-white transition-all">
                      {uploading ? <Loader2 className="animate-spin" size={16}/> : <ImageIcon size={16}/>}
                      {formData.thumbnail_url ? "Poster Loaded" : "Upload Poster"}
                    </label>
                    <p className="text-[8px] mt-2 opacity-50 truncate">{formData.thumbnail_url}</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full bg-orange-600 text-white p-6 font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  {uploading ? "Processing Media..." : "Save to Database"}
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
