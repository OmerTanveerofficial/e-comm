import { useEffect, useState } from 'react';
import { ArrowRight, TrendingDown, Users, ShieldCheck, Activity } from 'lucide-react';
import ParticleGrid from './ParticleGrid';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';

const words = ['Before It Happens', 'With ML Precision', 'In Real Time', 'At Scale'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [ref, visible] = useScrollReveal(0.1);

  const churnReduction = useCountUp(35, 2000, 0, visible);
  const customersAnalyzed = useCountUp(10, 2000, 0, visible);
  const modelAccuracy = useCountUp(92, 2000, 0, visible);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setWordIdx((wordIdx + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <section className="hero" ref={ref}>
      <ParticleGrid />
      <div className="hero__gradient-orb hero__gradient-orb--1" />
      <div className="hero__gradient-orb hero__gradient-orb--2" />

      <div className={`hero__content ${visible ? 'reveal' : ''}`}>
        <div className="hero__badge">
          <Activity size={14} />
          ML-Powered Customer Intelligence
        </div>
        <h1 className="hero__title">
          Predict Customer Churn
          <br />
          <span className="hero__title--accent">
            {displayed}
            <span className="hero__cursor">|</span>
          </span>
        </h1>
        <p className="hero__subtitle">
          Leverage machine learning to identify at-risk customers, understand churn drivers,
          and take proactive action to boost retention and revenue.
        </p>
        <div className="hero__actions">
          <a href="#predictor" className="btn btn--primary btn--glow">
            Try the Predictor <ArrowRight size={18} />
          </a>
          <a href="#how-it-works" className="btn btn--glass">
            Learn How It Works
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-icon">
              <TrendingDown size={18} />
            </div>
            <div>
              <strong>{churnReduction}%</strong>
              <span>Churn Reduction</span>
            </div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-icon">
              <Users size={18} />
            </div>
            <div>
              <strong>{customersAnalyzed}K+</strong>
              <span>Customers Analyzed</span>
            </div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-icon">
              <ShieldCheck size={18} />
            </div>
            <div>
              <strong>{modelAccuracy}%</strong>
              <span>Model Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`hero__visual ${visible ? 'reveal reveal--delay-2' : ''}`}>
        <div className="hero__ring hero__ring--outer" />
        <div className="hero__ring hero__ring--inner" />
        <div className="hero__card hero__card--1">
          <div className="hero__card-pulse hero__card-pulse--red" />
          <div className="hero__card-icon hero__card-icon--red" />
          <div>
            <p className="hero__card-label">High Risk</p>
            <p className="hero__card-value">87% <span>Churn</span></p>
          </div>
        </div>
        <div className="hero__card hero__card--2">
          <div className="hero__card-pulse hero__card-pulse--green" />
          <div className="hero__card-icon hero__card-icon--green" />
          <div>
            <p className="hero__card-label">Loyal</p>
            <p className="hero__card-value">12% <span>Churn</span></p>
          </div>
        </div>
        <div className="hero__card hero__card--3">
          <div className="hero__card-pulse hero__card-pulse--yellow" />
          <div className="hero__card-icon hero__card-icon--yellow" />
          <div>
            <p className="hero__card-label">At-Risk</p>
            <p className="hero__card-value">54% <span>Churn</span></p>
          </div>
        </div>
        <div className="hero__center-badge">
          <Activity size={20} />
          <span>Live</span>
        </div>
      </div>
    </section>
  );
}
