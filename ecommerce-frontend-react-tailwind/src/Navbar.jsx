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

  const activeClass =
    'text-indigo-600 dark:text-indigo-400 font-semibold';
  const baseLink =
    'text-sm text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <nav className="container-main flex items-center justify-between py-3 gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-bold">
            ES
          </span>
          <span className="hidden sm:inline-block">E-Store</span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 max-w-md hidden sm:flex items-center"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Mobile search icon (just opens /products) */}
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300"
            aria-label="Search"
          >
            🔍
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Secondary nav */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
        <div className="container-main flex gap-4 py-2 text-xs sm:text-sm overflow-x-auto">
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