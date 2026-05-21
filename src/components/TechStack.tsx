'use client';

const techItems = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'NextAuth', category: 'Auth' },
  { name: 'tRPC', category: 'API Layer' },
  { name: 'Zod', category: 'Validation' },
  { name: 'Vercel', category: 'Hosting' },
  { name: 'Docker', category: 'Deployment' },
];

export function TechStack() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-text text-center mb-3">Tech stack support</h2>
        <p className="text-text-secondary text-center mb-12">
          Generate apps with your favorite tools and frameworks.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {techItems.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border"
            >
              <span className="text-sm font-medium text-text">{tech.name}</span>
              <span className="text-[10px] text-text-secondary bg-elevated px-1.5 py-0.5 rounded">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
