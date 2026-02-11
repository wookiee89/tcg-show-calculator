interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function NumberInput({ value, onChange, min = 0, max = 99999, step = 1, label }: NumberInputProps) {
  function handleDecrement() {
    const next = value - step;
    if (next >= min) onChange(next);
  }

  function handleIncrement() {
    const next = value + step;
    if (next <= max) onChange(next);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    } else if (e.target.value === '') {
      onChange(0);
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-brand-text-muted mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleDecrement}
          className="h-12 w-12 flex items-center justify-center rounded-lg bg-gray-100 text-brand-text text-xl font-bold active:bg-gray-200"
        >
          &minus;
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          className="h-12 w-full text-center text-lg font-semibold rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="h-12 w-12 flex items-center justify-center rounded-lg bg-gray-100 text-brand-text text-xl font-bold active:bg-gray-200"
        >
          +
        </button>
      </div>
    </div>
  );
}
