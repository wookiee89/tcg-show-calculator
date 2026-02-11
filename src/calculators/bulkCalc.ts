import type { BulkCategory } from '../config/types.ts';
import { roundToNearestCent } from './shared.ts';

export interface BulkRowResult {
  key: string;
  label: string;
  count: number;
  cashTotal: number;
  tradeTotal: number;
}

export interface BulkCalcResult {
  rows: BulkRowResult[];
  totalCards: number;
  grandCashTotal: number;
  grandTradeTotal: number;
  avgCashPerCard: number;
  avgTradePerCard: number;
}

export function calculateBulk(
  counts: Record<string, number>,
  categories: readonly BulkCategory[],
): BulkCalcResult {
  const rows: BulkRowResult[] = categories.map((cat) => {
    const count = counts[cat.key] ?? 0;
    return {
      key: cat.key,
      label: cat.label,
      count,
      cashTotal: roundToNearestCent(count * cat.cashPerCard),
      tradeTotal: roundToNearestCent(count * cat.tradePerCard),
    };
  });

  const totalCards = rows.reduce((sum, r) => sum + r.count, 0);
  const grandCashTotal = roundToNearestCent(rows.reduce((sum, r) => sum + r.cashTotal, 0));
  const grandTradeTotal = roundToNearestCent(rows.reduce((sum, r) => sum + r.tradeTotal, 0));

  return {
    rows,
    totalCards,
    grandCashTotal,
    grandTradeTotal,
    avgCashPerCard: totalCards > 0 ? roundToNearestCent(grandCashTotal / totalCards) : 0,
    avgTradePerCard: totalCards > 0 ? roundToNearestCent(grandTradeTotal / totalCards) : 0,
  };
}
