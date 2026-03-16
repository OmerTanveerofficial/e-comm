import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-16 bg-zinc-900 dark:bg-zinc-950 text-zinc-300">
    {/* Trust badges row */}
    <div className="border-b border-zinc-800">
      <div className="container-main py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <span className="text-2xl">🚚</span>
          <div>
            <p className="text-sm font-semibold text-zinc-100">Free Shipping</p>
            <p className="text-xs text-zinc-500 mt-0.5">On all orders over $50</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="text-sm font-semibold text-zinc-100">Secure Payment</p>
            <p className="text-xs text-zinc-500 mt-0.5">256-bit SSL encryption</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <span className="text-2xl">↩️</span>
          <div>
            <p className="text-sm font-semibold text-zinc-100">30-Day Returns</p>
            <p className="text-xs text-zinc-500 mt-0.5">Hassle-free return policy</p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
      <p className="font-serif text-zinc-400">
        © {new Date().getFullYear()} <span className="text-zinc-200 font-semibold">Omers E-Store</span>. All rights reserved.
      </p>
      <div className="flex gap-5">
        <Link to="/about" className="hover:text-zinc-200 transition-colors">About</Link>
        <Link to="/contact" className="hover:text-zinc-200 transition-colors">Contact</Link>
        <a href="#" onClick={e => e.preventDefault()} className="hover:text-zinc-200 transition-colors">Privacy</a>
        <a href="#" onClick={e => e.preventDefault()} className="hover:text-zinc-200 transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
