import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Assets
import promoVideo from "./assets/ourgames.mp4"; // Renamed for clarity
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

  useEffect(() => {
    // Initialize Audio
    audioRef.current = new Audio(introAudio);
    audioRef.current.loop = true;

    // Show popup after 1.5 seconds if not seen
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    // Start music on user action
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
          {/* POPUP MODAL - Nested inside BrowserRouter so <Link> works */}
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
                    {/* VIDEO TAG FOR MP4 SUPPORT */}
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
                    
                    {/* PROMOTIONAL ACTION */}
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
