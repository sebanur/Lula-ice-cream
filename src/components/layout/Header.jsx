import { useState, useEffect } from 'react';
import { useCart } from '../../context/useCart';
import { Icon } from '../common/Icon';

const navLinks = [
  { label: 'Ana Sayfa', href: '#', id: 'ana-sayfa' },
  { label: 'Dondurmalar', href: '#urunler', id: 'dondurmalar' },
  { label: 'Hakkımızda', href: '#hakkimizda', id: 'hakkimizda' },
  { label: 'İletişim', href: '#iletisim', id: 'iletisim' },
];

export function Header() {
  const { openCart, itemCount } = useCart();
  const [activeSection, setActiveSection] = useState('ana-sayfa');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const urunlerEl = document.getElementById('urunler');
      const hakkimizdaEl = document.getElementById('hakkimizda');
      const iletisimEl = document.getElementById('iletisim');

      if (iletisimEl && scrollPos >= iletisimEl.offsetTop) {
        setActiveSection('iletisim');
      } else if (hakkimizdaEl && scrollPos >= hakkimizdaEl.offsetTop) {
        setActiveSection('hakkimizda');
      } else if (urunlerEl && scrollPos >= urunlerEl.offsetTop) {
        setActiveSection('dondurmalar');
      } else {
        setActiveSection('ana-sayfa');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(61,38,25,0.05)] transition-all">
      <div className="h-20 max-w-[1280px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-sm">
        {/* Brand & Location Indicator */}
        <div className="flex items-center gap-space-md">
          <a
            href="#"
            className="flex items-center gap-space-xs group focus:outline-none"
            aria-label="Lula Artisan Gelato Ana Sayfa"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Icon name="icecream" size={24} className="text-primary" />
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight ml-space-xs inline-block">
              Lula
            </span>
          </a>

          <div className="hidden xl:flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-full shadow-[0_2px_6px_-1px_rgba(61,38,25,0.03)] select-none">
            <Icon name="location_on" size={18} className="text-primary" />
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
              Teslimat: Kadıköy &amp; Moda (30-45 dk)
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-space-xs bg-surface-container-lowest/80 p-1.5 rounded-full shadow-[0_2px_12px_rgba(61,38,25,0.04)]"
          aria-label="Ana Menü"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-space-md py-space-xs rounded-full transition-all duration-200 text-sm ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_2px_8px_rgba(61,38,25,0.06)]'
                    : 'text-on-surface-variant hover:text-on-surface font-label-md text-label-md'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Cart & Profile & Mobile Toggle */}
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Sepet, ${itemCount} ürün var`}
            className="relative flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-space-xs rounded-full hover:bg-primary/95 transition-all shadow-[0_4px_14px_rgba(65,104,59,0.25)] active:scale-[0.98]"
          >
            <Icon name="shopping_bag" size={20} />
            <span className="font-label-md text-label-md hidden sm:inline-block">
              Sepet
            </span>
            <span
              className="bg-secondary text-on-secondary font-label-sm text-label-sm rounded-full w-5 h-5 flex items-center justify-center ml-0.5"
              aria-live="polite"
            >
              {itemCount}
            </span>
          </button>

          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary select-none"
            title="Kullanıcı Profili"
            aria-hidden="true"
          >
            <Icon name="person" size={18} />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container"
            aria-label={isMobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-surface-container bg-surface/95 backdrop-blur-xl px-margin-mobile py-4 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-2 rounded-full mb-3 select-none">
            <Icon name="location_on" size={18} className="text-primary" />
            <span className="font-label-sm text-[12px] text-on-surface-variant uppercase">
              Kadıköy &amp; Moda (30-45 dk)
            </span>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobil Menü">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl font-label-md text-label-md transition-colors ${
                  activeSection === link.id
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
