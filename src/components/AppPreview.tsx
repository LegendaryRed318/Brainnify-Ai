const AppPreview = () => {
  return (
    <div className="max-w-[900px] mx-auto mb-36 px-[5%] relative z-[1] fade-up visible">
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.2),0_40px_80px_rgba(0,0,0,0.6)]">
        {/* Title bar */}
        <div className="bg-surface2 px-4 py-3 flex items-center gap-2 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <div className="mx-auto bg-foreground/5 rounded-md px-4 py-1 text-xs text-muted-foreground">
            Brainify AI — Study Assistant
          </div>
        </div>

        {/* Body */}
        <div className="p-8 min-h-[320px] grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input panel */}
          <div className="bg-foreground/[0.03] border border-border rounded-xl p-5">
            <div className="text-[0.7rem] tracking-widest text-muted-foreground uppercase font-semibold mb-3">📥 Your Input</div>
            <div className="flex gap-1.5 mb-3.5">
              {["Text", "YouTube", "PDF", "Article"].map((tab, i) => (
                <div key={tab} className={`px-2.5 py-1 rounded-md text-[0.72rem] font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-muted-foreground"}`}>
                  {tab}
                </div>
              ))}
            </div>
            <div className="bg-foreground/[0.04] border border-border rounded-lg px-3 py-2.5 text-[0.72rem] text-muted-foreground leading-relaxed font-body h-[90px] mb-3">
              Mitochondria are the powerhouse of the cell. They produce ATP through cellular respiration, converting glucose and oxygen into energy. The process involves glycolysis, the Krebs cycle, and oxidative phosphorylation...
            </div>
            <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg py-2 px-4 text-xs font-semibold text-center w-full">
              ⚡ Generate Study Kit
            </div>
          </div>

          {/* Output panel */}
          <div className="bg-foreground/[0.03] border border-border rounded-xl p-5">
            <div className="inline-block bg-accent/20 text-electric rounded px-2 py-0.5 text-[0.62rem] font-semibold mb-2.5">✅ Summary Generated</div>
            <div className="bg-primary/10 border border-primary/25 rounded-lg p-3.5 mb-2.5">
              <div className="text-[0.72rem] font-semibold text-electric mb-1.5">📋 Key Points</div>
              <div className="text-[0.67rem] text-muted-foreground leading-relaxed">
                • Mitochondria produce ATP via cellular respiration<br />
                • Three stages: glycolysis → Krebs cycle → oxidative phosphorylation<br />
                • Converts glucose + O₂ → energy (ATP) + CO₂ + H₂O
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/25 rounded-lg p-3.5">
              <div className="text-[0.72rem] font-semibold text-electric mb-1.5">🎴 Flashcard Preview</div>
              <div className="text-[0.67rem] text-muted-foreground leading-relaxed">
                Q: What is the role of mitochondria?<br />
                A: Produce ATP through cellular respiration
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="px-4 md:px-8 pb-5 flex items-center justify-center overflow-x-auto gap-4 md:gap-6 border-t border-border pt-4 max-w-[90vw]">
          {[
            { keys: "⌘+V", label: "Paste notes" },
            { keys: "⏎", label: "Generate" },
            { keys: "⌘+S", label: "Save kit" },
            { keys: "Tab", label: "Switch mode" },
          ].map((shortcut) => (
            <div key={shortcut.keys} className="flex items-center gap-2 flex-shrink-0">
              <kbd className="bg-foreground/[0.08] border border-border rounded px-1.5 py-0.5 text-[0.65rem] font-mono text-electric font-semibold">
                {shortcut.keys}
              </kbd>
              <span className="text-[0.65rem] text-muted-foreground">
                <span className="hidden md:inline">{shortcut.label}</span>
                <span className="md:hidden">{shortcut.label.split(' ')[0]}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
