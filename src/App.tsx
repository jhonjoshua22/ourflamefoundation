import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

// Assets
import popupImg from "./assets/popup.jpg";
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

  // Simple touch function – triggers DB trigger
  const touchForStreak = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ last_active: new Date().toISOString() }) // Just touch this field
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

  // Auth listener – only touch on actual SIGNED_IN or mount if logged in
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.id) {
          console.log("[AUTH] SIGNED_IN – touching for streak");
          touchForStreak(session.user.id);
        }
      }
    );

    // Check on mount (once)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        console.log("[AUTH] Session on mount – touching for streak");
        touchForStreak(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty deps – runs once

  // Your original popup + audio – unchanged
  useEffect(() => {
    audioRef.current = new Audio(introAudio);
    audioRef.current.loop = true;

    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
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
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative bg-zinc-900 border border-white/10 p-2 rounded-3xl max-w-sm w-full shadow-[0_0_50px_rgba(234,88,12,0.3)]"
                >
                  <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-zinc-800 rounded-full text-white transition-colors"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                  
                  {/* Header */}
                  <div className="text-center py-4">
                    <h1 className="text-3xl font-black uppercase italic tracking-widest text-white">
                      OUR REWARDS
                    </h1>
                  </div>

                  {/* Popup Image */}
                  <div className="rounded-2xl overflow-hidden aspect-square bg-black border border-white/5 mx-2">
                    <img
                      src={popupImg}
                      alt="Our Rewards"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Compelling Family Reward CTA */}
                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
                      CLAIM YOUR <span className="text-orange-600">REWARDS.</span>
                    </h2>
                    <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-6">
                      Unlock full access to <span className="text-white font-bold">EduWorld + Einstein</span>, MoneyWorld, SportWorld, and MusicWorld. Build your family's legacy and claim your share today.
                    </p>
                    <Link
                      to="/login"
                      onClick={closePopup}
                      className="group relative flex items-center justify-center gap-3 w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-black uppercase italic tracking-widest transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      <Sparkles size={22} className="group-hover:animate-pulse transition-transform" />
                      JOIN FREE TODAY
                    </Link>
                    <p className="mt-4 text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                      Secure Your Family's Spot at the Foundation
                    </p>
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
