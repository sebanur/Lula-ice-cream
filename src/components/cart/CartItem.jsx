import { useCart } from '../../context/useCart';
import { Icon } from '../common/Icon';

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-space-sm p-3 bg-surface-container-lowest rounded-xl shadow-sm transition-all hover:shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-surface-container-low"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/pistachio.png';
        }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-label-lg text-label-lg text-on-surface truncate">
          {item.name}
        </h4>
        <span className="inline-block px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full mt-0.5">
          {item.serving}
        </span>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-surface-container-low rounded-full px-2 py-0.5 gap-2 select-none">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, -1)}
              className="text-on-surface font-bold text-xs w-4 h-4 flex items-center justify-center hover:text-primary transition-colors"
              aria-label="Azalt"
            >
              -
            </button>
            <span className="font-label-sm text-label-sm text-on-surface font-bold w-4 text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, 1)}
              className="text-on-surface font-bold text-xs w-4 h-4 flex items-center justify-center hover:text-primary transition-colors"
              aria-label="Artır"
            >
              +
            </button>
          </div>
          <span className="font-headline-sm text-[16px] text-secondary font-bold">
            {item.price * item.quantity} ₺
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="text-outline hover:text-error transition-colors p-1 rounded-full hover:bg-surface-container"
        title="Kaldır"
        aria-label={`${item.name} ürününü sepetten kaldır`}
      >
        <Icon name="delete" size={18} />
      </button>
    </div>
  );
}
