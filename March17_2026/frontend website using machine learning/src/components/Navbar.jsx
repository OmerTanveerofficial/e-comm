import { useState, useEffect } from 'react';
import { Brain, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['dashboard', 'features', 'predictor', 'how-it-works'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Predictor', href: '#predictor' },
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__brand">
          <div className="navbar__logo-wrap">
            <Brain size={26} />
            <div className="navbar__logo-glow" />
          </div>
          <span>ChurnSense</span>
          <span className="navbar__version">AI</span>
        </a>
        <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={activeSection === l.href.slice(1) ? 'navbar__link--active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#predictor" className="navbar__cta" onClick={() => setMenuOpen(false)}>
              <Sparkles size={14} />
              Try Predictor
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
