import { useState } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const PricingSection = () => {
  const ref = useInViewAnimation();
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const freeFeatures = [
    { text: "10 AI generations per day", included: true },
    { text: "Summary, Flashcards, Quiz, Explain", included: true },
    { text: "PDF upload", included: true },
    { text: "Basic study library", included: true },
    { text: "Analytics dashboard", included: false, label: "Planned (Scholar)" },
    { text: "Focus timer", included: false, label: "Planned (Free)" },
    { text: "Study rooms", included: false, label: "Planned (Scholar)" },
  ];

  const scholarFeatures = [
    "Unlimited AI Study Kit Generation",
    "Full AI Tutor Access (Deep Explanations)",
    "Save & Access Unlimited Study Kits",
    "Real-time Collaborative Study Rooms",
    "Multiplayer Quizzes & Shared Sessions",
    "Advanced Analytics & Progress Tracking",
    "Multi-device sync (Planned — Scholar)",
  ];

  return (
    <section id="pricing" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Pricing
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Simple, student-friendly pricing
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed mb-10">
            Download free. Upgrade when you need more.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-surface border border-border rounded-full p-1.5 gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Annual
              <span className="bg-emerald-500/20 text-emerald-400 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">SAVE 60%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto fade-up fade-up-d1">
          {/* Free */}
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-10 relative transition-all duration-200 hover:-translate-y-1 hover:border-primary/20">
            <div className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground mb-5">Free</div>
            <div className="font-heading text-5xl font-bold tracking-tighter leading-none mb-2">£0</div>
            <div className="text-muted-foreground text-sm mb-8">Forever free</div>
            <div className="h-px bg-border mb-8" />
            <ul className="flex flex-col gap-4 mb-10 list-none p-0">
              {freeFeatures.map((f) => (
                <li key={f.text} className={`flex gap-3 items-start text-sm leading-relaxed ${f.included ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`shrink-0 mt-0.5 ${f.included ? "text-emerald-400" : "text-dim"}`}>{f.included ? "✓" : "–"}</span>
                  <span>
                    {f.text}
                    {f.label && (
                      <span className="ml-2 text-[0.65rem] bg-foreground/5 border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                        {f.label}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#download" className="block text-center py-4 rounded-xl no-underline font-semibold text-sm transition-all bg-foreground/[0.06] border border-border text-foreground hover:bg-foreground/10">
              Download free
            </a>
            <p className="text-dim text-xs mt-3 text-center">No account required · 4.2 MB · Uninstall in one click</p>
          </div>

          {/* Scholar Mode */}
          <div className="relative rounded-2xl p-[1px] overflow-hidden transition-all duration-200 hover:-translate-y-1">
            <div className="absolute inset-0 animate-border-rotate rounded-2xl" />
            <div className="relative bg-surface rounded-2xl p-8 md:p-10 bg-gradient-to-br from-primary/[0.12] to-surface">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 rounded-lg text-[0.7rem] font-bold tracking-wider uppercase whitespace-nowrap z-10">
                BEST VALUE
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-amber-400">⭐</span>
                <span className="font-heading text-sm font-bold tracking-widest uppercase text-electric">Scholar Mode</span>
              </div>

              {/* Price with transition */}
              <div className="mb-2 relative overflow-hidden">
                <div
                  key={billing}
                  className="transition-all duration-300"
                  style={{ animation: "slide-up-in 0.3s ease-out" }}
                >
                  {billing === "annual" ? (
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-muted-foreground line-through text-xl font-medium">£120/year</span>
                      <span className="font-heading text-5xl font-bold tracking-tighter leading-none">£48</span>
                      <span className="text-muted-foreground text-lg font-light">/year</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-5xl font-bold tracking-tighter leading-none">£5</span>
                      <span className="text-muted-foreground text-lg font-light">/month</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-emerald-400 text-sm font-medium mb-2">
                {billing === "annual" ? "Save over £70 per year" : "Cancel anytime"}
              </div>
              <div className="text-emerald-400/70 text-xs mb-8">Worth £200+ in tutoring sessions</div>

              <div className="h-px bg-border mb-8" />

              <div className="font-heading text-xs font-bold tracking-widest uppercase text-muted-foreground mb-5">
                Everything in Scholar Mode:
              </div>
              <ul className="flex flex-col gap-4 mb-10 list-none p-0">
                {scholarFeatures.map((f) => (
                  <li key={f} className="flex gap-3 items-start text-sm leading-relaxed text-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-xs text-electric">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#download" className="block text-center py-4 rounded-xl no-underline font-semibold text-base transition-all btn-gradient text-primary-foreground hover:scale-[1.02] hover:brightness-110">
                Start studying now →
              </a>
              <p className="text-dim text-xs mt-3 text-center">No account required · 4.2 MB · Uninstall in one click</p>
              <p className="text-center text-muted-foreground text-xs mt-2">Chosen by 78% of Brainify users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
