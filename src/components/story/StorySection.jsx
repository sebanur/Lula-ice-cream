import { Icon } from '../common/Icon';

export function StorySection() {
  return (
    <section className="px-margin-mobile lg:px-margin py-space-xl" id="hakkimizda">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        {/* Left Visual with Floating Badge */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-surface-container-low group">
            <img
              src="/images/mix.png"
              alt="Lula Artisan Gelato Ustalığı"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBlZO9rLSekUikPMECT7f6UhY6lArRmEE4Aa5EFLUwtJnij4tLYMlni0dTuLhvlC0eNuuRWurXIgc-BSPxiei67dvfPAmmyoOGkLSgaNdY4EAaA968HgR8THii_uNxfw25e1bMlKKL9sxaLHBmITsiCHG6oG7HMuzoRQc58xTOgAT-DIiXmIHchol4gMOimngijtV5BK0398bxjA2b76QgSXmfdkzJ765opX3IFpZ0';
              }}
            />
          </div>
          <div className="absolute -bottom-6 -right-4 bg-surface p-space-md rounded-2xl shadow-xl max-w-xs flex items-center gap-space-sm select-none border border-surface-container/60">
            <Icon name="workspace_premium" size={36} className="text-primary" />
            <div>
              <h4 className="font-headline-sm text-[16px] text-on-surface">
                Kadıköy Moda Atölyesi
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                2019'dan bu yana her kaşıkta değişmeyen artisan özen.
              </p>
            </div>
          </div>
        </div>

        {/* Right Story Content */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold select-none">
            <Icon name="menu_book" size={16} />
            <span>Her Topta Biraz Mutluluk</span>
          </div>

          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Doğallıktan ve Tutkudan İlham Alan Yerel Bir Hikaye
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Lula, endüstriyel dondurmaların yapay toz karışımlarına ve abartılı şeker oranlarına bir tepki olarak Moda'da küçük bir mutfakta doğdu. Bizim için dondurma sadece bir tatlı değil; dostlarla paylaşılan sıcak yaz akşamlarının, deniz kenarındaki hafif esintinin ve çocukluk anılarının taptaze bir kutlamasıdır.
          </p>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Kullandığımız süt yerel çiftliklerden taze gelir, fıstıklarımız Antep'in tescilli hasadından seçilir, sorbelerimiz ise meyvenin kendi saf suyundan başka bir sıvı tanımaz.
          </p>

          <div className="grid grid-cols-3 gap-space-sm pt-2">
            <div className="bg-surface-container-low p-space-sm rounded-xl text-center">
              <span className="font-headline-md text-headline-md text-secondary block font-bold">
                18+
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Özgün Tat
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-xl text-center">
              <span className="font-headline-md text-headline-md text-primary block font-bold">
                45 dk
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Ortalama Teslimat
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-xl text-center">
              <span className="font-headline-md text-headline-md text-tertiary block font-bold">
                %100
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Saf &amp; Doğal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
