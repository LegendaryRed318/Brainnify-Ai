import { useState, useCallback, lazy, Suspense } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import NavBar from "@/components/NavBar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import CinematicIntro from "@/components/CinematicIntro";
import InteractiveGrid from "@/components/InteractiveGrid";
import HeroSection from "@/components/HeroSection";
import AppPreview from "@/components/AppPreview";
import DemoSection from "@/components/DemoSection";
import TryItSection from "@/components/TryItSection";

const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const SubjectsSection = lazy(() => import("@/components/SubjectsSection"));
const ComparisonSection = lazy(() => import("@/components/ComparisonSection"));
const CitationsSection = lazy(() => import("@/components/CitationsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const DownloadSection = lazy(() => import("@/components/DownloadSection"));
const WaitlistSection = lazy(() => import("@/components/WaitlistSection"));
const MobileAppSection = lazy(() => import("@/components/MobileAppSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const SectionFallback = () => <div className="py-20" />;

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <CinematicIntro onComplete={handleIntroComplete} />
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <ScrollProgress />
        <BackgroundOrbs />
        <NavBar />
        <HeroSection />
        <AppPreview />
        <DemoSection />
        <TryItSection />
        <Suspense fallback={<SectionFallback />}>
          <FeaturesSection />
          <HowItWorks />
          <SubjectsSection />
          <ComparisonSection />
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
        </Suspense>
      </div>
    </>
  );
};

export default Index;
