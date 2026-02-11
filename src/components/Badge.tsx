import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'danger' | 'info';
}

const variantClasses = {
  success: 'bg-brand-accent text-white',
  danger: 'bg-brand-warning text-white',
  info: 'bg-brand-primary text-white',
};

export function Badge({ children, variant = 'info' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
