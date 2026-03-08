import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-slate-200 dark:border-slate-800 mt-10">
    <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
      <p>© {new Date().getFullYear()} E-Store. All rights reserved.</p>
      <div className="flex gap-4">
        <Link to="/about" className="hover:text-indigo-500">
          About
        </Link>
        <Link to="/contact" className="hover:text-indigo-500">
          Contact
        </Link>
        <a
          href="#"
          onClick={e => e.preventDefault()}
          className="hover:text-indigo-500"
        >
          Privacy
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;