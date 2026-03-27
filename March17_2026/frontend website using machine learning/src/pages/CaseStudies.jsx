import { TrendingDown, DollarSign, Users, Clock, ArrowRight, Building2, Wifi, CreditCard, ShoppingBag } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const caseStudies = [
  {
    icon: Building2,
    industry: 'Banking & Finance',
    company: 'National Trust Bank',
    title: 'Reducing account closures by 41% using balance outflow prediction',
    challenge: 'The bank was losing high-value customers to competitors offering better rates. Traditional retention campaigns had a <5% success rate with no targeting.',
    solution: 'Deployed ChurnSense to analyze 2.3M accounts using net balance outflow, dormancy detection, and competitor exposure index features.',
    results: [
      { metric: '41%', label: 'Churn Reduction' },
      { metric: '$18M', label: 'Revenue Saved' },
      { metric: '3 weeks', label: 'Early Warning' },
      { metric: '89%', label: 'Model Accuracy' },
    ],
    color: '#6366f1',
    timeline: '6 months',
  },
  {
    icon: Wifi,
    industry: 'Telecommunications',
    company: 'ConnectPlus Telecom',
    title: 'Cutting subscriber churn from 5.2% to 2.1% monthly with ML-driven retention',
    challenge: 'High monthly churn among fiber optic customers paying $80+/month. Support ticket volume was a lagging indicator — by the time complaints piled up, customers had already decided to leave.',
    solution: 'Implemented usage trend analysis and payment behavior tracking to identify at-risk subscribers 4 weeks before churn, enabling proactive outreach.',
    results: [
      { metric: '60%', label: 'Churn Reduction' },
      { metric: '$42M', label: 'Annual Savings' },
      { metric: '4 weeks', label: 'Lead Time' },
      { metric: '93%', label: 'Model Precision' },
    ],
    color: '#06b6d4',
    timeline: '8 months',
  },
  {
    icon: ShoppingBag,
    industry: 'E-Commerce',
    company: 'ShopWave Retail',
    title: 'Boosting customer lifetime value by 28% through predictive engagement',
    challenge: 'With 500K+ active customers, the marketing team couldn\'t distinguish between naturally low-frequency buyers and those about to churn. Blanket discount campaigns were eroding margins.',
    solution: 'ChurnSense segmented the customer base using purchase recency, browsing patterns, and cart abandonment signals to deliver targeted retention offers only to truly at-risk customers.',
    results: [
      { metric: '28%', label: 'LTV Increase' },
      { metric: '35%', label: 'Fewer Discounts' },
      { metric: '2.4x', label: 'Campaign ROI' },
      { metric: '91%', label: 'AUC-ROC Score' },
    ],
    color: '#8b5cf6',
    timeline: '4 months',
  },
  {
    icon: CreditCard,
    industry: 'SaaS / Subscription',
    company: 'CloudMetrics Pro',
    title: 'Preventing enterprise contract non-renewals with account health scoring',
    challenge: 'Enterprise clients ($50K+ ARR) were churning at renewal time with little warning. The sales team lacked visibility into product usage patterns that predicted non-renewal.',
    solution: 'Built a real-time account health dashboard using feature login frequency, API usage trends, support sentiment analysis, and billing pattern changes.',
    results: [
      { metric: '52%', label: 'Renewal Uplift' },
      { metric: '$8.5M', label: 'ARR Retained' },
      { metric: '6 weeks', label: 'Early Signal' },
      { metric: '87%', label: 'Recall Rate' },
    ],
    color: '#10b981',
    timeline: '5 months',
  },
];

export default function CaseStudies() {
  const [ref, visible] = useScrollReveal(0.05);

  return (
    <div className="page case-studies" ref={ref}>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="section-label">Case Studies</span>
          <h1>Real Results From<br /><span className="gradient-text">Real Businesses</span></h1>
          <p>See how companies across industries use ChurnSense to predict churn, retain customers, and drive measurable business impact.</p>
        </div>
      </section>

      <section className="cases__list">
        {caseStudies.map((cs, i) => (
          <div key={i} className={`case-card ${visible ? 'reveal' : ''}`} style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="case-card__header">
              <div className="case-card__icon" style={{ background: `${cs.color}12`, color: cs.color }}>
                <cs.icon size={24} />
              </div>
              <div>
                <span className="case-card__industry" style={{ color: cs.color }}>{cs.industry}</span>
                <span className="case-card__company">{cs.company}</span>
              </div>
              <span className="case-card__timeline">
                <Clock size={13} /> {cs.timeline}
              </span>
            </div>
            <h3>{cs.title}</h3>
            <div className="case-card__sections">
              <div className="case-card__section">
                <h4>Challenge</h4>
                <p>{cs.challenge}</p>
              </div>
              <div className="case-card__section">
                <h4>Solution</h4>
                <p>{cs.solution}</p>
              </div>
            </div>
            <div className="case-card__results">
              {cs.results.map((r, j) => (
                <div key={j} className="case-card__result">
                  <span className="case-card__result-metric" style={{ color: cs.color }}>{r.metric}</span>
                  <span className="case-card__result-label">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
