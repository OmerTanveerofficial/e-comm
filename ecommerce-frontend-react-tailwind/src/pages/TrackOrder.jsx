import React, { useState } from 'react';

const steps = [
  { label: 'Order placed',    icon: '📋', done: true  },
  { label: 'Processing',      icon: '⚙️',  done: true  },
  { label: 'Shipped',         icon: '📦', done: true  },
  { label: 'Out for delivery',icon: '🚚', done: false },
  { label: 'Delivered',       icon: '✅', done: false },
];

const TrackOrder = () => {
  const [orderNum, setOrderNum] = useState('');
  const [tracked, setTracked] = useState(false);

  const handleTrack = e => {
    e.preventDefault();
    if (orderNum.trim()) setTracked(true);
  };

  return (
    <main className="container-main py-14">
      <div className="max-w-2xl mx-auto">
        <p className="animate-fade-up delay-0 text-[11px] uppercase tracking-[0.3em] text-amber-600 font-semibold mb-3">
          Real-time tracking
        </p>
        <h1 className="animate-fade-up delay-75 font-serif font-bold text-3xl text-zinc-900 dark:text-zinc-100 mb-2">
          Track Your Order
        </h1>
        <p className="animate-fade-up delay-150 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          Enter your order number below to see the live status of your delivery.
        </p>

        {/* Search form */}
        <form onSubmit={handleTrack} className="animate-fade-up delay-200 flex gap-3 mb-10">
          <input
            type="text"
            value={orderNum}
            onChange={e => setOrderNum(e.target.value)}
            placeholder="e.g. ES-20260317-4821"
            className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-card transition"
          />
          <button
            type="submit"
            className="rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-95 transition-all duration-150 shadow-sm"
          >
            Track
          </button>
        </form>

        {/* Result with animated steps */}
        {tracked && (
          <div className="animate-scale-in card p-6 sm:p-8">
            <div className="animate-fade-up delay-0 flex items-start justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">Order number</p>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{orderNum}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">Estimated delivery</p>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">Mar 20, 2026</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                In transit
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div className="animate-progress-fill h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
            </div>

            {/* Steps */}
            <div className="relative">
              <div className="absolute top-5 left-5 right-5 h-px bg-zinc-200 dark:bg-zinc-700 z-0" />
              <div className="flex justify-between relative z-10">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="animate-fade-up flex flex-col items-center gap-2 flex-1"
                    style={{ animationDelay: `${150 + i * 100}ms` }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 ${
                        step.done
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950 shadow-sm'
                          : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className={`text-[10px] text-center leading-tight font-medium transition-colors ${
                      step.done
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-400 dark:text-zinc-600'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="animate-fade-in delay-700 mt-8 text-xs text-zinc-400 dark:text-zinc-500 text-center">
              Last updated: Today at 9:41 AM ·{' '}
              <a href="/contact" className="underline hover:text-amber-600 transition-colors">
                Contact us
              </a>
            </p>
          </div>
        )}

        {/* Trust cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📦', title: 'Packed carefully',  desc: 'Every order is packed with care',    delay: 200 },
            { icon: '🚚', title: 'Fast delivery',      desc: '2–5 business days standard',         delay: 300 },
            { icon: '↩️', title: 'Easy returns',       desc: '30-day no-hassle policy',            delay: 400 },
          ].map(item => (
            <div
              key={item.title}
              className="animate-fade-up rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center hover:shadow-card transition-shadow duration-300"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TrackOrder;
