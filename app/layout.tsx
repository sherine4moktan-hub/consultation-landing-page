import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://digigrow-free-consultation.terranceheaney.chatgpt.site"),
  title: "Free AI Marketing Consultation | DigiGrow Sherine",
  description: "Book a free one-to-one AI marketing consultation and receive a customised marketing plan for your business.",
  openGraph: {
    title: "Free AI Marketing Consultation | DigiGrow Sherine",
    description: "Stop guessing what to post. Get a practical marketing plan built for your business.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
