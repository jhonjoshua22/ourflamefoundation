import React from "react";
import { supabase } from "../lib/supabaseClient";
import { Flame, Chrome, ArrowLeft, ShieldCheck, Facebook, Twitter, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage: React.FC = () => {
  const REDIRECT_URL = 'https://ourflamefoundation.vercel.app';

  const handleXLogin = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      // Using 'x' as requested
      provider: 'x', 
      options: {
        redirectTo: REDIRECT_URL,
        queryParams: {
          // Absolute bare minimum scopes to avoid the "Something went wrong" screen
          scope: 'users.read tweet.read',
        },
      },
    });
    if (error) console.error("X login error:", error.message);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flame-orange/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-[440px]">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <Flame size={40} className="text-flame-orange mb-6" />
            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Join the Flame</h1>
          </div>

          <div className="space-y-3">
            <button onClick={handleXLogin} className="w-full flex items-center justify-center gap-3 bg-black hover:bg-slate-900 text-white border border-slate-800 py-3.5 px-6 rounded-xl font-bold transition-all">
              <Twitter size={20} />
              Continue with X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
