const FooterSection = () => {
  return (
    <footer className="relative z-[1] border-t border-border py-12 px-[5%] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="font-heading font-bold text-base flex items-center gap-2">
        <span className="text-lg">🧠</span> Brainify AI
      </div>
      <div className="flex gap-7">
        {["Features", "Pricing", "Download", "Privacy", "Terms"].map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-muted-foreground no-underline text-sm hover:text-foreground transition-colors">
            {link}
          </a>
        ))}
      </div>
      <div className="text-dim text-xs">© 2026 Brainify AI. All rights reserved.</div>
    </footer>
  );
};

export default FooterSection;
