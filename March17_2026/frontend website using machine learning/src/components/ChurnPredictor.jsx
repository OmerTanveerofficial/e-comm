import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, CheckCircle, Info, Brain, Shield, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const defaultValues = {
  tenure: 24,
  monthlyCharges: 70,
  totalCharges: 1680,
  contract: 'Month-to-month',
  internetService: 'Fiber optic',
  techSupport: 'No',
  onlineSecurity: 'No',
  paperlessBilling: 'Yes',
  paymentMethod: 'Electronic check',
  numSupportTickets: 3,
};

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function predictChurn(values) {
  let score = 0;
  if (values.tenure < 12) score += 2.0;
  else if (values.tenure < 24) score += 0.8;
  else if (values.tenure < 48) score -= 0.5;
  else score -= 1.5;
  if (values.monthlyCharges > 80) score += 1.0;
  else if (values.monthlyCharges > 60) score += 0.3;
  else score -= 0.5;
  if (values.contract === 'Month-to-month') score += 1.5;
  else if (values.contract === 'One year') score -= 0.5;
  else score -= 1.5;
  if (values.internetService === 'Fiber optic') score += 0.6;
  else if (values.internetService === 'No') score -= 1.0;
  if (values.techSupport === 'No') score += 0.7;
  if (values.onlineSecurity === 'No') score += 0.5;
  if (values.paperlessBilling === 'Yes') score += 0.3;
  if (values.paymentMethod === 'Electronic check') score += 0.8;
  if (values.numSupportTickets > 4) score += 1.2;
  else if (values.numSupportTickets > 2) score += 0.5;
  return Math.round(sigmoid(score - 1.0) * 100);
}

function getFeatureContributions(values) {
  const c = [];
  if (values.tenure < 12) c.push({ feature: 'Short Tenure', impact: 'high', direction: 'negative' });
  if (values.contract === 'Month-to-month') c.push({ feature: 'Month-to-month Contract', impact: 'high', direction: 'negative' });
  if (values.monthlyCharges > 80) c.push({ feature: 'High Monthly Charges', impact: 'medium', direction: 'negative' });
  if (values.techSupport === 'No') c.push({ feature: 'No Tech Support', impact: 'medium', direction: 'negative' });
  if (values.paymentMethod === 'Electronic check') c.push({ feature: 'Electronic Check Payment', impact: 'medium', direction: 'negative' });
  if (values.onlineSecurity === 'No') c.push({ feature: 'No Online Security', impact: 'low', direction: 'negative' });
  if (values.tenure >= 48) c.push({ feature: 'Long Tenure', impact: 'high', direction: 'positive' });
  if (values.contract === 'Two year') c.push({ feature: 'Two Year Contract', impact: 'high', direction: 'positive' });
  if (values.techSupport === 'Yes') c.push({ feature: 'Has Tech Support', impact: 'medium', direction: 'positive' });
  return c.slice(0, 5);
}

function GaugeMeter({ value, riskLevel }) {
  const angle = (value / 100) * 180;
  const colors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
  const color = colors[riskLevel] || '#6366f1';

  return (
    <div className="gauge">
      <svg viewBox="0 0 200 120" className="gauge__svg">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
          className="gauge__fill"
        />
        <circle
          cx={100 + 80 * Math.cos(Math.PI + (angle * Math.PI) / 180)}
          cy={110 + 80 * Math.sin(Math.PI + (angle * Math.PI) / 180)}
          r="8"
          fill={color}
          className="gauge__dot"
        />
      </svg>
      <div className="gauge__value" style={{ color }}>{value}%</div>
      <div className="gauge__label">Churn Probability</div>
    </div>
  );
}

export default function ChurnPredictor() {
  const [values, setValues] = useState(defaultValues);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ref, visible] = useScrollReveal(0.1);

  const set = (key) => (e) => setValues({ ...values, [key]: e.target.value });
  const setNum = (key) => (e) => setValues({ ...values, [key]: Number(e.target.value) });

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setProgress(0);
    const steps = [20, 45, 70, 90, 100];
    steps.forEach((s, i) => {
      setTimeout(() => setProgress(s), (i + 1) * 250);
    });
    setTimeout(() => {
      const churnProb = predictChurn(values);
      const contributions = getFeatureContributions(values);
      setResult({ churnProb, contributions });
      setLoading(false);
    }, 1500);
  };

  const riskLevel = result
    ? result.churnProb >= 70 ? 'high' : result.churnProb >= 40 ? 'medium' : 'low'
    : null;

  return (
    <section id="predictor" className="predictor" ref={ref}>
      <div className="section-header">
        <span className="section-label">Interactive ML Tool</span>
        <h2>Customer Churn Predictor</h2>
        <p>Enter customer attributes below and our ML model will estimate churn probability with feature-level explanations.</p>
      </div>

      <div className={`predictor__layout ${visible ? 'reveal' : ''}`}>
        <div className="predictor__form glass-card">
          <div className="predictor__form-header">
            <Brain size={20} />
            <h3>Customer Attributes</h3>
          </div>
          <div className="predictor__grid">
            <label>
              <span>Tenure (months)</span>
              <div className="range-wrap">
                <input type="range" min="0" max="72" value={values.tenure} onChange={setNum('tenure')} />
                <span className="predictor__range-val">{values.tenure}</span>
              </div>
              <div className="range-labels"><span>New</span><span>Loyal</span></div>
            </label>
            <label>
              <span>Monthly Charges ($)</span>
              <div className="range-wrap">
                <input type="range" min="18" max="120" value={values.monthlyCharges} onChange={setNum('monthlyCharges')} />
                <span className="predictor__range-val">${values.monthlyCharges}</span>
              </div>
              <div className="range-labels"><span>$18</span><span>$120</span></div>
            </label>
            <label>
              <span>Support Tickets</span>
              <div className="range-wrap">
                <input type="range" min="0" max="9" value={values.numSupportTickets} onChange={setNum('numSupportTickets')} />
                <span className="predictor__range-val">{values.numSupportTickets}</span>
              </div>
              <div className="range-labels"><span>None</span><span>Many</span></div>
            </label>
            <label>
              <span>Contract Type</span>
              <select value={values.contract} onChange={set('contract')}>
                <option>Month-to-month</option>
                <option>One year</option>
                <option>Two year</option>
              </select>
            </label>
            <label>
              <span>Internet Service</span>
              <select value={values.internetService} onChange={set('internetService')}>
                <option>Fiber optic</option>
                <option>DSL</option>
                <option>No</option>
              </select>
            </label>
            <label>
              <span>Payment Method</span>
              <select value={values.paymentMethod} onChange={set('paymentMethod')}>
                <option>Electronic check</option>
                <option>Mailed check</option>
                <option>Bank transfer</option>
                <option>Credit card</option>
              </select>
            </label>
            <label>
              <span>Tech Support</span>
              <select value={values.techSupport} onChange={set('techSupport')}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </label>
            <label>
              <span>Online Security</span>
              <select value={values.onlineSecurity} onChange={set('onlineSecurity')}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </label>
          </div>
          <button className="btn btn--primary btn--glow predictor__btn" onClick={handlePredict} disabled={loading}>
            <Zap size={18} />
            {loading ? 'Analyzing...' : 'Predict Churn Risk'}
          </button>
        </div>

        <div className="predictor__result glass-card">
          {!result && !loading && (
            <div className="predictor__empty">
              <div className="predictor__empty-icon">
                <Brain size={40} />
              </div>
              <h4>ML Model Ready</h4>
              <p>Adjust customer attributes and click <strong>Predict</strong> to run inference.</p>
            </div>
          )}
          {loading && (
            <div className="predictor__loading">
              <div className="predictor__loading-ring">
                <div className="spinner-ring" />
                <Brain size={24} />
              </div>
              <p>Running ML model inference...</p>
              <div className="predictor__progress">
                <div className="predictor__progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <span className="predictor__progress-text">{progress}% — {progress < 40 ? 'Preprocessing features' : progress < 75 ? 'Running model' : 'Generating insights'}</span>
            </div>
          )}
          {result && (
            <div className="predictor__result-inner">
              <GaugeMeter value={result.churnProb} riskLevel={riskLevel} />

              <div className={`predictor__risk-badge predictor__risk-badge--${riskLevel}`}>
                {riskLevel === 'high' ? <AlertTriangle size={16} /> : riskLevel === 'medium' ? <Shield size={16} /> : <CheckCircle size={16} />}
                {riskLevel === 'high' ? 'High Risk — Immediate action needed' : riskLevel === 'medium' ? 'Medium Risk — Monitor closely' : 'Low Risk — Customer likely to stay'}
              </div>

              <div className="predictor__contributions">
                <h4>Feature Contributions</h4>
                {result.contributions.map((c, i) => (
                  <div key={i} className={`contribution contribution--${c.direction}`} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="contribution__icon">
                      {c.direction === 'negative' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                    <span className="contribution__name">{c.feature}</span>
                    <span className={`contribution__badge contribution__badge--${c.impact}`}>
                      {c.impact}
                    </span>
                  </div>
                ))}
              </div>

              <div className="predictor__recommendation">
                <h4>Recommended Actions</h4>
                <ul>
                  {riskLevel === 'high' && (
                    <>
                      <li>Offer a discounted annual contract upgrade</li>
                      <li>Assign a dedicated account manager</li>
                      <li>Provide complimentary tech support for 3 months</li>
                    </>
                  )}
                  {riskLevel === 'medium' && (
                    <>
                      <li>Send personalized retention offer via email</li>
                      <li>Recommend value-add services (security, support)</li>
                      <li>Schedule a satisfaction check-in call</li>
                    </>
                  )}
                  {riskLevel === 'low' && (
                    <>
                      <li>Continue current engagement strategy</li>
                      <li>Offer loyalty rewards or referral bonuses</li>
                      <li>Invite to beta test new features</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
