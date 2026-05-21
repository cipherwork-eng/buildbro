'use client';

import { Zap, Shield, Terminal, Code2, Database, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Describe your app in plain English. Get a complete, working codebase in seconds.',
  },
  {
    icon: Code2,
    title: 'Production-Ready Code',
    description: 'TypeScript, proper error handling, validation, and best practices baked in from the start.',
  },
  {
    icon: Shield,
    title: 'Built-in Auth',
    description: 'Authentication, authorization, and session management generated automatically.',
  },
  {
    icon: Database,
    title: 'Database Included',
    description: 'Schema design, migrations, and ORM setup — ready to connect to your database.',
  },
  {
    icon: Terminal,
    title: 'Full-Stack by Default',
    description: 'API routes, server components, and client-side state management all integrated.',
  },
  {
    icon: Globe,
    title: 'Deploy Anywhere',
    description: 'Vercel, Docker, AWS — generated code works everywhere with zero configuration.',
  },
];

export function LandingFeatures() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-text text-center mb-3">Everything you need</h2>
        <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
          From idea to deployed application. No boilerplate, no configuration headaches.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-surface border border-border rounded-lg p-5 hover:border-border/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-elevated border border-border flex items-center justify-center text-accent mb-3">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-text mb-1.5">{feature.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
