import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alanté Media Consulting | More Invisalign Patients, Guaranteed",
  description:
    "We help dental practices get more Invisalign patient consultations through targeted Meta ads, automated follow-up, and proven front desk systems. 3 new consultations in 30 days or you don't pay.",
  keywords: [
    "dental marketing",
    "Invisalign marketing",
    "dental practice growth",
    "dental ads",
    "dental patient acquisition",
  ],
  openGraph: {
    title: "Alanté Media Consulting | More Invisalign Patients, Guaranteed",
    description:
      "3 new Invisalign consultations in 30 days or you don't pay. Targeted Meta ads, automated follow-up, and front desk systems for dental practices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-white text-navy-700">
        {children}
      </body>
    </html>
  );
}
