import { Brain, Target, Users, Lightbulb, Award, TrendingUp, Linkedin, Github } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';

const values = [
  { icon: Target, title: 'Data-Driven Decisions', desc: 'Every recommendation is backed by rigorous statistical analysis and validated ML models.' },
  { icon: Lightbulb, title: 'Continuous Innovation', desc: 'We push the boundaries of churn prediction with cutting-edge research and novel feature engineering.' },
  { icon: Users, title: 'Customer Centricity', desc: 'Our models are designed to improve customer experience, not just reduce numbers on a spreadsheet.' },
  { icon: Award, title: 'Transparency', desc: 'Explainable AI is at our core — every prediction comes with clear reasoning and actionable insights.' },
];

const team = [
  { name: 'Dr. Sarah Chen', role: 'Chief Data Scientist', bio: 'PhD in ML from Stanford. 12+ years in predictive analytics. Former lead at Google AI.', color: '#6366f1' },
  { name: 'Marcus Johnson', role: 'ML Engineer Lead', bio: 'Expert in deep learning and feature engineering. Built churn models serving 50M+ users.', color: '#06b6d4' },
  { name: 'Aisha Patel', role: 'Product Designer', bio: 'HCI specialist focused on making complex ML outputs intuitive and actionable for business users.', color: '#8b5cf6' },
  { name: 'David Kim', role: 'Data Engineer', bio: 'Architect of real-time data pipelines processing 100K+ events/sec for live churn scoring.', color: '#10b981' },
];

const stats = [
  { value: 150, suffix: '+', label: 'Enterprise Clients' },
  { value: 50, suffix: 'M+', label: 'Customers Analyzed' },
  { value: 92, suffix: '%', label: 'Prediction Accuracy' },
  { value: 2.4, suffix: 'B', label: 'Revenue Saved ($)' },
];

function StatCard({ stat, visible }) {
  const isDecimal = stat.value < 10;
  const display = useCountUp(
    isDecimal ? Math.round(stat.value * 10) : stat.value,
    2000, 0, visible
  );
  return (
    <div className="about-stat glass-card">
      <div className="about-stat__value">
        {isDecimal ? (display / 10).toFixed(1) : display}{stat.suffix}
      </div>
      <div className="about-stat__label">{stat.label}</div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useScrollReveal(0.1);
  const [teamRef, teamVisible] = useScrollReveal(0.1);

  return (
    <div className="page about" ref={ref}>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="section-label">About ChurnSense</span>
          <h1>Pioneering ML-Powered<br /><span className="gradient-text">Customer Retention</span></h1>
          <p>We combine advanced machine learning with deep domain expertise to help businesses predict, understand, and prevent customer churn at scale.</p>
        </div>
      </section>

      <section className="about__stats-section">
        <div className="about__stats">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} visible={visible} />
          ))}
        </div>
      </section>

      <section className="about__mission">
        <div className="about__mission-inner">
          <div className={`about__mission-content ${visible ? 'reveal' : ''}`}>
            <span className="section-label">Our Mission</span>
            <h2>Turning Customer Data Into Retention Strategy</h2>
            <p>
              Customer churn costs businesses billions annually. The cost of acquiring a new customer
              is <strong>five times more</strong> than retaining an existing one. Yet most companies
              only react to churn after it happens.
            </p>
            <p>
              ChurnSense changes this paradigm. Our ML platform identifies churn signals weeks
              before customers leave, giving businesses the window they need to take meaningful
              retention action. We believe every customer relationship is worth fighting for —
              and data science gives us the tools to fight smarter.
            </p>
          </div>
          <div className={`about__mission-visual ${visible ? 'reveal reveal--delay-2' : ''}`}>
            <div className="about__mission-card glass-card">
              <TrendingUp size={32} />
              <div>
                <strong>35% Average</strong>
                <span>Churn Reduction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about__values">
        <div className="section-header">
          <span className="section-label">Our Values</span>
          <h2>What Drives Us</h2>
        </div>
        <div className="about__values-grid">
          {values.map((v, i) => (
            <div key={i} className={`about__value-card glass-card ${visible ? 'reveal' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="about__value-icon">
                <v.icon size={24} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about__team" ref={teamRef}>
        <div className="section-header">
          <span className="section-label">Our Team</span>
          <h2>The Minds Behind ChurnSense</h2>
          <p>A multidisciplinary team of data scientists, engineers, and designers working to make churn prediction accessible and actionable.</p>
        </div>
        <div className="about__team-grid">
          {team.map((t, i) => (
            <div key={i} className={`about__team-card glass-card ${teamVisible ? 'reveal' : ''}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="about__team-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3>{t.name}</h3>
              <span className="about__team-role">{t.role}</span>
              <p>{t.bio}</p>
              <div className="about__team-social">
                <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="#" aria-label="GitHub"><Github size={16} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
