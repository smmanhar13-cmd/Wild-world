import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ChevronDown, MapPin } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { formatINR } from '../utils/currency';

// Hero images — local assets
const HERO_IMAGES = [
  '/images/pexels-dreamlensproduction-2450296.jpg', // orange pack, Himalayan peaks
  '/images/pexels-thirdman-5048529.jpg',            // teal pack, misty golden forest
  '/images/pexels-tomas-malik-793526-2581920.jpg',  // black pack, dramatic foggy cliff
];

// Flagship four capacities
const CAPACITY_PICKS = [
  { label: '45L', sub: 'Weekend Trek',       id: 1 },
  { label: '55L', sub: 'Multi-day Himalaya', id: 2 },
  { label: '60L', sub: 'High Altitude',      id: 3 },
  { label: '80L', sub: 'Full Expedition',    id: 4 },
];

const VALUES = [
  { title: 'Made for Indian Trails',   body: 'Every pack is tested across Himalayan routes — from the green valleys of Uttarakhand to the cold deserts of Ladakh.',  icon: '⛰' },
  { title: 'Monsoon-Proof Build',      body: 'Rain-resistant coatings, sealed zippers, and included rain covers ensure your gear stays dry in any season.',             icon: '🌧' },
  { title: '5-Year Warranty',          body: 'We stand behind our craft. Every Wild World pack comes with a 5-year warranty and lifetime repair service.',              icon: '🛡' },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featured = products.filter((p) =>
    ['Best Seller', 'Premium', 'New'].includes(p.badge)
  ).slice(0, 3);

  // Flagship four packs (45L, 55L, 60L, 80L)
  const flagships = products.filter((p) => [1, 2, 3, 4].includes(p.id));

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div>

      {/* ─── Hero ─── */}
      <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ transform: i === heroIdx ? 'scale(1.04)' : 'scale(1)', transition: 'transform 7s ease-out' }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={13} className="text-accent" />
              <p className="text-accent font-semibold text-xs uppercase tracking-[0.3em]">
                Designed for India · 2025 Collection
              </p>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-semibold leading-[1.05] tracking-tight mb-6">
              Carry the
              <br />
              <em className="not-italic text-accent">Himalaya</em>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              Premium trekking rucksacks — from the Valley of Flowers to Everest Base Camp.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by capacity, trail, feature..."
                className="flex-1 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-5 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/25 focus:border-white/60 transition-all"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white rounded-full px-6 py-3 text-sm font-medium transition-all hover:shadow-lg flex items-center gap-2"
              >
                Search <ArrowRight size={15} />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 bg-white text-brand rounded-full px-7 py-3.5 text-sm font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Shop Collection <ArrowRight size={15} />
              </Link>
              <p className="text-white/50 text-xs">Starting at {formatINR(2499)} · Free shipping above {formatINR(3999)}</p>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              className={`h-0.5 transition-all duration-300 rounded-full ${i === heroIdx ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-8 right-8 text-white/40 flex flex-col items-center gap-1">
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ─── Ticker ─── */}
      <div className="bg-brand py-3 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {Array(3).fill([
            'Free shipping above ₹3,999',
            'Rain cover included on all packs',
            '5-year warranty on every bag',
            'Tested on Himalayan trails',
            'Free returns within 30 days',
            'COD available across India',
          ]).flat().map((text, i) => (
            <span key={i} className="text-xs font-medium uppercase tracking-widest text-white/70 shrink-0">
              {text} <span className="mx-4 text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Capacity Selector ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Shop by Capacity</p>
            <h2 className="section-title">Find Your Perfect Volume</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
              From alpine day hikes to 14-day Himalayan expeditions — every adventure has a perfect capacity.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CAPACITY_PICKS.map(({ label, sub, id }) => {
              const p = products.find((x) => x.id === id);
              return (
                <Link
                  key={label}
                  to={`/product/${id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-stone"
                >
                  <img
                    src={p.images[0]}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="font-serif text-3xl font-bold mb-0.5">{label}</p>
                    <p className="text-white/70 text-xs">{sub}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop now <ArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Most Loved</p>
              <h2 className="section-title">Trail-Tested Favourites</h2>
            </div>
            <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all group">
              View all {products.length} packs <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── Editorial Banner ─── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-[480px] md:h-[580px]">
            <img
              src="/images/pexels-kamaji-ogino-5065321.jpg"
              alt="Himalayan trekking"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 max-w-sm text-right text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Expedition Series</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                From Kedarkantha<br />to Everest Base
              </h2>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Packs designed on Indian trails, for Indian trekkers.
              </p>
              <Link
                to="/catalog?category=Expedition"
                className="inline-flex items-center gap-2 bg-white text-brand rounded-full px-6 py-3 text-sm font-semibold hover:shadow-xl transition-all"
              >
                Shop Expedition <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Full Collection ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Complete Range</p>
              <h2 className="section-title">The Collection</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-20 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold">Why Wild World</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ title, body, icon }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
                  {icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Reviews</p>
            <h2 className="section-title">From the Trail</h2>
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-accent text-accent" />)}
              <span className="text-sm text-gray-500 ml-2">4.9 · 1,400+ verified reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Arjun M.', location: 'Bangalore', text: 'Took the Kedarkantha 45L on the actual Kedarkantha trek. Phenomenal build — 14 kg felt like 8. The hip belt is a game changer.', product: 'Kedarkantha 45L', rating: 5 },
              { name: 'Priya S.', location: 'Mumbai', text: 'The Roopkund 55L is absolutely worth every rupee. The rain cover saved my sleeping bag twice on the trek. Build quality rivals Osprey.', product: 'Roopkund 55L', rating: 5 },
              { name: 'Vikram T.', location: 'Delhi', text: 'Did Stok Kangri with the Gangotri 60L. At 6,000m+ carrying 18 kg, not once did my back hurt. That\'s the proof.', product: 'Gangotri 60L', rating: 5 },
            ].map(({ name, location, text, product, rating }) => (
              <div key={name} className="card p-6">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(rating)].map((_, i) => <Star key={i} size={13} className="fill-accent text-accent" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                  <span className="tag text-[10px]">{product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
