import type { Metadata } from "next";
import { Check, MessageCircle } from "lucide-react";

export const metadata: Metadata = { title: "Thank You | DigiGrow Sherine", robots: { index: false, follow: false } };

const whatsappMessage = "Hi, I just submitted the form for the Free Digital Marketing Consultation. I'd like to know the next steps.";
const whatsappUrl = `https://wa.me/9779747811193?text=${encodeURIComponent(whatsappMessage)}`;

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <header className="site-header"><a href="/" aria-label="DigiGrow Sherine home"><img src="/logo.png" alt="DigiGrow Sherine" className="brand-logo" /></a></header>
      <div className="thank-you-shell">
        <div className="success-mark"><Check size={30} strokeWidth={2.5} /></div>
        <p className="section-label">REQUEST RECEIVED</p>
        <h1>Congratulations! You&apos;re one step closer.</h1>
        <p className="thank-you-lead">Thank you for taking the first step to grow your business online.</p>
        <section className="next-card">
          <h2>What to do next</h2>
          <div className="next-step"><span>1</span><p>Message us on WhatsApp so we can plan your one-to-one call.</p></div>
          <div className="next-step"><span>2</span><p>Get ready to receive your customised marketing plan in PDF format.</p></div>
        </section>
        <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> Message Us on WhatsApp</a>
      </div>
    </main>
  );
}
