import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, MapPin, Package, Phone } from 'lucide-react';
import useCartStore from '../store/cartStore';
import Input from '../components/ui/Input';
import { INDIA_STATES } from '../data/products';
import { formatINR } from '../utils/currency';

const STEPS = ['Shipping', 'Payment', 'Review'];
const SHIP_FEE = 199;
const FREE_SHIP = 3999;
const GST_RATE  = 0.18;

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              i < current ? 'bg-brand text-white' : i === current ? 'bg-brand text-white shadow-md shadow-brand/30' : 'bg-stone text-gray-400'
            }`}>
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-[10px] mt-1.5 font-medium ${i <= current ? 'text-brand' : 'text-gray-400'}`}>{step}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-16 md:w-24 h-px mx-2 mb-4 transition-all ${i < current ? 'bg-brand' : 'bg-stone'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function validate(data, step) {
  const errors = {};
  if (step === 0) {
    if (!data.firstName?.trim()) errors.firstName = 'Required';
    if (!data.lastName?.trim())  errors.lastName  = 'Required';
    if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Enter a valid email';
    if (!data.phone?.match(/^[6-9]\d{9}$/)) errors.phone = 'Enter valid 10-digit mobile number';
    if (!data.address?.trim()) errors.address  = 'Required';
    if (!data.city?.trim())    errors.city     = 'Required';
    if (!data.pincode?.match(/^\d{6}$/)) errors.pincode = '6-digit PIN code required';
    if (!data.state?.trim())   errors.state    = 'Required';
  }
  if (step === 1) {
    if (!data.cardName?.trim()) errors.cardName = 'Required';
    if (!data.cardNumber?.replace(/\s/g, '').match(/^\d{16}$/)) errors.cardNumber = 'Enter valid 16-digit card number';
    if (!data.expiry?.match(/^\d{2}\/\d{2}$/)) errors.expiry = 'Format: MM/YY';
    if (!data.cvv?.match(/^\d{3,4}$/))         errors.cvv    = '3 or 4 digits';
  }
  return errors;
}

const fmtCard   = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const fmtExpiry = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length >= 3 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [payMethod, setPayMethod] = useState('card'); // card | upi | cod
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', apt: '', city: '', state: '', pincode: '',
    cardName: '', cardNumber: '', expiry: '', cvv: '', upiId: '',
    saveCard: false,
  });

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping  = subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const gst       = Math.round(subtotal * GST_RATE / (1 + GST_RATE)); // GST already in price
  const total     = subtotal + shipping;

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = {...e}; delete n[field]; return n; });
  };

  const next = () => {
    // Skip card validation for COD/UPI if on payment step
    const errs = validate(form, step);
    if (step === 1 && payMethod !== 'card') {
      if (payMethod === 'upi' && !form.upiId?.match(/^[\w.-]+@[\w]+$/)) {
        setErrors({ upiId: 'Enter a valid UPI ID (e.g. name@upi)' });
        return;
      }
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    const orderNum = `WW-IN-${Date.now().toString().slice(-8)}`;
    clearCart();
    navigate('/order-success', {
      state: { orderNumber: orderNum, email: form.email, items, subtotal, shipping, gst, total,
        address: `${form.address}${form.apt ? ', ' + form.apt : ''}, ${form.city}, ${form.state} – ${form.pincode}`,
        payMethod,
      },
    });
  };

  if (items.length === 0 && step === 0) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-2xl mb-3">Nothing to checkout</h2>
        <Link to="/catalog" className="btn-primary inline-flex mt-4">Browse Collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand transition-colors mb-5">
            <ArrowLeft size={14} /> Back to bag
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-gray-900">Checkout</h1>
        </div>

        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">

            {/* ─── Step 0: Shipping ─── */}
            {step === 0 && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin size={18} className="text-brand" />
                  <h2 className="font-serif text-xl font-semibold">Delivery Address</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} error={errors.firstName} placeholder="Arjun" />
                  <Input label="Last Name"  value={form.lastName}  onChange={(e) => update('lastName', e.target.value)}  error={errors.lastName}  placeholder="Mehta" />
                  <div className="sm:col-span-2">
                    <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} placeholder="arjun@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+91</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        maxLength={10}
                        className={`input-field pl-12 ${errors.phone ? 'border-red-400' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Flat / House No., Building, Street" value={form.address} onChange={(e) => update('address', e.target.value)} error={errors.address} placeholder="101, Himalayan Heights, MG Road" />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Area / Landmark (optional)" value={form.apt} onChange={(e) => update('apt', e.target.value)} placeholder="Near Himalayan Bank" />
                  </div>
                  <Input label="City / Town" value={form.city} onChange={(e) => update('city', e.target.value)} error={errors.city} placeholder="Dehradun" />
                  <div>
                    <label className="label">PIN Code</label>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => update('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="248001"
                      maxLength={6}
                      className={`input-field ${errors.pincode ? 'border-red-400' : ''}`}
                    />
                    {errors.pincode && <p className="mt-1.5 text-xs text-red-500">{errors.pincode}</p>}
                  </div>
                  <div>
                    <label className="label">State</label>
                    <select value={form.state} onChange={(e) => update('state', e.target.value)}
                      className={`input-field ${errors.state ? 'border-red-400' : ''}`}>
                      <option value="">Select State</option>
                      {INDIA_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="mt-1.5 text-xs text-red-500">{errors.state}</p>}
                  </div>
                </div>

                {/* Delivery options */}
                <div className="mt-6 pt-6 border-t border-stone">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Delivery Option</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'std',   label: 'Standard Delivery',        sub: '5–7 business days',       price: subtotal >= FREE_SHIP ? 'Free' : formatINR(SHIP_FEE) },
                      { id: 'exp',   label: 'Express Delivery',          sub: '2–3 business days',       price: formatINR(399) },
                      { id: 'next',  label: 'Next Day Delivery (Metro)', sub: 'Order before 3 PM today', price: formatINR(699) },
                    ].map(({ id, label, sub, price }) => (
                      <label key={id} className="flex items-center justify-between p-4 rounded-xl border border-stone cursor-pointer hover:border-brand transition-all has-[:checked]:border-brand has-[:checked]:bg-brand/5">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="delivery" defaultChecked={id === 'std'} className="accent-brand" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{label}</p>
                            <p className="text-xs text-gray-400">{sub}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={next} className="btn-primary w-full mt-6 py-4 text-base flex items-center justify-center gap-2">
                  Continue to Payment <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* ─── Step 1: Payment ─── */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-brand" />
                    <h2 className="font-serif text-xl font-semibold">Payment</h2>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><Lock size={11} /> 256-bit SSL</span>
                </div>

                {/* Payment Method Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-stone rounded-xl">
                  {[
                    { id: 'card', label: '💳 Card' },
                    { id: 'upi',  label: '⚡ UPI'  },
                    { id: 'cod',  label: '💵 COD'  },
                  ].map(({ id, label }) => (
                    <button key={id} onClick={() => setPayMethod(id)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${payMethod === id ? 'bg-white shadow-soft text-brand' : 'text-gray-500 hover:text-gray-700'}`}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                {payMethod === 'card' && (
                  <div className="space-y-4">
                    <Input label="Name on Card" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} error={errors.cardName} placeholder="Arjun Mehta" />
                    <div>
                      <label className="label">Card Number</label>
                      <div className="relative">
                        <input type="text" value={form.cardNumber} onChange={(e) => update('cardNumber', fmtCard(e.target.value))}
                          placeholder="0000 0000 0000 0000" maxLength={19}
                          className={`input-field pr-12 font-mono tracking-wider ${errors.cardNumber ? 'border-red-400' : ''}`} />
                        <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.cardNumber && <p className="mt-1.5 text-xs text-red-500">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Expiry</label>
                        <input type="text" value={form.expiry} onChange={(e) => update('expiry', fmtExpiry(e.target.value))}
                          placeholder="MM/YY" maxLength={5}
                          className={`input-field font-mono ${errors.expiry ? 'border-red-400' : ''}`} />
                        {errors.expiry && <p className="mt-1.5 text-xs text-red-500">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="label">CVV</label>
                        <input type="password" value={form.cvv} onChange={(e) => update('cvv', e.target.value.replace(/\D/g,'').slice(0,4))}
                          placeholder="•••" maxLength={4}
                          className={`input-field font-mono ${errors.cvv ? 'border-red-400' : ''}`} />
                        {errors.cvv && <p className="mt-1.5 text-xs text-red-500">{errors.cvv}</p>}
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.saveCard} onChange={(e) => update('saveCard', e.target.checked)} className="accent-brand w-4 h-4 rounded" />
                      <span className="text-sm text-gray-600">Save card securely for faster checkout</span>
                    </label>
                    <p className="text-xs text-gray-400">All major cards accepted · Visa · Mastercard · RuPay · Amex</p>
                  </div>
                )}

                {/* UPI */}
                {payMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="bg-sand rounded-xl p-4 flex items-center gap-3">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Pay via UPI</p>
                        <p className="text-xs text-gray-400">GPay · PhonePe · Paytm · BHIM and all UPI apps</p>
                      </div>
                    </div>
                    <div>
                      <label className="label">UPI ID</label>
                      <input type="text" value={form.upiId} onChange={(e) => update('upiId', e.target.value)}
                        placeholder="yourname@upi"
                        className={`input-field ${errors.upiId ? 'border-red-400' : ''}`} />
                      {errors.upiId && <p className="mt-1.5 text-xs text-red-500">{errors.upiId}</p>}
                      <p className="text-xs text-gray-400 mt-1.5">Example: arjun@ybl · 98765@paytm · name@oksbi</p>
                    </div>
                  </div>
                )}

                {/* COD */}
                {payMethod === 'cod' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Cash on Delivery</p>
                        <p className="text-xs text-gray-500">Pay when your order arrives at your doorstep</p>
                      </div>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1.5 pl-2">
                      <li>• COD available across India (extra ₹50 handling fee)</li>
                      <li>• Please keep exact change ready</li>
                      <li>• Collect your receipt from delivery partner</li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-secondary py-4 px-6">Back</button>
                  <button onClick={next} className="btn-primary flex-1 py-4 text-base flex items-center justify-center gap-2">
                    Review Order <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 2: Review ─── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Package size={18} className="text-brand" />
                  <h2 className="font-serif text-xl font-semibold">Review Your Order</h2>
                </div>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-3 p-3 bg-sand rounded-xl">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{item.product.name}</p>
                        <p className="text-xs text-gray-400">{item.color} · {item.size} · Qty {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatINR(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-sand rounded-xl text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Deliver To</p>
                    <p className="text-gray-800 font-medium">{form.firstName} {form.lastName}</p>
                    <p className="text-gray-600">+91 {form.phone}</p>
                    <p className="text-gray-600">{form.address}</p>
                    <p className="text-gray-600">{form.city}, {form.state} – {form.pincode}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Payment</p>
                    {payMethod === 'card' && <>
                      <p className="text-gray-800 font-medium">{form.cardName}</p>
                      <p className="text-gray-600">•••• •••• •••• {form.cardNumber.slice(-4)}</p>
                    </>}
                    {payMethod === 'upi'  && <p className="text-gray-800 font-medium">UPI: {form.upiId}</p>}
                    {payMethod === 'cod'  && <p className="text-gray-800 font-medium">Cash on Delivery</p>}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary py-4 px-6">Back</button>
                  <button onClick={submit} disabled={loading}
                    className="btn-primary flex-1 py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? (
                      <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg> Processing...</>
                    ) : (
                      <><Lock size={14} /> Place Order — {formatINR(total)}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-card p-5 sticky top-28">
              <h3 className="font-serif text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-14 object-cover rounded-lg" />
                      <span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-gray-400">{item.color} · {item.size}</p>
                    </div>
                    <p className="text-xs font-semibold shrink-0">{formatINR(item.product.price * item.quantity)}</p>
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
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span><span>{formatINR(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
