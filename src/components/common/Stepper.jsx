export function Stepper({ value, onChange, min = 1, max = 99, ariaLabel = 'Adet' }) {
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className="flex items-center bg-surface-container-low rounded-full px-2.5 py-1.5 gap-2 shrink-0 select-none"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="text-on-surface font-bold text-sm px-1.5 py-0.5 rounded-full hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Azalt"
      >
        -
      </button>
      <span
        className="font-label-sm text-label-sm text-on-surface font-bold w-4 text-center"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="text-on-surface font-bold text-sm px-1.5 py-0.5 rounded-full hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Artır"
      >
        +
      </button>
    </div>
  );
}
