import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import AdminLayout from "../components/AdminLayout";
import { 
  Plus, Pencil, Trash2, X, Video, 
  Loader2, UploadCloud
} from "lucide-react";

const FlameGameAdmin = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"video" | null>(null);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoForm, setVideoForm] = useState({
    title: "", 
    description: "", 
    video_url: "", 
    thumbnail_url: "", 
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: vData } = await supabase
      .from("flamegame_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (vData) setVideos(vData);
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

      const { error: uploadError } = await supabase.storage
        .from('flamegame')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type 
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('flamegame')
        .getPublicUrl(filePath);

      setVideoForm(prev => ({ ...prev, video_url: publicUrl }));
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalFormData = {
        title: videoForm.title,
        description: videoForm.description,
        video_url: videoForm.video_url,
        thumbnail_url: videoForm.thumbnail_url,
        is_active: videoForm.is_active
    };

    try {
        if (editingVideo && editingVideo.id) {
            const { error } = await supabase
                .from("flamegame_videos")
                .update(finalFormData)
                .eq("id", editingVideo.id);
            
            if (error) throw error;
        } else {
            const { error } = await supabase
                .from("flamegame_videos")
                .insert([finalFormData]);
            
            if (error) throw error;
        }

        setModalMode(null);
        setEditingVideo(null);
        setVideoForm({title: "", description: "", video_url: "", thumbnail_url: "", is_active: true});
        fetchData();
    } catch (err: any) {
        console.error("Database Error:", err);
        alert("Operation failed: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-16">
        
        {/* VIDEO SECTION */}
        <section>
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 pt-16">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3 text-white">
              <Video className="text-orange-600" /> Video Library
            </h2>
            <button 
              onClick={() => { 
                setEditingVideo(null); 
                setVideoForm({title:"", description:"", video_url:"", thumbnail_url:"", is_active:true}); 
                setModalMode("video"); 
              }}
              className="bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> Add New Video
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.id} className="group relative bg-zinc-900 border border-white/5 aspect-video overflow-hidden">
                <video 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" 
                    src={`${v.video_url}#t=0.001`} 
                    preload="metadata"
                    muted 
                    playsInline
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-black uppercase italic text-lg leading-tight mb-4 text-white">{v.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => { 
                        setEditingVideo(v); 
                        setVideoForm({
                            title: v.title,
                            description: v.description || "",
                            video_url: v.video_url,
                            thumbnail_url: v.thumbnail_url || "",
                            is_active: v.is_active
                        }); 
                        setModalMode("video"); 
                    }} className="bg-white/10 backdrop-blur-md p-2 text-white hover:bg-orange-600 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={async () => { if(confirm("Delete video?")) { await supabase.from("flamegame_videos").delete().eq("id", v.id); fetchData(); } }} className="bg-white/10 backdrop-blur-md p-2 text-white hover:bg-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* VIDEO MODAL */}
      {modalMode === "video" && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0f0f0f] w-full max-w-xl border border-white/10 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase italic text-white">{editingVideo ? "Edit Video" : "Add Video"}</h2>
                <button onClick={() => { setModalMode(null); setEditingVideo(null); }} className="text-white"><X size={32}/></button>
            </div>
            <form onSubmit={handleVideoSubmit} className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 hover:border-orange-600 p-10 text-center cursor-pointer transition-colors bg-white/5 group"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="video/*" className="hidden" />
                {uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-orange-600" size={40} />
                    <p className="text-xs font-black uppercase italic text-white">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <UploadCloud className="text-zinc-500 group-hover:text-orange-600 transition-colors" size={40} />
                    <p className="text-xs font-black uppercase italic text-white">Click to Upload Video</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <input placeholder="Title" required className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none text-white" value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} />
                <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 p-4 font-bold min-h-[80px] outline-none text-white" value={videoForm.description} onChange={e => setVideoForm({...videoForm, description: e.target.value})} />
                
                <div className="grid grid-cols-1 gap-2">
                   <label className="text-[10px] uppercase font-black text-orange-600 italic">Video Path (URL)</label>
                   <input placeholder="Video URL" required className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none text-zinc-400 text-sm" value={videoForm.video_url} onChange={e => setVideoForm({...videoForm, video_url: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 gap-2">
                   <label className="text-[10px] uppercase font-black text-orange-600 italic">Thumbnail URL (Optional)</label>
                   <input placeholder="Thumbnail URL" className="w-full bg-white/5 border border-white/10 p-4 font-bold outline-none text-white" value={videoForm.thumbnail_url} onChange={e => setVideoForm({...videoForm, thumbnail_url: e.target.value})} />
                </div>
              </div>

              <button type="submit" disabled={uploading} className="w-full bg-orange-600 p-5 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50 text-white">
                {editingVideo ? "Update Video" : "Add to Library"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default FlameGameAdmin;
