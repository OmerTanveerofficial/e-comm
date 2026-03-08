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
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
            selected
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:border-indigo-500'
          }`}
        >
          {cat}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;