'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Hammer, Grid3X3, FolderKanban,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/builder', label: 'Builder', icon: Hammer },
  { href: '/templates', label: 'Templates', icon: Grid3X3 },
  { href: '/dashboard', label: 'Projects', icon: FolderKanban },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-border bg-surface transition-all duration-200 ease-out ${
        collapsed ? 'w-[60px]' : 'w-[220px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border shrink-0">
        <img src="/icon.svg" alt="BuildBro" className="w-7 h-7 rounded-md shrink-0" />
        {!collapsed && (
          <span className="text-sm font-semibold text-text tracking-tight">BuildBro</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-elevated text-text font-medium'
                  : 'text-text-secondary hover:text-text hover:bg-elevated/50'
              }`}
            >
              <Icon size={18} strokeWidth={1.5} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-1.5 rounded text-text-secondary hover:text-text hover:bg-elevated transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
