import React from 'react';
import ProductCard from './ProductCard.jsx';

const ShoesGrid = ({ shoes }) => {
  return (
    <section id="shop" className="mt-6 container-main">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
          New season styles
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {shoes.length} models • 9K–15K PKR
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shoes.map((shoe, idx) => (
          <ProductCard key={shoe.id} shoe={shoe} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default ShoesGrid;