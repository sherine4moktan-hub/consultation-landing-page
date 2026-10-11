import type { Metadata } from "next";
import { ArrowLeft, Check, MessageCircle, Play } from "lucide-react";

export const metadata: Metadata = { title: "Thank You | DigiGrow Sherine", robots: { index: false, follow: false } };

const whatsappMessage = "Hi, I just submitted the form for the Free Digital Marketing Consultation. I'd like to know the next steps.";
const whatsappUrl = `https://wa.me/9779747811193?text=${encodeURIComponent(whatsappMessage)}`;
const vimeoVideoId = process.env.NEXT_PUBLIC_VIMEO_VIDEO_ID?.trim();

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" aria-label="DigiGrow Sherine home"><img src="/logo.png" alt="DigiGrow Sherine" className="brand-logo" /></a>
          <a className="back-link" href="/"><ArrowLeft size={16} /> Back to landing page</a>
        </div>
      </header>
      <div className="thank-you-shell">
        <div className="thank-you-grid">
          <div className="thank-you-copy">
            <span className="confirmation-mark" aria-hidden="true"><Check size={22} strokeWidth={3} /></span>
            <p className="section-label">REQUEST RECEIVED</p>
            <h1><span>Congratulations!</span><span>You&apos;re one step closer.</span></h1>
            <p className="thank-you-lead">Thank you for taking the first step to grow your business online.</p>
          </div>
          <div className="vimeo-wrap">
            {vimeoVideoId ? (
              <iframe
                src={`https://player.vimeo.com/video/${vimeoVideoId}`}
                title="DigiGrow Sherine welcome video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="vimeo-placeholder">
                <span className="vimeo-play"><Play size={24} fill="currentColor" /></span>
                <strong>Welcome video</strong>
                <p>Your Vimeo video will appear here.</p>
              </div>
            )}
          </div>
          <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> Message Us on WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
