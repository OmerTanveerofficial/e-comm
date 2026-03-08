import React from 'react';
import { useCart } from '../CartContext.jsx';

const Checkout = () => {
  const { totalPrice, totalItems } = useCart();

  return (
    <main className="container-main py-10">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Checkout
      </h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr,1fr] items-start">
        <form className="card p-4 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Shipping information
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                First name
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Last name
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
              Address
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
              placeholder="Street and house number"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                City
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                ZIP
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                placeholder="12345"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>
          <h2 className="pt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Payment (demo)
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Card number
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                placeholder="**** **** **** ****"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                CVC
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                placeholder="123"
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Place order
          </button>
        </form>

        <aside className="card p-4 sm:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Order summary
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {totalItems} item(s) in your cart.
          </p>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;