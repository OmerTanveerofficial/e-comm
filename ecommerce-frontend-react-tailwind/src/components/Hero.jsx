import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="mt-6 sm:mt-10">
    <div className="overflow-hidden rounded-3xl flex flex-col md:flex-row items-stretch min-h-[380px] shadow-card-hover">
      {/* Left — light editorial panel */}
      <div className="flex-1 bg-stone-50 dark:bg-zinc-900 p-8 sm:p-12 flex flex-col justify-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-semibold mb-4">
          New Season · 2025 Collection
        </p>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-50 leading-tight">
          Crafted for those <br className="hidden sm:block" />
          <span className="italic text-amber-600">who demand</span> more.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
          Discover our curated edit of premium tech, fashion, and lifestyle products — selected for quality that lasts.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 shadow-md hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors duration-200"
          >
            Shop the collection
          </Link>
          <a
            href="#featured"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:border-zinc-900 dark:hover:border-zinc-300 transition-colors duration-200"
          >
            View featured
          </a>
        </div>

        {/* Trust micro-signals */}
        <div className="mt-8 flex flex-wrap gap-5 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500">✓</span> Free shipping over $50
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500">✓</span> 30-day returns
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500">✓</span> Secure payment
          </span>
        </div>
      </div>

      {/* Right — dark premium panel */}
      <div className="flex-none md:w-[42%] relative min-h-[240px] bg-zinc-900 dark:bg-zinc-950 flex items-center justify-center p-8">
        {/* Subtle gold texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#f59e0b,_transparent_65%)]" />
        <div className="relative z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 mb-3">
            Limited Offer
          </p>
          <p className="font-serif font-bold text-2xl sm:text-3xl text-white leading-snug mb-2">
            Up to 40% off
          </p>
          <p className="text-zinc-400 text-sm mb-5">on premium electronics</p>
          <div className="inline-block rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-center">
            <p className="text-xs text-amber-400/70 uppercase tracking-widest mb-1">Use code</p>
            <p className="font-mono font-bold text-amber-400 text-lg tracking-widest">WELCOME40</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
