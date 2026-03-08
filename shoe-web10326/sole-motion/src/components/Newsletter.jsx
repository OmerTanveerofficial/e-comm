import React from 'react';

const Newsletter = () => (
  <section className="mt-10 container-main">
    <div className="card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-500 font-semibold">
          Motion lab updates
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Get early access to new colorways.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1">
          Be the first to know when we drop limited capsules and performance
          experiments.
        </p>
      </div>
      <form
        className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3"
        onSubmit={e => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full sm:w-64 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 px-4 py-2 text-xs sm:text-sm font-semibold text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400"
        >
          Join waitlist
        </button>
      </form>
    </div>
  </section>
);

export default Newsletter;