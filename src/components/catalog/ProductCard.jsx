import { useState } from 'react';
import { useCart } from '../../context/useCart';
import { useToast } from '../../context/useToast';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { Stepper } from '../common/Stepper';
import { ServingToggle } from './ServingToggle';

export function ProductCard({ product, onSelect }) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();
  const [serving, setServing] = useState('Külah');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, serving, quantity);
    const servingText = serving === 'Külah' ? 'Külah' : 'Bardak';
    showToast(`${quantity}x ${product.shortName || product.name} (${servingText}) sepete eklendi!`, 'shopping_bag');
    openCart();
    setQuantity(1);
  };

  return (
    <article
      className="product-item bg-surface-container-lowest rounded-2xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
      data-testid={`product-card-${product.id}`}
    >
      <div>
        <div
          className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-space-sm bg-surface-container-low group ${
            onSelect ? 'cursor-pointer' : ''
          }`}
          onClick={() => onSelect?.(product.id)}
          role={onSelect ? 'button' : undefined}
          tabIndex={onSelect ? 0 : undefined}
          onKeyDown={(e) => {
            if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onSelect(product.id);
            }
          }}
          aria-label={onSelect ? `${product.name} detaylarını görüntüle` : undefined}
        >
          <img
            src={product.image}
            alt={product.name}
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
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="font-headline-sm text-[20px] text-on-surface">
            {product.shortName || product.name}
          </h3>
          <span className="font-headline-sm text-[20px] text-secondary font-bold">
            {product.price} ₺
          </span>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          {product.shortDescription || product.description}
        </p>
      </div>

      <div className="mt-space-md flex flex-col gap-space-xs">
        {/* Serving Toggle */}
        <ServingToggle value={serving} onChange={setServing} />

        {/* Card Bottom: Stepper + Add CTA */}
        <div className="flex items-center gap-2 mt-1">
          <Stepper
            value={quantity}
            onChange={setQuantity}
            ariaLabel={`${product.name} adet seçimi`}
          />
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary/95 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
            aria-label={`${quantity} adet ${product.name} sepete ekle`}
          >
            <Icon name="shopping_bag" size={18} />
            <span>Sepete Ekle</span>
          </button>
        </div>
      </div>
    </article>
  );
}
