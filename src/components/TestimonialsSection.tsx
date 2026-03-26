import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import InteractiveGrid from "@/components/InteractiveGrid";

const testimonials = [
  {
    text: "I had a biology exam the next day and 60 pages of notes. Brainify turned it into flashcards in under a minute. Passed with distinction.",
    highlight: "flashcards in under a minute.",
    name: "Amara K.",
    role: "A-Level Biology Student",
    avatar: "A",
    gradient: "from-primary to-accent",
  },
  {
    text: "The Explain Simply mode is unreal. I've been struggling with economics for months. One paste and I finally understood supply and demand.",
    highlight: "Explain Simply mode is unreal.",
    name: "Josh M.",
    role: "GCSE Student",
    avatar: "J",
    gradient: "from-cyan-600 to-cyan-400",
  },
  {
    text: "I use it every single day. Saved me so many hours of revision. The quiz feature especially is something I didn't know I needed.",
    highlight: "Saved me so many hours",
    name: "Sophie R.",
    role: "University First Year",
    avatar: "S",
    gradient: "from-emerald-600 to-emerald-400",
  },
  {
    text: "Brainify is honestly a lifesaver. I went from cramming the night before to actually understanding my lecture content in 10 minutes.",
    highlight: "actually understanding my lecture content",
    name: "Daniel T.",
    role: "2nd Year Med Student",
    avatar: "D",
    gradient: "from-amber-600 to-amber-400",
  },
  {
    text: "The flashcard generator alone is worth it. I made 200 cards for my psychology revision in under 5 minutes. Absolute game changer.",
    highlight: "200 cards for my psychology revision",
    name: "Priya S.",
    role: "A-Level Psychology",
    avatar: "P",
    gradient: "from-pink-600 to-pink-400",
  },
  {
    text: "I showed Brainify to my entire study group. Now we all use it before every exam. The quiz mode has become our group's secret weapon.",
    highlight: "our group's secret weapon.",
    name: "Marcus L.",
    role: "University of Leeds",
    avatar: "M",
    gradient: "from-red-600 to-red-400",
  },
  {
    text: "As a mature student juggling work and uni, I have zero time to waste. Brainify turns a 2-hour reading into key points I can actually revise from.",
    highlight: "zero time to waste.",
    name: "Rachel W.",
    role: "Mature Student, Business Mgmt",
    avatar: "R",
    gradient: "from-indigo-600 to-indigo-400",
  },
  {
    text: "I uploaded a 40-page PDF and got a full summary with flashcards in seconds. This is the future of studying and it's free. Insane.",
    highlight: "the future of studying",
    name: "Kai N.",
    role: "Computer Science, Year 1",
    avatar: "K",
    gradient: "from-teal-600 to-teal-400",
  },
];

const TestimonialsSection = () => {
  const ref = useInViewAnimation();

  return (
    <section id="testimonials" className="relative py-28" ref={ref} style={{ zIndex: 1 }}>
      <InteractiveGrid />
      <div className="container relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Social Proof
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-4">Students love it</h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            See what students are saying after using Brainify AI.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-4 py-1.5 text-xs text-emerald-400 font-medium">
            ✦ Used by 12,800+ students worldwide
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t, i) => {
            const parts = t.text.split(t.highlight);
            return (
              <div key={t.name} className={`fade-up fade-up-d${(i % 4) + 1} bg-surface border border-border rounded-2xl p-7 flex flex-col`}>
                <div className="text-amber-400 text-sm mb-4 tracking-widest">★★★★★</div>
                <p className="text-muted-foreground text-sm leading-relaxed font-light italic mb-5 flex-1">
                  "{parts[0]}<strong className="text-foreground font-semibold not-italic">{t.highlight}</strong>{parts[1]}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center font-bold text-sm text-primary-foreground`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
