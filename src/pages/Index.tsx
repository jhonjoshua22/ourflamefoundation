
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";
import FlameGame from "@/components/FlameGame";
import Dashboard from "@/components/Dashboard";
import GlobalMap from "@/components/GlobalMap";
import PartnerSection from "@/components/PartnerSection";
import NewsEventsSection from "@/components/NewsEventsSection";


const Index = () => {
  return (
    <div className="flex flex-col">
      
      
      {/* The Flame Game & Dashboard Sections */}
      <FlameGame />
      <Dashboard />
      <ImpactSection />
          
      <GlobalMap />

      <NewsEventsSection />
      
      <Testimonials />
      <PartnerSection />
      
    </div>
  );
};

export default Index;
