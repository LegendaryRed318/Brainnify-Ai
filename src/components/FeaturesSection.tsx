import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  { icon: "📋", title: "Smart Summaries", desc: "Condense pages of notes into clear, structured bullet points. Exam-focused or simplified — your call.", colorClass: "bg-primary/20", hoverBorder: "hover:border-primary/60", hoverShadow: "hover:shadow-[0_20px_60px_rgba(124,58,237,0.2)]" },
  { icon: "🎴", title: "Instant Flashcards", desc: "Automatically generate flip-card decks from any content. Perfect for spaced repetition and active recall.", colorClass: "bg-cyan-500/15", hoverBorder: "hover:border-cyan-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]" },
  { icon: "🧩", title: "Interactive Quizzes", desc: "Test yourself with AI-generated multiple choice questions. Instant feedback on every answer.", colorClass: "bg-emerald-500/15", hoverBorder: "hover:border-emerald-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]" },
  { icon: "💡", title: "Explain Simply", desc: "Don't understand something? Get it explained like you're 12. Complex topics made genuinely simple.", colorClass: "bg-amber-500/15", hoverBorder: "hover:border-amber-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)]" },
  { icon: "📚", title: "Study Library", desc: "Save every study kit. Come back before exams, pick up where you left off, track everything.", colorClass: "bg-red-500/15", hoverBorder: "hover:border-red-500/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(239,68,68,0.15)]" },
  { icon: "⏱️", title: "Focus Timer", desc: "Built-in Pomodoro timer to keep your study sessions structured and your brain fresh.", colorClass: "bg-accent/20", hoverBorder: "hover:border-accent/50", hoverShadow: "hover:shadow-[0_20px_60px_rgba(167,139,250,0.15)]" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

interface MagneticCardProps {
  children: React.ReactNode;
  className: string;
  href: string;
  index: number;
}

const MagneticCard = ({ children, className, href, index }: MagneticCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / rect.height) * -10;
    const rotateY = ((e.clientX - centerX) / rect.width) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      className={className}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02, translateY: -6 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
};

const FeaturesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="features" className="relative z-[1] py-28" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Features
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Everything you need<br />to study smarter
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            Four powerful AI study modes built for students who don't have time to waste.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((f, i) => (
            <MagneticCard
              key={f.title}
              href="#download"
              index={i}
              className={`group block bg-surface border border-border rounded-2xl p-9 transition-colors duration-300 relative overflow-hidden no-underline text-foreground ${f.hoverBorder} ${f.hoverShadow}`}
            >
              {/* Top shimmer line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Hover bg glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <motion.div
                className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 ${f.colorClass}`}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                {f.icon}
              </motion.div>

              <h3 className="relative font-heading text-lg font-bold mb-3 tracking-tight">{f.title}</h3>
              <p className="relative text-muted-foreground text-sm font-light leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-6 right-6 text-base opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-electric">↗</div>
            </MagneticCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;