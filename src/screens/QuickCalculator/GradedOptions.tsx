import { SegmentedControl } from '../../components/SegmentedControl.tsx';
import { NumberInput } from '../../components/NumberInput.tsx';

interface GradedOptionsProps {
  gradingCompany: string;
  grade: number;
  onGradingCompanyChange: (company: string) => void;
  onGradeChange: (grade: number) => void;
}

const companies: { value: string; label: string }[] = [
  { value: 'psa', label: 'PSA' },
  { value: 'cgc', label: 'CGC' },
  { value: 'bgs', label: 'BGS' },
];

export function GradedOptions({
  gradingCompany,
  grade,
  onGradingCompanyChange,
  onGradeChange,
}: GradedOptionsProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <label className="block text-sm font-medium text-brand-text-muted mb-1.5">
          Company
        </label>
        <SegmentedControl
          options={companies}
          selected={gradingCompany}
          onChange={onGradingCompanyChange}
          size="sm"
        />
      </div>
      <div className="w-32">
        <NumberInput
          label="Grade"
          value={grade}
          onChange={onGradeChange}
          min={1}
          max={10}
        />
      </div>
    </div>
  );
}
