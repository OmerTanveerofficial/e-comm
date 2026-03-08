import React from 'react';

const testimonials = [
  {
    name: 'Adeel, Marathon runner',
    quote:
      'The AeroStride feels light but protective. After 500 km, the cushioning still feels fresh.',
    initial: 'A'
  },
  {
    name: 'Sara, Creative director',
    quote:
      'CityFlex is my daily uniform now—clean enough for the studio, comfortable enough for late shoots.',
    initial: 'S'
  }
];

const Testimonials = () => (
  <section className="mt-10 container-main">
    <div className="card p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 font-semibold">
            Voices from the run
          </p>
          <h2 className="mt-1 text-lg sm:text-xl font-semibold">
            Rated by runners & creators.
          </h2>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-300 max-w-xs">
          Real stories from early wear-testers across Lahore, Karachi, and
          Islamabad.
        </p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {testimonials.map(t => (
          <figure
            key={t.name}
            className="rounded-2xl bg-white/5 border border-white/10 p-4 flex gap-3"
          >
            <div className="h-9 w-9 rounded-full bg-indigo-500/80 flex items-center justify-center text-sm font-semibold">
              {t.initial}
            </div>
            <div>
              <blockquote className="text-xs sm:text-sm text-slate-100">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-2 text-[11px] text-slate-300">
                {t.name}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;