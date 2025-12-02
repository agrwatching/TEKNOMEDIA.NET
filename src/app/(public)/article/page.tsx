// src/app/(public)/galeri/page.tsx
import React from 'react';
import PortalBerita from '@/components/sections/PortalBeritaSection';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Berita - TeknoMedia',
  description: 'Dokumentasi kegiatan, kolaborasi, dan implementasi solusi digital terbaik TeknoMedia.',
};

const BeritaPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader />
      <main className="flex-grow py-8"> 
        <PortalBerita />
      </main>
      <PublicFooter />
    </div>
  );
};

export default BeritaPage;