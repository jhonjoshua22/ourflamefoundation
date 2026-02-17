import { supabase } from "../lib/supabaseClient";
import { Flame, Chrome, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://ourflamefoundation.vercel.app',
        // This forces the "Account Picker" to show up every time
        queryParams: {
          prompt: 'select_account',
          access_type: 'offline',
        },
      },
    });
    
    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flame-orange/10 rounded-full blur-[120px] -z-10" />

      <Link 
        to="/" 
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to home
      </Link>

      <div className="w-full max-w-[440px]">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700 mb-6 shadow-inner group">
              <Flame size={40} className="text-flame-orange animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
              Join the Flame
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Sign in to manage your impact and stay connected with our community.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleLogin}
              className="w-full group relative flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black py-4 px-6 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] shadow-lg shadow-white/5"
            >
              <Chrome size={22} className="transition-transform group-hover:scale-110" />
              Continue with Google
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

        <p className="text-center text-slate-600 text-xs mt-8 px-8">
          By continuing, you agree to Our Flame Foundation's 
          <a href="#" className="text-slate-400 hover:underline mx-1">Terms of Service</a> 
          and 
          <a href="#" className="text-slate-400 hover:underline mx-1">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
