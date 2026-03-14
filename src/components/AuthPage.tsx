import React from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Chrome,
  ArrowLeft,
  ShieldCheck,
  Facebook,
  MessageSquare,
  Zap,
  Linkedin, // Added Linkedin icon
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/ourflamelogo.png";

const AuthPage: React.FC = () => {
  // Added "linkedin" to the allowed provider types
  const handleOAuthLogin = async (
    provider: "google" | "discord" | "facebook" | "github" | "linkedin"
  ): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error(`${provider} login error:`, error.message);
        alert(error.message);
      }
    } catch (err) {
      console.error("Unexpected OAuth error:", err);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />

      {/* Back Button */}
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
              Join the <span className="text-orange-600 not-italic">Flame</span>
            </h1>

            <p className="text-zinc-500 text-[11px] uppercase tracking-widest leading-relaxed">
              Global Infrastructure Access
            </p>
          </div>

          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Chrome size={18} />
              Continue with Google
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleOAuthLogin("linkedin")}
              className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Linkedin size={18} />
              Continue with LinkedIn
            </button>

            {/* Discord */}
            <button
              onClick={() => handleOAuthLogin("discord")}
              className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <MessageSquare size={18} />
              Continue with Discord
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleOAuthLogin("facebook")}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Facebook size={18} />
              Continue with Facebook
            </button>

            {/* GitHub */}
            <button
              onClick={() => handleOAuthLogin("github")}
              className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-900 text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.205 11.385c.6.11.82-.26.82-.578v-2.022c-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.082-.73.082-.73 1.204.084 1.838 1.236 1.838 1.236 1.07 1.833 2.807 1.303 3.492.996.108-.775.418-1.303.762-1.602-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.467-2.382 1.236-3.222-.124-.303-.536-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.46 11.46 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.244 2.873.12 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .32.216.694.825.577A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>

            {/* Clapmi Link */}
            <a
              href="https://clapmi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-white/5 hover:border-pink-500/50 hover:bg-pink-500/5 text-zinc-400 hover:text-white py-4 px-6 rounded-none text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              <Zap size={18} className="text-pink-500" />
              Continue with Clapmi
            </a>

            {/* Divider */}
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

        <p className="text-center text-zinc-600 text-[9px] font-bold uppercase tracking-widest mt-8 px-8 leading-relaxed">
          By continuing, you agree to our
          <Link to="/terms" className="text-zinc-400 hover:text-white mx-1 transition-colors">
            Terms
          </Link>
          &
          <Link to="/privacy" className="text-zinc-400 hover:text-white mx-1 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
