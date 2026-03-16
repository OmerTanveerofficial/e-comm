import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../WishlistContext.jsx';
import { useCart } from '../CartContext.jsx';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist.length) {
    return (
      <main className="container-main py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-4xl mb-6">
          ♡
        </div>
        <h1 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100 mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-8">
          Save your favourite items here and come back to them anytime.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="container-main py-14">
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold mb-1">
          {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
        </p>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
          Your Wishlist
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlist.map(product => (
          <div
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <Link to={`/products/${product.id}`} className="block overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {product.category}
              </p>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-auto pt-2">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="flex-1 inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2.5 text-zinc-500 hover:text-red-500 hover:border-red-300 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
