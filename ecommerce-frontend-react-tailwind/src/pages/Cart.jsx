import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <main className="container-main py-10">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Your cart
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your cart is empty. Start adding some products!
        </p>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="container-main py-10">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Your cart
      </h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr,1fr] items-start">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="card flex items-center gap-4 p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {product.category} • ${product.price.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <label className="text-xs text-slate-500 dark:text-slate-400">
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
                    className="w-16 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  ${(product.price * quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="card p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Order summary
          </h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400 text-xs">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="mt-2 border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="mt-4 w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;