import type { QuickCalcResult } from '../../calculators/quickCalc.ts';
import { formatCurrency, formatPercent } from '../../calculators/shared.ts';
import { Collapsible } from '../../components/Collapsible.tsx';

interface VendorMetricsProps {
  result: QuickCalcResult;
}

export function VendorMetrics({ result }: VendorMetricsProps) {
  if (result.doNotBuy || result.cashOffer <= 0) return null;

  return (
    <Collapsible title="Vendor Metrics (Jay only)">
      <div className="space-y-3 text-sm">
        {/* Resale Net */}
        <div>
          <p className="font-medium text-brand-text-muted mb-1">Resale Net</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-xs text-brand-text-muted">eBay</p>
              <p className="font-semibold">{formatCurrency(result.resale.ebayNet)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-xs text-brand-text-muted">Shopify</p>
              <p className="font-semibold">{formatCurrency(result.resale.shopifyNet)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-xs text-brand-text-muted">Mana Pool</p>
              <p className="font-semibold">{formatCurrency(result.resale.manaPoolNet)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-xs text-brand-text-muted">In-Person</p>
              <p className="font-semibold">{formatCurrency(result.resale.inPersonNet)}</p>
            </div>
          </div>
        </div>

        {/* Profit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-brand-text-muted text-xs mb-0.5">Cash Profit</p>
            <p className={`font-semibold ${result.cashProfit >= 0 ? 'text-brand-accent' : 'text-brand-warning'}`}>
              {formatCurrency(result.cashProfit)}
            </p>
            <p className="text-xs text-brand-text-muted">
              ROI: {formatPercent(result.cashRoi)}
            </p>
          </div>
          <div>
            <p className="text-brand-text-muted text-xs mb-0.5">Trade Profit</p>
            <p className={`font-semibold ${result.tradeProfit >= 0 ? 'text-brand-accent' : 'text-brand-warning'}`}>
              {formatCurrency(result.tradeProfit)}
            </p>
            <p className="text-xs text-brand-text-muted">
              ROI: {formatPercent(result.tradeRoi)} (cost basis: {formatCurrency(result.tradeCost)})
            </p>
          </div>
        </div>
      </div>
    </Collapsible>
  );
}
