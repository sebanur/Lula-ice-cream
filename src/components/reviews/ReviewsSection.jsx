import { ReviewCard } from './ReviewCard';
import dbData from '../../../db.json';

export function ReviewsSection({ reviews = [] }) {
  const allReviews = reviews.length > 0 ? reviews : dbData.reviews;

  return (
    <section className="px-margin-mobile lg:px-margin py-space-xl bg-surface-container-low/40" aria-label="Müşteri Değerlendirmeleri">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-space-lg">
        <div className="flex flex-col items-center text-center gap-space-xs">
          <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest font-bold">
            Deneyimler
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Moda Sakinleri Ne Diyor?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
            Mahallemizin dondurma tutkunlarının gerçek geri bildirimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {allReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
