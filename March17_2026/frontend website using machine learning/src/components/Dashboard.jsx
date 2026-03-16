import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, Area, AreaChart,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity, Radar as RadarIcon } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';

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

const radarData = [
  { metric: 'Precision', value: 89 },
  { metric: 'Recall', value: 84 },
  { metric: 'F1-Score', value: 86 },
  { metric: 'AUC-ROC', value: 92 },
  { metric: 'Accuracy', value: 91 },
  { metric: 'Specificity', value: 93 },
];

const segmentData = [
  { segment: '0-12mo', churn: 42, retain: 58 },
  { segment: '12-24mo', churn: 28, retain: 72 },
  { segment: '24-48mo', churn: 15, retain: 85 },
  { segment: '48-72mo', churn: 7, retain: 93 },
];

const kpiData = [
  { label: 'Total Customers', value: 7043, suffix: '', icon: Activity, color: '#6366f1' },
  { label: 'Churn Rate', value: 26.5, suffix: '%', icon: TrendingUp, color: '#ef4444' },
  { label: 'Model F1 Score', value: 0.86, suffix: '', icon: BarChart3, color: '#10b981' },
  { label: 'Revenue Saved', value: 2.4, suffix: 'M', icon: PieIcon, color: '#f59e0b' },
];

function KPICard({ kpi, visible }) {
  const isDecimal = kpi.value < 10;
  const displayVal = useCountUp(
    isDecimal ? Math.round(kpi.value * 100) : Math.round(kpi.value),
    2000, 0, visible
  );

  return (
    <div className="kpi-card glass-card">
      <div className="kpi-card__icon" style={{ background: `${kpi.color}12`, color: kpi.color }}>
        <kpi.icon size={20} />
      </div>
      <div className="kpi-card__value" style={{ color: kpi.color }}>
        {isDecimal ? (displayVal / 100).toFixed(2) : displayVal.toLocaleString()}{kpi.suffix}
      </div>
      <div className="kpi-card__label">{kpi.label}</div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, suffix = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}{suffix}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section id="dashboard" className="dashboard" ref={ref}>
      <div className="section-header">
        <span className="section-label">Analytics Dashboard</span>
        <h2>Model Performance & Insights</h2>
        <p>Visualizing churn patterns, model predictions, and feature importance across the customer base.</p>
      </div>

      <div className="dashboard__kpis">
        {kpiData.map((kpi, i) => (
          <KPICard key={i} kpi={kpi} visible={visible} />
        ))}
      </div>

      <div className="dashboard__grid">
        <div className={`chart-card glass-card chart-card--wide ${visible ? 'reveal' : ''}`}>
          <div className="chart-card__header">
            <TrendingUp size={18} />
            <h3>Actual vs Predicted Churn Rate (Monthly)</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyChurn}>
              <defs>
                <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb40" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip suffix="%" />} />
              <Legend />
              <Area type="monotone" dataKey="churnRate" name="Actual Churn" stroke="#ef4444" fill="url(#colorChurn)" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444' }} />
              <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#6366f1" fill="url(#colorPred)" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3, fill: '#6366f1' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={`chart-card glass-card ${visible ? 'reveal reveal--delay-1' : ''}`}>
          <div className="chart-card__header">
            <BarChart3 size={18} />
            <h3>Feature Importance</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb40" />
              <XAxis type="number" stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} width={110} />
              <Tooltip content={<CustomTooltip />} formatter={(v) => `${(v * 100).toFixed(1)}%`} />
              <Bar dataKey="value" name="Importance" radius={[0, 6, 6, 0]}>
                {featureImportance.map((_, i) => (
                  <Cell key={i} fill={`hsl(${240 + i * 15}, 70%, ${55 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`chart-card glass-card ${visible ? 'reveal reveal--delay-2' : ''}`}>
          <div className="chart-card__header">
            <RadarIcon size={18} />
            <h3>Model Performance Metrics</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" fontSize={11} stroke="#9ca3af" />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} dot={{ r: 4, fill: '#6366f1' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className={`chart-card glass-card ${visible ? 'reveal reveal--delay-1' : ''}`}>
          <div className="chart-card__header">
            <PieIcon size={18} />
            <h3>Customer Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={churnDist}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {churnDist.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`chart-card glass-card chart-card--wide ${visible ? 'reveal reveal--delay-2' : ''}`}>
          <div className="chart-card__header">
            <BarChart3 size={18} />
            <h3>Churn by Tenure Segment</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={segmentData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb40" />
              <XAxis dataKey="segment" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip suffix="%" />} />
              <Legend />
              <Bar dataKey="churn" name="Churned %" fill="#ef4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="retain" name="Retained %" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
