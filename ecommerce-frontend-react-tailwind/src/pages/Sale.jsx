import React from 'react';
import { products } from '../data/products.js';
import { useCart } from '../CartContext.jsx';

const Sale = () => {
  const saleProducts = products.filter(p => p.onSale);

  return (
    <main className="container-main pb-14">
      {/* Hero banner */}
      <div className="mt-6 rounded-3xl bg-zinc-900 dark:bg-zinc-950 overflow-hidden relative px-8 py-12 sm:px-14 sm:py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#f59e0b,_transparent_60%)]" />
        <div className="relative z-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
            Limited time
          </p>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Sale Event
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md">
            Curated picks at their best prices. Stock is limited — don't miss out.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-center">
            <div>
              <p className="font-serif font-bold text-2xl text-amber-400">40%</p>
              <p className="text-xs text-zinc-500 mt-0.5">Max discount</p>
            </div>
            <div className="w-px bg-zinc-800" />
            <div>
              <p className="font-serif font-bold text-2xl text-amber-400">{saleProducts.length}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Items on sale</p>
            </div>
            <div className="w-px bg-zinc-800" />
            <div>
              <p className="font-serif font-bold text-2xl text-amber-400">Free</p>
              <p className="text-xs text-zinc-500 mt-0.5">Shipping included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sale products */}
      <div className="mt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold mb-1">
              {saleProducts.length} items
            </p>
            <h2 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-50">
              On Sale Now
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saleProducts.map(product => (
            <SaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

const SaleCard = ({ product }) => {
  const { addToCart } = useCart();
  const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-card hover:shadow-card-hover hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
          -{discount}%
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="mt-auto pt-3 flex items-center gap-3">
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            ${product.salePrice.toFixed(2)}
          </p>
          <p className="text-sm text-zinc-400 line-through">
            ${product.price.toFixed(2)}
          </p>
          <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded-full">
            Save ${(product.price - product.salePrice).toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors duration-200"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Sale;
