import type { MisprintCalcResult } from '../../calculators/misprintCalc.ts';
import { formatCurrency, formatPercent } from '../../calculators/shared.ts';
import { Card } from '../../components/Card.tsx';
import { Badge } from '../../components/Badge.tsx';

interface MisprintResultsProps {
  result: MisprintCalcResult;
  marketValue: number;
}

export function MisprintResults({ result, marketValue }: MisprintResultsProps) {
  if (marketValue <= 0) {
    return (
      <Card className="text-center py-8">
        <p className="text-brand-text-muted text-sm">
          Enter a market value to see results
        </p>
      </Card>
    );
  }

  if (result.isPass) {
    return (
      <Card variant="warning" className="text-center py-6">
        <Badge variant="danger">DO NOT BUY</Badge>
        <p className="mt-3 text-sm text-brand-text-muted">
          This grade/era combination does not sell reliably enough on the
          misprint market. Pass on this card.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Offer */}
      <Card className="text-center">
        <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wide mb-1">
          Recommended Offer ({formatPercent(result.offerPercent)})
        </p>
        <p className="text-3xl font-bold text-brand-primary">
          {formatCurrency(result.offerAmount)}
        </p>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-text-muted">Offer Amount</span>
            <span className="font-medium">{formatCurrency(result.offerAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-text-muted">
              Shipping ({result.misprintType?.isGraded ? 'Graded' : 'Raw'})
            </span>
            <span className="font-medium">{formatCurrency(result.shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-brand-border pt-2">
            <span className="font-medium text-brand-text">Total Out of Pocket</span>
            <span className="font-bold text-brand-text">{formatCurrency(result.totalOop)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-text-muted">True % of Market</span>
            <span className="font-medium">{formatPercent(result.truePercentOfMarket)}</span>
          </div>
        </div>
      </Card>

      {/* Resale & Profit */}
      <Card>
        <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wide mb-2">
          Resale Estimates
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-text-muted">eBay Net</span>
            <span className="font-medium">{formatCurrency(result.resale.ebayNet)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-text-muted">Shopify Net</span>
            <span className="font-medium">{formatCurrency(result.resale.shopifyNet)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-text-muted">Mana Pool Net</span>
            <span className="font-medium">{formatCurrency(result.resale.manaPoolNet)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-text-muted">In-Person Net</span>
            <span className="font-medium">{formatCurrency(result.resale.inPersonNet)}</span>
          </div>
          <div className="flex justify-between border-t border-brand-border pt-2">
            <span className="font-medium text-brand-text">Estimated Profit</span>
            <span className={`font-bold ${result.estimatedProfit >= 0 ? 'text-brand-accent' : 'text-brand-warning'}`}>
              {formatCurrency(result.estimatedProfit)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
