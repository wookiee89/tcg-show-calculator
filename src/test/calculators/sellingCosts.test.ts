import { describe, it, expect } from 'vitest';
import { calculateResale } from '../../calculators/sellingCosts.ts';
import { DEFAULT_CONFIG } from '../../config/defaults.ts';

describe('Selling Costs / Resale Calculator', () => {
  const costs = DEFAULT_CONFIG.sellingCosts;

  it('should calculate eBay net for a $10 card (PWE shipping)', () => {
    const result = calculateResale(10, costs);
    // eBay: 10 * (1 - 0.1325) - 0.30 - (0.74 + 0.19) = 8.675 - 0.30 - 0.93 = 7.445
    // Floating point: may round to 7.44 or 7.45
    expect(result.ebayNet).toBeCloseTo(7.44, 1);
    expect(result.shippingCost).toBeCloseTo(0.93, 2); // PWE
  });

  it('should use higher per-order fee for cards over $10', () => {
    const result = calculateResale(11, costs);
    // eBay: 11 * (1 - 0.1325) - 0.40 - 0.93 = 9.5425 - 0.40 - 0.93 = 8.2125 → 8.21
    expect(result.ebayNet).toBeCloseTo(8.21, 2);
  });

  it('should use tracked shipping for cards $50+', () => {
    const result = calculateResale(50, costs);
    expect(result.shippingCost).toBe(4.50);
    // eBay: 50 * 0.8675 - 0.40 - 4.50 = 43.375 - 4.90 = 38.475
    expect(result.ebayNet).toBeCloseTo(38.48, 2);
  });

  it('should calculate Shopify net correctly', () => {
    const result = calculateResale(25, costs);
    // Shopify: 25 * (1 - 0.029) - 0.30 - 0.93 = 24.275 - 1.23 = 23.045
    expect(result.shopifyNet).toBeCloseTo(23.05, 2);
  });

  it('should calculate Mana Pool net correctly', () => {
    const result = calculateResale(100, costs);
    // Mana Pool: 100 * (1 - 0.05 - 0.029) - 0.30 - 4.50 = 92.10 - 4.80 = 87.30
    expect(result.manaPoolNet).toBeCloseTo(87.30, 2);
  });

  it('should calculate Mana Pool net for low-value card (PWE)', () => {
    const result = calculateResale(25, costs);
    // Mana Pool: 25 * 0.921 - 0.30 - 0.93 = 23.025 - 1.23 = 21.795
    expect(result.manaPoolNet).toBeCloseTo(21.80, 1);
  });

  it('should calculate in-person net at 90%', () => {
    const result = calculateResale(100, costs);
    expect(result.inPersonNet).toBe(90);
  });

  it('should return the best net among all four channels', () => {
    const result = calculateResale(100, costs);
    // In-person = 90, Shopify = 92.30, ManaPool = 87.30, eBay = ...
    // Best should be Shopify
    expect(result.bestNet).toBe(
      Math.max(result.ebayNet, result.shopifyNet, result.manaPoolNet, result.inPersonNet),
    );
  });
});
