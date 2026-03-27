import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <Brain size={24} />
              <span>ChurnSense</span>
              <span className="footer__ai-badge">AI</span>
            </div>
            <p>ML-powered customer churn prediction and retention analytics platform. Helping businesses retain customers with data-driven insights.</p>
          </div>
          <div className="footer__links">
            <div>
              <h4>Product</h4>
              <Link to="/#how-it-works">How It Works <ArrowUpRight size={12} /></Link>
              <Link to="/#predictor">Churn Predictor <ArrowUpRight size={12} /></Link>
              <Link to="/#features">Feature Engineering <ArrowUpRight size={12} /></Link>
              <Link to="/#dashboard">Dashboard <ArrowUpRight size={12} /></Link>
            </div>
            <div>
              <h4>Resources</h4>
              <Link to="/docs">Documentation <ArrowUpRight size={12} /></Link>
              <Link to="/case-studies">Case Studies <ArrowUpRight size={12} /></Link>
              <Link to="/pricing">Pricing <ArrowUpRight size={12} /></Link>
            </div>
            <div>
              <h4>Company</h4>
              <Link to="/about">About Us <ArrowUpRight size={12} /></Link>
              <Link to="/contact">Contact <ArrowUpRight size={12} /></Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 ChurnSense. Built with React &amp; Machine Learning.</p>
          <div className="footer__social">
            <a href="#" aria-label="GitHub"><Github size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
