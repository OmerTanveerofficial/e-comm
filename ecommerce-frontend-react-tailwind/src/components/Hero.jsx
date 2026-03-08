import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="mt-6 sm:mt-10">
    <div className="card overflow-hidden flex flex-col md:flex-row items-stretch">
      <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-semibold">
          New Season
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Shop the latest tech, fashion & more.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md">
          Discover curated collections with free shipping over $50 and
          30-day returns on all orders.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Shop now
          </Link>
          <a
            href="#featured"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100 hover:border-indigo-500 dark:hover:border-indigo-400"
          >
            View featured
          </a>
        </div>
      </div>
      <div className="flex-1 relative min-h-[220px] md:min-h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 text-center text-white max-w-xs">
            <p className="text-xs uppercase tracking-[0.25em]">
              Limited Offer
            </p>
            <p className="mt-1 text-lg font-semibold">
              Up to 40% off electronics
            </p>
            <p className="mt-2 text-xs text-white/80">
              Use code <span className="font-bold">WELCOME40</span> at
              checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;