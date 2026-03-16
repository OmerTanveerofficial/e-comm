import React from 'react';
import { CATEGORIES } from '../data/products.js';

const CategoryFilter = ({ active, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {CATEGORIES.map(cat => {
      const selected = active === cat;
      return (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
            selected
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
              : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-900 dark:hover:border-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900'
          }`}
        >
          {cat}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
