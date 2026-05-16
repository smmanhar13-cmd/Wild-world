import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Search, X } from 'lucide-react';
import { products, sortOptions } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const initialQuery    = searchParams.get('q')        || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch]           = useState(initialQuery);
  const [sortBy, setSortBy]           = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen]       = useState(false);
  const [filters, setFilters]         = useState({
    category: initialCategory,
    priceMin: 0,
    priceMax: Infinity,
  });

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.capacity.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'All') list = list.filter((p) => p.category === filters.category);
    list = list.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'newest':     list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0)); break;
      default: break;
    }
    return list;
  }, [search, filters, sortBy]);

  const activeSortLabel = sortOptions.find((s) => s.value === sortBy)?.label;

  return (
    <div className="pt-20 min-h-screen">
      {/* Page Header */}
      <div className="bg-brand text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Wild World · India</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-3">The Collection</h1>
          <p className="text-white/60 text-base max-w-lg">
            Eight premium trekking rucksacks — 30L to 80L — built for every Indian trail.
          </p>
          {/* Capacity quick links */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['30L', '40L', '45L', '50L', '55L', '60L', '70L', '80L'].map((cap) => (
              <button
                key={cap}
                onClick={() => setSearch(cap)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-full transition-all border border-white/20 hover:border-white/40"
              >
                {cap}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, capacity (e.g. 45L), material..."
              className="w-full pl-10 pr-10 py-3 border border-stone bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-stone rounded-xl text-sm text-gray-700 hover:border-brand transition-all min-w-[180px] justify-between"
            >
              <span>{activeSortLabel}</span>
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-stone rounded-xl shadow-card-hover z-20 min-w-[180px] overflow-hidden">
                {sortOptions.map((opt) => (
                  <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === opt.value ? 'bg-brand text-white' : 'text-gray-700 hover:bg-sand'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-stone rounded-xl text-sm text-gray-700 hover:border-brand transition-all"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resultCount={filtered.length}
            mobileOpen={mobileFilterOpen}
            setMobileOpen={setMobileFilterOpen}
          />

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="font-serif text-xl text-gray-900 mb-2">No results found</h3>
                <p className="text-sm text-gray-500 mb-6">Try a different capacity or clear filters.</p>
                <button
                  onClick={() => { setSearch(''); setFilters({ category: 'All', priceMin: 0, priceMax: Infinity }); }}
                  className="btn-secondary"
                >
                  Clear all
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-400 mb-6">{filtered.length} products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7">
                  {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
