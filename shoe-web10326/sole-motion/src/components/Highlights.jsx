import React from 'react';

const items = [
  {
    title: 'Engineered cushioning',
    description:
      'Multi-density foam tuned for forefoot propulsion and soft landings.',
    icon: '🧪'
  },
  {
    title: 'Mapped breathability',
    description:
      'Mesh patterns mapped to high-heat zones for max airflow and comfort.',
    icon: '🌬️'
  },
  {
    title: 'Locked-in stability',
    description:
      'Extended heel clip and sculpted collar keep every stride centered.',
    icon: '🦶'
  }
];

const Highlights = () => (
  <section id="story" className="mt-10 container-main">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-500 font-semibold">
          Tech under your feet
        </p>
        <h2 className="mt-1 text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
          Built for long-haul comfort.
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
        Every SoleMotion silhouette is tested over hundreds of kilometers in
        mixed conditions, blending performance running needs with everyday
        ease.
      </p>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="card p-4 flex flex-col gap-2 border-dashed border-slate-200 dark:border-slate-700/80 hover:border-solid hover:border-indigo-500/70 transition"
          style={{
            animation: `fadeUp 0.6s ease-out ${idx * 0.06}s both`
          }}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-lg">
            {item.icon}
          </span>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Highlights;