import { useState, useMemo } from 'react';
import { CategoryFilters } from './CategoryFilters';
import { ProductCard } from './ProductCard';
import dbData from '../../../db.json';

export function CatalogSection({ products = [], categories = [], onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const allCategories = categories.length > 0 ? categories : dbData.categories;
  const allProducts = products.length > 0 ? products : dbData.products;

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter((p) => {
      if (Array.isArray(p.categories)) {
        return p.categories.includes(activeCategory);
      }
      return p.category === activeCategory;
    });
  }, [allProducts, activeCategory]);

  return (
    <section
      className="px-margin-mobile lg:px-margin py-space-xl bg-surface-container-low/50"
      id="urunler"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-space-xs">
          <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest font-bold">
            Katalog
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Taze Dondurma Çeşitlerimiz
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Tercih ettiğiniz sunum şeklini (çıtır külah veya çevre dostu bardak) belirleyin, anında sepetinize ekleyin.
          </p>

          {/* Category Pill Selectors */}
          <CategoryFilters
            categories={allCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg"
          id="products-grid"
          role="region"
          aria-label="Dondurma Listesi"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
