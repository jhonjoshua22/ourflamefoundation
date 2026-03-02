import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";
import ProcessSection from "@/components/ProcessSection";
import AboutUsSection from "@/components/AboutUsSection";
import FlameGame from "@/components/FlameGame";
import Dashboard from "@/components/Dashboard";
import GlobalMap from "@/components/GlobalMap";
import PartnerSection from "@/components/PartnerSection";
import NewsEventsSection from "@/components/NewsEventsSection";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* 
          This page renders inside the <Outlet /> of MainLayout. 
      */}
      
      <HeroSection />
      
      {/* The Flame Game & Dashboard Sections */}
      <FlameGame />
      <Dashboard />
      
      {/* Infrastructure & Social Proof */}
      <GlobalMap />
      <ProcessSection />
      <Testimonials />
      
      {/* Foundation Details */}
      <AboutUsSection />
      <NewsEventsSection />
      <ImpactSection />
      
      {/* Partnership Ecosystem */}
      <PartnerSection />
    </div>
  );
};

export default Index;
