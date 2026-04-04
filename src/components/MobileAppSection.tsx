import { forwardRef } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const MobileAppSection = forwardRef<HTMLDivElement>((props, ref) => {
  const animRef = useInViewAnimation();

  return (
    <section className="relative z-[1] py-24" ref={(node) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (animRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }} {...props}>
      <div className="container">
        <div className="fade-up max-w-3xl mx-auto bg-surface border border-border rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-accent/[0.03] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
              ✦ Mobile App
            </div>
            <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight mb-4">
              Study Anywhere — Mobile App Coming Soon
            </h2>
            <p className="text-muted-foreground text-base font-light max-w-lg mx-auto leading-relaxed mb-10">
              Take Brainify AI with you. iOS and Android apps are in development and will launch after the PC release.
            </p>

            <div className="flex justify-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-3 bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-6 py-3.5 opacity-50 cursor-default">
                <span className="text-2xl grayscale" aria-label="Apple">🍎</span>
                <div className="text-left">
                  <small className="block text-[0.7rem] text-muted-foreground">Coming Soon</small>
                  <strong className="block text-sm font-semibold text-muted-foreground">iOS App</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-6 py-3.5 opacity-50 cursor-default">
                <span className="text-2xl grayscale" aria-label="Android">🤖</span>
                <div className="text-left">
                  <small className="block text-[0.7rem] text-muted-foreground">Coming Soon</small>
                  <strong className="block text-sm font-semibold text-muted-foreground">Android App</strong>
                </div>
              </div>
            </div>

            <p className="text-dim text-xs">Launching after PC release · Free to download</p>
          </div>
        </div>
      </div>
    </section>
  );
});

MobileAppSection.displayName = "MobileAppSection";

export default MobileAppSection;
