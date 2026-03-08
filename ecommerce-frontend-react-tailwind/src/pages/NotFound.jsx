import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="container-main py-16 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-500">
      404
    </p>
    <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
      Page not found
    </h1>
    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
      The page you’re looking for doesn’t exist or has been moved.
    </p>
    <Link
      to="/"
      className="mt-5 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
    >
      Back to home
    </Link>
  </main>
);

export default NotFound;