import { Database, Cpu, BarChart3, Target } from 'lucide-react';

const steps = [
  {
    icon: Database,
    title: 'Data Collection',
    desc: 'Gather customer behavioral data including transaction history, support interactions, usage patterns, and demographic information.',
  },
  {
    icon: Cpu,
    title: 'Feature Engineering',
    desc: 'Transform raw data into predictive features — dormant account flags, withdrawal trends, net balance outflow, and competitor offer exposure.',
  },
  {
    icon: BarChart3,
    title: 'Model Training',
    desc: 'Train ML models (Random Forest, XGBoost, Neural Networks) on historical data to learn complex churn patterns and indicators.',
  },
  {
    icon: Target,
    title: 'Prediction & Action',
    desc: 'Generate real-time churn risk scores and prescriptive retention strategies tailored to each customer segment.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="section-header">
        <span className="section-label">The ML Pipeline</span>
        <h2>How Churn Prediction Works</h2>
        <p>Our machine learning pipeline processes customer data through four stages to deliver actionable retention insights.</p>
      </div>
      <div className="how-it-works__grid">
        {steps.map((s, i) => (
          <div key={i} className="step-card">
            <div className="step-card__number">{String(i + 1).padStart(2, '0')}</div>
            <div className="step-card__icon">
              <s.icon size={28} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            {i < steps.length - 1 && <div className="step-card__connector" />}
          </div>
        ))}
      </div>
    </section>
  );
}
