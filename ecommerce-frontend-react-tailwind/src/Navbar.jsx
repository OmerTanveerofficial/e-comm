import React, { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useWishlist } from './WishlistContext.jsx';
import { useTheme } from './ThemeContext.jsx';
import { CATEGORIES } from './data/products.js';

const CATEGORY_ICONS = {
  Electronics: '💻',
  Fashion: '👗',
  Home: '🏠',
  Sports: '⚡',
};

const Navbar = ({ onSearch }) => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const shopTimeout = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchValue);
    navigate('/products');
    setMobileOpen(false);
  };

  const openShop = () => {
    clearTimeout(shopTimeout.current);
    setShopOpen(true);
  };
  const closeShop = () => {
    shopTimeout.current = setTimeout(() => setShopOpen(false), 120);
  };

  const baseLinkClass =
    'relative text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 py-3 flex items-center gap-1 group';
  const activeLinkClass =
    'text-zinc-900 dark:text-zinc-100 font-semibold';

  const underline =
    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-200 group-hover:after:w-full';

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950">
      {/* Trust strip */}
      <div className="bg-zinc-900 dark:bg-black text-zinc-400 text-[11px] text-center py-2 tracking-widest uppercase font-medium">
        Free shipping over $50&nbsp;&nbsp;·&nbsp;&nbsp;30-day returns&nbsp;&nbsp;·&nbsp;&nbsp;Secure checkout
      </div>

      {/* ─── Main row ─── */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="container-main flex items-center gap-4 py-3.5">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 mr-2"
            onClick={() => setMobileOpen(false)}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold tracking-wide shadow-sm">
              ES
            </span>
            <span className="hidden sm:block font-serif font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
              Omers E&#8209;Store
            </span>
          </Link>

          {/* Search bar — grows to fill space */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 max-w-xl hidden sm:flex"
          >
            <div className="relative w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none select-none text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search products, brands and categories…"
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </form>

          {/* Right action group */}
          <div className="ml-auto flex items-center gap-1">

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex flex-col items-center justify-center h-10 w-10 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white px-1">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex flex-col items-center justify-center h-10 w-10 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white px-1">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center h-10 w-10 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light'
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              }
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="sm:hidden flex items-center justify-center h-10 w-10 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileOpen
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* ─── Category nav ─── */}
      <div className="hidden sm:block border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container-main flex items-center gap-0.5 overflow-x-auto scrollbar-none">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkClass} ${underline} px-3 ${isActive ? activeLinkClass : ''}`
            }
          >
            Home
          </NavLink>

          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={openShop}
            onMouseLeave={closeShop}
          >
            <button
              className={`${baseLinkClass} ${underline} px-3 cursor-default`}
            >
              Shop
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {shopOpen && (
              <div
                className="animate-slide-down absolute top-full left-0 mt-1 w-56 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-card-hover z-50 p-2"
                onMouseEnter={openShop}
                onMouseLeave={closeShop}
              >
                <Link
                  to="/products"
                  onClick={() => setShopOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition font-medium"
                >
                  <span className="text-base">🛍️</span>
                  All Products
                </Link>
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1.5" />
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <Link
                    key={cat}
                    to="/products"
                    onClick={() => setShopOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
                  >
                    <span className="text-base">{CATEGORY_ICONS[cat]}</span>
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/new-arrivals"
            className={({ isActive }) =>
              `${baseLinkClass} ${underline} px-3 ${isActive ? activeLinkClass : ''}`
            }
          >
            New Arrivals
            <span className="ml-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5">
              New
            </span>
          </NavLink>

          <NavLink
            to="/sale"
            className={({ isActive }) =>
              `${baseLinkClass} ${underline} px-3 ${isActive ? activeLinkClass : ''}`
            }
          >
            <span className="text-red-500 font-semibold">Sale</span>
            <span className="text-red-500">🔥</span>
          </NavLink>

          <NavLink
            to="/track-order"
            className={({ isActive }) =>
              `${baseLinkClass} ${underline} px-3 ${isActive ? activeLinkClass : ''}`
            }
          >
            Track Order
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLinkClass} ${underline} px-3 ${isActive ? activeLinkClass : ''}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseLinkClass} ${underline} px-3 ${isActive ? activeLinkClass : ''}`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* ─── Mobile drawer ─── */}
      {mobileOpen && (
        <div className="animate-slide-down sm:hidden border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pb-4">
          {/* Mobile search */}
          <form onSubmit={handleSubmit} className="mt-3 mb-4">
            <input
              type="text"
              placeholder="Search products…"
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </form>
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: '🛍️ All Products' },
            { to: '/new-arrivals', label: '✨ New Arrivals' },
            { to: '/sale', label: '🔥 Sale' },
            { to: '/wishlist', label: '♡ Wishlist' },
            { to: '/track-order', label: '📦 Track Order' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-sm border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors ${
                  isActive
                    ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
