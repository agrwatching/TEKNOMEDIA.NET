// src/app/(public)/page.tsx
import Navbar from "@/components/layout/PublicHeader"; 
import Footer from "@/components/layout/PublicFooter";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TeamSection from "@/components/sections/TeamSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GaleryTeam from "@/components/sections/GaleryTeam";
import PortalBeritaSection from "@/components/sections/PortalBeritaSection";
import PricingSection from "@/components/sections/PricingSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TEKNOMEDIA | Solusi Edukasi & Teknologi Digital Indonesia",
  description: "Platform terbaik untuk layanan edukasi berbasis industri, solusi IT, dan portal berita teknologi terkini di Teknomedia.",
  keywords: [
    "Teknomedia", 
    "Edukasi Teknologi", 
    "Jasa Pembuatan Website", 
    "Kursus IT Indonesia", 
    "Berita Teknologi", 
    "Solusi Digital"
  ],
};
// Halaman utama (/)
export default function HomePage() {
  return (
    <>
      <Navbar /> 
      <main>
        <HeroSection /> 
        <AboutSection 
          showFullContent={true} 
          partnerLimit={3} 
          showViewAllPartners={true}
        />
        <WhyUsSection />
        <ServicesSection />
        <PricingSection />
        <FeaturedProductsSection limit={3} showViewAll={true} />
        <TestimonialsSection />
        <TeamSection limit={4} showViewAll={true} />
        <GaleryTeam limit={3} showViewAll={true} />
        <PortalBeritaSection limit={3} showViewAll={true} />
      </main>
      <Footer />
    </>
  );
}