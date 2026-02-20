import React from "react";
import { supabase } from "../lib/supabaseClient";
// Added Twitter icon from lucide-react
import { Flame, Chrome, ArrowLeft, ShieldCheck, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage: React.FC = () => {
  const REDIRECT_URL = 'https://ourflamefoundation.vercel.app';

  const handleGoogleLogin = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: REDIRECT_URL },
    });
    if (error) console.error("Google login error:", error.message);
  };

  const handleFacebookLogin = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { redirectTo: REDIRECT_URL },
    });
    if (error) console.error("Facebook login error:", error.message);
  };

  // --- X (Twitter) Login Handler ---
  const handleXLogin = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: REDIRECT_URL,
      },
    });
    if (error) console.error("X login error:", error.message);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flame-orange/10 rounded-full blur-[120px] -z-10" />

      <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        Back to home
      </Link>

      <div className="w-full max-w-[440px]">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700 mb-6 shadow-inner">
              <Flame size={40} className="text-flame-orange animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Join the Flame</h1>
            <p className="text-slate-400 text-base">Choose your preferred way to sign in.</p>
          </div>

          <div className="space-y-4">
            <button onClick={handleGoogleLogin} className="w-full group flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black py-4 px-6 rounded-xl font-bold transition-all active:scale-[0.98]">
              <Chrome size={22} className="group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>

            {/* X (Twitter) Button */}
            <button 
              onClick={handleXLogin}
              className="w-full group flex items-center justify-center gap-3 bg-black hover:bg-slate-900 text-white border border-slate-800 py-4 px-6 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-black/20"
            >
              <Twitter size={22} className="group-hover:scale-110 transition-transform fill-current" />
              Continue with X
            </button>

            <button onClick={handleFacebookLogin} className="w-full group flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white py-4 px-6 rounded-xl font-bold transition-all active:scale-[0.98]">
              <Facebook size={22} className="group-hover:scale-110 transition-transform" />
              Continue with Facebook
            </button>
            
            <div className="flex items-center gap-3 py-4">
              <div className="h-[1px] bg-slate-800 flex-1"></div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Secure Access</span>
              <div className="h-[1px] bg-slate-800 flex-1"></div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Protected by Supabase Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
