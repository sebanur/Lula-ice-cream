import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';
import { Icon } from '../common/Icon';

export function PromoBanner({ promotion }) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  const promoData = promotion || {
    tag: 'Hafta Sonuna Özel Avantaj',
    title: '2 Büyük Kutu (1 kg) Alana Termal Çanta & Teslimat Hediye!',
    description: 'Sepette LULAFRESH kupon kodunu kullanarak hediyenizi aktif edin.',
    code: 'LULAFRESH',
    buttonText: 'Fırsatı Yakala (520 ₺)',
    productName: '1 kg Aile Paketi (2 Kutu)',
    buttonPrice: 520,
  };

  const handleClaimPromo = () => {
    addItem(
      {
        id: 'promo-1kg-family',
        name: promoData.productName,
        shortName: promoData.productName,
        price: promoData.buttonPrice,
        image: '/images/mix.png',
      },
      'Bardak',
      1
    );
    showToast(`${promoData.productName} sepete eklendi!`, 'redeem');
    openCart();
  };

  return (
    <section className="px-margin-mobile lg:px-margin py-space-md" aria-label="Özel Kampanya">
      <div className="max-w-[1280px] mx-auto rounded-3xl bg-tertiary-fixed text-on-tertiary-fixed p-space-lg lg:p-space-xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-space-md">
        {/* Decorative background accent */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-tertiary-fixed-dim/40 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-space-md z-10">
          <div className="w-14 h-14 rounded-2xl bg-on-tertiary-fixed text-tertiary-fixed flex items-center justify-center shrink-0 shadow-sm select-none">
            <Icon name="redeem" size={32} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant font-bold">
              {promoData.tag}
            </span>
            <h3 className="font-headline-md text-headline-md text-on-tertiary-fixed leading-tight">
              {promoData.title}
            </h3>
            <p className="font-body-md text-body-md text-on-tertiary-fixed-variant mt-1">
              Sepette{' '}
              <span className="font-bold bg-white/60 px-2 py-0.5 rounded-full text-on-surface">
                {promoData.code}
              </span>{' '}
              kupon kodunu kullanarak hediyenizi aktif edin.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClaimPromo}
          className="shrink-0 px-space-lg py-3.5 bg-on-tertiary-fixed text-tertiary-fixed font-label-lg text-label-lg rounded-full shadow-md hover:bg-black transition-all z-10 whitespace-nowrap active:scale-[0.98]"
        >
          {promoData.buttonText}
        </button>
      </div>
    </section>
  );
}
