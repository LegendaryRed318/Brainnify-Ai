import { Link } from "react-router-dom";
import { BrainifyLogo } from "@/components/BrainifyLogo";

const FooterSection = () => {
  return (
    <footer className="relative z-[1] border-t border-border">
      {/* Animated gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-accent bg-[length:200%_100%] animate-shimmer" />

      <div className="py-14 px-[5%]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <BrainifyLogo size={28} showText={true} />

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

          {/* Social icons */}
          <div className="flex gap-4">
            {[
              { label: "Twitter/X", icon: "𝕏", href: "#" },
              { label: "Instagram", icon: "📷", href: "#" },
              { label: "TikTok", icon: "🎵", href: "#" },
              { label: "Discord", icon: "💬", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-foreground/[0.05] border border-border flex items-center justify-center text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all no-underline"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-dim text-xs">© 2026 Brainify AI. All rights reserved.</div>
          <div className="text-dim text-xs">Made with ❤️ for students</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
