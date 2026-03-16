import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line, Legend, Area, AreaChart,
} from 'recharts';

const featureImportance = [
  { name: 'Contract Type', value: 0.24 },
  { name: 'Tenure', value: 0.19 },
  { name: 'Monthly Charges', value: 0.15 },
  { name: 'Tech Support', value: 0.12 },
  { name: 'Payment Method', value: 0.10 },
  { name: 'Internet Service', value: 0.08 },
  { name: 'Online Security', value: 0.07 },
  { name: 'Paperless Billing', value: 0.05 },
];

const churnDist = [
  { name: 'Churned', value: 1869, color: '#ef4444' },
  { name: 'Retained', value: 5174, color: '#10b981' },
];

const monthlyChurn = [
  { month: 'Jan', churnRate: 5.2, predicted: 5.0 },
  { month: 'Feb', churnRate: 4.8, predicted: 4.9 },
  { month: 'Mar', churnRate: 5.5, predicted: 5.3 },
  { month: 'Apr', churnRate: 4.1, predicted: 4.5 },
  { month: 'May', churnRate: 3.9, predicted: 4.0 },
  { month: 'Jun', churnRate: 4.3, predicted: 4.1 },
  { month: 'Jul', churnRate: 3.6, predicted: 3.8 },
  { month: 'Aug', churnRate: 3.2, predicted: 3.4 },
  { month: 'Sep', churnRate: 2.9, predicted: 3.1 },
  { month: 'Oct', churnRate: 2.5, predicted: 2.7 },
  { month: 'Nov', churnRate: 2.3, predicted: 2.4 },
  { month: 'Dec', churnRate: 2.1, predicted: 2.2 },
];

const segmentData = [
  { segment: '0-12mo', churn: 42, retain: 58 },
  { segment: '12-24mo', churn: 28, retain: 72 },
  { segment: '24-48mo', churn: 15, retain: 85 },
  { segment: '48-72mo', churn: 7, retain: 93 },
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="dashboard">
      <div className="section-header">
        <span className="section-label">Analytics Dashboard</span>
        <h2>Model Performance & Insights</h2>
        <p>Visualizing churn patterns, model predictions, and feature importance across the customer base.</p>
      </div>

      <div className="dashboard__grid">
        <div className="chart-card chart-card--wide">
          <h3>Actual vs Predicted Churn Rate (Monthly)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyChurn}>
              <defs>
                <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={13} />
              <YAxis stroke="#9ca3af" fontSize={13} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
              <Area type="monotone" dataKey="churnRate" name="Actual Churn" stroke="#ef4444" fill="url(#colorChurn)" strokeWidth={2} />
              <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#6366f1" fill="url(#colorPred)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Feature Importance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={110} />
              <Tooltip formatter={(v) => `${(v * 100).toFixed(1)}%`} />
              <Bar dataKey="value" name="Importance" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Customer Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={churnDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {churnDist.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card chart-card--wide">
          <h3>Churn by Tenure Segment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="segment" stroke="#9ca3af" fontSize={13} />
              <YAxis stroke="#9ca3af" fontSize={13} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
              <Bar dataKey="churn" name="Churned %" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="retain" name="Retained %" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
