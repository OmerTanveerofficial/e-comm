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
              <a href="#how-it-works">How It Works <ArrowUpRight size={12} /></a>
              <a href="#predictor">Churn Predictor <ArrowUpRight size={12} /></a>
              <a href="#features">Feature Engineering <ArrowUpRight size={12} /></a>
              <a href="#dashboard">Dashboard <ArrowUpRight size={12} /></a>
            </div>
            <div>
              <h4>Resources</h4>
              <a href="#dashboard">Documentation <ArrowUpRight size={12} /></a>
              <a href="#dashboard">API Reference <ArrowUpRight size={12} /></a>
              <a href="#dashboard">Case Studies <ArrowUpRight size={12} /></a>
              <a href="#dashboard">Research Papers <ArrowUpRight size={12} /></a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#how-it-works">About Us <ArrowUpRight size={12} /></a>
              <a href="#dashboard">Blog <ArrowUpRight size={12} /></a>
              <a href="#dashboard">Careers <ArrowUpRight size={12} /></a>
              <a href="#dashboard">Contact <ArrowUpRight size={12} /></a>
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
