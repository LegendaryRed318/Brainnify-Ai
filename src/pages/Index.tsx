import { useState, useCallback, lazy, Suspense } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import NavBar from "@/components/NavBar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import InteractiveGrid from "@/components/InteractiveGrid";
import HeroSection from "@/components/HeroSection";
import StatsTicker from "@/components/StatsTicker";
import SocialProof from "@/components/SocialProof";
import AppPreview from "@/components/AppPreview";
import DemoSection from "@/components/DemoSection";
import TryItSection from "@/components/TryItSection";

const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const BeforeAfterSection = lazy(() => import("@/components/BeforeAfterSection"));
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
  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <InteractiveGrid />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollProgress />
        <BackgroundOrbs />
        <NavBar />
        <div id="hero">
          <HeroSection />
        </div>
        <StatsTicker />
        <SocialProof />
        <AppPreview />
        <DemoSection />
        <TryItSection />
        <Suspense fallback={<SectionFallback />}>
          <div id="features">
            <FeaturesSection />
          </div>
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <BeforeAfterSection />
          <SubjectsSection />
          <ComparisonSection />
          <CitationsSection />
          <div id="testimonials">
            <TestimonialsSection />
          </div>
          <div id="pricing">
            <PricingSection />
          </div>
          <div id="download">
            <DownloadSection />
          </div>
          <WaitlistSection />
          <MobileAppSection />
          <BlogSection />
          <FAQSection />
          <CTASection />
          <FooterSection />
        </Suspense>
        </div>
      </div>
    </>
  );
};

export default Index;
