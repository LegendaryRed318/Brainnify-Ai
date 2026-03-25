import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const subjects = [
  { label: "Biology", color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/25 text-emerald-300" },
  { label: "Economics", color: "from-amber-500/20 to-amber-500/5 border-amber-500/25 text-amber-300" },
  { label: "History", color: "from-orange-500/20 to-orange-500/5 border-orange-500/25 text-orange-300" },
  { label: "Chemistry", color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/25 text-cyan-300" },
  { label: "Psychology", color: "from-pink-500/20 to-pink-500/5 border-pink-500/25 text-pink-300" },
  { label: "Physics", color: "from-blue-500/20 to-blue-500/5 border-blue-500/25 text-blue-300" },
  { label: "English Lit", color: "from-rose-500/20 to-rose-500/5 border-rose-500/25 text-rose-300" },
  { label: "Maths", color: "from-violet-500/20 to-violet-500/5 border-violet-500/25 text-violet-300" },
  { label: "Computer Science", color: "from-primary/20 to-primary/5 border-primary/25 text-electric" },
  { label: "Sociology", color: "from-teal-500/20 to-teal-500/5 border-teal-500/25 text-teal-300" },
  { label: "Medicine", color: "from-red-500/20 to-red-500/5 border-red-500/25 text-red-300" },
  { label: "Law", color: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/25 text-yellow-300" },
  { label: "Business", color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/25 text-indigo-300" },
  { label: "Geography", color: "from-lime-500/20 to-lime-500/5 border-lime-500/25 text-lime-300" },
];

const SubjectsSection = () => {
  const ref = useInViewAnimation();

  return (
    <section id="subjects" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Popular Subjects
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Whatever you study,<br />Brainify handles it
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            From GCSEs to university — students use Brainify across every subject.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto fade-up fade-up-d1">
          {subjects.map((subject, i) => (
            <div
              key={subject.label}
              className={`bg-gradient-to-br ${subject.color} border rounded-full px-6 py-3 text-sm font-medium transition-all hover:scale-105 hover:-translate-y-0.5 cursor-default`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {subject.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
