export function CategoryFilters({ categories, activeCategory, onSelectCategory }) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 mt-4 p-1.5 bg-surface-container-lowest rounded-full shadow-sm"
      role="tablist"
      aria-label="Dondurma Kategorileri"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all select-none ${
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        );
      })}
    </div>
  );
}
