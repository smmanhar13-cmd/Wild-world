import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { COLORS } from '../data/products';
import { formatINR } from '../utils/currency';

const FREE_SHIP = 3999;
const SHIP_FEE  = 199;
const GST_RATE  = 0.18; // 18% GST included in displayed price

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping  = subtotal >= FREE_SHIP && subtotal > 0 ? 0 : subtotal === 0 ? 0 : SHIP_FEE;
  const total     = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-stone rounded-full flex items-center justify-center mb-5">
          <ShoppingBag size={28} className="text-gray-400" />
        </div>
        <h2 className="font-serif text-2xl font-semibold mb-2">Your bag is empty</h2>
        <p className="text-gray-500 mb-8 max-w-xs">Looks like you haven't added any rucksacks yet.</p>
        <Link to="/catalog" className="btn-primary inline-flex">Browse Collection <ArrowRight size={15} /></Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold">Your Bag</h1>
            <p className="text-gray-400 text-sm mt-1">{items.reduce((s, i) => s + i.quantity, 0)} items · All prices incl. 18% GST</p>
          </div>
          <Link to="/catalog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand transition-colors">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {subtotal < FREE_SHIP && (
              <div className="bg-brand/5 border border-brand/20 rounded-2xl p-4">
                <p className="text-sm text-brand font-medium mb-2">
                  You're <strong>{formatINR(FREE_SHIP - subtotal)}</strong> away from free shipping!
                </p>
                <div className="h-1.5 bg-stone rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / FREE_SHIP) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            {items.map((item) => (
              <div key={item.key} className="flex gap-4 bg-white rounded-2xl p-4 shadow-card">
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name}
                    className="w-24 h-28 md:w-28 md:h-32 object-cover rounded-xl bg-stone" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{item.product.category}</p>
                      <Link to={`/product/${item.product.id}`}
                        className="font-serif text-lg font-semibold text-gray-900 hover:text-brand transition-colors">
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-3.5 h-3.5 rounded-full border border-gray-200"
                          style={{ backgroundColor: COLORS[item.color] }} />
                        <span className="text-xs text-gray-500">{item.color} · {item.size}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.key)}
                      className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 bg-stone rounded-xl">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors"><Minus size={13} /></button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors"><Plus size={13} /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{formatINR(item.product.price)} each</p>
                      <p className="text-base font-semibold text-gray-900">{formatINR(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5">
              <Trash2 size={12} /> Clear bag
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-28">
              <h3 className="font-serif text-xl font-semibold mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal (incl. GST)</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-brand font-medium">Free</span> : formatINR(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 text-xs border-t border-stone pt-2">
                  <span>GST (18%) included in price</span>
                  <span>{formatINR(Math.round(subtotal * GST_RATE / (1 + GST_RATE)))}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-stone">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              {/* Promo */}
              <div className="flex gap-2 mb-6">
                <input type="text" placeholder="Promo / Coupon code"
                  className="flex-1 px-3 py-2.5 border border-stone rounded-xl text-sm focus:outline-none focus:border-brand transition-all" />
                <button className="px-4 py-2.5 border border-brand text-brand rounded-xl text-sm font-medium hover:bg-brand hover:text-white transition-all">
                  Apply
                </button>
              </div>

              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <p className="text-center text-xs text-gray-400 mt-4">
                🔒 Secure payment · COD available · Easy returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
