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
    <main className="container-main pb-14 mt-8">
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold mb-1">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
            {category === 'All' ? 'All Products' : category}
          </h1>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition self-start sm:self-auto"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
          </select>
        </div>
        <div className="mt-5">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>
        <div className="mt-5 h-px bg-zinc-100 dark:bg-zinc-800" />
      </div>

      <ProductGrid products={products} />
    </main>
  );
};

export default Products;
