import { Icon } from '../common/Icon';

export function ReviewCard({ review }) {
  return (
    <article className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <div className="flex text-tertiary" aria-label={`${review.rating} üzerinden 5 yıldız`}>
          {[...Array(review.rating || 5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={18}
              filled={true}
              className="text-tertiary"
            />
          ))}
        </div>
        <p className="font-body-md text-body-md text-on-surface italic">
          "{review.comment}"
        </p>
      </div>

      <div className="flex items-center gap-space-xs mt-space-md pt-space-xs">
        <div
          className={`w-10 h-10 rounded-full bg-${review.avatarColor || 'primary-fixed'} flex items-center justify-center font-bold text-${review.textColor || 'on-primary-fixed'} select-none shrink-0`}
        >
          {review.initials}
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface font-bold">
            {review.name}
          </h4>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {review.badge}
          </span>
        </div>
      </div>
    </article>
  );
}
