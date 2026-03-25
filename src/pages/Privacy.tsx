const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative z-[1]">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <a href="/" className="text-electric text-sm font-medium hover:underline mb-8 inline-block">← Back to Home</a>
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-4">Last updated: March 25, 2026</p>

        <div className="space-y-8 text-muted-foreground text-[0.95rem] leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p>Brainify AI is a desktop application. We collect minimal data to provide and improve our service:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong className="text-foreground">Account information:</strong> Email address when you create an account or join our waitlist.</li>
              <li><strong className="text-foreground">Usage data:</strong> Anonymous analytics about app usage (features used, session duration). No study content is stored on our servers.</li>
              <li><strong className="text-foreground">Device information:</strong> Operating system, app version, and crash reports to improve stability.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">2. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain the Brainify AI service</li>
              <li>To notify you about platform releases (e.g., macOS, Linux)</li>
              <li>To improve app performance and user experience</li>
              <li>To communicate important updates about the service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">3. Your Study Content</h2>
            <p>Your notes, PDFs, and study materials are processed locally or through the Gemini API. We do <strong className="text-foreground">not</strong> store, share, or use your study content for any purpose other than generating your study kits.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal data. We may share data with:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong className="text-foreground">Google (Gemini API):</strong> Study content is sent to Gemini for AI processing, subject to Google's privacy policy.</li>
              <li><strong className="text-foreground">Analytics providers:</strong> Anonymous usage statistics only.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">6. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:LegendaryRed318@gmail.com" className="text-electric hover:underline">LegendaryRed318@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">7. Contact</h2>
            <p>For questions about this privacy policy, contact us at <a href="mailto:LegendaryRed318@gmail.com" className="text-electric hover:underline">LegendaryRed318@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
