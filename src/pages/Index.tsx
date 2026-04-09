
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";
import FlameGame from "@/components/FlameGame";
import Dashboard from "@/components/Dashboard";
import GlobalMap from "@/components/GlobalMap";
import PartnerSection from "@/components/PartnerSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import GameGallery from "@/components/GameGallery";


const Index = () => {
  return (
    <div className="flex flex-col">
      
      
      {/* The Flame Game & Dashboard Sections */}
      <FlameGame />
      <Testimonials />
      <GameGallery />
      <Dashboard />
      <ImpactSection />
          
      <GlobalMap />

      <NewsEventsSection />
      
      <PartnerSection />
      
    </div>
  );
};

export default Index;
