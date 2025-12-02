// src/app/(public)/mitra/page.tsx
import React from 'react';
import AboutSection from '@/components/sections/AboutSection';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Mitra Kami - TeknoMedia',
  description: 'Berkolaborasi dengan mitra terpercaya untuk memberikan solusi teknologi terbaik.',
};

const MitraPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader />
      <main className="flex-grow py-8"> 
        {/* Hanya tampilkan mitra tanpa foto, visi, misi */}
        <AboutSection 
          showFullContent={false}        // Sembunyikan foto, visi, misi
          showViewAllPartners={false}    // Tidak perlu tombol "Lihat Semua"
        />
      </main>
      <PublicFooter />
    </div>
  );
};

export default MitraPage;