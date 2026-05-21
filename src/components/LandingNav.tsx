'use client';

import Link from 'next/link';

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white text-xs font-bold">
            B
          </div>
          <span className="text-sm font-semibold text-text">BuildBro</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/templates" className="text-xs text-text-secondary hover:text-text transition-colors">
            Templates
          </Link>
          <Link href="/dashboard" className="text-xs text-text-secondary hover:text-text transition-colors">
            Projects
          </Link>
          <Link
            href="/builder"
            className="px-4 py-1.5 bg-accent text-white text-xs font-medium rounded-md hover:bg-accent-hover transition-colors"
          >
            Open Builder
          </Link>
        </div>
      </div>
    </nav>
  );
}
