import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Plus, Pencil, Trash2, X, Video, 
  BarChart3, Loader2, UploadCloud
} from "lucide-react";

const FlameGameAdmin = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"video" | "stats" | null>(null);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoForm, setVideoForm] = useState({
    title: "", description: "", video_url: "", thumbnail_url: "", is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch Videos
    const { data: vData } = await supabase
      .from("flamegame_videos")
      .select("*")
      .order("created_at", { ascending: false });

    // Fetch Stats
    const { data: sData } = await supabase
      .from("flamegame_stats")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (vData) setVideos(vData);
    if (sData) setStats(sData);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to the 'flamegame' bucket
      const { error: uploadError } = await supabase.storage
        .from('flamegame')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type // Explicitly set content type
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('flamegame')
        .getPublicUrl(filePath);

      setVideoForm({ ...videoForm, video_url: publicUrl });
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed. Check if bucket "flamegame" exists and is public.');
    } finally {
      setUploading(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVideo) {
      await supabase.from("flamegame_videos").update(videoForm).eq("id", editingVideo.id);
    } else {
      await supabase.from("flamegame_videos").insert([videoForm]);
    }
    setModalMode(null);
    fetchData();
  };

  const handleStatsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stats?.id) return;

    const { error } = await supabase
      .from("flamegame_stats")
      .update({ 
        ...stats, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", stats.id);

    if (error) {
      console.error("Update error:", error);
    } else {
      setModalMode(null);
      fetchData();
    }
  };

  return (
    <div className="pt-32 p-6 bg-[#050505] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* STATS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3">
              <BarChart3 className="text-orange-600" /> Global Impact Stats
            </h2>
            <button onClick={() => setModalMode("stats")} className="bg-orange-600 text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
              Update Database Stats
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats && [
              { label: "Families", val: stats.families_impacted },
              { label: "Reach", val: stats.reach_count },
              { label: "Engagement", val: stats.engagement },
              { label: "Invested", val: `$${stats.paid}` },
              { label: "Saved", val: stats.saved },
              { label: "Value", val: `$${stats.value}` },
            ].map((s, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 text-center">
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl font-black text-white italic">{s.val || 0}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section>
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3">
              <Video className="text-orange-600" /> Video Library
            </h2>
            <button 
              onClick={() => { setEditingVideo(null); setVideoForm({title:"", description:"", video_url:"", thumbnail_url:"", is_active:true}); setModalMode("video"); }}
              className="bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> Add New Video
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.id} className="group relative bg-zinc-900 border border-white/5 aspect-video overflow-hidden">
                {v.thumbnail_url && <img src={v.thumbnail_url} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="" />}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-black uppercase italic text-lg leading-tight mb-4">{v.title}</h3>
                  <div className="flex gap-2 text-white">
                    <button onClick={() => { setEditingVideo(v); setVideoForm(v); setModalMode("video"); }} className="bg-white/10 backdrop-blur-md p-2 hover:bg-orange-600 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={async () => { if(confirm("Delete video?")) { await supabase.from("flamegame_videos").delete().eq("id", v.id); fetchData(); } }} className="bg-white/10 backdrop-blur-md p-2 hover:bg-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* STATS MODAL */}
      {modalMode === "stats" && stats && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0f0f0f] w-full max-w-xl border border-white/10 p-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase italic">Update Global Stats</h2>
                <button onClick={() => setModalMode(null)}><X size={32}/></button>
             </div>
             <form onSubmit={handleStatsSubmit} className="grid grid-cols-2 gap-6">
                {Object.keys(stats).filter(k => !['id', 'updated_at'].includes(k)).map(key => (
                  <div key={key}>
                    <label className="text-[9px] font-black uppercase text-zinc-500 mb-2 block">{key.replace('_', ' ')}</label>
                    <input 
                      type="number" 
                      step="any"
                      className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none focus:border-orange-600 text-white" 
                      value={stats[key]} 
                      onChange={e => setStats({...stats, [key]: Number(e.target.value)})} 
                    />
                  </div>
                ))}
                <button type="submit" className="col-span-2 bg-orange-600 p-5 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all text-white">Save Changes</button>
             </form>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {modalMode === "video" && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0f0f0f] w-full max-w-xl border border-white/10 p-8 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase italic">{editingVideo ? "Edit Video" : "Add Video"}</h2>
                <button onClick={() => setModalMode(null)}><X size={32}/></button>
            </div>
            <form onSubmit={handleVideoSubmit} className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 hover:border-orange-600 p-10 text-center cursor-pointer transition-colors bg-white/5 rounded-xl group"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="video/*" className="hidden" />
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-orange-600" size={40} />
                    <p className="text-xs font-black uppercase italic">Uploading to Buckets...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <UploadCloud className="text-zinc-500 group-hover:text-orange-600 transition-colors" size={40} />
                    <p className="text-xs font-black uppercase italic">Click to Upload Video Asset</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <input placeholder="Title" required className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none" value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 p-4 font-bold min-h-[80px] outline-none" value={videoForm.description} onChange={e => setVideoForm({...videoForm, description: e.target.value})} />
                <div className="grid grid-cols-1 gap-2">
                   <label className="text-[10px] uppercase font-black text-orange-600 italic">Video Path (Auto-filled or URL)</label>
                   <input placeholder="Video URL" required className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none text-zinc-400 text-sm" value={videoForm.video_url} onChange={e => setVideoForm({...videoForm, video_url: e.target.value})} />
                </div>
                <input placeholder="Thumbnail URL" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none" value={videoForm.thumbnail_url} onChange={e => setVideoForm({...videoForm, thumbnail_url: e.target.value})} />
              </div>

              <button type="submit" disabled={uploading} className="w-full bg-orange-600 p-5 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50 text-white">
                {editingVideo ? "Update Video" : "Add to Library"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlameGameAdmin;
