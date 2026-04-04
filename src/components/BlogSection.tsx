import { forwardRef } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const posts = [
  {
    tag: "Study Tips",
    title: "How Active Recall Can Double Your Exam Scores",
    description: "Learn why testing yourself beats re-reading and how to implement it in your study routine.",
    readTime: "5 min read",
    color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  },
  {
    tag: "AI Learning",
    title: "Why AI-Generated Flashcards Beat Manual Ones",
    description: "The science behind why AI study tools help you learn faster and retain more information.",
    readTime: "4 min read",
    color: "bg-primary/15 text-electric border-primary/25",
  },
  {
    tag: "Productivity",
    title: "The Pomodoro Technique: A Student's Guide",
    description: "How structured study sessions with breaks can transform your productivity and focus.",
    readTime: "6 min read",
    color: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  },
];

const BlogSection = forwardRef<HTMLDivElement>((props, ref) => {
  const animRef = useInViewAnimation();

  return (
    <section className="relative z-[1] py-24" ref={(node) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (animRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }} {...props}>
      <div className="container">
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Resources
          </div>
          <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight mb-4">
            Study smarter with our guides
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-lg mx-auto leading-relaxed">
            Tips, guides, and insights to help you get the most out of your study time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {posts.map((post, i) => (
            <div key={post.title} className={`fade-up fade-up-d${i + 1} group bg-surface border border-border rounded-2xl p-7 transition-all hover:border-primary/40 hover:-translate-y-1 cursor-pointer`}>
              <div className={`inline-block ${post.color} border rounded-full px-3 py-1 text-[0.65rem] font-semibold mb-4`}>
                {post.tag}
              </div>
              <h3 className="font-heading text-base font-bold tracking-tight mb-2 group-hover:text-electric transition-colors leading-snug">{post.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-4">{post.description}</p>
              <p className="text-dim text-xs">{post.readTime}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

BlogSection.displayName = "BlogSection";

export default BlogSection;
