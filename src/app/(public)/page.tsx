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