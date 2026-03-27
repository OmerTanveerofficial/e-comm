import { useState } from 'react';
import { Book, Code, Database, Cpu, BarChart3, Shield, Webhook, Terminal, Copy, Check } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const sidebar = [
  { id: 'getting-started', label: 'Getting Started', icon: Book },
  { id: 'api-reference', label: 'API Reference', icon: Code },
  { id: 'data-format', label: 'Data Format', icon: Database },
  { id: 'models', label: 'ML Models', icon: Cpu },
  { id: 'metrics', label: 'Metrics & Evaluation', icon: BarChart3 },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'security', label: 'Security', icon: Shield },
];

const codeExamples = {
  predict: `// Predict churn for a single customer
const response = await fetch('https://api.churnsense.ai/v1/predict', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customer_id: 'cust_12345',
    tenure_months: 24,
    monthly_charges: 79.99,
    contract_type: 'month-to-month',
    internet_service: 'fiber_optic',
    tech_support: false,
    payment_method: 'electronic_check'
  })
});

const result = await response.json();
// {
//   "customer_id": "cust_12345",
//   "churn_probability": 0.73,
//   "risk_level": "high",
//   "top_factors": [...],
//   "recommended_actions": [...]
// }`,
  batch: `// Batch prediction for multiple customers
const response = await fetch('https://api.churnsense.ai/v1/predict/batch', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customers: [
      { customer_id: 'cust_001', tenure_months: 6, ... },
      { customer_id: 'cust_002', tenure_months: 48, ... },
    ]
  })
});`,
  webhook: `// Webhook payload for high-risk alerts
{
  "event": "churn_alert",
  "timestamp": "2026-03-19T10:30:00Z",
  "data": {
    "customer_id": "cust_12345",
    "churn_probability": 0.87,
    "risk_level": "high",
    "trigger": "usage_decline",
    "recommended_action": "retention_offer"
  }
}`,
};

function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-block">
      <div className="code-block__header">
        <span>{language}</span>
        <button onClick={handleCopy} className="code-block__copy">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [ref, visible] = useScrollReveal(0.05);

  return (
    <div className="page docs" ref={ref}>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="section-label">Documentation</span>
          <h1>Developer<br /><span className="gradient-text">Documentation</span></h1>
          <p>Everything you need to integrate ChurnSense into your application and start predicting churn.</p>
        </div>
      </section>

      <section className="docs__layout">
        <aside className="docs__sidebar glass-card">
          {sidebar.map(item => (
            <button
              key={item.id}
              className={`docs__sidebar-item ${activeSection === item.id ? 'docs__sidebar-item--active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </aside>

        <div className={`docs__content ${visible ? 'reveal' : ''}`}>
          {activeSection === 'getting-started' && (
            <div className="docs__section">
              <h2><Terminal size={22} /> Getting Started</h2>
              <p>Welcome to ChurnSense! Follow these steps to start predicting customer churn in minutes.</p>
              <div className="docs__steps">
                <div className="docs__step">
                  <span className="docs__step-num">1</span>
                  <div>
                    <h4>Create an Account</h4>
                    <p>Sign up at churnsense.ai and navigate to the API settings page to generate your API key.</p>
                  </div>
                </div>
                <div className="docs__step">
                  <span className="docs__step-num">2</span>
                  <div>
                    <h4>Install the SDK</h4>
                    <CodeBlock code="npm install @churnsense/sdk" language="bash" />
                  </div>
                </div>
                <div className="docs__step">
                  <span className="docs__step-num">3</span>
                  <div>
                    <h4>Make Your First Prediction</h4>
                    <CodeBlock code={codeExamples.predict} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'api-reference' && (
            <div className="docs__section">
              <h2><Code size={22} /> API Reference</h2>
              <p>The ChurnSense API uses REST with JSON payloads. All endpoints require authentication via Bearer token.</p>
              <div className="docs__endpoint">
                <div className="docs__endpoint-method docs__endpoint-method--post">POST</div>
                <code>/v1/predict</code>
                <span>Single customer prediction</span>
              </div>
              <CodeBlock code={codeExamples.predict} />
              <div className="docs__endpoint">
                <div className="docs__endpoint-method docs__endpoint-method--post">POST</div>
                <code>/v1/predict/batch</code>
                <span>Batch prediction (up to 1000 customers)</span>
              </div>
              <CodeBlock code={codeExamples.batch} />
              <div className="docs__endpoint">
                <div className="docs__endpoint-method docs__endpoint-method--get">GET</div>
                <code>/v1/models</code>
                <span>List available ML models</span>
              </div>
              <div className="docs__endpoint">
                <div className="docs__endpoint-method docs__endpoint-method--get">GET</div>
                <code>/v1/customers/:id/history</code>
                <span>Customer churn score history</span>
              </div>
            </div>
          )}

          {activeSection === 'data-format' && (
            <div className="docs__section">
              <h2><Database size={22} /> Data Format</h2>
              <p>ChurnSense accepts customer data in the following format. All fields are optional except customer_id.</p>
              <table className="docs__table">
                <thead>
                  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>customer_id</code></td><td>string</td><td>Unique customer identifier (required)</td></tr>
                  <tr><td><code>tenure_months</code></td><td>integer</td><td>Months as a customer</td></tr>
                  <tr><td><code>monthly_charges</code></td><td>float</td><td>Monthly billing amount</td></tr>
                  <tr><td><code>contract_type</code></td><td>string</td><td>month-to-month, one-year, two-year</td></tr>
                  <tr><td><code>internet_service</code></td><td>string</td><td>fiber_optic, dsl, none</td></tr>
                  <tr><td><code>tech_support</code></td><td>boolean</td><td>Has tech support subscription</td></tr>
                  <tr><td><code>online_security</code></td><td>boolean</td><td>Has online security subscription</td></tr>
                  <tr><td><code>payment_method</code></td><td>string</td><td>electronic_check, mailed_check, bank_transfer, credit_card</td></tr>
                  <tr><td><code>support_tickets</code></td><td>integer</td><td>Number of support tickets in last 90 days</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'models' && (
            <div className="docs__section">
              <h2><Cpu size={22} /> ML Models</h2>
              <p>ChurnSense offers multiple ML model architectures optimized for different use cases.</p>
              <div className="docs__model-grid">
                {[
                  { name: 'XGBoost Ensemble', accuracy: '92%', speed: 'Fast', best: 'Structured tabular data' },
                  { name: 'Random Forest', accuracy: '89%', speed: 'Fast', best: 'High interpretability needs' },
                  { name: 'Neural Network', accuracy: '94%', speed: 'Medium', best: 'Large datasets (100K+)' },
                  { name: 'LightGBM', accuracy: '91%', speed: 'Fastest', best: 'Real-time scoring' },
                ].map((m, i) => (
                  <div key={i} className="docs__model-card glass-card">
                    <h4>{m.name}</h4>
                    <div className="docs__model-stats">
                      <span>Accuracy: <strong>{m.accuracy}</strong></span>
                      <span>Speed: <strong>{m.speed}</strong></span>
                    </div>
                    <p>Best for: {m.best}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'metrics' && (
            <div className="docs__section">
              <h2><BarChart3 size={22} /> Metrics & Evaluation</h2>
              <p>Understanding how we measure model performance and what each metric means for your business.</p>
              <div className="docs__metric-list">
                {[
                  { name: 'AUC-ROC', value: '0.92', desc: 'Area under the ROC curve — measures the model\'s ability to distinguish between churners and non-churners.' },
                  { name: 'Precision', value: '0.89', desc: 'Of all customers flagged as churners, 89% actually churned. Minimizes false alarms.' },
                  { name: 'Recall', value: '0.84', desc: 'Of all actual churners, the model caught 84%. Measures how many at-risk customers we identify.' },
                  { name: 'F1 Score', value: '0.86', desc: 'Harmonic mean of precision and recall, providing a balanced measure of model performance.' },
                ].map((m, i) => (
                  <div key={i} className="docs__metric">
                    <div className="docs__metric-header">
                      <span className="docs__metric-name">{m.name}</span>
                      <span className="docs__metric-value">{m.value}</span>
                    </div>
                    <p>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'webhooks' && (
            <div className="docs__section">
              <h2><Webhook size={22} /> Webhooks</h2>
              <p>Receive real-time notifications when customer churn risk changes. Configure webhooks in your dashboard settings.</p>
              <h4>Webhook Events</h4>
              <ul className="docs__list">
                <li><code>churn_alert</code> — Triggered when a customer crosses the high-risk threshold</li>
                <li><code>risk_change</code> — Triggered when risk level changes (low → medium, medium → high)</li>
                <li><code>batch_complete</code> — Triggered when a batch prediction job finishes</li>
                <li><code>model_retrained</code> — Triggered when your custom model finishes retraining</li>
              </ul>
              <h4>Example Payload</h4>
              <CodeBlock code={codeExamples.webhook} language="json" />
            </div>
          )}

          {activeSection === 'security' && (
            <div className="docs__section">
              <h2><Shield size={22} /> Security</h2>
              <p>ChurnSense takes data security seriously. Here's how we protect your customer data.</p>
              <div className="docs__security-grid">
                {[
                  { title: 'SOC 2 Type II', desc: 'Independently audited security controls and processes.' },
                  { title: 'End-to-End Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256).' },
                  { title: 'Data Isolation', desc: 'Each client\'s data is processed in isolated, single-tenant environments.' },
                  { title: 'GDPR & CCPA', desc: 'Full compliance with global data privacy regulations.' },
                  { title: 'API Key Rotation', desc: 'Support for automatic key rotation and scoped access tokens.' },
                  { title: '99.9% SLA', desc: 'Enterprise-grade uptime with multi-region redundancy.' },
                ].map((s, i) => (
                  <div key={i} className="docs__security-item">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
