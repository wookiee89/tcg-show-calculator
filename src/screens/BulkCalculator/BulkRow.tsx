import type { BulkRowResult } from '../../calculators/bulkCalc.ts';
import { formatCurrency } from '../../calculators/shared.ts';

interface BulkRowProps {
  row: BulkRowResult;
  cashPerCard: number;
  tradePerCard: number;
  onCountChange: (count: number) => void;
}

export function BulkRow({ row, cashPerCard, tradePerCard, onCountChange }: BulkRowProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseInt(e.target.value, 10);
    onCountChange(isNaN(parsed) ? 0 : Math.max(0, parsed));
  }

  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-brand-text truncate">{row.label}</p>
        <p className="text-xs text-brand-text-muted">
          {formatCurrency(cashPerCard)} / {formatCurrency(tradePerCard)} per card
        </p>
      </div>
      <input
        type="text"
        inputMode="numeric"
        value={row.count || ''}
        onChange={handleChange}
        placeholder="0"
        className="w-20 h-10 text-center text-sm font-semibold rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />
      <div className="w-20 text-right">
        <p className="text-sm font-semibold text-brand-text">{formatCurrency(row.cashTotal)}</p>
        <p className="text-xs text-brand-accent font-medium">{formatCurrency(row.tradeTotal)}</p>
      </div>
    </div>
  );
}
