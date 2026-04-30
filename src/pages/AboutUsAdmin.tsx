import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Plus, Trash2, Save, RefreshCw, Layers } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../components/AdminLayout"; // Adjust path as necessary

const AboutUsAdmin = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("aboutus").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else fetchContent();
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
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
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

        {["commandment", "link", "resource", "step"].map((cat) => (
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
              {items.filter(i => i.category === cat).map((item, idx) => (
                <div 
                  key={item.id || idx} 
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
                    <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Content / URL</label>
                    <input 
                      placeholder="Content or URL Path"
                      value={cat === 'link' || cat === 'resource' ? item.url : item.content} 
                      onChange={(e) => {
                        const newItems = [...items];
                        const target = items.indexOf(item);
                        if (cat === 'link' || cat === 'resource') newItems[target].url = e.target.value;
                        else newItems[target].content = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600 transition-colors" 
                    />
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
                  <div className="flex gap-2">
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
              {items.filter(i => i.category === cat).length === 0 && (
                <div className="p-10 border border-dashed border-white/5 rounded-2xl text-center">
                  <p className="text-zinc-600 text-xs uppercase font-black tracking-widest">No {cat}s found in database.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AboutUsAdmin;
