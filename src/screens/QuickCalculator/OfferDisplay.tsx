import type { QuickCalcResult } from '../../calculators/quickCalc.ts';
import { formatCurrency } from '../../calculators/shared.ts';
import { Card } from '../../components/Card.tsx';
import { Badge } from '../../components/Badge.tsx';

interface OfferDisplayProps {
  result: QuickCalcResult;
  marketValue: number;
}

export function OfferDisplay({ result, marketValue }: OfferDisplayProps) {
  if (marketValue <= 0) {
    return (
      <Card className="text-center py-8">
        <p className="text-brand-text-muted text-sm">
          Enter a market value to see offers
        </p>
      </Card>
    );
  }

  if (result.doNotBuy) {
    return (
      <Card variant="warning" className="text-center py-6">
        <Badge variant="danger">DO NOT BUY</Badge>
        <p className="mt-3 text-sm text-brand-text-muted">
          Cards under $3 market value are listed at floor price online
          ($1.99 eBay / $1.49 Shopify) if not sold at the show.
        </p>
      </Card>
    );
  }

  const showAdjusted = result.condition && result.condition.multiplier < 1;

  return (
    <div className="space-y-3">
      {showAdjusted && (
        <div className="text-center text-sm text-brand-text-muted">
          Adjusted Market Value: <span className="font-semibold text-brand-text">{formatCurrency(result.adjustedMarketValue)}</span>
          <span className="ml-1">({result.condition!.label} {Math.round(result.condition!.multiplier * 100)}%)</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Cash Offer */}
        <Card className="text-center">
          <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wide mb-1">
            Cash Offer
          </p>
          <p className="text-3xl font-bold text-brand-primary">
            {formatCurrency(result.cashOffer)}
          </p>
          <p className="text-xs text-brand-text-muted mt-1">
            {result.tier ? `${Math.round(result.tier.cashRate * 100)}%` : ''}
          </p>
        </Card>

        {/* Trade Offer */}
        <Card variant="accent" className="text-center relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <Badge variant="success">Better Deal</Badge>
          </div>
          <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wide mb-1 mt-2">
            Trade Offer
          </p>
          <p className="text-3xl font-bold text-brand-accent">
            {formatCurrency(result.tradeOffer)}
          </p>
          <p className="text-xs text-brand-text-muted mt-1">
            {result.tier ? `${Math.round(result.tier.tradeRate * 100)}%` : ''}
          </p>
        </Card>
      </div>
    </div>
  );
}
