import type { SellingCosts } from '../config/types.ts';
import { getShippingCost, roundToNearestCent } from './shared.ts';

export interface ResaleResult {
  ebayNet: number;
  shopifyNet: number;
  manaPoolNet: number;
  inPersonNet: number;
  bestNet: number;
  shippingCost: number;
}

export function calculateResale(
  marketValue: number,
  costs: SellingCosts,
): ResaleResult {
  const shippingCost = getShippingCost(
    marketValue,
    costs.shippingTrackedThreshold,
    costs.postagePwe,
    costs.suppliesPwe,
    costs.shippingTracked,
  );

  const ebayPerOrderFee = marketValue > 10
    ? costs.ebayPerOrderFeeHigh
    : costs.ebayPerOrderFeeLow;

  const ebayNet = roundToNearestCent(
    marketValue * (1 - costs.ebayFvfRate) - ebayPerOrderFee - shippingCost,
  );

  const shopifyNet = roundToNearestCent(
    marketValue * (1 - costs.shopifyProcessingRate) - costs.shopifyPerOrderFee - shippingCost,
  );

  const manaPoolNet = roundToNearestCent(
    marketValue * (1 - costs.manaPoolMarketplaceRate - costs.manaPoolProcessingRate)
      - costs.manaPoolPerOrderFee - shippingCost,
  );

  const inPersonNet = roundToNearestCent(
    marketValue * costs.inPersonSalePercent,
  );

  const bestNet = Math.max(ebayNet, shopifyNet, manaPoolNet, inPersonNet);

  return { ebayNet, shopifyNet, manaPoolNet, inPersonNet, bestNet, shippingCost };
}
