import { useState, useEffect } from 'react';
import { useCart } from '../context/useCart';
import { useToast } from '../context/useToast';
import { api } from '../api/client';
import { Icon } from '../components/common/Icon';
import { Badge } from '../components/common/Badge';
import { Stepper } from '../components/common/Stepper';
import { ServingToggle } from '../components/catalog/ServingToggle';
import dbData from '../../db.json';

export function DetailPage({ product: initialProduct, productId, onBack }) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct && !!productId);
  const [error, setError] = useState(null);

  const [serving, setServing] = useState('Külah');
  const [quantity, setQuantity] = useState(1);

  const activeProduct = initialProduct || product;

  useEffect(() => {
    if (initialProduct || !productId) return;

    let isMounted = true;

    async function fetchDetail() {
      try {
        const data = await api.getProductById(productId);
        if (!isMounted) return;

        if (data) {
          setProduct(data);
        } else {
          // Fallback to dbData
          const found = dbData.products.find((p) => String(p.id) === String(productId));
          if (found) {
            setProduct(found);
          } else {
            setError('Ürün bulunamadı');
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Ürün yüklenirken bir hata oluştu');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [productId, initialProduct]);

  const handleAddToCart = () => {
    if (!activeProduct) return;
    addItem(activeProduct, serving, quantity);
    const servingText = serving.includes('Külah') ? 'Külah' : 'Bardak';
    showToast(
      `${quantity}x ${activeProduct.shortName || activeProduct.name} (${servingText}) sepete eklendi!`,
      'shopping_bag'
    );
    openCart();
  };

  const calculatedTotal = activeProduct ? activeProduct.price * quantity : 0;

  if (loading) {
    return (
      <div
        className="min-h-[500px] flex flex-col items-center justify-center p-8 text-on-surface"
        role="status"
        aria-live="polite"
        data-testid="detail-loader"
      >
        <Icon name="progress_activity" size={40} className="animate-spin text-primary mb-3" />
        <span className="font-label-lg text-label-lg text-on-surface-variant">
          Ürün detayları yükleniyor...
        </span>
      </div>
    );
  }

  if (error || !activeProduct) {
    return (
      <div
        className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center"
        role="alert"
        data-testid="detail-error"
      >
        <div className="w-16 h-16 rounded-full bg-error/15 text-error flex items-center justify-center mb-4">
          <Icon name="error" size={32} />
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          {error || 'Ürün bulunamadı'}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">
          Aradığınız lezzete ulaşılamadı veya ürün mevcut değil.
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-primary text-on-primary font-label-md rounded-full shadow-sm hover:bg-primary/95 transition-all flex items-center gap-2"
          >
            <Icon name="arrow_back" size={18} />
            <span>Kataloğa Dön</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <article
      className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin py-space-xl"
      aria-labelledby="product-title"
      data-testid={`product-detail-${activeProduct.id}`}
    >
      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-md transition-colors"
          aria-label="Kataloğa Geri Dön"
        >
          <Icon name="arrow_back" size={20} />
          <span>Kataloğa Dön</span>
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-surface-container-low shadow-md">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = activeProduct.fallbackImage || '/images/pistachio.png';
              }}
            />
            {activeProduct.badge && (
              <span className="absolute top-4 left-4">
                <Badge variant={activeProduct.badgeColor || 'primary'}>{activeProduct.badge}</Badge>
              </span>
            )}
            {activeProduct.origin && (
              <span className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-full select-none shadow-sm">
                {activeProduct.origin}
              </span>
            )}
          </div>
        </div>

        {/* Right: Dynamic Product Information & Controls */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          {/* Title & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary font-label-sm uppercase tracking-widest font-bold">
                {activeProduct.origin || 'Artisan Gelato'}
              </span>
              {activeProduct.rating && (
                <div
                  className="flex items-center gap-1 text-tertiary ml-auto"
                  aria-label={`${activeProduct.rating} yıldız`}
                >
                  <Icon name="star" size={18} filled={true} />
                  <span className="font-label-sm font-bold text-on-surface">
                    {activeProduct.rating.toFixed(1)}
                  </span>
                  {activeProduct.reviewsCount && (
                    <span className="font-body-sm text-on-surface-variant">
                      ({activeProduct.reviewsCount})
                    </span>
                  )}
                </div>
              )}
            </div>

            <h1
              id="product-title"
              className="font-headline-lg text-headline-lg text-on-surface leading-tight"
            >
              {activeProduct.name}
            </h1>
          </div>

          {/* Pricing Strip */}
          <div className="flex items-baseline gap-3 p-4 bg-surface-container-low/60 rounded-2xl">
            <span className="font-label-sm text-on-surface-variant">Porsiyon:</span>
            <span
              data-testid="unit-price"
              className="font-headline-md text-secondary font-bold"
            >
              {activeProduct.price} ₺
            </span>
          </div>

          {/* Description */}
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {activeProduct.description || activeProduct.shortDescription}
          </p>

          {/* Dynamic Controls: Serving & Stepper & Cart CTA */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container flex flex-col gap-space-md mt-2">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-bold block mb-2">
                Sunum Şekli
              </label>
              <ServingToggle value={serving} onChange={setServing} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs border-t border-surface-container">
              <div>
                <span className="font-label-sm text-on-surface-variant block mb-1">
                  Adet Seçimi
                </span>
                <Stepper
                  value={quantity}
                  onChange={setQuantity}
                  ariaLabel={`${activeProduct.name} adet seçimi`}
                />
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="font-label-sm text-on-surface-variant">Toplam Tutar:</span>
                <span
                  data-testid="calculated-total"
                  className="font-headline-sm text-headline-sm text-secondary font-bold"
                >
                  {calculatedTotal} ₺
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary text-on-primary font-label-lg text-label-lg rounded-full shadow-md hover:bg-primary/95 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              aria-label={`${quantity} adet ${activeProduct.name} sepete ekle`}
            >
              <Icon name="shopping_bag" size={20} />
              <span>Sepete Ekle ({calculatedTotal} ₺)</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
