import { useState } from 'react';
import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';
import { Icon } from '../common/Icon';
import dbData from '../../../db.json';

export function DeliveryZoneSection({ zones = [] }) {
  const { showToast } = useToast();
  const { deliveryZone, setDeliveryZone } = useCart();
  const deliveryZones = zones.length > 0 ? zones : dbData.deliveryZones;
  const [selectedZone, setSelectedZone] = useState(deliveryZone || 'moda');

  const currentZoneData = deliveryZones.find((z) => z.id === selectedZone) || deliveryZones[0];

  const handleConfirmZone = () => {
    setDeliveryZone(selectedZone);
    showToast(`Teslimat bölgeniz (${currentZoneData.name}) güncellendi!`, 'location_on');
    const productsEl = document.getElementById('urunler');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="px-margin-mobile lg:px-margin py-space-xl" aria-label="Teslimat Bölgesi ve Soğuk Zincir">
      <div className="max-w-[1280px] mx-auto rounded-3xl bg-surface-container p-space-lg lg:p-space-xl shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          {/* Left information column */}
          <div className="lg:col-span-7 flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider w-fit font-bold select-none">
              <Icon name="moped" size={18} />
              <span>Özel Soğuk Zincir Filosu</span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Dondurmanız Erimeden Kapınızda 🛵
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant">
              Atölyemizden çıkan siparişler özel termo-izolasyonlu kutularda ve -18°C kuru buz blokları eşliğinde kuryelerimize teslim edilir. Kadıköy çevresinde tazeliği garanti ediyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-2">
              <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs">
                <Icon name="thermostat" size={20} className="text-primary mb-1" />
                <h4 className="font-label-md text-label-md text-on-surface font-bold">
                  -18°C Güvencesi
                </h4>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Sıfır erime garantisi
                </p>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs">
                <Icon name="timer" size={20} className="text-primary mb-1" />
                <h4 className="font-label-md text-label-md text-on-surface font-bold">
                  30-45 Dakika
                </h4>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Ekspres semt teslimatı
                </p>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs">
                <Icon name="shopping_basket" size={20} className="text-primary mb-1" />
                <h4 className="font-label-md text-label-md text-on-surface font-bold">
                  Min. 180 ₺
                </h4>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Minimum sipariş tutarı
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Delivery Zone Checker Form */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-[20px] text-on-surface">
              Teslimat Bölgeni Sorgula
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Mahallenizi seçerek yaklaşık varış süresi ve teslimat uygunluğunu hemen öğrenin.
            </p>

            <div className="flex flex-col gap-space-xs mt-1">
              <label
                htmlFor="delivery-neighborhood-select"
                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold"
              >
                Mahalle / Bölge
              </label>
              <select
                id="delivery-neighborhood-select"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low rounded-full text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all"
              >
                {deliveryZones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Status Feedback */}
            <div
              className={`p-3 rounded-xl flex items-center gap-space-xs font-body-sm text-body-sm transition-all ${
                currentZoneData.available
                  ? 'bg-primary-fixed/30 text-on-primary-fixed-variant'
                  : 'bg-tertiary-fixed/40 text-on-tertiary-fixed'
              }`}
              role="status"
              aria-live="polite"
            >
              <Icon
                name={currentZoneData.available ? 'check_circle' : 'info'}
                size={20}
                className={currentZoneData.available ? 'text-primary' : 'text-tertiary'}
              />
              <span>{currentZoneData.note}</span>
            </div>

            <button
              type="button"
              id="delivery-confirm-btn"
              onClick={handleConfirmZone}
              className="w-full py-3 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary/95 transition-all text-center active:scale-[0.98]"
            >
              Adresimi Seç ve Siparişe Başla
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
