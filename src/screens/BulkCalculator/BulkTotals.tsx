import type { BulkCalcResult } from '../../calculators/bulkCalc.ts';
import { formatCurrency } from '../../calculators/shared.ts';
import { Card } from '../../components/Card.tsx';

interface BulkTotalsProps {
  result: BulkCalcResult;
}

export function BulkTotals({ result }: BulkTotalsProps) {
  if (result.totalCards === 0) {
    return (
      <Card className="text-center py-6">
        <p className="text-brand-text-muted text-sm">
          Enter card counts above to see totals
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center">
          <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wide mb-1">
            Cash Total
          </p>
          <p className="text-2xl font-bold text-brand-primary">
            {formatCurrency(result.grandCashTotal)}
          </p>
        </Card>
        <Card variant="accent" className="text-center">
          <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wide mb-1">
            Trade Total
          </p>
          <p className="text-2xl font-bold text-brand-accent">
            {formatCurrency(result.grandTradeTotal)}
          </p>
        </Card>
      </div>

      <div className="flex justify-between text-sm text-brand-text-muted px-1">
        <span>{result.totalCards.toLocaleString()} cards</span>
        <span>
          Avg: {formatCurrency(result.avgCashPerCard)} / {formatCurrency(result.avgTradePerCard)} per card
        </span>
      </div>
    </div>
  );
}
