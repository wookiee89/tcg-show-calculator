import { SegmentedControl } from '../../components/SegmentedControl.tsx';
import type { CardType } from '../../calculators/quickCalc.ts';

type CardTypeOption = 'raw-nm' | 'raw-lp' | 'raw-mp' | 'raw-hp' | 'graded' | 'sealed';

interface CardTypeSelectorProps {
  cardType: CardType;
  conditionKey: string;
  onCardTypeChange: (cardType: CardType) => void;
  onConditionChange: (conditionKey: string) => void;
}

const options: { value: CardTypeOption; label: string }[] = [
  { value: 'raw-nm', label: 'NM' },
  { value: 'raw-lp', label: 'LP' },
  { value: 'raw-mp', label: 'MP' },
  { value: 'raw-hp', label: 'HP' },
  { value: 'graded', label: 'Graded' },
  { value: 'sealed', label: 'Sealed' },
];

function toSelectedOption(cardType: CardType, conditionKey: string): CardTypeOption {
  if (cardType === 'graded') return 'graded';
  if (cardType === 'sealed') return 'sealed';
  return `raw-${conditionKey}` as CardTypeOption;
}

export function CardTypeSelector({ cardType, conditionKey, onCardTypeChange, onConditionChange }: CardTypeSelectorProps) {
  function handleChange(value: CardTypeOption) {
    if (value === 'graded') {
      onCardTypeChange('graded');
    } else if (value === 'sealed') {
      onCardTypeChange('sealed');
    } else {
      onCardTypeChange('raw');
      onConditionChange(value.replace('raw-', ''));
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-muted mb-1.5">
        Card Type
      </label>
      <SegmentedControl
        options={options}
        selected={toSelectedOption(cardType, conditionKey)}
        onChange={handleChange}
        size="sm"
      />
    </div>
  );
}
