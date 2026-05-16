import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import Badge from '../ui/Badge';
import { COLORS } from '../../data/products';
import useCartStore from '../../store/cartStore';
import { formatINR } from '../../utils/currency';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.colors[0], product.sizes[0]);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => { setHovered(true); if (product.images.length > 1) setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
    >
      <div className="card relative overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge label={product.badge} />
            </div>
          )}

          {/* Capacity pill */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-brand text-[10px] font-bold px-2 py-1 rounded-full">
              {product.capacity}
            </span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(!wishlisted); }}
            className="absolute bottom-14 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <Heart size={13} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
          </button>

          <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-white/95 backdrop-blur-sm text-brand text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand hover:text-white transition-all duration-200"
            >
              <ShoppingBag size={13} /> Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">{product.category}</p>
              <h3 className="font-serif text-base font-semibold text-gray-900 leading-tight truncate">{product.name}</h3>
            </div>
            <div className="text-right shrink-0">
              {product.originalPrice && (
                <p className="text-xs text-gray-400 line-through">{formatINR(product.originalPrice)}</p>
              )}
              <p className="text-base font-semibold text-gray-900">{formatINR(product.price)}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10}
                  className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'fill-stone text-stone'}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
            <span className="text-[10px] text-gray-300 ml-auto">incl. GST</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
