import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ImpactSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
