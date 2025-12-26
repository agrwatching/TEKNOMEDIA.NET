// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEKNOMEDIA",
  description: "Aplikasi berbasis web Teknomedia",
  icons: {
    icon: [
      { url: '/teknomedia.png' }, // Standar
      { url: '/teknomedia.png', sizes: '192x192', type: 'image/png' }, // High res
    ],
    apple: [
      { url: '/teknomedia.png' }, // Untuk perangkat Apple
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}