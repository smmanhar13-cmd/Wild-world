import { X, SlidersHorizontal } from 'lucide-react';
import { categories } from '../../data/products';

export default function ProductFilters({
  filters,
  setFilters,
  resultCount,
  mobileOpen,
  setMobileOpen,
}) {
  const priceRanges = [
    { label: 'All Prices',       min: 0,    max: Infinity },
    { label: 'Under ₹3,000',     min: 0,    max: 3000     },
    { label: '₹3,000 – ₹4,000',  min: 3000, max: 4000     },
    { label: '₹4,000 – ₹5,000',  min: 4000, max: 5000     },
  ];

  const capacities = ['30L', '40L', '45L', '50L', '55L', '60L', '70L', '80L'];

  const activePriceLabel = priceRanges.find(
    (r) => r.min === filters.priceMin && r.max === filters.priceMax
  )?.label || 'All Prices';

  const setPrice = (range) =>
    setFilters((f) => ({ ...f, priceMin: range.min, priceMax: range.max }));

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Category</h4>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((f) => ({ ...f, category: cat }))}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                filters.category === cat
                  ? 'bg-brand text-white font-medium'
                  : 'text-gray-600 hover:bg-stone hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Capacity quick filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Capacity</h4>
        <div className="flex flex-wrap gap-2">
          {capacities.map((cap) => (
            <button
              key={cap}
              onClick={() => setFilters((f) => ({ ...f, capacity: cap === f.capacity ? null : cap }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filters.capacity === cap
                  ? 'bg-brand text-white border-brand'
                  : 'border-stone text-gray-600 hover:border-brand hover:text-brand'
              }`}
            >
              {cap}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Price (INR)</h4>
        <div className="flex flex-col gap-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setPrice(range)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                activePriceLabel === range.label
                  ? 'bg-brand text-white font-medium'
                  : 'text-gray-600 hover:bg-stone hover:text-gray-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {(filters.category !== 'All' || filters.priceMin !== 0 || filters.priceMax !== Infinity || filters.capacity) && (
        <button
          onClick={() => setFilters({ category: 'All', priceMin: 0, priceMax: Infinity, capacity: null })}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={12} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-gray-400">{resultCount} results</span>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-stone">
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <SlidersHorizontal size={16} /> Filters
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-stone">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
