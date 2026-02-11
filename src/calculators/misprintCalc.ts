import type { MisprintType, MisprintFees, SellingCosts } from '../config/types.ts';
import { roundToNearestDollar, roundToNearestCent } from './shared.ts';
import { calculateResale, type ResaleResult } from './sellingCosts.ts';

export interface MisprintCalcInput {
  marketValue: number;
  misprintTypeKey: string;
}

export interface MisprintCalcResult {
  misprintType: MisprintType | null;
  offerPercent: number;
  offerAmount: number;
  shipping: number;
  totalOop: number;
  truePercentOfMarket: number;
  resale: ResaleResult;
  estimatedProfit: number;
  isPass: boolean;
}

export function calculateMisprint(
  input: MisprintCalcInput,
  misprintTypes: readonly MisprintType[],
  fees: MisprintFees,
  sellingCosts: SellingCosts,
): MisprintCalcResult {
  const { marketValue, misprintTypeKey } = input;

  const misprintType = misprintTypes.find((t) => t.key === misprintTypeKey) ?? null;
  const isPass = misprintType !== null && misprintType.offerPercent === 0;
  const offerPercent = misprintType?.offerPercent ?? 0;

  const offerAmount = roundToNearestDollar(marketValue * offerPercent);
  const shipping = misprintType?.isGraded ? fees.shippingGraded : fees.shippingRaw;
  const totalOop = roundToNearestCent(offerAmount + shipping);
  const truePercentOfMarket = marketValue > 0 ? totalOop / marketValue : 0;

  const resale = calculateResale(marketValue, sellingCosts);
  const estimatedProfit = roundToNearestCent(resale.bestNet - totalOop);

  return {
    misprintType,
    offerPercent,
    offerAmount,
    shipping,
    totalOop,
    truePercentOfMarket,
    resale,
    estimatedProfit,
    isPass,
  };
}
