export interface RateTier {
  readonly minValue: number;
  readonly maxValue: number | null; // null = no upper bound
  readonly cashRate: number; // 0-1 decimal
  readonly tradeRate: number; // 0-1 decimal
  readonly label: string;
}

export interface ConditionMultiplier {
  readonly key: string;
  readonly label: string;
  readonly multiplier: number; // 0-1 decimal
}

export interface BulkCategory {
  readonly key: string;
  readonly label: string;
  readonly cashPerCard: number;
  readonly tradePerCard: number;
}

export type MisprintCompany = 'PSA' | 'CGC' | 'BGS' | 'Raw';

export interface MisprintType {
  readonly key: string;
  readonly label: string;
  readonly offerPercent: number; // 0-1 decimal, 0 = PASS (do not buy)
  readonly isGraded: boolean;
  readonly company: MisprintCompany;
}

export interface SellingCosts {
  readonly ebayFvfRate: number;
  readonly ebayPerOrderFeeLow: number; // for sales <= $10
  readonly ebayPerOrderFeeHigh: number; // for sales > $10
  readonly shopifyProcessingRate: number;
  readonly shopifyPerOrderFee: number;
  readonly manaPoolMarketplaceRate: number;
  readonly manaPoolProcessingRate: number;
  readonly manaPoolPerOrderFee: number;
  readonly postagePwe: number;
  readonly suppliesPwe: number;
  readonly shippingTracked: number;
  readonly shippingTrackedThreshold: number; // value at which tracked shipping kicks in
  readonly inPersonSalePercent: number;
  readonly tradeInventoryCostBasis: number;
}

export interface MisprintFees {
  readonly shippingRaw: number;
  readonly shippingGraded: number;
}

export interface Branding {
  readonly businessName: string;
  readonly primaryColor: string;
  readonly accentColor: string;
  readonly warningColor: string;
  readonly quickPitchLine: string;
}

export interface AppConfig {
  readonly rawTiers: readonly RateTier[];
  readonly gradedTiers: readonly RateTier[];
  readonly sealedTiers: readonly RateTier[];
  readonly conditions: readonly ConditionMultiplier[];
  readonly bulkCategories: readonly BulkCategory[];
  readonly misprintTypes: readonly MisprintType[];
  readonly misprintFees: MisprintFees;
  readonly sellingCosts: SellingCosts;
  readonly branding: Branding;
}
