import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, ShoppingBag, Heart, Check,
  Shield, Truck, RotateCcw, Minus, Plus, Package
} from 'lucide-react';
import { products, COLORS } from '../data/products';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/product/ProductCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatINR } from '../utils/currency';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCartStore();

  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(product?.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-2xl mb-3">Product not found</h2>
        <p className="text-gray-500 mb-6">This rucksack doesn't exist in our catalogue.</p>
        <Button onClick={() => navigate('/catalog')}>Browse Collection</Button>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, qty, color, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  // GST breakdown
  const gstIncluded = Math.round(product.price * 0.18 / (1 + 0.18));
  const basePrice   = product.price - gstIncluded;

  return (
    <div className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-brand transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ─── Gallery ─── */}
          <div className="flex gap-4">
            <div className="hidden sm:flex flex-col gap-3 w-20 shrink-0">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    imgIdx === i ? 'border-brand shadow-sm' : 'border-transparent opacity-60 hover:opacity-90'
                  }`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone">
                <img
                  src={product.images[imgIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {/* Capacity badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.badge && <Badge label={product.badge} />}
                  <span className="bg-white/90 backdrop-blur-sm text-brand text-xs font-bold px-3 py-1 rounded-full">
                    {product.capacity}
                  </span>
                </div>
                <button onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-soft hover:shadow-md transition-all">
                  <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
                </button>
              </div>

              {/* Mobile thumbs */}
              <div className="flex sm:hidden gap-2 mt-3">
                {product.images.map((src, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-16 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      imgIdx === i ? 'border-brand' : 'border-transparent opacity-60'
                    }`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Info ─── */}
          <div className="lg:pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14}
                    className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'fill-stone text-stone'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} · {product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-serif text-3xl font-semibold text-gray-900">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatINR(product.originalPrice)}</span>
                  <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    Save {formatINR(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-8 pb-8 border-b border-stone">
              Incl. 18% GST · Base price {formatINR(basePrice)} + GST {formatINR(gstIncluded)}
            </p>

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Colour</span>
                <span className="text-sm text-gray-700 font-medium">{color}</span>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} title={c}
                    className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${
                      color === c ? 'border-brand scale-110 shadow-md' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: COLORS[c] }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-3">Capacity</span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      size === s ? 'bg-brand text-white border-brand' : 'bg-white text-gray-700 border-stone hover:border-brand'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center gap-2 bg-stone rounded-xl px-1 py-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-white rounded-lg transition-colors"><Minus size={14} /></button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Plus size={14} /></button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                  added ? 'bg-green-500 text-white shadow-md' : 'bg-brand text-white hover:bg-brand-light hover:shadow-lg'
                }`}
              >
                {added ? (
                  <><Check size={16} /> Added to Bag</>
                ) : (
                  <><ShoppingBag size={16} /> Add to Bag — {formatINR(product.price * qty)}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-sand rounded-2xl">
              {[
                { Icon: Truck,      label: 'Free Delivery',  sub: 'Above ₹2,000' },
                { Icon: RotateCcw,  label: 'Free Returns',   sub: '30-day window' },
                { Icon: Shield,     label: '5-Yr Warranty',  sub: 'All India coverage' },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={16} className="mx-auto mb-1 text-brand" />
                  <p className="text-[10px] font-semibold text-gray-800">{label}</p>
                  <p className="text-[9px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>

            {/* COD badge */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 bg-amber-50 border border-amber-100 px-4 py-2.5 rounded-xl">
              <Package size={14} className="text-amber-600 shrink-0" />
              <span>Cash on Delivery (COD) available across India</span>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-stone mb-6 gap-6">
                {['description', 'features', 'specs'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                      activeTab === tab ? 'border-brand text-brand' : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'features' && (
                <ul className="space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check size={14} className="text-brand shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'specs' && (
                <dl className="space-y-3">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm border-b border-stone pb-3">
                      <dt className="text-gray-400 font-medium">{k}</dt>
                      <dd className="text-gray-800 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <h2 className="section-title">You Might Also Like</h2>
            <Link to="/catalog" className="text-sm font-medium text-brand hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(related.length > 0 ? related : fallback).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
