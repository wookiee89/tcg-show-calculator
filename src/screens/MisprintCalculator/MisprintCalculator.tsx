import { useState, useMemo, useCallback } from 'react';
import { useConfig } from '../../config/configContext.tsx';
import { calculateMisprint } from '../../calculators/misprintCalc.ts';
import { CurrencyInput } from '../../components/CurrencyInput.tsx';
import { MisprintTypeSelector } from './MisprintTypeSelector.tsx';
import { MisprintResults } from './MisprintResults.tsx';
import type { MisprintCompany } from '../../config/types.ts';

export function MisprintCalculator() {
  const { config } = useConfig();

  const [marketValueStr, setMarketValueStr] = useState('');
  const [company, setCompany] = useState<MisprintCompany>('PSA');

  const typesForCompany = useMemo(
    () => config.misprintTypes.filter((t) => t.company === company),
    [config.misprintTypes, company],
  );

  const [misprintTypeKey, setMisprintTypeKey] = useState(typesForCompany[0]?.key ?? '');

  const handleCompanyChange = useCallback(
    (newCompany: MisprintCompany) => {
      setCompany(newCompany);
      const firstType = config.misprintTypes.find((t) => t.company === newCompany);
      if (firstType) {
        setMisprintTypeKey(firstType.key);
      }
    },
    [config.misprintTypes],
  );

  const marketValue = parseFloat(marketValueStr) || 0;

  const result = useMemo(
    () =>
      calculateMisprint(
        { marketValue, misprintTypeKey },
        config.misprintTypes,
        config.misprintFees,
        config.sellingCosts,
      ),
    [marketValue, misprintTypeKey, config],
  );

  return (
    <div className="space-y-4">
      <CurrencyInput
        label="Market Value (Comp)"
        value={marketValueStr}
        onChange={setMarketValueStr}
        placeholder="0.00"
      />

      <MisprintTypeSelector
        types={config.misprintTypes}
        selectedKey={misprintTypeKey}
        onChange={setMisprintTypeKey}
        company={company}
        onCompanyChange={handleCompanyChange}
      />

      <MisprintResults result={result} marketValue={marketValue} />
    </div>
  );
}
