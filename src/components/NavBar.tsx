import { useState, useEffect } from "react";
import { BrainifyLogo } from "@/components/BrainifyLogo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#subjects", label: "✦ Popular Subjects" },
  { href: "#comparison", label: "✦ Why Switch" },
  { href: "#pricing", label: "Pricing" },
  { href: "#download", label: "Download" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1)).map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] px-[5%] h-[72px] flex items-center justify-between glass-nav border-b transition-all duration-300 ${
        scrolled ? "border-primary/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl" : "border-border"
      }`}
      style={{ animation: "slide-down-in 0.5s ease-out both" }}
    >
      <a href="#" className="no-underline">
        <BrainifyLogo size={36} showText={true} />
      </a>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`relative no-underline text-sm font-medium transition-colors group ${
              activeSection === link.href ? "text-electric" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <a href="#download" className="btn-gradient animate-cta-pulse text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm transition-all no-underline hover:scale-[1.02] hover:brightness-110">
          Start studying →
        </a>
      </div>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle navigation">
        <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-[72px] left-0 right-0 glass-nav border-b border-border px-[5%] py-6 flex flex-col gap-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`no-underline text-base font-medium py-2 border-b border-border ${
                activeSection === link.href ? "text-electric" : "text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="btn-gradient text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm text-center no-underline mt-2">
            Start studying →
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
