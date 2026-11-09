const colorStyles = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary text-on-secondary',
  'secondary-fixed': 'bg-secondary-fixed text-on-secondary-fixed',
  'secondary-container': 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary text-on-tertiary',
  'tertiary-fixed': 'bg-tertiary-fixed text-on-tertiary-fixed',
  'tertiary-container': 'bg-tertiary-container text-on-tertiary-container',
  surface: 'bg-surface/90 backdrop-blur-md text-on-surface',
  'surface-container-high': 'bg-surface-container-high text-on-surface',
  'surface-container-highest': 'bg-surface-container-highest text-on-surface',
};

export function Badge({ children, variant = 'primary', className = '' }) {
  const colorClass = colorStyles[variant] || colorStyles.primary;

  return (
    <span
      className={`inline-flex items-center justify-center font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
