import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Plus, Trash2, RefreshCw, Layers, ChevronDown, ChevronUp, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../components/AdminLayout";

const AboutUsAdmin = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("aboutus")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });
    
    if (error) toast.error("Failed to load content");
    else setItems(data || []);
    setLoading(false);
  };

  const handleUpsert = async (item: any) => {
    const { error } = await supabase.from("aboutus").upsert(item);
    if (error) toast.error("Update failed");
    else {
      toast.success("Saved successfully");
      fetchContent();
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
        fetchContent(); // Remove local unsaved item
        return;
    }
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("aboutus").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else fetchContent();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(item.id || 'new');
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resources_pdf')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resources_pdf')
        .getPublicUrl(filePath);

      const newItems = [...items];
      newItems[items.indexOf(item)].url = publicUrl;
      setItems(newItems);
      toast.success("File uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(null);
    }
  };

  const addNew = (category: string) => {
    const newItem = {
      category,
      title: "New " + category,
      content: "",
      url: "",
      sub_category: category === "link" ? "Clean" : "",
      sort_order: items.length
    };
    setItems([newItem, ...items]);
    setExpandedCats(prev => ({ ...prev, [category]: true }));
  };

  const toggleExpand = (category: string) => {
    setExpandedCats(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8 pt-16">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              AboutUs <span className="text-orange-600">Protocol</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              Foundation Content Management
            </p>
          </div>
          <button 
            onClick={fetchContent} 
            className="p-3 bg-white/5 border border-white/5 rounded-full hover:text-orange-600 transition-colors"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </header>

        {["commandment", "link", "resource", "step"].map((cat) => {
          const catItems = items.filter(i => i.category === cat);
          const hasMoreThan10 = catItems.length > 10;
          const isExpanded = expandedCats[cat];
          const displayedItems = hasMoreThan10 && !isExpanded ? catItems.slice(0, 10) : catItems;

          return (
            <div key={cat} className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase italic text-orange-600 flex items-center gap-2">
                  <Layers size={18}/> {cat}s
                </h2>
                <button 
                  onClick={() => addNew(cat)} 
                  className="flex items-center gap-2 text-[10px] font-black bg-white text-black px-4 py-2 rounded hover:bg-orange-600 hover:text-white transition-all uppercase"
                >
                  <Plus size={14} /> Add {cat}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {displayedItems.map((item, idx) => (
                  <div 
                    key={item.id || `new-${idx}`} 
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 bg-white/5 border border-white/5 rounded-2xl items-end hover:border-white/10 transition-colors"
                  >
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Title / ID</label>
                      <input 
                        value={item.title} 
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[items.indexOf(item)].title = e.target.value;
                          setItems(newItems);
                        }}
                        className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600 transition-colors" 
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                        {cat === 'resource' ? 'Resource Link (Paste or Upload)' : 'Content / URL'}
                      </label>
                      
                      {cat === 'resource' ? (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input 
                                    type="text"
                                    placeholder="Paste URL here..."
                                    value={item.url || ""}
                                    onChange={(e) => {
                                      const newItems = [...items];
                                      newItems[items.indexOf(item)].url = e.target.value;
                                      setItems(newItems);
                                    }}
                                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600 transition-colors" 
                                />
                            </div>
                            <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 p-2 rounded transition-colors flex items-center justify-center min-w-[40px]">
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    className="hidden" 
                                    onChange={(e) => handleFileUpload(e, item)}
                                    disabled={uploading === (item.id || 'new')}
                                />
                                {uploading === (item.id || 'new') ? (
                                    <RefreshCw size={16} className="animate-spin text-orange-600" />
                                ) : (
                                    <Upload size={16} />
                                )}
                            </label>
                        </div>
                      ) : (
                        <input 
                          placeholder="Content or URL Path"
                          value={cat === 'link' ? item.url : item.content} 
                          onChange={(e) => {
                            const newItems = [...items];
                            const target = items.indexOf(item);
                            if (cat === 'link') newItems[target].url = e.target.value;
                            else newItems[target].content = e.target.value;
                            setItems(newItems);
                          }}
                          className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600 transition-colors" 
                        />
                      )}
                    </div>

                    {cat === 'link' && (
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Tab Category</label>
                        <input 
                          value={item.sub_category || ""} 
                          onChange={(e) => {
                            const newItems = [...items];
                            newItems[items.indexOf(item)].sub_category = e.target.value;
                            setItems(newItems);
                          }}
                          className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600 transition-colors" 
                        />
                      </div>
                    )}

                    <div className={`flex gap-2 ${cat !== 'link' ? 'md:col-span-2' : ''}`}>
                      <button 
                        onClick={() => handleUpsert(item)} 
                        className="flex-1 bg-orange-600 hover:bg-orange-500 py-2 rounded text-[10px] font-black uppercase transition-all"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </div>
                ))}

                {hasMoreThan10 && (
                  <button 
                    onClick={() => toggleExpand(cat)}
                    className="flex items-center justify-center gap-2 py-4 border border-dashed border-white/10 rounded-2xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                  >
                    {isExpanded ? (
                      <><ChevronUp size={14}/> Show Less</>
                    ) : (
                      <><ChevronDown size={14}/> Show {catItems.length - 10} More</>
                    )}
                  </button>
                )}

                {catItems.length === 0 && (
                  <div className="p-10 border border-dashed border-white/5 rounded-2xl text-center">
                    <p className="text-zinc-600 text-xs uppercase font-black tracking-widest">No {cat}s found in database.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AboutUsAdmin;
