import React from 'react';
import { formatPrice } from '../data/shoes.js';

const ProductCard = ({ shoe, index }) => {
  return (
    <div
      className="group card flex flex-col overflow-hidden relative cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        animation: `fadeUp 0.6s ease-out ${(index || 0) * 0.06}s both`
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
        <img
          src={shoe.image}
          alt={shoe.name}
          className="relative z-10 h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-1"
        />
        {shoe.tag && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-indigo-600/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
            {shoe.tag}
          </span>
        )}
        <span className="absolute right-3 bottom-3 z-20 rounded-full bg-white/90 dark:bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-sm">
          {formatPrice(shoe.price)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">
            {shoe.name}
          </h3>
          <span className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-slate-500 dark:text-slate-400">
            {shoe.category}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {shoe.description}
        </p>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>{shoe.gender}</span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-500 animate-pulse" />
            In stock
          </span>
        </div>
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 px-3 py-2 text-xs font-semibold text-white dark:text-slate-900 shadow-sm group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;