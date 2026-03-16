import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useWishlist } from './WishlistContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

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
          {/* Wishlist button — appears on hover */}
          <button
            type="button"
            onClick={e => { e.preventDefault(); toggleWishlist(product); }}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
              wishlisted
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            {product.onSale && product.salePrice ? (
              <div className="flex items-baseline gap-1.5">
                <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  ${product.salePrice.toFixed(2)}
                </p>
                <p className="text-xs text-zinc-400 line-through">${product.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
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
