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
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader />
      <main className="flex-grow py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"> 
        <PortalBerita />
      </main>
      <PublicFooter />
    </div>
  );
};

export default BeritaPage;