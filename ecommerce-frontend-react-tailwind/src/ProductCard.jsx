import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-card hover:shadow-card-hover hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            {product.category}
          </p>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            ${product.price.toFixed(2)}
          </p>
          <span className="text-xs text-zinc-400">⭐ {product.rating}</span>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
