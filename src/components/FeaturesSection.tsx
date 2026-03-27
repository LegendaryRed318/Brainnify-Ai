import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const features = [
  { icon: "📋", title: "Smart Summaries", desc: "Condense pages of notes into clear, structured bullet points. Exam-focused or simplified — your call.", colorClass: "bg-primary/20", hoverBorder: "hover:border-primary/60", hoverShadow: "hover:shadow-[0_20px_60px_rgba(124,58,237,0.2)]" },
  { icon: "🎴", title: "Instant Flashcards", desc: "Automatically generate flip-card decks from any content. Perfect for spaced repetition and active recall.", colorClass: "bg-cyan-500/15", hoverBorder: "hover:border-cyan-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]" },
  { icon: "🧩", title: "Interactive Quizzes", desc: "Test yourself with AI-generated multiple choice questions. Instant feedback on every answer.", colorClass: "bg-emerald-500/15", hoverBorder: "hover:border-emerald-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]" },
  { icon: "💡", title: "Explain Simply", desc: "Don't understand something? Get it explained like you're 12. Complex topics made genuinely simple.", colorClass: "bg-amber-500/15", hoverBorder: "hover:border-amber-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)]" },
  { icon: "📚", title: "Study Library", desc: "Save every study kit. Come back before exams, pick up where you left off, track everything.", colorClass: "bg-red-500/15", hoverBorder: "hover:border-red-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(239,68,68,0.15)]" },
  { icon: "⏱️", title: "Focus Timer", desc: "Built-in Pomodoro timer to keep your study sessions structured and your brain fresh.", colorClass: "bg-accent/20", hoverBorder: "hover:border-accent/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(167,139,250,0.15)]" },
];

const FeaturesSection = () => {
  const ref = useInViewAnimation();

  return (
    <section id="features" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Features
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Everything you need<br />to study smarter
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            Four powerful AI study modes built for students who don't have time to waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <a
              href="#download"
              key={f.title}
              className={`fade-up fade-up-d${(i % 3) + 1} group block bg-surface border border-border rounded-2xl p-9 transition-all duration-300 relative overflow-hidden no-underline text-foreground ${f.hoverBorder} ${f.hoverShadow} hover:-translate-y-1.5`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer" />
              <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 ${f.colorClass}`}>
                {f.icon}
              </div>
              <h3 className="relative font-heading text-lg font-bold mb-3 tracking-tight">{f.title}</h3>
              <p className="relative text-muted-foreground text-sm font-light leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-6 right-6 text-base opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-electric">↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
