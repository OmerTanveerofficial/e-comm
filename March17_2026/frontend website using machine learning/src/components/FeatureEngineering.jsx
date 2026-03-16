import { Layers, Clock, TrendingUp, ArrowDownRight, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: Clock,
    name: 'Account Dormancy',
    desc: 'Detects periods of inactivity that signal disengagement, comparing current usage against historical patterns.',
    importance: 92,
  },
  {
    icon: TrendingUp,
    name: 'Usage Trend Analysis',
    desc: 'Tracks the trajectory of product usage over time, identifying declining engagement before it leads to churn.',
    importance: 87,
  },
  {
    icon: ArrowDownRight,
    name: 'Net Balance Outflow',
    desc: 'Monitors withdrawal patterns and net balance changes over rolling windows to detect financial disengagement.',
    importance: 78,
  },
  {
    icon: CreditCard,
    name: 'Payment Behavior',
    desc: 'Analyzes payment method changes, late payments, and billing disputes as early churn warning signals.',
    importance: 71,
  },
  {
    icon: Headphones,
    name: 'Support Interaction Score',
    desc: 'Quantifies support ticket frequency, resolution time, and sentiment to measure customer satisfaction.',
    importance: 65,
  },
  {
    icon: Layers,
    name: 'Competitor Exposure Index',
    desc: 'External data integration measuring competitor offer attractiveness relative to current customer plan.',
    importance: 58,
  },
];

export default function FeatureEngineering() {
  return (
    <section id="features" className="features">
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
          <div key={i} className="feature-card">
            <div className="feature-card__header">
              <div className="feature-card__icon">
                <f.icon size={22} />
              </div>
              <h3>{f.name}</h3>
            </div>
            <p>{f.desc}</p>
            <div className="feature-card__bar-wrap">
              <div className="feature-card__bar-label">
                <span>Feature Importance</span>
                <span>{f.importance}%</span>
              </div>
              <div className="feature-card__bar">
                <div className="feature-card__bar-fill" style={{ width: `${f.importance}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
