export function Icon({ name, className = '', filled = false, size = 20, style = {} }) {
  const variationStyle = filled
    ? { fontVariationSettings: "'FILL' 1", ...style }
    : style;

  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontSize: `${size}px`, ...variationStyle }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
