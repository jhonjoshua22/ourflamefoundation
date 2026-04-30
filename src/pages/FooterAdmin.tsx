import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Plus, Trash2, RefreshCw, Layers, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../components/AdminLayout";

const FooterAdmin = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["brand", "social", "resource", "legal"];

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("footer")
      .select("*")
      .order("sort_order", { ascending: true });
    
    if (error) toast.error("Failed to load footer data");
    else setItems(data || []);
    setLoading(false);
  };

  const handleUpsert = async (item: any) => {
    const { error } = await supabase.from("footer").upsert(item);
    if (error) toast.error("Update failed");
    else {
      toast.success("Footer updated");
      fetchFooterData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) { fetchFooterData(); return; }
    if (!confirm("Remove this footer item?")) return;
    const { error } = await supabase.from("footer").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else fetchFooterData();
  };

  const addNew = (category: string) => {
    const newItem = {
      category,
      label: "New Item",
      value: "",
      icon_name: category === 'social' ? 'Globe' : '',
      sort_order: items.length
    };
    setItems([...items, newItem]);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8 pt-16">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Footer <span className="text-orange-600">Admin</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              Navigation & Global Links
            </p>
          </div>
          <button onClick={fetchFooterData} className="p-3 bg-white/5 rounded-full hover:text-orange-600">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </header>

        {categories.map((cat) => (
          <div key={cat} className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase italic text-orange-600 flex items-center gap-2">
                <LinkIcon size={18}/> {cat}
              </h2>
              <button onClick={() => addNew(cat)} className="flex items-center gap-2 text-[10px] font-black bg-white text-black px-4 py-2 rounded hover:bg-orange-600 hover:text-white transition-all uppercase">
                <Plus size={14} /> Add {cat}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {items.filter(i => i.category === cat).map((item, idx) => (
                <div key={item.id || idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white/5 border border-white/5 rounded-2xl items-end">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase">Label</label>
                    <input 
                      value={item.label} 
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[items.indexOf(item)].label = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600" 
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase">Value (URL/Text)</label>
                    <input 
                      value={item.value} 
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[items.indexOf(item)].value = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase">Icon Name (Lucide)</label>
                    <input 
                      value={item.icon_name || ""} 
                      placeholder="e.g. Facebook"
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[items.indexOf(item)].icon_name = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-orange-600" 
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpsert(item)} className="flex-1 bg-orange-600 hover:bg-orange-500 py-2 rounded text-[10px] font-black uppercase">Save</button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-600 hover:text-red-500"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default FooterAdmin;
