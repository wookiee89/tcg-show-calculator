import { describe, it, expect } from 'vitest';
import { calculateBulk } from '../../calculators/bulkCalc.ts';
import { DEFAULT_CONFIG } from '../../config/defaults.ts';

describe('Bulk Calculator', () => {
  it('should calculate totals for each category', () => {
    const counts = {
      commons: 100,
      reverseHolos: 50,
      nonHoloRares: 20,
      holoRares: 10,
      energy: 200,
    };

    const result = calculateBulk(counts, DEFAULT_CONFIG.bulkCategories);

    // Commons: 100 * $0.03 = $3.00 cash, 100 * $0.05 = $5.00 trade
    expect(result.rows[0].cashTotal).toBe(3.00);
    expect(result.rows[0].tradeTotal).toBe(5.00);

    // Reverse Holos: 50 * $0.05 = $2.50 cash, 50 * $0.08 = $4.00 trade
    expect(result.rows[1].cashTotal).toBe(2.50);
    expect(result.rows[1].tradeTotal).toBe(4.00);

    // Non-Holo Rares: 20 * $0.10 = $2.00 cash, 20 * $0.15 = $3.00 trade
    expect(result.rows[2].cashTotal).toBe(2.00);
    expect(result.rows[2].tradeTotal).toBe(3.00);

    // Holo Rares: 10 * $0.25 = $2.50 cash, 10 * $0.35 = $3.50 trade
    expect(result.rows[3].cashTotal).toBe(2.50);
    expect(result.rows[3].tradeTotal).toBe(3.50);

    // Energy: 200 * $0.01 = $2.00 cash, 200 * $0.02 = $4.00 trade
    expect(result.rows[4].cashTotal).toBe(2.00);
    expect(result.rows[4].tradeTotal).toBe(4.00);
  });

  it('should calculate grand totals', () => {
    const counts = {
      commons: 100,
      reverseHolos: 50,
      nonHoloRares: 20,
      holoRares: 10,
      energy: 200,
    };

    const result = calculateBulk(counts, DEFAULT_CONFIG.bulkCategories);

    expect(result.totalCards).toBe(380);
    expect(result.grandCashTotal).toBe(12.00);
    expect(result.grandTradeTotal).toBe(19.50);
  });

  it('should calculate per-card averages', () => {
    const counts = {
      commons: 100,
      reverseHolos: 0,
      nonHoloRares: 0,
      holoRares: 0,
      energy: 0,
    };

    const result = calculateBulk(counts, DEFAULT_CONFIG.bulkCategories);

    expect(result.avgCashPerCard).toBe(0.03);
    expect(result.avgTradePerCard).toBe(0.05);
  });

  it('should handle zero counts', () => {
    const counts = {};
    const result = calculateBulk(counts, DEFAULT_CONFIG.bulkCategories);

    expect(result.totalCards).toBe(0);
    expect(result.grandCashTotal).toBe(0);
    expect(result.grandTradeTotal).toBe(0);
    expect(result.avgCashPerCard).toBe(0);
    expect(result.avgTradePerCard).toBe(0);
  });
});
