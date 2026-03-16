import { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle, Info } from 'lucide-react';

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
  // Tenure — shorter tenure = higher risk
  if (values.tenure < 12) score += 2.0;
  else if (values.tenure < 24) score += 0.8;
  else if (values.tenure < 48) score -= 0.5;
  else score -= 1.5;

  // Monthly charges
  if (values.monthlyCharges > 80) score += 1.0;
  else if (values.monthlyCharges > 60) score += 0.3;
  else score -= 0.5;

  // Contract
  if (values.contract === 'Month-to-month') score += 1.5;
  else if (values.contract === 'One year') score -= 0.5;
  else score -= 1.5;

  // Internet service
  if (values.internetService === 'Fiber optic') score += 0.6;
  else if (values.internetService === 'No') score -= 1.0;

  // Support & security
  if (values.techSupport === 'No') score += 0.7;
  if (values.onlineSecurity === 'No') score += 0.5;

  // Billing
  if (values.paperlessBilling === 'Yes') score += 0.3;
  if (values.paymentMethod === 'Electronic check') score += 0.8;

  // Support tickets
  if (values.numSupportTickets > 4) score += 1.2;
  else if (values.numSupportTickets > 2) score += 0.5;

  const probability = sigmoid(score - 1.0);
  return Math.round(probability * 100);
}

function getFeatureContributions(values) {
  const contributions = [];
  if (values.tenure < 12) contributions.push({ feature: 'Short Tenure', impact: 'high', direction: 'negative' });
  if (values.contract === 'Month-to-month') contributions.push({ feature: 'Month-to-month Contract', impact: 'high', direction: 'negative' });
  if (values.monthlyCharges > 80) contributions.push({ feature: 'High Monthly Charges', impact: 'medium', direction: 'negative' });
  if (values.techSupport === 'No') contributions.push({ feature: 'No Tech Support', impact: 'medium', direction: 'negative' });
  if (values.paymentMethod === 'Electronic check') contributions.push({ feature: 'Electronic Check Payment', impact: 'medium', direction: 'negative' });
  if (values.onlineSecurity === 'No') contributions.push({ feature: 'No Online Security', impact: 'low', direction: 'negative' });
  if (values.tenure >= 48) contributions.push({ feature: 'Long Tenure', impact: 'high', direction: 'positive' });
  if (values.contract === 'Two year') contributions.push({ feature: 'Two Year Contract', impact: 'high', direction: 'positive' });
  if (values.techSupport === 'Yes') contributions.push({ feature: 'Has Tech Support', impact: 'medium', direction: 'positive' });
  return contributions.slice(0, 5);
}

export default function ChurnPredictor() {
  const [values, setValues] = useState(defaultValues);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setValues({ ...values, [key]: e.target.value });
  const setNum = (key) => (e) => setValues({ ...values, [key]: Number(e.target.value) });

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const churnProb = predictChurn(values);
      const contributions = getFeatureContributions(values);
      setResult({ churnProb, contributions });
      setLoading(false);
    }, 1200);
  };

  const riskLevel = result
    ? result.churnProb >= 70 ? 'high' : result.churnProb >= 40 ? 'medium' : 'low'
    : null;

  return (
    <section id="predictor" className="predictor">
      <div className="section-header">
        <span className="section-label">Interactive ML Tool</span>
        <h2>Customer Churn Predictor</h2>
        <p>Enter customer attributes below and our ML model will estimate churn probability with feature-level explanations.</p>
      </div>

      <div className="predictor__layout">
        <div className="predictor__form">
          <h3>Customer Attributes</h3>
          <div className="predictor__grid">
            <label>
              <span>Tenure (months)</span>
              <input type="range" min="0" max="72" value={values.tenure} onChange={setNum('tenure')} />
              <span className="predictor__range-val">{values.tenure}</span>
            </label>
            <label>
              <span>Monthly Charges ($)</span>
              <input type="range" min="18" max="120" value={values.monthlyCharges} onChange={setNum('monthlyCharges')} />
              <span className="predictor__range-val">${values.monthlyCharges}</span>
            </label>
            <label>
              <span>Support Tickets</span>
              <input type="range" min="0" max="9" value={values.numSupportTickets} onChange={setNum('numSupportTickets')} />
              <span className="predictor__range-val">{values.numSupportTickets}</span>
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
          <button className="btn btn--primary predictor__btn" onClick={handlePredict} disabled={loading}>
            <Zap size={18} />
            {loading ? 'Analyzing...' : 'Predict Churn Risk'}
          </button>
        </div>

        <div className="predictor__result">
          {!result && !loading && (
            <div className="predictor__empty">
              <Info size={48} />
              <p>Adjust customer attributes and click <strong>Predict</strong> to see the ML model output.</p>
            </div>
          )}
          {loading && (
            <div className="predictor__loading">
              <div className="spinner" />
              <p>Running ML model inference...</p>
            </div>
          )}
          {result && (
            <>
              <div className={`predictor__score predictor__score--${riskLevel}`}>
                {riskLevel === 'high' ? <AlertTriangle size={32} /> : riskLevel === 'medium' ? <AlertTriangle size={32} /> : <CheckCircle size={32} />}
                <div>
                  <span className="predictor__score-label">Churn Probability</span>
                  <span className="predictor__score-value">{result.churnProb}%</span>
                  <span className="predictor__score-risk">
                    {riskLevel === 'high' ? 'High Risk — Immediate action needed' : riskLevel === 'medium' ? 'Medium Risk — Monitor closely' : 'Low Risk — Customer likely to stay'}
                  </span>
                </div>
              </div>
              <div className="predictor__contributions">
                <h4>Top Contributing Features</h4>
                {result.contributions.map((c, i) => (
                  <div key={i} className={`contribution contribution--${c.direction}`}>
                    <span className="contribution__name">{c.feature}</span>
                    <span className={`contribution__badge contribution__badge--${c.impact}`}>
                      {c.impact} impact
                    </span>
                    <span className={`contribution__arrow contribution__arrow--${c.direction}`}>
                      {c.direction === 'negative' ? '↑ increases churn' : '↓ decreases churn'}
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
