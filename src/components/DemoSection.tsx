import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const DemoSection = () => {
  const ref = useInViewAnimation();

  return (
    <section className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ See It In Action
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            From notes to mastery. In seconds.
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            Watch Brainify turn a wall of text into a complete study kit — live.
          </p>
        </div>

        <div className="max-w-4xl mx-auto fade-up fade-up-d1">
          <div className="rounded-2xl border border-primary/40 overflow-hidden anim-pulse-glow">
            {/* macOS title bar */}
            <div className="bg-surface2 px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="mx-auto text-xs text-muted-foreground">Brainify AI — Demo</div>
            </div>

            {/* Video placeholder */}
            <div className="aspect-video bg-surface flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-accent/[0.03]" />
              <div className="relative text-center">
                <div className="text-4xl mb-4">📹</div>
                <p className="text-muted-foreground text-lg font-heading font-semibold mb-2">App demo coming soon</p>
                <p className="text-dim text-sm">See Brainify generate a full study kit in real time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
