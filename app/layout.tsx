import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Web3Provider } from "@/contexts/web3-context";

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
  title: "SmoothSend | Gasless USDC Transfers",
  description: "Send USDC without gas fees on Avalanche Fuji. Experience gasless transfers with our innovative relayer technology - pay only a small USDC fee.",
  keywords: "crypto, gasless transfers, USDC, Avalanche, relayer, DeFi, blockchain, gas-free",
  authors: [{ name: "SmoothSend Labs" }],
  creator: "SmoothSend Labs",
  publisher: "SmoothSend Labs",
  openGraph: {
    title: "SmoothSend | Gasless USDC Transfers",
    description: "Send USDC without gas fees using innovative relayer technology. Zero gas required from users.",
    url: "https://smoothsend.com",
    siteName: "SmoothSend",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmoothSend | Gasless USDC Transfers",
    description: "Send USDC without gas fees using innovative relayer technology. Zero gas required from users.",
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
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
