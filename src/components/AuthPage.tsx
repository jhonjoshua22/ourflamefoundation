import React from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Flame,
  Chrome,
  ArrowLeft,
  ShieldCheck,
  Facebook,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage: React.FC = () => {
  const handleOAuthLogin = async (
    provider: "google" | "discord" | "facebook" | "github"
  ): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin, // works for Vercel + localhost
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
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flame-orange/10 rounded-full blur-[120px] -z-10" />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to home
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-[440px]">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700 mb-6 shadow-inner">
              <Flame size={40} className="text-flame-orange animate-pulse" />
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
              Join the Flame
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed px-4">
              Sign in using your preferred social provider.
            </p>
          </div>

          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <Chrome size={20} />
              Continue with Google
            </button>

            {/* Discord */}
            <button
              onClick={() => handleOAuthLogin("discord")}
              className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <MessageSquare size={20} />
              Continue with Discord
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleOAuthLogin("facebook")}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <Facebook size={20} />
              Continue with Facebook
            </button>

            {/* GitHub */}
            <button
              onClick={() => handleOAuthLogin("github")}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.205 11.385c.6.11.82-.26.82-.578v-2.022c-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.082-.73.082-.73 1.204.084 1.838 1.236 1.838 1.236 1.07 1.833 2.807 1.303 3.492.996.108-.775.418-1.303.762-1.602-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.467-2.382 1.236-3.222-.124-.303-.536-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.46 11.46 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.244 2.873.12 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.102.823 2.222v3.293c0 .32.216.694.825.577A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              Continue with GitHub
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-4">
              <div className="h-[1px] bg-slate-800 flex-1"></div>
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Secure Access
              </span>
              <div className="h-[1px] bg-slate-800 flex-1"></div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm italic">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Encrypted Authentication Session</span>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-8 px-8 leading-relaxed">
          By continuing, you agree to our
          <Link to="/tos" className="text-slate-400 hover:underline mx-1">
            Terms
          </Link>
          and
          <Link to="/privacy" className="text-slate-400 hover:underline mx-1">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
