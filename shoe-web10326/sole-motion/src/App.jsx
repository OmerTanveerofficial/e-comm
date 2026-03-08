import React, { useMemo, useState } from 'react';
import { ThemeProvider } from './ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Highlights from './components/Highlights.jsx';
import Collections from './components/Collections.jsx';
import ShoesGrid from './components/ShoesGrid.jsx';
import Testimonials from './components/Testimonials.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/Footer.jsx';
import { shoes as allShoes } from './data/shoes.js';

const App = () => {
  const [filter, setFilter] = useState('All');

  const filteredShoes = useMemo(() => {
    if (filter === 'All') return allShoes;
    if (['Men', 'Women', 'Unisex'].includes(filter)) {
      return allShoes.filter(s => s.gender === filter);
    }
    return allShoes.filter(s => s.category === filter);
  }, [filter]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="pb-12">
          <Hero />
          <Highlights />
          <Collections activeFilter={filter} onFilterChange={setFilter} />
          <ShoesGrid shoes={filteredShoes} />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;