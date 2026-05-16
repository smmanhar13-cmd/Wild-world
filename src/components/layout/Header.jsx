import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import useCartStore from '../../store/cartStore';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { items, openDrawer } = useCartStore();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-stone'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors ${
                scrolled || !isHome ? 'text-brand' : 'text-white'
              }`}
            >
              Wild World
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Collection', href: '/catalog' },
                { label: 'About', href: '/about' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:opacity-70 ${
                    scrolled || !isHome ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-all hover:bg-white/10 ${
                  scrolled || !isHome ? 'text-gray-700 hover:bg-stone' : 'text-white'
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={openDrawer}
                className={`relative p-2 rounded-full transition-all hover:bg-white/10 ${
                  scrolled || !isHome ? 'text-gray-700 hover:bg-stone' : 'text-white'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2 rounded-full transition-all ${
                  scrolled || !isHome ? 'text-gray-700 hover:bg-stone' : 'text-white'
                }`}
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 bg-white border-b border-stone ${
            searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 bg-sand rounded-xl px-4 py-2.5">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search rucksacks, styles, materials..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                autoFocus={searchOpen}
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white border-b border-stone overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 py-4 flex flex-col gap-1">
            <Link to="/catalog" className="px-3 py-2.5 text-sm font-medium text-gray-800 rounded-lg hover:bg-sand">
              Collection
            </Link>
            <Link to="/about" className="px-3 py-2.5 text-sm font-medium text-gray-800 rounded-lg hover:bg-sand">
              About
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
