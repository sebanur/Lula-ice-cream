import { useToast } from '../../context/useToast';
import { Icon } from './Icon';

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-24 right-6 z-50 flex flex-col gap-space-xs pointer-events-none"
      role="region"
      aria-label="Bildirimler"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-full shadow-xl flex items-center gap-2 transform transition-all duration-300 font-label-md text-label-md ${
            toast.exiting
              ? 'opacity-0 -translate-y-2'
              : 'translate-y-0 opacity-100'
          }`}
          role="status"
        >
          <Icon name={toast.icon} size={18} className="text-primary-fixed" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
