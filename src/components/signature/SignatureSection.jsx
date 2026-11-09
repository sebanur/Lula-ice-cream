import { Icon } from '../common/Icon';
import { SignatureCard } from './SignatureCard';
import dbData from '../../../db.json';

export function SignatureSection({ products = [] }) {
  const signatureProducts = products.length > 0
    ? products.filter((p) => p.isSignature).slice(0, 3)
    : dbData.products.filter((p) => p.isSignature).slice(0, 3);

  return (
    <section className="px-margin-mobile lg:px-margin py-space-xl" id="one-cikanlar">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-secondary font-label-sm text-label-sm uppercase tracking-widest mb-1 select-none">
              <Icon name="local_fire_department" size={16} />
              <span>Ustaların Seçimi</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              En Sevilen İkonik Tatlarımız
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Müşterilerimizin her hafta tekrar tekrar sipariş ettiği, atölyemizin imza lezzetleri.
          </p>
        </div>

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {signatureProducts.map((product) => (
            <SignatureCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
