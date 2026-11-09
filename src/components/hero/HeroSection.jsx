import { Icon } from '../common/Icon';
import { HeroComposition } from './HeroComposition';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-margin-mobile lg:px-margin py-space-xl lg:py-24">
      {/* Ambient organic gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed/50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-primary-fixed/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        {/* Hero Copy */}
        <div className="lg:col-span-6 flex flex-col items-start gap-space-md">
          {/* Floating natural badge */}
          <div className="inline-flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-sm text-label-sm text-on-primary-fixed-variant uppercase tracking-wider font-bold">
              🌿 %100 Doğal &amp; Katkısız • ❄️ Termal Kutu Teslimatı
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface leading-[1.08] tracking-tight">
            Mutluluk Bir Top <span className="text-secondary">Dondurma</span> Uzağında.
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Katkısız, taze İtalyan usulü artisan dondurmalar. Günlük çiftlik sütü ve mevsimin en tatlı meyveleriyle her sabah özenle çalkalanır, Moda ve Kadıköy sokaklarına erimeden ulaştırılır.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-wrap items-center gap-space-sm pt-2 w-full sm:w-auto">
            <a
              href="#urunler"
              className="w-full sm:w-auto px-space-lg py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-md hover:bg-primary/95 transition-all text-center flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Dondurmaları Keşfet</span>
              <Icon name="expand_more" size={18} />
            </a>
            <a
              href="#one-cikanlar"
              className="w-full sm:w-auto px-space-lg py-3.5 bg-surface-container-lowest text-on-surface font-label-lg text-label-lg rounded-full shadow-sm hover:bg-surface-container transition-all text-center flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Icon name="star" size={20} className="text-tertiary" />
              <span>Günün Favorileri</span>
            </a>
          </div>

          {/* Metric micro-strip */}
          <div className="grid grid-cols-3 gap-space-md pt-space-sm w-full">
            <div>
              <span className="font-headline-md text-headline-md text-on-surface block">
                18+
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Özgün Reçete
              </span>
            </div>
            <div>
              <span className="font-headline-md text-headline-md text-primary block">
                30 dk
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Hızlı Teslimat
              </span>
            </div>
            <div>
              <span className="font-headline-md text-headline-md text-secondary block">
                %100
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Saf &amp; Katkısız
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual Composition */}
        <HeroComposition />
      </div>
    </section>
  );
}
