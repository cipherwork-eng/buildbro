import Link from 'next/link';
import { TypingDemo } from '@/components/TypingDemo';
import { LandingFeatures } from '@/components/LandingFeatures';
import { HowItWorks } from '@/components/HowItWorks';
import { TechStack } from '@/components/TechStack';
import { LandingNav } from '@/components/LandingNav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <LandingNav />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-text-secondary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Powered by MiMo V2.5 Pro
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-text tracking-tight mb-6 leading-[1.1]">
            Describe your app.
            <br />
            <span className="text-accent">Get production code.</span>
          </h1>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            BuildBro is an AI-powered code generator that turns natural language descriptions
            into full-stack applications. Auth, databases, APIs, UI — all generated and ready to deploy.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
            >
              Start Building
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-elevated border border-border text-text text-sm font-medium rounded-lg hover:border-border/80 transition-colors"
            >
              Browse Templates
            </Link>
          </div>

          {/* Typing demo */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface border border-border rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-text-secondary ml-2">BuildBro</span>
              </div>
              <div className="text-sm font-mono">
                <span className="text-accent">$</span>{' '}
                <TypingDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFeatures />
      <HowItWorks />
      <TechStack />

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Ready to build?</h2>
          <p className="text-text-secondary mb-8">
            Stop writing boilerplate. Start building features.
            Describe what you want and let BuildBro generate the code.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Open Builder
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-accent flex items-center justify-center text-white text-[10px] font-bold">B</div>
            <span className="text-xs text-text-secondary">BuildBro</span>
          </div>
          <span className="text-xs text-text-secondary">AI-Powered Code Generation</span>
        </div>
      </footer>
    </div>
  );
}
