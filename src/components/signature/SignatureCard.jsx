import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';

export function SignatureCard({ product }) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  const handleQuickAdd = () => {
    addItem(product, 'Külah', 1);
    showToast(`${product.name} sepete eklendi!`, 'shopping_bag');
    openCart();
  };

  return (
    <article className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-space-md bg-surface-container-low">
          <img
            src={product.image}
            alt={`${product.name} Gelato`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = product.fallbackImage || '/images/pistachio.png';
            }}
          />
          {product.badge && (
            <span className="absolute top-3 left-3">
              <Badge variant={product.badgeColor || 'primary'}>
                {product.badge}
              </Badge>
            </span>
          )}
          {product.origin && (
            <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-full select-none shadow-sm">
              {product.origin}
            </span>
          )}
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          {product.name}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {product.description}
        </p>
      </div>

      <div className="mt-space-md pt-space-sm bg-surface-container-low/40 p-3 rounded-xl flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm text-on-surface-variant block">
            Porsiyon
          </span>
          <span className="font-headline-sm text-[22px] text-on-surface font-bold">
            {product.price} ₺
          </span>
        </div>
        <button
          type="button"
          onClick={handleQuickAdd}
          className="px-space-md py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary/95 transition-all flex items-center gap-1.5 active:scale-[0.98]"
          aria-label={`${product.name} ürününü sepete ekle`}
        >
          <Icon name="keyboard_double_arrow_left" size={18} />
          <span>Sepete Ekle</span>
        </button>
      </div>
    </article>
  );
}
