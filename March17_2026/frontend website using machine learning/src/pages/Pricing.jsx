import { useState } from 'react';
import { Check, X, Zap, Building2, Rocket, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    desc: 'For small teams getting started with churn prediction.',
    monthly: 49,
    yearly: 39,
    color: '#06b6d4',
    popular: false,
    features: [
      { text: 'Up to 5,000 customers', included: true },
      { text: 'Basic churn scoring', included: true },
      { text: '3 ML model runs / day', included: true },
      { text: 'Email alerts', included: true },
      { text: 'Dashboard analytics', included: true },
      { text: 'Feature importance reports', included: false },
      { text: 'Custom model training', included: false },
      { text: 'API access', included: false },
      { text: 'Dedicated support', included: false },
    ],
  },
  {
    name: 'Professional',
    icon: Rocket,
    desc: 'For growing businesses that need advanced predictions.',
    monthly: 149,
    yearly: 119,
    color: '#6366f1',
    popular: true,
    features: [
      { text: 'Up to 50,000 customers', included: true },
      { text: 'Advanced churn scoring', included: true },
      { text: 'Unlimited model runs', included: true },
      { text: 'Email & Slack alerts', included: true },
      { text: 'Full dashboard analytics', included: true },
      { text: 'Feature importance reports', included: true },
      { text: 'Custom model training', included: true },
      { text: 'REST API access', included: true },
      { text: 'Dedicated support', included: false },
    ],
  },
  {
    name: 'Enterprise',
    icon: Building2,
    desc: 'For large organizations with custom requirements.',
    monthly: null,
    yearly: null,
    color: '#8b5cf6',
    popular: false,
    features: [
      { text: 'Unlimited customers', included: true },
      { text: 'Enterprise ML pipeline', included: true },
      { text: 'Unlimited everything', included: true },
      { text: 'All notification channels', included: true },
      { text: 'Custom dashboards', included: true },
      { text: 'Advanced explainability', included: true },
      { text: 'Custom model training', included: true },
      { text: 'Full API + Webhooks', included: true },
      { text: '24/7 dedicated support', included: true },
    ],
  },
];

const faqs = [
  { q: 'How does the churn prediction model work?', a: 'Our ML models use ensemble methods (XGBoost, Random Forest, Neural Networks) trained on your historical customer data. The system automatically engineers predictive features from behavioral, transactional, and interaction data.' },
  { q: 'Can I integrate ChurnSense with my existing tools?', a: 'Yes! Professional and Enterprise plans include REST API access. We also offer native integrations with Salesforce, HubSpot, Segment, and major data warehouses.' },
  { q: 'How long does it take to see results?', a: 'Most customers see initial churn predictions within 2 weeks of onboarding. Model accuracy improves over 4-8 weeks as the system learns from your specific customer patterns.' },
  { q: 'Is my customer data secure?', a: 'Absolutely. We are SOC 2 Type II certified with end-to-end encryption. Data is processed in isolated environments and never shared across clients. GDPR and CCPA compliant.' },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [ref, visible] = useScrollReveal(0.05);

  return (
    <div className="page pricing" ref={ref}>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="section-label">Pricing</span>
          <h1>Simple, Transparent<br /><span className="gradient-text">Pricing</span></h1>
          <p>Start predicting churn today. No hidden fees, no long-term contracts.</p>
          <div className="pricing__toggle">
            <span className={!yearly ? 'pricing__toggle-active' : ''}>Monthly</span>
            <button className="pricing__toggle-btn" onClick={() => setYearly(!yearly)} aria-label="Toggle billing">
              <div className={`pricing__toggle-dot ${yearly ? 'pricing__toggle-dot--right' : ''}`} />
            </button>
            <span className={yearly ? 'pricing__toggle-active' : ''}>
              Yearly <span className="pricing__save">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      <section className="pricing__cards">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`pricing-card glass-card ${plan.popular ? 'pricing-card--popular' : ''} ${visible ? 'reveal' : ''}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {plan.popular && <div className="pricing-card__badge">Most Popular</div>}
            <div className="pricing-card__icon" style={{ background: `${plan.color}12`, color: plan.color }}>
              <plan.icon size={24} />
            </div>
            <h3>{plan.name}</h3>
            <p className="pricing-card__desc">{plan.desc}</p>
            <div className="pricing-card__price">
              {plan.monthly ? (
                <>
                  <span className="pricing-card__currency">$</span>
                  <span className="pricing-card__amount">{yearly ? plan.yearly : plan.monthly}</span>
                  <span className="pricing-card__period">/ month</span>
                </>
              ) : (
                <span className="pricing-card__custom">Custom Pricing</span>
              )}
            </div>
            <Link
              to="/contact"
              className={`btn ${plan.popular ? 'btn--primary btn--glow' : 'btn--glass'} pricing-card__btn`}
            >
              {plan.monthly ? 'Get Started' : 'Contact Sales'}
            </Link>
            <ul className="pricing-card__features">
              {plan.features.map((f, j) => (
                <li key={j} className={f.included ? '' : 'pricing-card__feature--disabled'}>
                  {f.included ? <Check size={16} /> : <X size={16} />}
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="pricing__faq">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="pricing__faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item glass-card ${openFaq === i ? 'faq-item--open' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-item__question">
                <HelpCircle size={18} />
                <span>{faq.q}</span>
                <span className="faq-item__toggle">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <div className="faq-item__answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
