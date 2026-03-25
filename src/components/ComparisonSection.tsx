import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const comparisons = [
  { metric: "Study session time", traditional: "2-3 hours", brainify: "10-15 minutes", icon: "⏱️" },
  { metric: "Flashcard creation", traditional: "45+ min manually", brainify: "< 30 seconds", icon: "🎴" },
  { metric: "Quiz preparation", traditional: "Find/buy resources", brainify: "Auto-generated", icon: "🧩" },
  { metric: "Content retention", traditional: "~40% after 24h", brainify: "~75% with active recall", icon: "🧠" },
  { metric: "Cost per month", traditional: "£20-50 (textbooks, apps)", brainify: "Free / £5 Pro", icon: "💷" },
  { metric: "Subject coverage", traditional: "Limited to resources", brainify: "Any text-based content", icon: "📚" },
];

const ComparisonSection = () => {
  const ref = useInViewAnimation();

  return (
    <section id="comparison" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Why Switch
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Brainify AI vs Traditional Studying
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            See how much time and effort you'll save with AI-powered studying.
          </p>
        </div>

        <div className="max-w-3xl mx-auto fade-up fade-up-d1">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-5 mb-3 px-5">
            <div className="text-sm font-medium text-muted-foreground" />
            <div className="text-center text-sm font-semibold text-muted-foreground tracking-wide uppercase">Traditional</div>
            <div className="text-center text-sm font-semibold text-electric tracking-wide uppercase">Brainify AI</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {comparisons.map((row, i) => (
              <div
                key={row.metric}
                className={`fade-up fade-up-d${(i % 3) + 1} grid grid-cols-[1fr_1fr_1fr] gap-5 bg-surface border border-border rounded-xl p-6 items-center`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{row.icon}</span>
                  <span className="text-sm font-medium leading-snug">{row.metric}</span>
                </div>
                <div className="text-center text-sm text-muted-foreground font-light">
                  {row.traditional}
                </div>
                <div className="text-center text-sm font-semibold text-electric bg-primary/10 rounded-lg py-2.5 px-3">
                  {row.brainify}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
