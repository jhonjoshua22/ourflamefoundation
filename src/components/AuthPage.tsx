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
  // Generic OAuth login handler
  const handleOAuthLogin = async (
    provider: "google" | "discord" | "facebook"
  ): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin, // your Vercel URL or localhost for testing
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
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-flame-orange/10 rounded-full blur-[120px] -z-10" />

      {/* Back Link */}
      <Link
        to="/"
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to home
      </Link>

      {/* Login Box */}
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
              Enter the ecosystem through your preferred social channel.
            </p>
          </div>

          <div className="space-y-3">
            {/* Google Login */}
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <Chrome size={20} />
              Continue with Google
            </button>

            {/* Discord Login */}
            <button
              onClick={() => handleOAuthLogin("discord")}
              className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <MessageSquare size={20} />
              Continue with Discord
            </button>

            {/* Facebook Login */}
            <button
              onClick={() => handleOAuthLogin("facebook")}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white py-3.5 px-6 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <Facebook size={20} />
              Continue with Facebook
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

        {/* Terms & Privacy */}
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
