import { Database, Cpu, BarChart3, Target, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const steps = [
  {
    icon: Database,
    title: 'Data Collection',
    desc: 'Gather customer behavioral data including transaction history, support interactions, usage patterns, and demographic information.',
    color: '#6366f1',
    tag: 'Input Layer',
  },
  {
    icon: Cpu,
    title: 'Feature Engineering',
    desc: 'Transform raw data into predictive features — dormant account flags, withdrawal trends, net balance outflow, and competitor offer exposure.',
    color: '#06b6d4',
    tag: 'Processing',
  },
  {
    icon: BarChart3,
    title: 'Model Training',
    desc: 'Train ML models (Random Forest, XGBoost, Neural Networks) on historical data to learn complex churn patterns and indicators.',
    color: '#8b5cf6',
    tag: 'Learning',
  },
  {
    icon: Target,
    title: 'Prediction & Action',
    desc: 'Generate real-time churn risk scores and prescriptive retention strategies tailored to each customer segment.',
    color: '#10b981',
    tag: 'Output Layer',
  },
];

export default function HowItWorks() {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section id="how-it-works" className="how-it-works" ref={ref}>
      <div className="section-header">
        <span className="section-label">The ML Pipeline</span>
        <h2>How Churn Prediction Works</h2>
        <p>Our machine learning pipeline processes customer data through four stages to deliver actionable retention insights.</p>
      </div>
      <div className="how-it-works__grid">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`step-card ${visible ? 'reveal' : ''}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="step-card__tag" style={{ color: s.color, background: `${s.color}15` }}>
              {s.tag}
            </div>
            <div className="step-card__number" style={{ color: s.color }}>{String(i + 1).padStart(2, '0')}</div>
            <div className="step-card__icon" style={{ background: `${s.color}12`, color: s.color }}>
              <s.icon size={28} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="step-card__line" style={{ background: `linear-gradient(to right, ${s.color}, transparent)` }} />
            {i < steps.length - 1 && (
              <div className="step-card__arrow">
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
