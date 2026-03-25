const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative z-[1]">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <a href="/" className="text-electric text-sm font-medium hover:underline mb-8 inline-block">← Back to Home</a>
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-4">Last updated: March 25, 2026</p>

        <div className="space-y-8 text-muted-foreground text-[0.95rem] leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By downloading, installing, or using Brainify AI ("the App"), you agree to be bound by these Terms of Service. If you do not agree, do not use the App.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
            <p>Brainify AI is a desktop study tool that uses artificial intelligence (Gemini 2.0 Flash) to generate summaries, flashcards, quizzes, and simplified explanations from user-provided content.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">3. User Accounts</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account.</li>
              <li>You must be at least 13 years old to use the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">4. Free & Pro Plans</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Free Plan:</strong> 10 AI generations per day, indefinitely. No credit card required.</li>
              <li><strong className="text-foreground">Pro Plan:</strong> Unlimited generations, advanced features. Billed monthly (£5/mo) or annually (£48/year). Cancel anytime.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Use the App for any illegal purpose</li>
              <li>Upload content that infringes on intellectual property rights</li>
              <li>Attempt to reverse engineer, decompile, or disassemble the App</li>
              <li>Use the App to generate misleading academic work (plagiarism)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">6. Intellectual Property</h2>
            <p>The App, its design, code, and branding are the property of Brainify AI. Study kits generated from your content belong to you.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>Brainify AI is provided "as is" without warranties. We are not liable for any damages arising from the use of AI-generated study materials. Always verify important information independently.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the App after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">9. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:LegendaryRed318@gmail.com" className="text-electric hover:underline">LegendaryRed318@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
