import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const citations = [
  {
    icon: "🧠",
    title: "Active Recall",
    description: "Testing yourself on material is proven to be more effective than re-reading. Brainify's quizzes and flashcards are built on this principle.",
    source: "Roediger & Butler (2011), Science of Learning",
  },
  {
    icon: "🔄",
    title: "Spaced Repetition",
    description: "Reviewing information at increasing intervals dramatically improves long-term retention. Our flashcard system is designed for this.",
    source: "Ebbinghaus Forgetting Curve Research",
  },
  {
    icon: "📝",
    title: "Summarisation Effect",
    description: "Condensing material into key points forces deeper processing and improves comprehension compared to passive reading.",
    source: "Dunlosky et al. (2013), Psychological Science",
  },
];

const CitationsSection = () => {
  const ref = useInViewAnimation();

  return (
    <section className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Backed by Science
          </div>
          <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight mb-4">
            Built on proven learning methods
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-lg mx-auto leading-relaxed">
            Every feature in Brainify AI is grounded in cognitive science and evidence-based study techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {citations.map((c, i) => (
            <div key={c.title} className={`fade-up fade-up-d${i + 1} bg-surface border border-border rounded-2xl p-7`}>
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-heading text-lg font-bold tracking-tight mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-4">{c.description}</p>
              <p className="text-dim text-xs italic">{c.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitationsSection;
