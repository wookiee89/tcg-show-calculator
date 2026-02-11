import { useState, type ReactNode } from 'react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-brand-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-brand-text-muted bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span>{title}</span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}
