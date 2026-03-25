import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="relative z-[1] border-t border-border py-14 px-[5%]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="font-heading font-semibold text-lg flex items-center gap-2">
          <span className="text-lg">🧠</span> Brainify AI
        </div>
        <div className="flex gap-7 flex-wrap">
          {[
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Download", href: "#download" },
          ].map((link) => (
            <a key={link.label} href={link.href} className="text-muted-foreground no-underline text-sm hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          <Link to="/privacy" className="text-muted-foreground no-underline text-sm hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-muted-foreground no-underline text-sm hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
        <div className="text-dim text-xs">© 2026 Brainify AI. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default FooterSection;
