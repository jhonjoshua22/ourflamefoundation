import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Flame,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ourflamelogo.png";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Authenticate user credentials
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Verify admin status in the profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", authData.user.id)
          .single();

        if (profileError || !profile?.is_admin) {
          await supabase.auth.signOut();
          throw new Error("ACCESS DENIED: Administrative privileges required.");
        }

        // 3. Success -> Mission Control
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
      
      <Link
        to="/"
        className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors uppercase text-[10px] font-black tracking-[0.2em]"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div className="w-full max-w-[400px]">
        <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-none p-8 md:p-12">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative mb-6">
              <img
                src={logo}
                alt="Our Flame Logo"
                className="w-20 h-20 object-contain brightness-110 drop-shadow-[0_0_15px_rgba(234,88,12,0.3)]"
              />
            </div>
            
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic mb-2">
              <span className="text-orange-600 not-italic">Admin</span> Portal
            </h1>
            
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest leading-relaxed">
              Flame Foundation • Mission Control
            </p>
            
            <div className="mt-4 text-white text-[11px] font-black uppercase tracking-widest bg-zinc-800/50 py-2 px-4 border border-zinc-700">
              Internal CMS Access
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-zinc-500 text-[9px] uppercase font-black tracking-widest mb-2 block">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 text-white py-4 px-6 rounded-none text-[12px] focus:outline-none focus:border-orange-600 transition-all"
                placeholder="commander@flame.com"
                required
              />
            </div>

            <div>
              <label className="text-zinc-500 text-[9px] uppercase font-black tracking-widest mb-2 block">
                Security Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 text-white py-4 px-6 rounded-none text-[12px] focus:outline-none focus:border-orange-600 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black uppercase p-3 text-center tracking-tighter">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Lock size={18} />
              {loading ? "Verifying..." : "Enter Command Center"}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] uppercase font-bold tracking-tighter pt-4">
              <ShieldCheck size={14} className="text-orange-600" />
              <span>Restricted Encrypted Channel</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
