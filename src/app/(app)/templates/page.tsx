import { mockTemplates } from '@/lib/data';
import { TemplateCard } from '@/components/TemplateCard';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Templates — BuildBro',
    description: 'Pre-built app templates to jumpstart your project.',
  };
}

export default function TemplatesPage() {
  const categories = [...new Set(mockTemplates.map((t) => t.category))];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-2">Templates</h1>
        <p className="text-sm text-text-secondary">
          Pre-built app templates to jumpstart your next project. Select one and customize it with AI.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-8">
        <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20">
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-3 py-1.5 rounded-md text-xs text-text-secondary bg-surface border border-border hover:border-border/80 transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
