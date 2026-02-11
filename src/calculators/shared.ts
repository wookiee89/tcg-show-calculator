import type { RateTier } from '../config/types.ts';

export function findTier(tiers: readonly RateTier[], value: number): RateTier | null {
  for (const tier of tiers) {
    const withinMin = value >= tier.minValue;
    const withinMax = tier.maxValue === null || value <= tier.maxValue;
    if (withinMin && withinMax) return tier;
  }
  return null;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatPercent(decimal: number): string {
  return `${(decimal * 100).toFixed(1)}%`;
}

export function roundToNearestDollar(amount: number): number {
  return Math.round(amount);
}

export function roundToNearestCent(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function getShippingCost(
  marketValue: number,
  trackedThreshold: number,
  postagePwe: number,
  suppliesPwe: number,
  shippingTracked: number,
): number {
  if (marketValue >= trackedThreshold) {
    return shippingTracked;
  }
  return postagePwe + suppliesPwe;
}
