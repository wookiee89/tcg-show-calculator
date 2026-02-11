import { useState, useMemo } from 'react';
import { useConfig } from '../../config/configContext.tsx';
import { calculateQuick, type CardType } from '../../calculators/quickCalc.ts';
import { CurrencyInput } from '../../components/CurrencyInput.tsx';
import { CardTypeSelector } from './CardTypeSelector.tsx';
import { GradedOptions } from './GradedOptions.tsx';
import { OfferDisplay } from './OfferDisplay.tsx';
import { VendorMetrics } from './VendorMetrics.tsx';
import { CustomerFacingView } from './CustomerFacingView.tsx';

export function QuickCalculator() {
  const { config } = useConfig();

  const [marketValueStr, setMarketValueStr] = useState('');
  const [cardType, setCardType] = useState<CardType>('raw');
  const [conditionKey, setConditionKey] = useState('nm');
  const [gradingCompany, setGradingCompany] = useState('psa');
  const [grade, setGrade] = useState(10);
  const [showCustomer, setShowCustomer] = useState(false);

  const marketValue = parseFloat(marketValueStr) || 0;

  const result = useMemo(
    () => calculateQuick({ marketValue, cardType, conditionKey }, config),
    [marketValue, cardType, conditionKey, config],
  );

  return (
    <div className="space-y-4">
      <CurrencyInput
        label="Market Value (Comp)"
        value={marketValueStr}
        onChange={setMarketValueStr}
        placeholder="0.00"
      />

      <CardTypeSelector
        cardType={cardType}
        conditionKey={conditionKey}
        onCardTypeChange={setCardType}
        onConditionChange={setConditionKey}
      />

      {cardType === 'graded' && (
        <GradedOptions
          gradingCompany={gradingCompany}
          grade={grade}
          onGradingCompanyChange={setGradingCompany}
          onGradeChange={setGrade}
        />
      )}

      <OfferDisplay result={result} marketValue={marketValue} />

      <VendorMetrics result={result} />

      {/* Show Customer Button */}
      {marketValue > 0 && !result.doNotBuy && (
        <button
          type="button"
          onClick={() => setShowCustomer(true)}
          className="w-full h-12 rounded-lg bg-brand-primary text-white font-semibold text-sm active:bg-brand-primary-light transition-colors"
        >
          Show Customer
        </button>
      )}

      {showCustomer && (
        <CustomerFacingView
          result={result}
          onClose={() => setShowCustomer(false)}
        />
      )}
    </div>
  );
}
