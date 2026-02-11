import { describe, it, expect } from 'vitest';
import { calculateQuick } from '../../calculators/quickCalc.ts';
import { DEFAULT_CONFIG } from '../../config/defaults.ts';

describe('Quick Calculator', () => {
  it('should return DO NOT BUY for cards under $3', () => {
    const result = calculateQuick(
      { marketValue: 2.99, cardType: 'raw', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    expect(result.doNotBuy).toBe(true);
    expect(result.cashOffer).toBe(0);
    expect(result.tradeOffer).toBe(0);
  });

  it('should calculate $3.00 NM at 65% cash / 75% trade', () => {
    const result = calculateQuick(
      { marketValue: 3.00, cardType: 'raw', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    expect(result.doNotBuy).toBe(false);
    expect(result.cashOffer).toBe(1.95);
    expect(result.tradeOffer).toBe(2.25);
  });

  it('should calculate $5.00 NM at 70% cash / 80% trade', () => {
    const result = calculateQuick(
      { marketValue: 5.00, cardType: 'raw', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    expect(result.cashOffer).toBe(3.50);
    expect(result.tradeOffer).toBe(4.00);
  });

  it('should calculate $10 NM at 75% cash / 86% trade', () => {
    const result = calculateQuick(
      { marketValue: 10.00, cardType: 'raw', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    expect(result.cashOffer).toBe(7.50);
    expect(result.tradeOffer).toBe(8.60);
  });

  it('should apply LP condition multiplier (85%)', () => {
    const result = calculateQuick(
      { marketValue: 10.00, cardType: 'raw', conditionKey: 'lp' },
      DEFAULT_CONFIG,
    );
    // Adjusted = 10 * 0.85 = 8.50, falls in $5-$9.99 tier
    expect(result.adjustedMarketValue).toBe(8.50);
    expect(result.cashOffer).toBe(5.95); // 8.50 * 0.70
    expect(result.tradeOffer).toBe(6.80); // 8.50 * 0.80
  });

  it('should apply MP condition multiplier (65%)', () => {
    const result = calculateQuick(
      { marketValue: 20.00, cardType: 'raw', conditionKey: 'mp' },
      DEFAULT_CONFIG,
    );
    // Adjusted = 20 * 0.65 = 13.00, falls in $10-$19.99 tier
    expect(result.adjustedMarketValue).toBe(13.00);
    expect(result.cashOffer).toBe(9.75); // 13.00 * 0.75
    expect(result.tradeOffer).toBe(11.18); // 13.00 * 0.86
  });

  it('should apply HP condition multiplier (40%)', () => {
    const result = calculateQuick(
      { marketValue: 10.00, cardType: 'raw', conditionKey: 'hp' },
      DEFAULT_CONFIG,
    );
    // Adjusted = 10 * 0.40 = 4.00, falls in $3-$4.99 tier
    expect(result.adjustedMarketValue).toBe(4.00);
    expect(result.cashOffer).toBe(2.60); // 4.00 * 0.65
    expect(result.tradeOffer).toBe(3.00); // 4.00 * 0.75
  });

  it('should calculate $200+ NM at 82% cash / 94% trade', () => {
    const result = calculateQuick(
      { marketValue: 250.00, cardType: 'raw', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    expect(result.cashOffer).toBe(205.00);
    expect(result.tradeOffer).toBe(235.00);
  });

  it('should use graded tiers for graded cards', () => {
    const result = calculateQuick(
      { marketValue: 100.00, cardType: 'graded', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    // Graded $100-$249.99: 80% cash / 92% trade
    expect(result.adjustedMarketValue).toBe(100.00); // No condition multiplier for graded
    expect(result.cashOffer).toBe(80.00);
    expect(result.tradeOffer).toBe(92.00);
  });

  it('should use sealed tiers for sealed products', () => {
    const result = calculateQuick(
      { marketValue: 40.00, cardType: 'sealed', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    // Sealed ETBs $35-$150: 79% cash / 91% trade
    expect(result.cashOffer).toBe(31.60);
    expect(result.tradeOffer).toBe(36.40);
  });

  it('should calculate profit and ROI correctly', () => {
    const result = calculateQuick(
      { marketValue: 100.00, cardType: 'raw', conditionKey: 'nm' },
      DEFAULT_CONFIG,
    );
    // Cash offer = 100 * 0.80 = 80
    // Best resale net = Shopify: 100*0.971 - 0.30 - 4.50 = 92.30
    expect(result.cashOffer).toBe(80.00);
    expect(result.resale.bestNet).toBeCloseTo(92.30, 1);
    expect(result.cashProfit).toBeCloseTo(12.30, 1);

    // Trade cost = 92 * 0.40 = 36.80
    expect(result.tradeCost).toBe(36.80);
    expect(result.tradeProfit).toBeCloseTo(55.50, 1);
  });
});
