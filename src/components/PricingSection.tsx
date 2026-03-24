import { useEffect, useRef, useState } from "react";

const PricingSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

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
    "Unlimited AI Study Kit Generation",
    "Full AI Tutor Access (Deep Explanations)",
    "Save & Access Unlimited Study Kits",
    "Real-time Collaborative Study Rooms",
    "Multiplayer Quizzes & Shared Sessions",
    "Advanced Analytics & Progress Tracking",
    "Multi-device sync (Coming Soon)",
  ];

  return (
    <section id="pricing" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Pricing
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-snug tracking-tight mb-5">
            Simple, student-friendly pricing
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed mb-8">
            Download free. Upgrade when you need more.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-surface border border-border rounded-full p-1 gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Annual
              <span className="bg-emerald-500/20 text-emerald-400 text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full">SAVE 60%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[820px] mx-auto fade-up fade-up-d1">
          {/* Free */}
          <div className="bg-surface border border-border rounded-2xl p-10 relative">
            <div className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4">Free</div>
            <div className="font-heading text-5xl font-extrabold tracking-tighter leading-none mb-2">£0</div>
            <div className="text-muted-foreground text-sm mb-8">Forever free</div>
            <div className="h-px bg-border mb-7" />
            <ul className="flex flex-col gap-4 mb-10 list-none p-0">
              {freeFeatures.map((f) => (
                <li key={f.text} className={`flex gap-3 items-start text-[0.9rem] leading-relaxed ${f.included ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`shrink-0 mt-0.5 ${f.included ? "text-emerald-400" : "text-dim"}`}>{f.included ? "✓" : "–"}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <a href="#download" className="block text-center py-3.5 rounded-xl no-underline font-semibold text-[0.9rem] transition-all bg-foreground/[0.06] border border-border text-foreground hover:bg-foreground/10">
              Download Free
            </a>
          </div>

          {/* Pro */}
          <div className="bg-surface border border-primary/50 rounded-2xl p-10 relative bg-gradient-to-br from-primary/[0.12] to-surface shadow-[0_0_60px_rgba(124,58,237,0.15)]">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 rounded-lg text-[0.7rem] font-bold tracking-wider uppercase whitespace-nowrap">
              BEST VALUE
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400">⭐</span>
              <span className="font-heading text-sm font-bold tracking-widest uppercase text-electric">Pro Membership</span>
            </div>

            {/* Price */}
            <div className="mb-2">
              {billing === "annual" ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground line-through text-xl font-medium">£120/year</span>
                  <span className="font-heading text-5xl font-extrabold tracking-tighter leading-none">£48</span>
                  <span className="text-muted-foreground text-lg font-light">/year</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-5xl font-extrabold tracking-tighter leading-none">£5</span>
                  <span className="text-muted-foreground text-lg font-light">/month</span>
                </div>
              )}
            </div>
            <div className="text-emerald-400 text-sm font-medium mb-8">
              {billing === "annual" ? "Save over £70 per year" : "Cancel anytime"}
            </div>

            <div className="h-px bg-border mb-7" />

            <div className="font-heading text-xs font-bold tracking-widest uppercase text-muted-foreground mb-5">
              Everything in Pro:
            </div>
            <ul className="flex flex-col gap-4 mb-10 list-none p-0">
              {proFeatures.map((f) => (
                <li key={f} className="flex gap-3 items-start text-[0.9rem] leading-relaxed text-foreground">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-xs text-electric">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#download" className="block text-center py-4 rounded-xl no-underline font-semibold text-base transition-all btn-gradient text-primary-foreground hover:translate-y-[-2px]">
              Start Pro Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
