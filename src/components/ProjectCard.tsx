'use client';

import Link from 'next/link';
import type { Project } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';
import { ExternalLink, MoreVertical, Trash2, Archive } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  active: 'bg-green-500/15 text-green-400',
  building: 'bg-yellow-500/15 text-yellow-400',
  archived: 'bg-gray-500/15 text-gray-400',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="group relative bg-surface border border-border rounded-lg p-5 hover:border-border/80 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-text">{project.name}</h3>
          <p className="text-xs text-text-secondary mt-1">{project.description}</p>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-elevated text-text-secondary hover:text-text transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 bg-elevated border border-border rounded-md shadow-lg py-1 min-w-[140px] z-50">
              <button className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-text-secondary hover:text-text hover:bg-surface transition-colors">
                <Archive size={12} /> Archive
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-surface transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-elevated text-text-secondary border border-border">
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-elevated text-text-secondary">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <span className="text-[10px] text-text-secondary">{project.files} files</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary">{formatTimeAgo(project.updatedAt)}</span>
          <Link
            href="/builder"
            className="p-1 rounded hover:bg-elevated text-text-secondary hover:text-accent transition-colors"
          >
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
