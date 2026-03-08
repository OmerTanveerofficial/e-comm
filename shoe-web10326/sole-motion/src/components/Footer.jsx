import React from 'react';

const Footer = () => (
  <footer className="mt-10 border-t border-slate-200 dark:border-slate-800">
    <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
      <p>© {new Date().getFullYear()} SoleMotion Lab. All rights reserved.</p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() =>
            document.getElementById('story')?.scrollIntoView({
              behavior: 'smooth'
            })
          }
          className="hover:text-indigo-500"
        >
          Tech story
        </button>
        <button
          type="button"
          onClick={() =>
            document.getElementById('shop')?.scrollIntoView({
              behavior: 'smooth'
            })
          }
          className="hover:text-indigo-500"
        >
          Shop
        </button>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-indigo-500"
        >
          Back to top
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;