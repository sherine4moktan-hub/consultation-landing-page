import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://consult.digigrowsherine.com"),
  title: "Free AI Marketing Consultation | DigiGrow Sherine",
  description: "Book a free one-to-one AI marketing consultation and receive a customised marketing plan for your business.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/icon.png", sizes: "1200x1339", type: "image/png" }],
  },
  openGraph: {
    title: "Free AI Marketing Consultation | DigiGrow Sherine",
    description: "Stop guessing what to post. Get a practical marketing plan built for your business.",
    type: "website",
    images: [{ url: "/logo.png", width: 3000, height: 1163, alt: "DigiGrow Sherine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Marketing Consultation | DigiGrow Sherine",
    description: "Stop guessing what to post. Get a practical marketing plan built for your business.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2001438193868052');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2001438193868052&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
