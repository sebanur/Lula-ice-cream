import { useCart } from '../../context/useCart';
import { Icon } from '../common/Icon';

export function FreeDeliveryMeter() {
  const { subtotal, freeDeliveryThreshold, freeDeliveryRemaining, freeDeliveryPercent } = useCart();

  const isFree = freeDeliveryRemaining <= 0;

  return (
    <div className="px-space-md py-space-xs bg-primary-fixed/30 flex flex-col gap-1.5">
      <div className="flex items-center justify-between font-label-sm text-label-sm text-on-primary-fixed-variant">
        <span className="flex items-center gap-1">
          <Icon name="moped" size={16} className="text-primary" />
          <span>
            {isFree
              ? 'Tebrikler! Ücretsiz teslimat kazandınız 🎉'
              : `Ücretsiz teslimata ${freeDeliveryRemaining} ₺ kaldı!`}
          </span>
        </span>
        <span className="font-bold">
          {subtotal} / {freeDeliveryThreshold} ₺
        </span>
      </div>
      <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${freeDeliveryPercent}%` }}
          role="progressbar"
          aria-valuenow={subtotal}
          aria-valuemin={0}
          aria-valuemax={freeDeliveryThreshold}
        />
      </div>
    </div>
  );
}
