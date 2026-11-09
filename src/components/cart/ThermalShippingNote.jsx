import { Icon } from '../common/Icon';

export function ThermalShippingNote() {
  return (
    <div className="mx-space-md mt-space-sm p-3 bg-surface-container rounded-lg flex items-center gap-space-xs">
      <Icon name="ac_unit" size={22} className="text-primary shrink-0" />
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Dondurmanız kuru buz destekli{' '}
        <strong className="text-on-surface font-bold">%100 geri dönüştürülebilir termal kutuda</strong> -18°C
        korunarak teslim edilir.
      </p>
    </div>
  );
}
