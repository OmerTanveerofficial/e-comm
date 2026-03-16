import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useTheme } from './ThemeContext.jsx';

const Navbar = ({ onSearch }) => {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchValue);
    navigate('/products');
  };

  const baseLink =
    'text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150';
  const activeClass = 'text-zinc-900 dark:text-zinc-100 font-semibold border-b-2 border-amber-500 pb-0.5';

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
      {/* Trust strip */}
      <div className="bg-zinc-900 dark:bg-zinc-950 text-zinc-300 text-[11px] text-center py-2 tracking-widest uppercase font-medium">
        Free shipping on orders over $50 &nbsp;·&nbsp; 30-day returns &nbsp;·&nbsp; Secure checkout
      </div>

      <nav className="container-main flex items-center justify-between py-4 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold tracking-wide">
            ES
          </span>
          <span className="hidden sm:block font-serif font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
            Omers E-Store
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 max-w-sm hidden sm:flex items-center"
        >
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 pl-9 pr-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            aria-label="Search"
          >
            🔍
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Link
            to="/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Secondary nav */}
      <div className="border-t border-zinc-100 dark:border-zinc-800">
        <div className="container-main flex gap-6 py-2.5 overflow-x-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeClass : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeClass : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeClass : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeClass : ''}`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
