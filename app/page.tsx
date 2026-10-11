import { ArrowRight, BarChart3, Check, FileText, MessageCircle, Sparkles } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

const problems = [
  "Views, likes, comments, but nobody buys.",
  'Everyone asks "price?" and then disappears.',
  "You boost posts and the money is gone.",
  "Every day you wonder what to post.",
  "You have no time. Marketing is the first thing you drop.",
];

const benefits = [
  'Know exactly why people ask "price?" and don\'t buy',
  "Know what to post, so you stop guessing every day",
  "Get a plan made for your business, not a generic template",
  "Find out where your marketing money is leaking",
  "Start implementing right after the call",
];

const steps = [
  { title: "Tell us about your business", description: "Fill out the short form below." },
  { title: "Get on a one-to-one call", description: "We look at your business, your customers, and what's not working." },
  { title: "Receive your customised plan", description: "You get a PDF with clear next steps you can implement immediately." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="site-header-inner">
          <a href="#top" aria-label="DigiGrow Sherine home">
            <img src="/logo.png" alt="DigiGrow Sherine" className="brand-logo" />
          </a>
          <nav className="quick-nav" aria-label="Jump to page section">
            <a href="#problem">Problem</a>
            <a href="#benefits">Benefits</a>
            <a href="#process">Process</a>
            <a className="quick-nav-cta" href="#book">Book free call</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> For growing businesses in Nepal</div>
          <h1>Ready to <span>Grow Your Business Online</span> but Not Sure How?</h1>
          <p className="hero-subtitle">Get a free, personalised marketing plan in a One-to-One call. The plan is yours to keep, even if you never hire us.</p>
          <a className="primary-button" href="#book">Book Your FREE Consultation <ArrowRight size={18} /></a>
          <p className="microcopy"><Check size={15} /> Free consultation · Custom PDF plan · No obligation</p>
        </div>

        <div className="plan-visual" aria-label="Preview of your personalised marketing plan">
          <div className="plan-glow" />
          <div className="plan-card">
            <div className="plan-card-top">
              <span className="plan-icon"><FileText size={21} /></span>
              <div><span className="plan-kicker">YOUR CUSTOM PLAN</span><strong>Marketing Growth Map</strong></div>
              <span className="pdf-pill">PDF</span>
            </div>
            <div className="plan-score">
              <div><span>Clear next steps</span><strong>Built around your business</strong></div>
              <BarChart3 size={30} />
            </div>
            <div className="plan-list">
              <div><span>01</span><p><strong>What to fix first</strong><small>Identify the biggest marketing leak</small></p></div>
              <div><span>02</span><p><strong>What to post</strong><small>Turn attention into real enquiries</small></p></div>
              <div><span>03</span><p><strong>What to do next</strong><small>A practical action plan for growth</small></p></div>
            </div>
          </div>
          <div className="floating-note note-one"><Check size={16} /> Personalised</div>
          <div className="floating-note note-two"><MessageCircle size={16} /> One-to-one</div>
        </div>
      </section>

      <section id="problem" className="problem-section">
        <div className="section-shell problem-grid">
          <div className="section-heading left-heading">
            <span className="section-number">01</span>
            <p className="section-label">THE REAL PROBLEM</p>
            <h2>Sound familiar?</h2>
            <p>You are putting in the effort. The missing piece is knowing what turns attention into sales.</p>
          </div>
          <div className="problem-list">
            {problems.map((problem, index) => <div className="problem-row" key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></div>)}
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits-section section-shell">
        <div className="section-heading centered-heading">
          <span className="section-number">02</span>
          <p className="section-label">YOUR CLARITY SESSION</p>
          <h2>How you benefit from this consultation</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit, index) => (
            <article className={index === 2 ? "benefit-card featured" : "benefit-card"} key={benefit}>
              <span className="benefit-index">0{index + 1}</span>
              <div className="benefit-check"><Check size={18} /></div>
              <h3>{benefit}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="process-section">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <span className="section-number light">03</span>
            <p className="section-label light">SIMPLE &amp; PRACTICAL</p>
            <h2>How it works</h2>
          </div>
          <div className="process-grid">
            {steps.map((step, index) => (
              <article className="process-card" key={step.title}>
                <div className="step-top"><span>STEP {index + 1}</span><strong>0{index + 1}</strong></div>
                <h3>{step.title}</h3><p>{step.description}</p>
                {index < steps.length - 1 && <ArrowRight className="step-arrow" aria-hidden />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="urgency-section">
        <div className="section-shell urgency-card">
          <div><p className="section-label light">YOUR NEXT MOVE</p><h2>Don&apos;t keep posting without orders</h2><p>Every week you wait is another week of guessing. Book your free call today and know what to fix first.</p></div>
          <a className="light-button" href="#book">Book Your FREE Consultation <ArrowRight size={18} /></a>
        </div>
      </section>

      <section id="book" className="form-section">
        <div className="section-shell form-layout">
          <div className="form-intro">
            <span className="section-number">04</span>
            <p className="section-label">LET&apos;S TALK</p>
            <h2>Book your free one-to-one consultation</h2>
            <p className="form-subtitle">A customised strategy for your business.</p>
            <div className="included-card">
              <span>WHAT YOU&apos;LL GET</span>
              <ul>
                <li><Check size={16} /> A one-to-one strategy conversation</li>
                <li><Check size={16} /> Clear priorities for your marketing</li>
                <li><Check size={16} /> A customised plan in PDF format</li>
              </ul>
            </div>
          </div>
          <ConsultationForm />
        </div>
      </section>

      <footer><img src="/logo.png" alt="DigiGrow Sherine" /><p>AI-powered digital marketing clarity for growing businesses in Nepal.</p></footer>
    </main>
  );
}
