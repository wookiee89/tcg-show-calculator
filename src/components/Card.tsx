import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'warning';
  className?: string;
}

const variantClasses = {
  default: 'bg-brand-surface border-brand-border',
  accent: 'bg-green-50 border-brand-accent/30',
  warning: 'bg-red-50 border-brand-warning/30',
};

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
