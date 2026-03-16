import { ArrowRight, TrendingDown, Users, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__badge">ML-Powered Customer Intelligence</div>
        <h1 className="hero__title">
          Predict Customer Churn<br />
          <span className="hero__title--accent">Before It Happens</span>
        </h1>
        <p className="hero__subtitle">
          Leverage machine learning to identify at-risk customers, understand churn drivers,
          and take proactive action to boost retention and revenue.
        </p>
        <div className="hero__actions">
          <a href="#predictor" className="btn btn--primary">
            Try the Predictor <ArrowRight size={18} />
          </a>
          <a href="#how-it-works" className="btn btn--secondary">
            Learn How It Works
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <TrendingDown size={20} />
            <div>
              <strong>35%</strong>
              <span>Churn Reduction</span>
            </div>
          </div>
          <div className="hero__stat">
            <Users size={20} />
            <div>
              <strong>10K+</strong>
              <span>Customers Analyzed</span>
            </div>
          </div>
          <div className="hero__stat">
            <ShieldCheck size={20} />
            <div>
              <strong>92%</strong>
              <span>Model Accuracy</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__card hero__card--1">
          <div className="hero__card-icon hero__card-icon--red" />
          <div>
            <p className="hero__card-label">High Risk Customer</p>
            <p className="hero__card-value">87% Churn Probability</p>
          </div>
        </div>
        <div className="hero__card hero__card--2">
          <div className="hero__card-icon hero__card-icon--green" />
          <div>
            <p className="hero__card-label">Loyal Customer</p>
            <p className="hero__card-value">12% Churn Probability</p>
          </div>
        </div>
        <div className="hero__card hero__card--3">
          <div className="hero__card-icon hero__card-icon--yellow" />
          <div>
            <p className="hero__card-label">At-Risk Customer</p>
            <p className="hero__card-value">54% Churn Probability</p>
          </div>
        </div>
        <div className="hero__orbit" />
      </div>
    </section>
  );
}
