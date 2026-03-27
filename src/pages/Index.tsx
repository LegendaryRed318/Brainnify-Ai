import ScrollProgress from "@/components/ScrollProgress";
import NavBar from "@/components/NavBar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import HeroSection from "@/components/HeroSection";
import AppPreview from "@/components/AppPreview";
import FeaturesSection from "@/components/FeaturesSection";
import ComparisonSection from "@/components/ComparisonSection";
import HowItWorks from "@/components/HowItWorks";
import SubjectsSection from "@/components/SubjectsSection";
import CitationsSection from "@/components/CitationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import DownloadSection from "@/components/DownloadSection";
import WaitlistSection from "@/components/WaitlistSection";
import MobileAppSection from "@/components/MobileAppSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div style={{ animation: "page-fade-in 0.4s ease-out both" }}>
      <ScrollProgress />
      <BackgroundOrbs />
      <NavBar />
      <div style={{ animation: "slide-up-in 0.6s ease-out 0.1s both" }}>
        <HeroSection />
      </div>
      <AppPreview />
      <FeaturesSection />
      <ComparisonSection />
      <HowItWorks />
      <SubjectsSection />
      <CitationsSection />
      <TestimonialsSection />
      <PricingSection />
      <DownloadSection />
      <WaitlistSection />
      <MobileAppSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
