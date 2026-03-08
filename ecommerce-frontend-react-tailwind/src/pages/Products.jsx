import React, { useMemo, useState } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import { products as allProducts } from '../data/products.js';

const Products = ({ searchQuery }) => {
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');

  const products = useMemo(() => {
    let filtered = [...allProducts];

    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [category, searchQuery, sortBy]);

  return (
    <main className="container-main pb-10 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            All products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Browse our full catalog of curated items.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <CategoryFilter active={category} onChange={setCategory} />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="mt-2 sm:mt-0 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-slate-700 dark:text-slate-100"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
          </select>
        </div>
      </div>

      <ProductGrid products={products} />
    </main>
  );
};

export default Products;