import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono, Playfair_Display, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const title = "Sampanna Mahapatra | Software Engineer & Bassist";
const description =
  "Portfolio of Sampanna Mahapatra: software engineer building backend systems and interfaces, and bassist in the Bangladeshi underground music scene.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Sampanna Mahapatra" }],
  keywords: ["Sampanna Mahapatra", "software engineer", "bassist", "portfolio", "Bangladesh"],
  openGraph: {
    title,
    description,
    type: "profile",
    images: [{ url: "/images/engineer-profile.png", alt: "Sampanna Mahapatra" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/engineer-profile.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#020203",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${sora.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
