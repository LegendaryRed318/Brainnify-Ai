import { useEffect, useRef } from "react";

const features = [
  { icon: "📋", title: "Smart Summaries", desc: "Condense pages of notes into clear, structured bullet points. Exam-focused or simplified — your call.", colorClass: "bg-primary/20" },
  { icon: "🎴", title: "Instant Flashcards", desc: "Automatically generate flip-card decks from any content. Perfect for spaced repetition and active recall.", colorClass: "bg-cyan-500/15" },
  { icon: "🧩", title: "Interactive Quizzes", desc: "Test yourself with AI-generated multiple choice questions. Instant feedback on every answer.", colorClass: "bg-emerald-500/15" },
  { icon: "💡", title: "Explain Simply", desc: "Don't understand something? Get it explained like you're 12. Complex topics made genuinely simple.", colorClass: "bg-amber-500/15" },
  { icon: "📚", title: "Study Library", desc: "Save every study kit. Come back before exams, pick up where you left off, track everything.", colorClass: "bg-red-500/15" },
  { icon: "⏱️", title: "Focus Timer", desc: "Built-in Pomodoro timer to keep your study sessions structured and your brain fresh.", colorClass: "bg-accent/20" },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="text-center mb-[72px] fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Features
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight mb-4">
            Everything you need<br />to study smarter
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed">
            Four powerful AI study modes built for students who don't have time to waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <a
              href="#download"
              key={f.title}
              className={`fade-up fade-up-d${(i % 3) + 1} group block bg-surface border border-border rounded-[14px] p-8 transition-all duration-200 relative overflow-hidden no-underline text-foreground hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${f.colorClass}`}>
                {f.icon}
              </div>
              <h3 className="font-heading text-lg font-bold mb-2.5 tracking-tight">{f.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-5 right-5 text-dim text-base opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-electric">↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
