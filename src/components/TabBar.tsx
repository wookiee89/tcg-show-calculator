export type Tab = 'quick' | 'bulk' | 'misprint';

interface TabBarProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'quick', label: 'Quick', icon: '\u26A1' },
  { id: 'bulk', label: 'Bulk', icon: '\uD83D\uDCE6' },
  { id: 'misprint', label: 'Misprint', icon: '\uD83C\uDCCF' },
];

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-surface border-t border-brand-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
              activeTab === tab.id
                ? 'text-brand-primary'
                : 'text-brand-text-muted'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
