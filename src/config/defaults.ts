import type { AppConfig } from './types.ts';

export const DEFAULT_CONFIG: AppConfig = {
  rawTiers: [
    { minValue: 0, maxValue: 2.99, cashRate: 0, tradeRate: 0, label: 'Under $3' },
    { minValue: 3, maxValue: 4.99, cashRate: 0.65, tradeRate: 0.75, label: '$3 – $4.99' },
    { minValue: 5, maxValue: 9.99, cashRate: 0.70, tradeRate: 0.80, label: '$5 – $9.99' },
    { minValue: 10, maxValue: 19.99, cashRate: 0.75, tradeRate: 0.86, label: '$10 – $19.99' },
    { minValue: 20, maxValue: 49.99, cashRate: 0.78, tradeRate: 0.90, label: '$20 – $49.99' },
    { minValue: 50, maxValue: 99.99, cashRate: 0.80, tradeRate: 0.92, label: '$50 – $99.99' },
    { minValue: 100, maxValue: 199.99, cashRate: 0.80, tradeRate: 0.92, label: '$100 – $199.99' },
    { minValue: 200, maxValue: null, cashRate: 0.82, tradeRate: 0.94, label: '$200+' },
  ],

  gradedTiers: [
    { minValue: 0, maxValue: 19.99, cashRate: 0.70, tradeRate: 0.80, label: 'Under $20' },
    { minValue: 20, maxValue: 49.99, cashRate: 0.75, tradeRate: 0.86, label: '$20 – $49.99' },
    { minValue: 50, maxValue: 99.99, cashRate: 0.78, tradeRate: 0.90, label: '$50 – $99.99' },
    { minValue: 100, maxValue: 249.99, cashRate: 0.80, tradeRate: 0.92, label: '$100 – $249.99' },
    { minValue: 250, maxValue: null, cashRate: 0.82, tradeRate: 0.94, label: '$250+' },
  ],

  sealedTiers: [
    { minValue: 3, maxValue: 30, cashRate: 0.72, tradeRate: 0.85, label: 'Packs / Small Boxes' },
    { minValue: 35, maxValue: 150, cashRate: 0.79, tradeRate: 0.91, label: 'ETBs / Booster Boxes' },
    { minValue: 200, maxValue: null, cashRate: 0.77, tradeRate: 0.90, label: 'Vintage Sealed' },
  ],

  conditions: [
    { key: 'nm', label: 'NM', multiplier: 1.0 },
    { key: 'lp', label: 'LP', multiplier: 0.85 },
    { key: 'mp', label: 'MP', multiplier: 0.65 },
    { key: 'hp', label: 'HP', multiplier: 0.40 },
    { key: 'dm', label: 'DM', multiplier: 0.20 },
  ],

  bulkCategories: [
    { key: 'commons', label: 'Commons/Uncommons', cashPerCard: 0.03, tradePerCard: 0.05 },
    { key: 'reverseHolos', label: 'Reverse Holos', cashPerCard: 0.05, tradePerCard: 0.08 },
    { key: 'nonHoloRares', label: 'Non-Holo Rares', cashPerCard: 0.10, tradePerCard: 0.15 },
    { key: 'holoRares', label: 'Holo Rares', cashPerCard: 0.25, tradePerCard: 0.35 },
    { key: 'energy', label: 'Energy Cards', cashPerCard: 0.01, tradePerCard: 0.02 },
  ],

  misprintTypes: [
    // PSA (7)
    { key: 'psa10modern', label: '10 Modern', offerPercent: 0.71, isGraded: true, company: 'PSA' },
    { key: 'psa10vintage', label: '10 Vintage', offerPercent: 0.73, isGraded: true, company: 'PSA' },
    { key: 'psa9', label: '9', offerPercent: 0.62, isGraded: true, company: 'PSA' },
    { key: 'psa8vintage', label: '8 Vintage', offerPercent: 0.62, isGraded: true, company: 'PSA' },
    { key: 'psa8modern', label: '8 Modern', offerPercent: 0.55, isGraded: true, company: 'PSA' },
    { key: 'psa7vintage', label: '7- Vintage', offerPercent: 0.55, isGraded: true, company: 'PSA' },
    { key: 'psa7modern', label: '7- Modern', offerPercent: 0, isGraded: true, company: 'PSA' },
    // CGC (8)
    { key: 'cgc10perfect', label: '10 Perfect', offerPercent: 0.68, isGraded: true, company: 'CGC' },
    { key: 'cgc95modern', label: '9.5 Modern', offerPercent: 0.67, isGraded: true, company: 'CGC' },
    { key: 'cgc95vintage', label: '9.5 Vintage', offerPercent: 0.70, isGraded: true, company: 'CGC' },
    { key: 'cgc9', label: '9', offerPercent: 0.58, isGraded: true, company: 'CGC' },
    { key: 'cgc85vintage', label: '8.5 Vintage', offerPercent: 0.58, isGraded: true, company: 'CGC' },
    { key: 'cgc85modern', label: '8.5 Modern', offerPercent: 0.52, isGraded: true, company: 'CGC' },
    { key: 'cgc8vintage', label: '8- Vintage', offerPercent: 0.52, isGraded: true, company: 'CGC' },
    { key: 'cgc8modern', label: '8- Modern', offerPercent: 0, isGraded: true, company: 'CGC' },
    // BGS (7)
    { key: 'bgs10black', label: '10 Black Label', offerPercent: 0.75, isGraded: true, company: 'BGS' },
    { key: 'bgs10pristine', label: '10 Pristine', offerPercent: 0.72, isGraded: true, company: 'BGS' },
    { key: 'bgs95modern', label: '9.5 Modern', offerPercent: 0.67, isGraded: true, company: 'BGS' },
    { key: 'bgs95vintage', label: '9.5 Vintage', offerPercent: 0.70, isGraded: true, company: 'BGS' },
    { key: 'bgs9', label: '9', offerPercent: 0.58, isGraded: true, company: 'BGS' },
    { key: 'bgs85vintage', label: '8.5- Vintage', offerPercent: 0.55, isGraded: true, company: 'BGS' },
    { key: 'bgs85modern', label: '8.5- Modern', offerPercent: 0, isGraded: true, company: 'BGS' },
    // Raw (8)
    { key: 'rawNmLow', label: 'NM $15–$50', offerPercent: 0.70, isGraded: false, company: 'Raw' },
    { key: 'rawNmHigh', label: 'NM $50+', offerPercent: 0.72, isGraded: false, company: 'Raw' },
    { key: 'rawLpLow', label: 'LP $15–$50', offerPercent: 0.60, isGraded: false, company: 'Raw' },
    { key: 'rawLpHigh', label: 'LP $50+', offerPercent: 0.63, isGraded: false, company: 'Raw' },
    { key: 'rawMpLow', label: 'MP $15–$50', offerPercent: 0.50, isGraded: false, company: 'Raw' },
    { key: 'rawMpHigh', label: 'MP $50+', offerPercent: 0.53, isGraded: false, company: 'Raw' },
    { key: 'rawHp', label: 'HP', offerPercent: 0.40, isGraded: false, company: 'Raw' },
    { key: 'rawDm', label: 'DM', offerPercent: 0.30, isGraded: false, company: 'Raw' },
  ],

  misprintFees: {
    shippingRaw: 2.50,
    shippingGraded: 5.00,
  },

  sellingCosts: {
    ebayFvfRate: 0.1325,
    ebayPerOrderFeeLow: 0.30,
    ebayPerOrderFeeHigh: 0.40,
    shopifyProcessingRate: 0.029,
    shopifyPerOrderFee: 0.30,
    manaPoolMarketplaceRate: 0.05,
    manaPoolProcessingRate: 0.029,
    manaPoolPerOrderFee: 0.30,
    postagePwe: 0.74,
    suppliesPwe: 0.19,
    shippingTracked: 4.50,
    shippingTrackedThreshold: 50,
    inPersonSalePercent: 0.90,
    tradeInventoryCostBasis: 0.40,
  },

  branding: {
    businessName: 'TCG Show Calculator',
    primaryColor: '#2F5496',
    accentColor: '#375623',
    warningColor: '#C00000',
    quickPitchLine: 'I buy at 70% cash, 85% trade.',
  },
};
