import React from 'react';
import ProductCard from '../ProductCard.jsx';

const ProductGrid = ({ products }) => {
  if (!products.length) {
    return (
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        No products found. Try a different filter or search term.
      </p>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;