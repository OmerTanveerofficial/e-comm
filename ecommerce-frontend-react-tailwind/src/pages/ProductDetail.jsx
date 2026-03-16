import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products.js';
import { useCart } from '../CartContext.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <main className="container-main py-10">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Product not found.
        </p>
      </main>
    );
  }

  return (
    <main className="container-main py-14">
      <div className="grid gap-10 md:grid-cols-2 items-start">
        <div className="animate-fade-up delay-0 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-card bg-zinc-100 dark:bg-zinc-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="animate-fade-up delay-150 flex flex-col gap-5">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-amber-600 font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 leading-tight">
              {product.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs">{product.rating} / 5</span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-5 py-3 text-sm font-semibold text-white dark:text-zinc-900 shadow hover:bg-zinc-700 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:border-zinc-900 dark:hover:border-zinc-300 transition-colors"
            >
              ♡ Wishlist
            </button>
          </div>

          {/* Trust signals */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2 text-xs text-zinc-400 dark:text-zinc-500">
            <p className="flex items-center gap-2"><span className="text-amber-500">✓</span> Free shipping on this order</p>
            <p className="flex items-center gap-2"><span className="text-amber-500">✓</span> 30-day hassle-free returns</p>
            <p className="flex items-center gap-2"><span className="text-amber-500">✓</span> Secure payment · SSL encrypted</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
