import { useState } from 'react';
import { Send, Mail, MapPin, Phone, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [ref, visible] = useScrollReveal(0.05);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="page contact" ref={ref}>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="section-label">Contact Us</span>
          <h1>Let's Start a<br /><span className="gradient-text">Conversation</span></h1>
          <p>Have questions about ChurnSense? Want a demo? Our team is ready to help you reduce churn and boost retention.</p>
        </div>
      </section>

      <section className="contact__layout">
        <div className="contact__info">
          <div className={`contact__info-card glass-card ${visible ? 'reveal' : ''}`}>
            <Mail size={22} />
            <div>
              <h4>Email</h4>
              <p>hello@churnsense.ai</p>
            </div>
          </div>
          <div className={`contact__info-card glass-card ${visible ? 'reveal reveal--delay-1' : ''}`}>
            <Phone size={22} />
            <div>
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className={`contact__info-card glass-card ${visible ? 'reveal reveal--delay-2' : ''}`}>
            <MapPin size={22} />
            <div>
              <h4>Office</h4>
              <p>123 AI Boulevard, San Francisco, CA 94105</p>
            </div>
          </div>
          <div className={`contact__info-card glass-card ${visible ? 'reveal reveal--delay-3' : ''}`}>
            <Clock size={22} />
            <div>
              <h4>Response Time</h4>
              <p>We typically respond within 2 business hours</p>
            </div>
          </div>
        </div>

        <div className={`contact__form-wrap glass-card ${visible ? 'reveal reveal--delay-1' : ''}`}>
          {submitted ? (
            <div className="contact__success">
              <div className="contact__success-icon">
                <CheckCircle size={48} />
              </div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. Our team will get back to you within 2 business hours.</p>
              <button className="btn btn--glass" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', subject: 'general', message: '' }); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="contact__form-header">
                <MessageSquare size={20} />
                <h3>Send us a message</h3>
              </div>
              <div className="contact__form-grid">
                <label>
                  <span>Full Name</span>
                  <input type="text" required value={form.name} onChange={update('name')} placeholder="John Doe" />
                </label>
                <label>
                  <span>Email Address</span>
                  <input type="email" required value={form.email} onChange={update('email')} placeholder="john@company.com" />
                </label>
                <label>
                  <span>Company</span>
                  <input type="text" value={form.company} onChange={update('company')} placeholder="Company Inc." />
                </label>
                <label>
                  <span>Subject</span>
                  <select value={form.subject} onChange={update('subject')}>
                    <option value="general">General Inquiry</option>
                    <option value="demo">Request a Demo</option>
                    <option value="pricing">Pricing Questions</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </label>
              </div>
              <label className="contact__form-full">
                <span>Message</span>
                <textarea
                  required
                  rows="5"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us about your project and how we can help..."
                />
              </label>
              <button type="submit" className="btn btn--primary btn--glow contact__submit" disabled={sending}>
                {sending ? (
                  <>Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
