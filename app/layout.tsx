import type { Metadata } from "next";
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
  return <html lang="en"><body>{children}</body></html>;
}
