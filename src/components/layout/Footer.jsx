import { Icon } from '../common/Icon';

export function Footer() {
  return (
    <footer
      id="iletisim"
      className="w-full bg-surface-container-low text-on-surface mt-space-xl shadow-[0_-4px_24px_rgba(61,38,25,0.03)]"
    >
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-lg">
          {/* Brand info */}
          <div className="lg:col-span-4 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="icecream" size={22} className="text-primary" />
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Lula Artisan Gelato
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Kadıköy ve Moda sokaklarında her sabah taze çiftlik sütü ve mevsimin en leziz meyveleriyle geleneksel İtalyan reçetelerine sadık kalarak dondurma üretiyoruz. Katkısız, saf ve mutluluk dolu.
            </p>
            <div className="flex items-center gap-space-xs mt-space-xs bg-surface-container px-space-md py-space-xs rounded-full w-fit select-none">
              <Icon name="ac_unit" size={18} className="text-primary" />
              <span className="font-label-sm text-label-sm text-on-primary-fixed-variant uppercase tracking-wider">
                Termal Kutuda Erimeden Teslimat
              </span>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="lg:col-span-2 flex flex-col gap-space-xs">
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider mb-space-xs">
              Hızlı Menü
            </h4>
            <a
              href="#"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-0.5"
            >
              Ana Sayfa
            </a>
            <a
              href="#urunler"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-0.5"
            >
              Dondurmalar
            </a>
            <a
              href="#hakkimizda"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-0.5"
            >
              Hakkımızda
            </a>
            <a
              href="#iletisim"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-0.5"
            >
              İletişim &amp; Lokasyon
            </a>
          </div>

          {/* Hours & Location */}
          <div className="lg:col-span-3 flex flex-col gap-space-xs">
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider mb-space-xs">
              Ziyaret &amp; Saatler
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-space-xs">
              <Icon name="schedule" size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Her Gün 11:00 - 00:00</span>
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-space-xs mt-space-xs">
              <Icon name="store" size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Moda Cad. No: 42, Kadıköy, İstanbul</span>
            </p>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 flex flex-col gap-space-xs">
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider mb-space-xs">
              İletişim &amp; Takip
            </h4>
            <a
              href="https://wa.me/905550000000"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-space-xs"
            >
              <Icon name="chat" size={18} className="text-primary" />
              <span>WhatsApp Sipariş Hattı</span>
            </a>
            <a
              href="tel:+902160000000"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-space-xs"
            >
              <Icon name="call" size={18} className="text-primary" />
              <span>+90 (216) 000 00 00</span>
            </a>
            <div className="mt-space-xs">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs bg-surface px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface shadow-[0_2px_8px_rgba(61,38,25,0.04)]"
              >
                <Icon name="photo_camera" size={18} className="text-secondary" />
                <span>@lulaartisangelato</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-md border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2024 Lula Artisan Gelato. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-space-xs">
            <Icon name="verified" size={16} className="text-primary" />
            <span>Doğal, Katkısız &amp; Günlük Üretim</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
