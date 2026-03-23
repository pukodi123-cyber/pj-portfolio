import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "PJ | Popuri Jayesh - Premium Web Developer",
  description: "I build modern, animated and high-performance websites for businesses such as cafes, restaurants, startups and brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#0f0f0f] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
