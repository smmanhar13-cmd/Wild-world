import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, ArrowRight, Download } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    if (!state?.orderNumber) navigate('/');
  }, [state, navigate]);

  if (!state?.orderNumber) return null;

  const { orderNumber, email, items, subtotal, shipping, gst, total, address, payMethod } = state;

  const steps = [
    { icon: CheckCircle, label: 'Order Confirmed',       status: 'done',    time: 'Just now' },
    { icon: Package,     label: 'Processing & Packing',  status: 'pending', time: 'Within 24 hours' },
    { icon: Truck,       label: 'Dispatched',             status: 'pending', time: '2–3 business days' },
    { icon: MapPin,      label: 'Out for Delivery',       status: 'pending', time: '5–7 business days' },
  ];

  const payLabel = { card: 'Card Payment', upi: 'UPI', cod: 'Cash on Delivery' }[payMethod] || 'Online Payment';

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="relative inline-flex mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 mb-1">Thank you for choosing Wild World. Your pack is on its way.</p>
          <p className="text-sm text-gray-400">
            Confirmation sent to <strong className="text-gray-700">{email}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Order number */}
          <div className="bg-brand text-white rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Order Number</p>
            <p className="font-mono text-2xl font-bold tracking-wider mb-3">{orderNumber}</p>
            <p className="text-sm text-white/60">Keep this for tracking your delivery across India.</p>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-brand" />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Delivering To</p>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed mb-3">{address}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-gray-500">Estimated: 5–7 business days</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-400">Payment:</span>
              <span className="text-xs font-medium text-gray-700">{payLabel}</span>
              {payMethod === 'cod' && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Pay on delivery</span>}
            </div>
          </div>
        </div>

        {/* Tracking timeline */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h2 className="font-serif text-xl font-semibold mb-6">Order Journey</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-stone" />
            <div className="space-y-6">
              {steps.map(({ icon: Icon, label, status, time }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === 'done' ? 'bg-green-500 text-white shadow-md shadow-green-200' : 'bg-stone text-gray-400'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="pt-1.5">
                    <p className={`text-sm font-semibold ${status === 'done' ? 'text-gray-900' : 'text-gray-400'}`}>{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold mb-5">What You Ordered</h2>
          <div className="space-y-4 mb-6">
            {items?.map((item) => (
              <div key={item.key} className="flex gap-4 p-3 bg-sand rounded-xl">
                <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.color} · {item.size} · Qty {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{formatINR(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-stone pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal (incl. GST)</span><span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-brand font-medium">Free</span> : formatINR(shipping)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 pb-2 border-b border-stone">
              <span>GST (18%) included</span><span>{formatINR(gst)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-900">
              <span>Total Paid</span><span>{formatINR(total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/catalog" className="btn-primary flex items-center justify-center gap-2 py-4 px-8 text-base">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <button onClick={() => window.print()}
            className="btn-secondary flex items-center justify-center gap-2 py-4 px-8 text-base">
            <Download size={16} /> Download Invoice
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Need help? Email us at <a href="mailto:support@wildworld.in" className="text-brand hover:underline">support@wildworld.in</a> or call <strong>1800-WILD-IN</strong>
        </p>
      </div>
    </div>
  );
}
