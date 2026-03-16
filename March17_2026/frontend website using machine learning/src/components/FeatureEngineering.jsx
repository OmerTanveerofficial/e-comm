import { useState } from 'react';
import { Layers, Clock, TrendingUp, ArrowDownRight, CreditCard, Headphones, ChevronRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const features = [
  {
    icon: Clock,
    name: 'Account Dormancy',
    desc: 'Detects periods of inactivity that signal disengagement, comparing current usage against historical patterns.',
    importance: 92,
    color: '#6366f1',
    details: 'Uses a 30-day rolling window to compare current login frequency against the customer\'s historical average. Triggers alert when activity drops below 40% of baseline.',
  },
  {
    icon: TrendingUp,
    name: 'Usage Trend Analysis',
    desc: 'Tracks the trajectory of product usage over time, identifying declining engagement before it leads to churn.',
    importance: 87,
    color: '#8b5cf6',
    details: 'Applies linear regression over 90-day usage data to calculate slope. Negative slopes exceeding -0.3 standard deviations flag declining engagement.',
  },
  {
    icon: ArrowDownRight,
    name: 'Net Balance Outflow',
    desc: 'Monitors withdrawal patterns and net balance changes over rolling windows to detect financial disengagement.',
    importance: 78,
    color: '#06b6d4',
    details: 'Computes net deposits minus withdrawals over 7, 14, and 30-day windows. Sustained negative flow for 2+ weeks indicates disengagement.',
  },
  {
    icon: CreditCard,
    name: 'Payment Behavior',
    desc: 'Analyzes payment method changes, late payments, and billing disputes as early churn warning signals.',
    importance: 71,
    color: '#f59e0b',
    details: 'Tracks payment method switches, late payment frequency, and dispute history. Customers who switch to manual payments show 3x higher churn rates.',
  },
  {
    icon: Headphones,
    name: 'Support Interaction Score',
    desc: 'Quantifies support ticket frequency, resolution time, and sentiment to measure customer satisfaction.',
    importance: 65,
    color: '#ef4444',
    details: 'Weighted score combining ticket volume (40%), average resolution time (30%), and NLP sentiment analysis of interactions (30%).',
  },
  {
    icon: Layers,
    name: 'Competitor Exposure Index',
    desc: 'External data integration measuring competitor offer attractiveness relative to current customer plan.',
    importance: 58,
    color: '#10b981',
    details: 'Aggregates market pricing data and promotional offers from top 5 competitors, scoring relative value proposition on a 0-100 scale.',
  },
];

function FeatureCard({ f, i, visible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`feature-card ${visible ? 'reveal' : ''} ${expanded ? 'feature-card--expanded' : ''}`}
      style={{ animationDelay: `${i * 0.1}s` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="feature-card__glow" style={{ background: `radial-gradient(circle at 50% 0%, ${f.color}15, transparent 70%)` }} />
      <div className="feature-card__header">
        <div className="feature-card__icon" style={{ background: `${f.color}12`, color: f.color }}>
          <f.icon size={22} />
        </div>
        <h3>{f.name}</h3>
        <ChevronRight size={16} className={`feature-card__chevron ${expanded ? 'feature-card__chevron--open' : ''}`} />
      </div>
      <p>{f.desc}</p>
      {expanded && (
        <div className="feature-card__details">
          <div className="feature-card__details-inner">{f.details}</div>
        </div>
      )}
      <div className="feature-card__bar-wrap">
        <div className="feature-card__bar-label">
          <span>Feature Importance</span>
          <span style={{ color: f.color }}>{f.importance}%</span>
        </div>
        <div className="feature-card__bar">
          <div
            className="feature-card__bar-fill"
            style={{
              width: visible ? `${f.importance}%` : '0%',
              background: `linear-gradient(90deg, ${f.color}, ${f.color}88)`,
              transitionDelay: `${i * 0.15 + 0.3}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeatureEngineering() {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section id="features" className="features" ref={ref}>
      <div className="section-header">
        <span className="section-label">Feature Engineering</span>
        <h2>Engineered Predictive Features</h2>
        <p>
          The most creative part of churn prediction — transforming raw data into signals
          that ML models can use to understand <em>why</em> customers leave.
        </p>
      </div>
      <div className="features__grid">
        {features.map((f, i) => (
          <FeatureCard key={i} f={f} i={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}
