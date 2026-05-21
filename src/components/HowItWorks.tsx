'use client';

import { MessageSquare, Wand2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Describe your app',
    description: 'Tell BuildBro what you want to build in plain English. Be as specific as you like about features, design, and tech stack.',
  },
  {
    number: '02',
    icon: Wand2,
    title: 'AI generates code',
    description: 'MiMo V2.5 Pro analyzes your request and generates a complete, production-ready codebase with all the files you need.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Deploy & iterate',
    description: 'Review the generated code, make adjustments through chat, and deploy. Iterate by describing changes naturally.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-text text-center mb-3">How it works</h2>
        <p className="text-text-secondary text-center mb-12">Three steps from idea to production.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-border" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-lg bg-elevated border border-border flex items-center justify-center text-accent">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-text mb-2">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-[240px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
