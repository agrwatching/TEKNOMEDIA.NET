// src/app/(public)/article/page.tsx
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <PublicHeader />
      <main className="flex-grow py-16"> 
        <PortalBerita />
      </main>
      <PublicFooter />
    </div>
  );
};

export default BeritaPage;