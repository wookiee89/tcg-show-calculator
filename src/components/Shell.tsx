import type { ReactNode } from 'react';
import { useConfig } from '../config/configContext.tsx';
import { TabBar, type Tab } from './TabBar.tsx';

interface ShellProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
}

export function Shell({ activeTab, onTabChange, children }: ShellProps) {
  const { config } = useConfig();

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Header */}
      <header className="bg-brand-primary text-white px-4 py-3 safe-top">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold tracking-tight">
            {config.branding.businessName}
          </h1>
          <p className="text-xs text-white/80 mt-0.5">
            {config.branding.quickPitchLine}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-lg mx-auto p-4">
          {children}
        </div>
      </main>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onChange={onTabChange} />
    </div>
  );
}
