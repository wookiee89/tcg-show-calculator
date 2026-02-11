import type { AppConfig, RateTier, ConditionMultiplier } from '../config/types.ts';
import { findTier, roundToNearestCent } from './shared.ts';
import { calculateResale, type ResaleResult } from './sellingCosts.ts';

export type CardType = 'raw' | 'graded' | 'sealed';

export interface QuickCalcInput {
  marketValue: number;
  cardType: CardType;
  conditionKey: string; // only used for raw
}

export interface QuickCalcResult {
  adjustedMarketValue: number;
  condition: ConditionMultiplier | null;
  tier: RateTier | null;
  cashOffer: number;
  tradeOffer: number;
  doNotBuy: boolean;
  resale: ResaleResult;
  cashProfit: number;
  tradeProfit: number;
  cashRoi: number;
  tradeRoi: number;
  tradeCost: number;
}

export function calculateQuick(
  input: QuickCalcInput,
  config: AppConfig,
): QuickCalcResult {
  const { marketValue, cardType, conditionKey } = input;

  // Determine condition multiplier (only for raw cards)
  let condition: ConditionMultiplier | null = null;
  let adjustedMarketValue = marketValue;

  if (cardType === 'raw') {
    condition = config.conditions.find((c) => c.key === conditionKey) ?? null;
    if (condition) {
      adjustedMarketValue = roundToNearestCent(marketValue * condition.multiplier);
    }
  }

  // Find rate tier
  const tiers =
    cardType === 'raw'
      ? config.rawTiers
      : cardType === 'graded'
        ? config.gradedTiers
        : config.sealedTiers;

  const tier = findTier(tiers, adjustedMarketValue);
  const doNotBuy = !tier || (tier.cashRate === 0 && tier.tradeRate === 0);

  const cashOffer = doNotBuy ? 0 : roundToNearestCent(adjustedMarketValue * tier!.cashRate);
  const tradeOffer = doNotBuy ? 0 : roundToNearestCent(adjustedMarketValue * tier!.tradeRate);

  // Resale calculations use the original market value (what it sells for)
  const resale = calculateResale(marketValue, config.sellingCosts);

  // Profit calculations
  const tradeCost = roundToNearestCent(tradeOffer * config.sellingCosts.tradeInventoryCostBasis);
  const cashProfit = roundToNearestCent(resale.bestNet - cashOffer);
  const tradeProfit = roundToNearestCent(resale.bestNet - tradeCost);

  // ROI
  const cashRoi = cashOffer > 0 ? cashProfit / cashOffer : 0;
  const tradeRoi = tradeCost > 0 ? tradeProfit / tradeCost : 0;

  return {
    adjustedMarketValue,
    condition,
    tier,
    cashOffer,
    tradeOffer,
    doNotBuy,
    resale,
    cashProfit,
    tradeProfit,
    cashRoi,
    tradeRoi,
    tradeCost,
  };
}
