import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./lib/supabaseClient"; // Make sure this import exists

// Assets
import promoVideo from "./assets/ourgames.mp4";
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

  // Streak update logic (runs after login)
  const updateStreak = async (userId: string) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Get or create profile
      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") { // PGRST116 = not found
        console.error("Profile fetch error:", error);
        return;
      }

      if (!profile) {
        // Create minimal profile on first login
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            display_name: "New Flame Agent",
            rank: "Normie",
            Rebirth: new Date().getFullYear(),
            current_streak: 1,
            longest_streak: 1,
            last_streak_date: today,
            happiness_score: 0,
            curiosity_score: 0,
            econ_score: 0,
            last_active: new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          console.error("Profile creation error:", insertError);
          return;
        }
        profile = newProfile;
      }

      // Check if today is a new day for streak
      const lastDate = profile.last_streak_date
        ? new Date(profile.last_streak_date).toISOString().split("T")[0]
        : null;

      if (lastDate !== today) {
        let newStreak = 1;
        if (lastDate) {
          const diffDays = Math.floor(
            (new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24)
          );
          newStreak = diffDays === 1 ? (profile.current_streak || 0) + 1 : 1;
        }

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            current_streak: newStreak,
            longest_streak: Math.max(profile.longest_streak || 0, newStreak),
            last_streak_date: today,
            last_active: new Date().toISOString(),
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Streak update error:", updateError);
        } else {
          console.log(`Streak updated to ${newStreak} for user ${userId}`);
          // Optional: You could trigger a toast here, create a mission, etc.
        }
      }
    } catch (err) {
      console.error("Streak logic error:", err);
    }
  };

  // Listen for auth state changes globally
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.id) {
          updateStreak(session.user.id);
        }
      }
    );

    // Check existing session on app load (e.g. page refresh)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        updateStreak(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Existing popup + audio logic
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
      audioRef.current.play().catch((e) => console.log("Audio play blocked", e));
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
          {/* POPUP MODAL */}
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
                  <div className="rounded-2xl overflow-hidden aspect-square bg-black border border-white/5">
                    <video
                      src={promoVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-2">
                      IGNITE YOUR <span className="text-orange-600">LEGACY.</span>
                    </h2>
                    <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-6">
                      The universe is expanding and the Flame is rising. Don't just watch the change—drive it.
                      Your seat at the Foundation is waiting.
                    </p>
                    <Link
                      to="/login"
                      onClick={closePopup}
                      className="group relative flex items-center justify-center gap-3 w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-black uppercase italic tracking-widest transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      <Gamepad2 size={24} className="group-hover:rotate-12 transition-transform" />
                      Play Now
                    </Link>
                    <p className="mt-4 text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                      Limited Time Access • Join the Collective
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* ROUTING */}
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
