import React from 'react';
import { shoeFilters } from '../data/shoes.js';

const Collections = ({ activeFilter, onFilterChange }) => {
  return (
    <section
      id="collections"
      className="mt-10 container-main border-t border-slate-200 dark:border-slate-800 pt-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-500 font-semibold">
            Collections
          </p>
          <h2 className="mt-1 text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Find your motion profile.
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto text-xs pb-1">
          {shoeFilters.map(filter => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1.5 rounded-full border whitespace-nowrap transition ${
                  active
                    ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 border-slate-900 dark:border-slate-50'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:border-indigo-500'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Collections;