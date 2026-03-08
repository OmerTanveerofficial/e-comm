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
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Product not found.
        </p>
      </main>
    );
  }

  return (
    <main className="container-main py-10">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="card overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {product.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
          <div className="flex gap-4 items-center text-sm">
            <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 px-3 py-1 text-xs font-medium border border-indigo-100 dark:border-indigo-900">
              {product.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              ⭐ {product.rating} / 5
            </span>
          </div>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100"
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;