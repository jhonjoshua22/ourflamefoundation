import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Share2, Bot, Users } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

// Assets
import introAudio from "./assets/intro.mp3";

// Layout & Pages
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/AuthPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";
import Profile from "./pages/Profile";
import Scoretable from "./pages/Scoretable";

const queryClient = new QueryClient();

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // NEW: Function to record country via IP
  const recordCountry = async (userId: string) => {
    try {
      // Check if country is already recorded to save API calls
      const { data: profile } = await supabase
        .from("profiles")
        .select("country")
        .eq("id", userId)
        .single();

      if (profile && !profile.country) {
        const response = await fetch("https://ipapi.co/json/");
        const geoData = await response.json();

        if (geoData.country_name) {
          await supabase
            .from("profiles")
            .update({ country: geoData.country_name })
            .eq("id", userId);
          console.log("[GEO] Mission Control: Location secured -", geoData.country_name);
        }
      }
    } catch (err) {
      console.error("[GEO] Failed to sync location intel:", err);
    }
  };

  const touchForStreak = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ last_active: new Date().toISOString() }) 
        .eq("id", userId);

      if (error) {
        console.error("[STREAK] Touch failed:", error.message);
      } else {
        console.log("[STREAK] Touch sent – DB trigger will handle streak");
      }
    } catch (err) {
      console.error("[STREAK] Error:", err);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.id) {
          touchForStreak(session.user.id);
          recordCountry(session.user.id); // Trigger country recording on sign in
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        touchForStreak(session.user.id);
        recordCountry(session.user.id); // Trigger country recording for existing sessions
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(introAudio);
    audioRef.current.loop = true;

    const handleToggleMusic = () => {
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
      }
    };

    window.addEventListener("toggleBackgroundMusic", handleToggleMusic);

    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("toggleBackgroundMusic", handleToggleMusic);
    };
  }, []);

  const closePopup = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    sessionStorage.setItem("hasSeenPopup", "true");
    setShowPopup(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence>
            {showPopup && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closePopup}
                  className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative bg-[#111] border border-white/10 p-1 rounded-[2.5rem] max-w-[400px] w-full shadow-[0_0_80px_rgba(234,88,12,0.15)] overflow-hidden"
                >
                  <button
                    onClick={closePopup}
                    className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-orange-600 rounded-full text-white transition-all group"
                  >
                    <X size={18} strokeWidth={3} className="group-hover:scale-90" />
                  </button>

                  <div className="p-8 md:p-10">
                    <div className="mb-8 text-center">
                      <h1 className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 mb-2">
                        Command Center
                      </h1>
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                        USER DASHBOARD
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {/* Priority 1 */}
                      <div className="group flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-orange-600/50 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-600 shrink-0">
                          <Share2 size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-black uppercase italic text-sm tracking-tight">1. DO GOOD & SHARE</h3>
                          <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">Share video on Clapmi to set good example.</p>
                        </div>
                      </div>

                      {/* Priority 2 */}
                      <div className="group flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-orange-600/50 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-600 shrink-0">
                          <Bot size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-black uppercase italic text-sm tracking-tight">2. SUPERBOTS</h3>
                          <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">Build your dreams & add to our $1 PM Wholesale Family Pack. Keep your markup.</p>
                        </div>
                      </div>

                      {/* Priority 3 */}
                      <div className="group flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-orange-600/50 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-600 shrink-0">
                          <Users size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-black uppercase italic text-sm tracking-tight">3. RECRUIT 10</h3>
                          <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">Recruit from age decile below you per week via family friends network.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <Link
                        to="/login"
                        onClick={closePopup}
                        className="group relative flex items-center justify-center gap-3 w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-black uppercase italic tracking-widest transition-all shadow-[0_10px_20px_rgba(234,88,12,0.3)]"
                      >
                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                        ACCESS MISSION CONTROL
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/scoretable" element={<Scoretable />} />
            </Route>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
