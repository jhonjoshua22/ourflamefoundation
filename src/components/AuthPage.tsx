import React from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Chrome,
  ArrowLeft,
  ShieldCheck,
  Facebook,
  MessageSquare,
  Zap,
  Linkedin,
  Scale,
  Lock,
  ScrollText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ourflamelogo.png";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Captures country via IP and syncs it to the user's profile
   * This is called after a successful session is detected.
   */
  const syncUserLocation = async (userId: string) => {
    try {
      // 1. Check if user already has a country assigned to avoid redundant calls
      const { data: profile } = await supabase
        .from("profiles")
        .select("country")
        .eq("id", userId)
        .single();

      if (profile?.country) return;

      // 2. Fetch geolocation from public API
      const response = await fetch("https://ipapi.co/json/");
      const geo = await response.json();

      if (geo.country_name) {
        // 3. Update the profiles table
        await supabase
          .from("profiles")
          .update({ country: geo.country_name })
          .eq("id", userId);
        
        console.log(`Mission Control: User stationed in ${geo.country_name}`);
      }
    } catch (err) {
      console.error("Failed to sync location intel:", err);
    }
  };

  const handleOAuthLogin = async (
    provider: "google" | "discord" | "facebook" | "github" | "linkedin_oidc"
  ): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin, 
          scopes: 'openid profile email',
        },
      });

      if (error) {
        console.error(`${provider} login error:`, error.message);
        alert(error.message);
      }
      
      // Note: The actual database sync happens on the landing page 
      // after redirect, as signInWithOAuth redirects the entire window.
    } catch (err) {
      console.error("Unexpected OAuth error:", err);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
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
              <span className="text-orange-600 not-italic">Your</span> Rewards
            </h1>
            
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest leading-relaxed mb-1">
              EduWorld + Einstein • MoneyWorld
            </p>
            <p className="text-zinc-600 text-[9px] uppercase font-bold tracking-wider leading-relaxed">
              SportWorld • MusicWorld • Gaming
            </p>
            
            <div className="mt-4 text-white text-[11px] font-black uppercase tracking-widest bg-zinc-800/50 py-2 px-4 border border-zinc-700">
              Sign Up Free Or Log In
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="https://clapmi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/5 text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Zap size={18} className="text-pink-500" />
              Continue with Clapmi
            </a>

            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Chrome size={18} />
              Continue with Google
            </button>
            
            <button
              onClick={() => handleOAuthLogin("linkedin_oidc")}
              className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Linkedin size={18} />
              Continue with LinkedIn
            </button>
            
            <button
              onClick={() => handleOAuthLogin("discord")}
              className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <MessageSquare size={18} />
              Continue with Discord
            </button>
            
            <button
              onClick={() => handleOAuthLogin("facebook")}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Facebook size={18} />
              Continue with Facebook
            </button>
            
            <button
              onClick={() => handleOAuthLogin("github")}
              className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-900 text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.205 11.385c.6.11.82-.26.82-.578v-2.022c-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.082-.73.082-.73 1.204.084 1.838 1.236 1.838 1.236 1.07 1.833 2.807 1.303 3.492.996.108-.775.418-1.303.762-1.602-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.467-2.382 1.236-3.222-.124-.303-.536-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.46 11.46 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.244 2.873.12 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .32.216.694.825.577A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
            
            <div className="flex items-center gap-3 py-6">
              <div className="h-[1px] bg-white/5 flex-1"></div>
              <span className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em]">
                Verified
              </span>
              <div className="h-[1px] bg-white/5 flex-1"></div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] uppercase font-bold tracking-tighter">
              <ShieldCheck size={14} className="text-orange-600" />
              <span>Encrypted Authentication Session</span>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 text-center">
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
            Here Are Our 10 Commandments & Legal Stuff
          </p>
          
          <div className="flex flex-col gap-2">
            <Link 
              to="/terms" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900/50 border border-zinc-800 hover:border-orange-600 text-white text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <ScrollText size={12} className="text-orange-600" />
              Our 10 Commandments
            </Link>
            
            <div className="flex gap-2">
              <Link 
                to="/terms" 
                className="flex items-center justify-center gap-2 w-1/2 py-3 bg-zinc-900/50 border border-zinc-800 hover:border-white text-zinc-400 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all"
              >
                <Scale size={11} />
                Terms of Use
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center justify-center gap-2 w-1/2 py-3 bg-zinc-900/50 border border-zinc-800 hover:border-white text-zinc-400 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all"
              >
                <Lock size={11} />
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
