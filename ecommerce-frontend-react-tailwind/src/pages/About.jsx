import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  { icon: '✦', title: 'Quality first', desc: 'Every product is hand-selected against strict quality benchmarks. We never compromise.' },
  { icon: '🔒', title: 'Trust & safety', desc: 'Your data and payments are protected with industry-leading encryption.' },
  { icon: '↩️', title: 'Hassle-free returns', desc: '30-day no-questions-asked returns. Shopping should be risk-free.' },
  { icon: '🌍', title: 'Ethical sourcing', desc: 'We work only with suppliers who meet our standards for fair labour and sustainability.' },
];

const About = () => (
  <main>
    {/* Hero */}
    <div className="bg-stone-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
      <div className="container-main py-16 sm:py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-semibold mb-4">
          Our story
        </p>
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-zinc-900 dark:text-zinc-50 leading-tight max-w-2xl">
          We built the store we always wanted to shop at.
        </h1>
        <p className="mt-5 text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          Omers E-Store is a modern, curated marketplace built for people who care about quality. We started with a simple idea: bring together the best products across tech, fashion, home, and sport — all in one beautifully simple place.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-sm"
        >
          Explore the collection
        </Link>
      </div>
    </div>

    {/* Values */}
    <div className="container-main py-16">
      <p className="text-[11px] uppercase tracking-[0.25em] text-amber-600 font-semibold mb-3">
        What we stand for
      </p>
      <h2 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mb-10">
        Our values
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {values.map(v => (
          <div key={v.title} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-card">
            <span className="text-2xl mb-4 block">{v.icon}</span>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{v.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Stats strip */}
    <div className="bg-zinc-900 dark:bg-zinc-950">
      <div className="container-main py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {[
          { num: '8+', label: 'Product categories' },
          { num: '50k+', label: 'Happy customers' },
          { num: '4.7★', label: 'Average rating' },
          { num: '30', label: 'Day return window' },
        ].map(stat => (
          <div key={stat.label}>
            <p className="font-serif font-bold text-3xl text-amber-400 mb-1">{stat.num}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default About;
