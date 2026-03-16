import React from 'react';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { products } from '../data/products.js';

const Home = () => {
  const featured = products.filter(p => p.featured);

  return (
    <main className="container-main pb-10">
      <Hero />
      <section id="featured" className="mt-14">
        <div className="flex items-end justify-between gap-2 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold mb-1">
              Handpicked by our editors
            </p>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50">
              Featured Products
            </h2>
          </div>
        </div>
        <ProductGrid products={featured} />
      </section>
    </main>
  );
};

export default Home;
