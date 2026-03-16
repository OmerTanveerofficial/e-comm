import { Brain, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Brain size={24} />
          <span>ChurnSense</span>
          <p>ML-powered customer churn prediction and retention analytics platform.</p>
        </div>
        <div className="footer__links">
          <div>
            <h4>Product</h4>
            <a href="#how-it-works">How It Works</a>
            <a href="#predictor">Churn Predictor</a>
            <a href="#features">Feature Engineering</a>
            <a href="#dashboard">Dashboard</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="#dashboard">Documentation</a>
            <a href="#dashboard">API Reference</a>
            <a href="#dashboard">Case Studies</a>
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
