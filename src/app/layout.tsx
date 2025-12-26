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
title: {
    default: "TEKNOMEDIA - Solusi Edukasi Teknologi",
    template: "%s | TEKNOMEDIA" // Jadi kalau di page lain title-nya "Blog", bakal muncul "Blog | TEKNOMEDIA"
  },
  description: "Teknomedia adalah penyedia layanan edukasi berbasis industri dan solusi teknologi digital untuk generasi muda.",
  // Meskipun Google jarang liat ini, kamu tetap bisa masukin buat search engine lain
  keywords: ["edukasi teknologi", "belajar koding", "teknomedia info", "pelatihan IT"], 
  authors: [{ name: "Teknomedia Team" }],
  openGraph: {
    title: "TEKNOMEDIA",
    description: "Solusi teknologi dan edukasi digital terpercaya.",
    url: "https://www.teknomedia.info",
    siteName: "Teknomedia",
    images: [
      {
        url: "/og-image.png", // Gambar yang muncul saat link dishare ke WA/FB
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
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