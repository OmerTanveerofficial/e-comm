import React from 'react';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { products } from '../data/products.js';

const Home = () => {
  const featured = products.filter(p => p.featured);

  return (
    <main className="container-main pb-10">
      <Hero />
      <section id="featured" className="mt-10">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Featured products
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Handpicked by our editors
          </p>
        </div>
        <ProductGrid products={featured} />
      </section>
    </main>
  );
};

export default Home;