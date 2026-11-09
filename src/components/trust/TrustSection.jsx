import { Icon } from '../common/Icon';

const trustItems = [
  {
    id: '1',
    icon: 'wb_sunny',
    bg: 'bg-primary-fixed',
    textColor: 'text-on-primary-fixed',
    title: 'Günlük Üretim',
    description: 'Her sabah erken saatlerde atölyemizde taze sütle çalkalanan dondurmalar.',
  },
  {
    id: '2',
    icon: 'eco',
    bg: 'bg-secondary-fixed',
    textColor: 'text-on-secondary-fixed',
    title: 'Gerçek Malzemeler',
    description: 'Hiçbir koruyucu, yapay aroma veya renklendirici içermeyen saf tatlar.',
  },
  {
    id: '3',
    icon: 'ac_unit',
    bg: 'bg-tertiary-fixed',
    textColor: 'text-on-tertiary-fixed',
    title: 'Termal Teslimat',
    description: 'Özel kuru buzlu ambalajında 30-45 dakikada erimeden kapınızda.',
  },
  {
    id: '4',
    icon: 'restaurant_menu',
    bg: 'bg-surface-container-high',
    textColor: 'text-on-surface',
    title: 'İtalyan Ustalığı',
    description: 'Düşük hava oranı ve ipeksi kıvam sunan geleneksel gelato tekniği.',
  },
];

export function TrustSection() {
  return (
    <section className="px-margin-mobile lg:px-margin py-space-md" aria-label="Kalite ve Hizmet Özellikleri">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {trustItems.map((item) => (
          <div
            key={item.id}
            className="p-space-md bg-surface-container-lowest rounded-2xl shadow-sm flex items-start gap-space-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center ${item.textColor} shrink-0 select-none`}
            >
              <Icon name={item.icon} size={24} />
            </div>
            <div>
              <h3 className="font-headline-sm text-[18px] text-on-surface mb-1">
                {item.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
