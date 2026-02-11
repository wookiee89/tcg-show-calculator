interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
}

export function SegmentedControl<T extends string>({
  options,
  selected,
  onChange,
  size = 'md',
}: SegmentedControlProps<T>) {
  const heightClass = size === 'sm' ? 'h-9' : 'h-11';
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={`inline-flex w-full rounded-lg bg-gray-100 p-0.5 ${heightClass}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 rounded-md ${textClass} font-medium transition-colors min-w-0 px-1 ${
            selected === opt.value
              ? 'bg-brand-primary text-white shadow-sm'
              : 'text-brand-text-muted hover:text-brand-text'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
