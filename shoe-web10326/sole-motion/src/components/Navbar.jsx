import React from 'react';
import { useTheme } from '../ThemeContext.jsx';

const scrollToId = id => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLink =
    'text-xs sm:text-sm text-slate-600 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <nav className="container-main flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToId('hero')}
          className="flex items-center gap-2 group"
        >
          <div className="relative h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md overflow-hidden">
            <span className="text-xs font-black tracking-tight text-white group-hover:scale-110 transition-transform">
              SM
            </span>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              SoleMotion
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              FOOTWEAR STUDIO
            </span>
          </div>
        </button>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className={navLink}
            type="button"
            onClick={() => scrollToId('hero')}
          >
            Home
          </button>
          <button
            className={navLink}
            type="button"
            onClick={() => scrollToId('collections')}
          >
            Collections
          </button>
          <button
            className={navLink}
            type="button"
            onClick={() => scrollToId('shop')}
          >
            Shop
          </button>
          <button
            className={navLink}
            type="button"
            onClick={() => scrollToId('story')}
          >
            Our Story
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => scrollToId('shop')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-500"
          >
            <span className="text-sm">🛒</span>
            <span>View colllection</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-200 shadow-sm hover:border-indigo-500 hover:text-indigo-500 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;