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
      {/* 1. HOME */}
      <section id="home">
        <HeroSection />
      </section>
      
      {/* 2. ABOUT */}
      <section id="about">
        <AboutUsSection />
      </section>

      {/* 3. FLAME GAME */}
      <section id="flame-game">
        <FlameGame />
        <Dashboard />
      </section>
      
      {/* 4. SERVICES */}
      <section id="services">
        <ImpactSection />
      </section>

      {/* 5. PRESENCE */}
      <section id="presence">
        <GlobalMap />
      </section>

      {/* 6. NEWS */}
      <section id="news">
        <NewsEventsSection />
      </section>

      {/* 7. PROCESS */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* 8. IMPACT */}
      <section id="impact">
        <Testimonials />
      </section>
      
      {/* Partnership Ecosystem (No Nav Link) */}
      <PartnerSection />
    </div>
  );
};

export default Index;
