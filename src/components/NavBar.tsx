const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-[5%] h-[68px] flex items-center justify-between glass-nav border-b border-border">
      <a href="#" className="text-foreground font-heading font-bold text-lg no-underline flex items-center gap-2">
        <span className="text-xl">🧠</span> Brainify AI
      </a>
      <div className="flex items-center gap-7">
        <a href="#features" className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors hidden md:inline">Features</a>
        <a href="#how" className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors hidden md:inline">How it works</a>
        <a href="#subjects" className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors hidden md:inline">Popular Subjects</a>
        <a href="#comparison" className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors hidden md:inline">Why Switch</a>
        <a href="#pricing" className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors hidden md:inline">Pricing</a>
        <a href="#download" className="text-muted-foreground no-underline text-sm font-medium hover:text-foreground transition-colors hidden md:inline">Download</a>
        <a href="#" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold text-sm hover:bg-accent hover:translate-y-[-1px] transition-all no-underline">
          Try Free →
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
