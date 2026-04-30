import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ourflamelogo.png";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // GMAIL / GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This ensures Supabase sends the user directly to the dashboard after Google auth
        redirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", authData.user.id)
          .single();

        if (profileError || !profile?.is_admin) {
          await supabase.auth.signOut();
          throw new Error("ACCESS DENIED: Administrative privileges required.");
        }

        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-white">
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
          
          <div className="flex flex-col items-center text-center mb-8">
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
              Internal CMS Access
            </p>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6 flex items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-zinc-600 text-[8px] font-black uppercase tracking-widest">OR DIRECT ENTRY</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-zinc-500 text-[9px] uppercase font-black tracking-widest mb-2 block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 text-white py-4 pl-12 pr-6 rounded-none text-[12px] focus:outline-none focus:border-orange-600 transition-all"
                  placeholder="commander@flame.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-500 text-[9px] uppercase font-black tracking-widest mb-2 block">
                Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 text-white py-4 pl-12 pr-6 rounded-none text-[12px] focus:outline-none focus:border-orange-600 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
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
