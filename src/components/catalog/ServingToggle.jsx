export function ServingToggle({ value, onChange }) {
  return (
    <div
      className="flex items-center bg-surface-container-low p-1 rounded-full text-xs font-label-sm text-label-sm select-none"
      role="radiogroup"
      aria-label="Sunum Şekli Seçimi"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === 'Külah'}
        onClick={() => onChange('Külah')}
        className={`flex-1 py-1 rounded-full flex items-center justify-center gap-1 transition-all ${
          value === 'Külah'
            ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span>🍦 Külah</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === 'Bardak'}
        onClick={() => onChange('Bardak')}
        className={`flex-1 py-1 rounded-full flex items-center justify-center gap-1 transition-all ${
          value === 'Bardak'
            ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span>🍨 Bardak</span>
      </button>
    </div>
  );
}
