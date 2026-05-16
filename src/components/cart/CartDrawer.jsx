import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import { COLORS } from '../../data/products';
import { formatINR } from '../../utils/currency';

const FREE_SHIP_THRESHOLD = 3999;

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : 199;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDrawer}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand" />
            <span className="font-serif text-lg font-semibold text-gray-900">Your Bag</span>
            {items.length > 0 && (
              <span className="bg-brand text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={closeDrawer} className="p-2 rounded-full hover:bg-stone transition-colors">
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center">
                <ShoppingBag size={24} className="text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Your bag is empty</p>
                <p className="text-sm text-gray-400">Add something beautiful to get started</p>
              </div>
              <button onClick={closeDrawer} className="btn-primary mt-2">Browse Collection</button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.key}
                  item={item}
                  onRemove={() => removeItem(item.key)}
                  onUpdateQty={(q) => updateQuantity(item.key, q)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone space-y-4 bg-sand/50">
            {subtotal < FREE_SHIP_THRESHOLD && (
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1.5">
                  Add <strong className="text-brand">{formatINR(FREE_SHIP_THRESHOLD - subtotal)}</strong> more for free delivery
                </p>
                <div className="h-1.5 bg-stone rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / FREE_SHIP_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (incl. GST)</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-brand font-medium">Free</span> : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-stone">
                <span>Total</span>
                <span>{formatINR(subtotal + shipping)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4"
            >
              Checkout <ArrowRight size={16} />
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function CartItem({ item, onRemove, onUpdateQty }) {
  const { product, quantity, color, size } = item;
  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 shadow-soft">
      <Link to={`/product/${product.id}`} className="shrink-0">
        <img src={product.images[0]} alt={product.name} className="w-20 h-24 object-cover rounded-xl bg-stone" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium text-sm text-gray-900 leading-tight">{product.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: COLORS[color] }} />
              <span className="text-xs text-gray-400">{color} · {size}</span>
            </div>
          </div>
          <button onClick={onRemove} className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all">
            <Trash2 size={14} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 bg-stone rounded-lg">
            <button onClick={() => onUpdateQty(quantity - 1)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"><Minus size={12} /></button>
            <span className="w-6 text-center text-xs font-semibold">{quantity}</span>
            <button onClick={() => onUpdateQty(quantity + 1)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"><Plus size={12} /></button>
          </div>
          <span className="text-sm font-semibold text-gray-900">{formatINR(product.price * quantity)}</span>
        </div>
      </div>
    </div>
  );
}
