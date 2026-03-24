import { useEffect, useRef } from "react";

const PricingSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const freeFeatures = [
    { text: "10 AI generations per day", included: true },
    { text: "Summary, Flashcards, Quiz, Explain", included: true },
    { text: "PDF upload", included: true },
    { text: "Basic study library", included: true },
    { text: "Analytics dashboard", included: false },
    { text: "Focus timer", included: false },
    { text: "Study rooms", included: false },
  ];

  const proFeatures = [
    { text: "Unlimited AI generations", included: true },
    { text: "All study modes", included: true },
    { text: "PDF + YouTube + Article", included: true },
    { text: "Full library + history", included: true },
    { text: "Analytics dashboard", included: true },
    { text: "Focus timer", included: true },
    { text: "Study rooms + Priority support", included: true },
  ];

  return (
    <section id="pricing" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Pricing
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight mb-4">
            Simple, student-friendly pricing
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed">
            Download free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[780px] mx-auto fade-up fade-up-d1">
          {/* Free */}
          <div className="bg-surface border border-border rounded-2xl p-10 relative">
            <div className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground mb-3">Free</div>
            <div className="font-heading text-5xl font-extrabold tracking-tighter leading-none mb-1">£0</div>
            <div className="text-muted-foreground text-sm mb-7">Forever free</div>
            <div className="h-px bg-border mb-6" />
            <ul className="flex flex-col gap-3 mb-8 list-none p-0">
              {freeFeatures.map((f) => (
                <li key={f.text} className={`flex gap-2.5 items-start text-sm font-light ${f.included ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`shrink-0 mt-0.5 ${f.included ? "text-emerald-400" : "text-dim"}`}>{f.included ? "✓" : "–"}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <a href="#download" className="block text-center py-3 rounded-xl no-underline font-semibold text-sm transition-all bg-foreground/[0.06] border border-border text-foreground hover:bg-foreground/10">
              Download Free
            </a>
          </div>

          {/* Pro */}
          <div className="bg-surface border border-primary/50 rounded-2xl p-10 relative bg-gradient-to-br from-primary/[0.12] to-surface shadow-[0_0_60px_rgba(124,58,237,0.15)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-[0.72rem] font-bold tracking-wider uppercase whitespace-nowrap">
              MOST POPULAR
            </div>
            <div className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground mb-3">Pro</div>
            <div className="font-heading text-5xl font-extrabold tracking-tighter leading-none mb-1">
              <span className="text-xl font-medium text-muted-foreground align-top inline-block mt-2">£</span>5
            </div>
            <div className="text-muted-foreground text-sm mb-7">per month · cancel anytime</div>
            <div className="h-px bg-border mb-6" />
            <ul className="flex flex-col gap-3 mb-8 list-none p-0">
              {proFeatures.map((f) => (
                <li key={f.text} className="flex gap-2.5 items-start text-sm font-light text-foreground">
                  <span className="shrink-0 mt-0.5 text-emerald-400">✓</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <a href="#download" className="block text-center py-3 rounded-xl no-underline font-semibold text-sm transition-all btn-gradient text-primary-foreground hover:translate-y-[-2px]">
              Download & Upgrade →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
