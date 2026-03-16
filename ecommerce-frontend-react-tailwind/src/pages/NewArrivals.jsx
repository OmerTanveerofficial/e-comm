import React from 'react';
import { products } from '../data/products.js';
import ProductCard from '../ProductCard.jsx';

const NewArrivals = () => {
  const newProducts = products.filter(p => p.isNew);

  return (
    <main className="container-main pb-14">
      {/* Header */}
      <div className="mt-10 mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-semibold mb-3">
          Just dropped
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 leading-tight">
            New Arrivals
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
            The latest additions to our collection — fresh styles and must-have products.
          </p>
        </div>
        <div className="mt-6 h-px bg-gradient-to-r from-amber-400 via-zinc-300 to-transparent dark:via-zinc-700" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {newProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom promo */}
      <div className="mt-14 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900 p-8 text-center">
        <p className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-2">
          More coming soon
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          Sign up to be the first to know about new drops.
        </p>
        <div className="flex justify-center gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="button"
            className="rounded-xl bg-zinc-900 dark:bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Notify me
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewArrivals;
