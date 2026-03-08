import React from 'react';

const Contact = () => (
  <main className="container-main py-10">
    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
      Contact us
    </h1>
    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
      Have questions about an order or want to share feedback? Fill out
      the form below and we’ll get back to you as soon as possible.
    </p>

    <form className="card mt-6 p-4 sm:p-6 space-y-4 max-w-xl">
      <div>
        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
          Name
        </label>
        <input
          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Send message
      </button>
    </form>
  </main>
);

export default Contact;