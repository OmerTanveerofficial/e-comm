import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <main className="container-main py-14">
        <h1 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100">
          Your cart
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Your cart is empty. Start adding some products!
        </p>
        <Link
          to="/products"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="container-main py-14">
      <h1 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100 mb-8">
        Your cart
      </h1>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr] items-start">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="card flex items-center gap-4 p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-xl object-cover bg-zinc-100 dark:bg-zinc-800"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  {product.category} · ${product.price.toFixed(2)} each
                </p>
                <div className="mt-2.5 flex items-center gap-3">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">
                    Qty:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e =>
                      updateQuantity(
                        product.id,
                        parseInt(e.target.value || '1', 10)
                      )
                    }
                    className="w-16 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  ${(product.price * quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="card p-5 sm:p-6">
          <h2 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-4">
            Order summary
          </h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
              <span>Items ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400 text-xs">
              <span>Shipping</span>
              <span className="text-amber-600 font-medium">Free over $50</span>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 mt-3 flex justify-between font-bold text-zinc-900 dark:text-zinc-100">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="mt-5 w-full inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-95 transition-all duration-150"
          >
            Proceed to checkout
          </button>
          <p className="mt-3 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-1">
            <span>🔒</span> Secure checkout · SSL encrypted
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
