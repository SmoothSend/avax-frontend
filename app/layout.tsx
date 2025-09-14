import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "SmoothSend | Swap anytime, anywhere",
  description: "Buy and sell crypto seamlessly on 14+ networks including Ethereum, Unichain, and Base with the power of SmoothSend. Experience permissionless trading with deep liquidity and proven security.",
  keywords: "crypto, swap, DEX, DeFi, Ethereum, Base, Unichain, blockchain, trading",
  authors: [{ name: "SmoothSend Labs" }],
  creator: "SmoothSend Labs",
  publisher: "SmoothSend Labs",
  openGraph: {
    title: "SmoothSend | Swap anytime, anywhere",
    description: "Buy and sell crypto seamlessly on 14+ networks with proven security and deep liquidity.",
    url: "https://smoothsend.com",
    siteName: "SmoothSend",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmoothSend | Swap anytime, anywhere",
    description: "Buy and sell crypto seamlessly on 14+ networks with proven security and deep liquidity.",
    creator: "@smoothsendlabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <a 
          href="#main-content" 
          className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
