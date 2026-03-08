import React from 'react';
import { shoes, formatPrice } from '../data/shoes.js';

const spotlight = shoes[0];

const Hero = () => {
  return (
    <section
      id="hero"
      className="pt-6 sm:pt-10 lg:pt-12 relative overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-8 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="container-main relative grid gap-10 lg:grid-cols-[1.15fr,1fr] items-center">
        {/* Left text */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-[11px] text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-lime-500/10 text-[10px]">
              ⚡
            </span>
            <span className="uppercase tracking-[0.2em] text-[10px] text-slate-500 dark:text-slate-400">
              NEW DROP • RUNNING LAB
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
            Move lighter.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Land softer.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            SoleMotion crafts performance-first footwear for runners, creators,
            and city athletes. Premium cushioning, locked-in support, and
            all-day comfort—engineered in our motion lab.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                document.getElementById('shop')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }
              className="inline-flex items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-900 shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-400 transition"
            >
              Shop new season
              <span className="ml-2 text-base">→</span>
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById('story')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }
              className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100 hover:border-indigo-500 transition"
            >
              Explore cushioning story
            </button>
          </div>

          <dl className="mt-3 grid grid-cols-3 gap-4 max-w-md text-xs sm:text-sm">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">
                Avg. mileage
              </dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                600+ km
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">
                Impact reduction
              </dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                32%
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">
                Cushion feel
              </dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                Soft–Medium
              </dd>
            </div>
          </dl>
        </div>

        {/* Right visual */}
        <div className="relative">
          <div className="relative card overflow-hidden p-4 sm:p-6 lg:p-7 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#6366f1,_transparent_55%)]" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
                  Live motion lab
                </span>
                <span className="rounded-full bg-white/10 px-2 py-1">
                  {spotlight.category}
                </span>
              </div>
              <div className="relative aspect-[4/3] overflow-visible">
                <div className="absolute inset-0 translate-y-2 blur-2xl bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.7),_transparent_70%)]" />
                <img
                  src={spotlight.image}
                  alt={spotlight.name}
                  className="relative z-10 h-full w-full object-cover rounded-3xl"
                  style={{
                    animation: 'floatShoe 4s ease-in-out infinite alternate'
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Spotlight
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {spotlight.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Starting at
                  </p>
                  <p className="text-lg font-bold text-lime-300">
                    {formatPrice(spotlight.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="h-7 w-[1px] bg-gradient-to-b from-transparent via-slate-400/60 to-transparent animate-pulse" />
            <span>Scroll to explore the collection</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;