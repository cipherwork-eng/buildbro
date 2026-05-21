import type { Metadata } from 'next';
import { mockProjects } from '@/lib/data';
import { ProjectCard } from '@/components/ProjectCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard — BuildBro',
    description: 'Manage your projects.',
  };
}

export default function DashboardPage() {
  const activeCount = mockProjects.filter((p) => p.status === 'active').length;
  const buildingCount = mockProjects.filter((p) => p.status === 'building').length;
  const totalFiles = mockProjects.reduce((acc, p) => acc + p.files, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text mb-2">Projects</h1>
          <p className="text-sm text-text-secondary">Manage and monitor your generated applications.</p>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-hover transition-colors"
        >
          <Plus size={14} />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-text">{mockProjects.length}</div>
          <div className="text-xs text-text-secondary mt-1">Total Projects</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{activeCount}</div>
          <div className="text-xs text-text-secondary mt-1">Active</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">{buildingCount}</div>
          <div className="text-xs text-text-secondary mt-1">Building</div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-accent">{totalFiles}</div>
          <div className="text-xs text-text-secondary mt-1">Total Files</div>
        </div>
      </div>

      {/* Project list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
