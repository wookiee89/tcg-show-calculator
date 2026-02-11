import type { QuickCalcResult } from '../../calculators/quickCalc.ts';
import { formatCurrency } from '../../calculators/shared.ts';
import { useConfig } from '../../config/configContext.tsx';
import { Badge } from '../../components/Badge.tsx';

interface CustomerFacingViewProps {
  result: QuickCalcResult;
  onClose: () => void;
}

export function CustomerFacingView({ result, onClose }: CustomerFacingViewProps) {
  const { config } = useConfig();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: config.branding.primaryColor }}
    >
      {/* Close button - small, top-right */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 text-sm px-3 py-1 rounded-full border border-white/30"
      >
        Close
      </button>

      {/* Branding */}
      <h1 className="text-2xl font-bold text-white mb-1">
        {config.branding.businessName}
      </h1>
      <p className="text-white/70 text-sm mb-10">
        {config.branding.quickPitchLine}
      </p>

      {result.doNotBuy ? (
        <div className="text-center">
          <p className="text-white/80 text-lg">
            This card falls below our minimum buy threshold.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm space-y-6">
          {/* Cash Offer */}
          <div className="text-center bg-white/10 rounded-2xl p-6">
            <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
              Cash Offer
            </p>
            <p className="text-5xl font-bold text-white">
              {formatCurrency(result.cashOffer)}
            </p>
          </div>

          {/* Trade Offer */}
          <div className="text-center rounded-2xl p-6 relative" style={{ backgroundColor: config.branding.accentColor }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="success">Better Deal</Badge>
            </div>
            <p className="text-white/70 text-sm uppercase tracking-wider mb-2 mt-1">
              Trade Credit
            </p>
            <p className="text-5xl font-bold text-white">
              {formatCurrency(result.tradeOffer)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
