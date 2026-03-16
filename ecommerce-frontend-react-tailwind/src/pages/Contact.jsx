import React from 'react';

const Contact = () => (
  <main className="container-main py-14">
    <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr,1.6fr] gap-12 items-start">
      {/* Left info */}
      <div className="animate-fade-up delay-0">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 font-semibold mb-3">
          Get in touch
        </p>
        <h1 className="font-serif font-bold text-3xl text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
          We'd love to hear from you.
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
          Whether it's a question about an order, product feedback, or a partnership inquiry — our team typically responds within 24 hours.
        </p>
        <div className="space-y-5">
          {[
            { icon: '📧', label: 'Email', value: 'hello@omers-store.com' },
            { icon: '📞', label: 'Phone', value: '+1 (555) 012-3456' },
            { icon: '🕐', label: 'Hours', value: 'Mon–Fri, 9am – 6pm EST' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{item.icon}</span>
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-medium">{item.label}</p>
                <p className="text-sm text-zinc-800 dark:text-zinc-200 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <form className="animate-fade-up delay-150 card p-6 sm:p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
              Name
            </label>
            <input
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Subject
          </label>
          <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 transition">
            <option>Order inquiry</option>
            <option>Return or refund</option>
            <option>Product question</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Message
          </label>
          <textarea
            rows={5}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
            placeholder="How can we help you?"
          />
        </div>
        <button
          type="button"
          className="w-full inline-flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-sm"
        >
          Send message
        </button>
        <p className="text-center text-[11px] text-zinc-400">
          We respect your privacy. No spam, ever.
        </p>
      </form>
    </div>
  </main>
);

export default Contact;
