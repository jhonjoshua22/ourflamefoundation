import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";
import AboutUsSection from "@/components/AboutUsSection";
import FlameGame from "@/components/FlameGame";
import Dashboard from "@/components/Dashboard";
import GlobalMap from "@/components/GlobalMap";
import PartnerSection from "@/components/PartnerSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import GameGallery from "@/components/GameGallery";

const Index = () => {
  return (
    <div className="flex flex-col">
      
      
      <FlameGame />
      <Dashboard />
      <GameGallery />
      
      <GlobalMap />
      <Testimonials />
      <AboutUsSection />
      
      <NewsEventsSection />
      
      
      <PartnerSection />
      <HeroSection />
      <ImpactSection />
    </div>
  );
};

export default Index;
