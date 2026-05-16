import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-semibold mb-2">Wild World</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">India's Premium Trekking Packs</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Thoughtfully designed rucksacks for the modern Indian explorer. Tested in the Himalayas. Built to last a lifetime.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <a href="tel:18004539255" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={13} className="text-accent" /> 1800-WILD-IN (Toll Free)
              </a>
              <a href="mailto:support@wildworld.in" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={13} className="text-accent" /> support@wildworld.in
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin size={13} className="text-accent shrink-0 mt-0.5" /> Dehradun, Uttarakhand, India
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-all" />
              <button className="bg-accent hover:bg-accent-dark text-white rounded-full px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-1.5">
                Join <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Packs',       href: '/catalog' },
                { label: 'Day Hike (30L)',  href: '/catalog?category=Day+Hike' },
                { label: 'Trekking Range',  href: '/catalog?category=Trekking' },
                { label: 'Expedition Series', href: '/catalog?category=Expedition' },
                { label: 'The Kedarkantha 45L', href: '/product/1' },
                { label: 'The Everest 80L',     href: '/product/4' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-white/70 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Help</h4>
            <ul className="space-y-3">
              {['Size Guide', 'How to Pack', 'Track Order', 'Returns & Exchange', 'Warranty Claim', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-8 mb-4">Accepted Payments</h4>
            <div className="flex flex-wrap gap-2 text-xs text-white/50">
              {['Visa', 'Mastercard', 'RuPay', 'UPI', 'GPay', 'PhonePe', 'COD'].map((p) => (
                <span key={p} className="bg-white/10 px-2 py-0.5 rounded-md">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Wild World Outdoor Pvt. Ltd. · GST: 05AAAAA0000A1Z5 · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Youtube,   label: 'YouTube'   },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label}
                className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Icon size={16} />
              </a>
            ))}
            <a href="#" className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all" aria-label="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
