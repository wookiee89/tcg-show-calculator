import { describe, it, expect } from 'vitest';
import { calculateMisprint } from '../../calculators/misprintCalc.ts';
import { DEFAULT_CONFIG } from '../../config/defaults.ts';

describe('Misprint Calculator', () => {
  const { misprintTypes, misprintFees, sellingCosts } = DEFAULT_CONFIG;

  it('should calculate PSA 10 (modern) at 71%', () => {
    const result = calculateMisprint(
      { marketValue: 100, misprintTypeKey: 'psa10modern' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    expect(result.offerPercent).toBe(0.71);
    expect(result.offerAmount).toBe(71); // rounded to nearest dollar
    expect(result.shipping).toBe(5.00); // graded shipping
    expect(result.totalOop).toBe(76.00);
    expect(result.isPass).toBe(false);
  });

  it('should calculate Raw NM ($50+) at 72%', () => {
    const result = calculateMisprint(
      { marketValue: 80, misprintTypeKey: 'rawNmHigh' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    expect(result.offerPercent).toBe(0.72);
    expect(result.offerAmount).toBe(58); // 80 * 0.72 = 57.6 → rounded to 58
    expect(result.shipping).toBe(2.50); // raw shipping
    expect(result.totalOop).toBe(60.50);
    expect(result.isPass).toBe(false);
  });

  it('should calculate true percent of market', () => {
    const result = calculateMisprint(
      { marketValue: 100, misprintTypeKey: 'psa10modern' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    // OOP = 76, market = 100, true % = 76%
    expect(result.truePercentOfMarket).toBeCloseTo(0.76, 2);
  });

  it('should calculate estimated profit', () => {
    const result = calculateMisprint(
      { marketValue: 100, misprintTypeKey: 'psa10modern' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    // Best resale net should include Mana Pool: 100*0.921 - 0.30 - 4.50 = 87.30
    // Shopify: 100*0.971 - 0.30 - 4.50 = 92.30
    // bestNet = Shopify 92.30
    // Profit = 92.30 - 76 = 16.30
    expect(result.resale.bestNet).toBeCloseTo(92.30, 1);
    expect(result.estimatedProfit).toBeCloseTo(16.30, 1);
  });

  it('should mark PASS types with isPass=true and zero offer', () => {
    const result = calculateMisprint(
      { marketValue: 100, misprintTypeKey: 'psa7modern' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    expect(result.isPass).toBe(true);
    expect(result.offerPercent).toBe(0);
    expect(result.offerAmount).toBe(0);
  });

  it('should use graded shipping for PSA 9 type', () => {
    const result = calculateMisprint(
      { marketValue: 50, misprintTypeKey: 'psa9' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    expect(result.shipping).toBe(5.00);
    expect(result.isPass).toBe(false);
  });

  it('should use raw shipping for raw types', () => {
    const result = calculateMisprint(
      { marketValue: 30, misprintTypeKey: 'rawLpLow' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    expect(result.shipping).toBe(2.50);
  });

  it('should round offer to nearest dollar', () => {
    const result = calculateMisprint(
      { marketValue: 33, misprintTypeKey: 'psa9' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    // 33 * 0.62 = 20.46 → rounds to 20
    expect(result.offerAmount).toBe(20);
  });

  it('should calculate CGC type correctly', () => {
    const result = calculateMisprint(
      { marketValue: 100, misprintTypeKey: 'cgc10perfect' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    expect(result.offerPercent).toBe(0.68);
    expect(result.offerAmount).toBe(68);
    expect(result.shipping).toBe(5.00); // graded
    expect(result.isPass).toBe(false);
  });

  it('should calculate BGS type correctly', () => {
    const result = calculateMisprint(
      { marketValue: 200, misprintTypeKey: 'bgs10black' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );

    expect(result.offerPercent).toBe(0.75);
    expect(result.offerAmount).toBe(150);
    expect(result.shipping).toBe(5.00); // graded
    expect(result.isPass).toBe(false);
  });

  it('should mark CGC PASS type correctly', () => {
    const result = calculateMisprint(
      { marketValue: 50, misprintTypeKey: 'cgc8modern' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    expect(result.isPass).toBe(true);
    expect(result.offerPercent).toBe(0);
  });

  it('should mark BGS PASS type correctly', () => {
    const result = calculateMisprint(
      { marketValue: 50, misprintTypeKey: 'bgs85modern' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    expect(result.isPass).toBe(true);
    expect(result.offerPercent).toBe(0);
  });

  it('should calculate expanded Raw types correctly', () => {
    // Raw HP at 40%
    const hp = calculateMisprint(
      { marketValue: 40, misprintTypeKey: 'rawHp' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    expect(hp.offerPercent).toBe(0.40);
    expect(hp.offerAmount).toBe(16);
    expect(hp.isPass).toBe(false);

    // Raw DM at 30%
    const dm = calculateMisprint(
      { marketValue: 40, misprintTypeKey: 'rawDm' },
      misprintTypes,
      misprintFees,
      sellingCosts,
    );
    expect(dm.offerPercent).toBe(0.30);
    expect(dm.offerAmount).toBe(12);
    expect(dm.isPass).toBe(false);
  });
});
