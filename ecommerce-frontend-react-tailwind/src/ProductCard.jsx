import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="card flex flex-col overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-indigo-600/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{product.category}</span>
          <span>⭐ {product.rating}</span>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;