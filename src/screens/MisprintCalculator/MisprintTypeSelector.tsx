import type { MisprintType, MisprintCompany } from '../../config/types.ts';
import { SegmentedControl } from '../../components/SegmentedControl.tsx';

const companyOptions: { value: MisprintCompany; label: string }[] = [
  { value: 'PSA', label: 'PSA' },
  { value: 'CGC', label: 'CGC' },
  { value: 'BGS', label: 'BGS' },
  { value: 'Raw', label: 'Raw' },
];

interface MisprintTypeSelectorProps {
  types: readonly MisprintType[];
  selectedKey: string;
  onChange: (key: string) => void;
  company: MisprintCompany;
  onCompanyChange: (company: MisprintCompany) => void;
}

export function MisprintTypeSelector({
  types,
  selectedKey,
  onChange,
  company,
  onCompanyChange,
}: MisprintTypeSelectorProps) {
  const filteredTypes = types.filter((t) => t.company === company);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-brand-text-muted mb-1.5">
          Grading Company
        </label>
        <SegmentedControl
          options={companyOptions}
          selected={company}
          onChange={onCompanyChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text-muted mb-1.5">
          Card Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {filteredTypes.map((type) => {
            const isPass = type.offerPercent === 0;
            return (
              <button
                key={type.key}
                type="button"
                onClick={() => onChange(type.key)}
                className={`h-11 rounded-lg text-sm font-medium transition-colors border ${
                  isPass
                    ? selectedKey === type.key
                      ? 'bg-brand-warning text-white border-brand-warning'
                      : 'bg-red-50 text-brand-warning border-red-200 hover:border-brand-warning/60'
                    : selectedKey === type.key
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-brand-surface text-brand-text border-brand-border hover:border-brand-primary/40'
                }`}
              >
                <span>{type.label}</span>
                {isPass && (
                  <span className="block text-[10px] leading-tight font-bold uppercase">
                    PASS
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
