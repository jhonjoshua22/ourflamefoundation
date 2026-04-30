import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import AdminLayout from "../components/AdminLayout";
import { 
  Plus, Pencil, Trash2, X, Newspaper, 
  Loader2, UploadCloud, Calendar, MapPin
} from "lucide-react";

const NewsEventsAdmin = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"news" | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "", 
    description: "", 
    date: "", 
    location: "", 
    image_url: "", 
    type: "News",
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setNews(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to the 'news' bucket
      const { error: uploadError } = await supabase.storage
        .from('news')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Generate the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('news')
        .getPublicUrl(filePath);

      setForm(prev => ({ ...prev, image_url: publicUrl }));
      
    } catch (error: any) {
      console.error('Upload Error:', error.message);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase.from("news").update(form).eq("id", editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert([form]);
        if (error) throw error;
      }
      setModalMode(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Remove this entry?")) return;
    await supabase.from("news").delete().eq("id", id);
    fetchData();
  };

  return (
    <AdminLayout>
      <div className="space-y-16">
        <section>
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 pt-16">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3 text-white">
              <Newspaper className="text-orange-600" /> News & Events Dispatch
            </h2>
            <button 
              onClick={() => { setEditingItem(null); setForm({title:"", description:"", date:"", location:"", image_url:"", type:"News", is_active:true}); setModalMode("news"); }}
              className="bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> New Entry
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-zinc-900 border border-white/5 flex flex-col group">
                <div className="aspect-video relative overflow-hidden bg-black">
                   <img src={item.image_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute top-2 left-2 bg-orange-600 text-white text-[8px] font-black px-2 py-1 uppercase">{item.type}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-black uppercase italic text-white mb-2 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-4 text-[9px] font-bold text-zinc-500 uppercase mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> {item.location}</span>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => { setEditingItem(item); setForm(item); setModalMode("news"); }} className="flex-grow bg-white/5 hover:bg-orange-600 p-2 text-white transition-colors flex justify-center"><Pencil size={16}/></button>
                    <button onClick={() => deleteItem(item.id)} className="flex-grow bg-white/5 hover:bg-red-600 p-2 text-white transition-colors flex justify-center"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {modalMode === "news" && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0f0f0f] w-full max-w-xl border border-white/10 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase italic text-white">{editingItem ? "Edit Entry" : "Create Entry"}</h2>
              <button onClick={() => setModalMode(null)} className="text-white"><X size={32}/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 hover:border-orange-600 p-8 text-center cursor-pointer bg-white/5 group">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                {uploading ? <Loader2 className="animate-spin text-orange-600 mx-auto" /> : <UploadCloud className="mx-auto text-zinc-500 group-hover:text-orange-600" />}
                <p className="text-[10px] font-black uppercase text-white mt-2">Upload Hero Image</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <input placeholder="Title" required className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white outline-none focus:border-orange-600" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <input placeholder="Date (e.g. Oct 12, 2025)" className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white outline-none" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                <input placeholder="Location" className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white outline-none" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                <select className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white outline-none" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="News">News</option>
                    <option value="Event">Event</option>
                    <option value="Foundation">Foundation</option>
                </select>
                <div className="flex items-center gap-2 p-4 bg-white/5 border border-white/10">
                    <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} />
                    <label className="text-[10px] font-black uppercase text-white">Active</label>
                </div>
              </div>

              <textarea placeholder="Description" rows={4} className="w-full bg-white/5 border border-white/10 p-4 font-bold text-white outline-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              
              <button type="submit" disabled={uploading} className="w-full bg-orange-600 p-5 font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                {editingItem ? "Update Dispatch" : "Publish Dispatch"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default NewsEventsAdmin;
