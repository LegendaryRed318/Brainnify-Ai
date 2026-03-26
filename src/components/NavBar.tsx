import { useState } from "react";
import logo from "@/assets/logo-brain.png";

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-[5%] h-[72px] flex items-center justify-between glass-nav border-b border-border">
      <a href="#" className="text-foreground font-heading font-semibold text-xl no-underline flex items-center gap-3">
        <img src={logo} alt="Brainify AI" className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.4)] mix-blend-screen" />
        Brainify AI
      </a>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-7">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors">
            {link.label}
          </a>
        ))}
        <a href="#download" className="btn-gradient text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm transition-all no-underline">
          Try Free →
        </a>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle navigation"
      >
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
              className="text-foreground no-underline text-base font-medium py-2 border-b border-border"
            >
              {link.label}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="btn-gradient text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm text-center no-underline mt-2">
            Try Free →
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
