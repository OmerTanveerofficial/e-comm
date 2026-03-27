import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const links = [
    { label: 'About', to: '/about' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Docs', to: '/docs' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-wrap">
            <Brain size={26} />
            <div className="navbar__logo-glow" />
          </div>
          <span>ChurnSense</span>
          <span className="navbar__version">AI</span>
        </Link>
        <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={location.pathname === l.to ? 'navbar__link--active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/#predictor" className="navbar__cta">
              <Sparkles size={14} />
              Try Predictor
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
