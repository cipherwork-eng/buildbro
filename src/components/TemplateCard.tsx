'use client';

import { useRouter } from 'next/navigation';
import type { Template } from '@/lib/types';
import {
  LayoutDashboard, ShoppingBag, FileText, Server,
  Rocket, MessageCircle
} from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  'layout-dashboard': LayoutDashboard,
  'shopping-bag': ShoppingBag,
  'file-text': FileText,
  'server': Server,
  'rocket': Rocket,
  'message-circle': MessageCircle,
};

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();
  const Icon = iconMap[template.icon] || LayoutDashboard;

  const handleUse = () => {
    router.push('/builder');
  };

  return (
    <div className="group bg-surface border border-border rounded-lg p-5 hover:border-accent/30 transition-all duration-200 flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-elevated border border-border flex items-center justify-center text-accent shrink-0">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text">{template.name}</h3>
          <span className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">
            {template.category}
          </span>
        </div>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1">
        {template.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {template.tech.map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-accent-muted text-accent">
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={handleUse}
        className="w-full py-2 text-xs font-medium bg-elevated border border-border rounded-md text-text-secondary hover:text-text hover:border-accent/40 hover:bg-accent/5 transition-all"
      >
        Use Template
      </button>
    </div>
  );
}
