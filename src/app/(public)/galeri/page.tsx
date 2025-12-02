// src/app/(public)/galeri/page.tsx
import React from 'react';
import GaleryTeam from '@/components/sections/GaleryTeam';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Galeri Kami - TeknoMedia',
  description: 'Dokumentasi kegiatan, kolaborasi, dan implementasi solusi digital terbaik TeknoMedia.',
};

const GaleryPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader />
      <main className="flex-grow py-8"> 
        <GaleryTeam />
      </main>
      <PublicFooter />
    </div>
  );
};

export default GaleryPage;