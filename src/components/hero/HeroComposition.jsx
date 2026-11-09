import { Icon } from '../common/Icon';

export function HeroComposition() {
  return (
    <div className="lg:col-span-6 relative flex justify-center items-center">
      {/* Background organic plate shape */}
      <div className="absolute inset-0 bg-surface-container-high rounded-full blur-2xl transform scale-90 -z-10" />

      {/* Main product visual container */}
      <div className="relative w-full max-w-[520px] aspect-square rounded-2xl overflow-hidden shadow-xl bg-surface-container-low group">
        <img
          src="/images/mix.png"
          alt="Taze Çilek ve Waffle Gelato Külahı"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBlZO9rLSekUikPMECT7f6UhY6lArRmEE4Aa5EFLUwtJnij4tLYMlni0dTuLhvlC0eNuuRWurXIgc-BSPxiei67dvfPAmmyoOGkLSgaNdY4EAaA968HgR8THii_uNxfw25e1bMlKKL9sxaLHBmITsiCHG6oG7HMuzoRQc58xTOgAT-DIiXmIHchol4gMOimngijtV5BK0398bxjA2b76QgSXmfdkzJ765opX3IFpZ0';
          }}
        />

        {/* Floating interactive badges mirroring the imagery */}
        <div className="absolute top-6 left-6 bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-md flex items-center gap-2 select-none pointer-events-none">
          <Icon name="icecream" size={20} className="text-secondary" />
          <span className="font-label-md text-label-md text-on-surface font-bold">
            🍓 Taze Çilek Soslu
          </span>
        </div>

        <div className="absolute bottom-8 left-6 bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-md flex items-center gap-2 select-none pointer-events-none">
          <Icon name="cookie" size={20} className="text-tertiary" />
          <span className="font-label-md text-label-md text-on-surface font-bold">
            🍦 Çıtır Waffle Külah
          </span>
        </div>

        <div className="absolute top-12 right-6 bg-primary text-on-primary px-space-md py-space-xs rounded-full shadow-md flex items-center gap-1.5 select-none pointer-events-none">
          <Icon name="verified" size={18} />
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
            Özel Reçete
          </span>
        </div>
      </div>
    </div>
  );
}
