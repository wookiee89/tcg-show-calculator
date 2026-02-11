import { useState, useMemo } from 'react';
import { useConfig } from '../../config/configContext.tsx';
import { calculateBulk } from '../../calculators/bulkCalc.ts';
import { Card } from '../../components/Card.tsx';
import { BulkRow } from './BulkRow.tsx';
import { BulkTotals } from './BulkTotals.tsx';

export function BulkCalculator() {
  const { config } = useConfig();
  const [counts, setCounts] = useState<Record<string, number>>({});

  const result = useMemo(
    () => calculateBulk(counts, config.bulkCategories),
    [counts, config.bulkCategories],
  );

  function updateCount(key: string, count: number) {
    setCounts((prev) => ({ ...prev, [key]: count }));
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-brand-text">Card Counts</h2>
          <div className="flex gap-8 text-xs font-medium text-brand-text-muted">
            <span>Count</span>
            <span>Cash / Trade</span>
          </div>
        </div>
        <div className="divide-y divide-brand-border">
          {result.rows.map((row) => {
            const cat = config.bulkCategories.find((c) => c.key === row.key)!;
            return (
              <BulkRow
                key={row.key}
                row={row}
                cashPerCard={cat.cashPerCard}
                tradePerCard={cat.tradePerCard}
                onCountChange={(count) => updateCount(row.key, count)}
              />
            );
          })}
        </div>
      </Card>

      <BulkTotals result={result} />
    </div>
  );
}
