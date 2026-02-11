interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function CurrencyInput({ value, onChange, label, placeholder = '0.00' }: CurrencyInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    // Allow only one decimal point and up to 2 decimal places
    const parts = raw.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    onChange(raw);
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-brand-text-muted mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted text-lg font-medium">
          $
        </span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-12 pl-8 pr-3 text-lg font-semibold rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
      </div>
    </div>
  );
}
