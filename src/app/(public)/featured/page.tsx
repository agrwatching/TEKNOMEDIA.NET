//src/app/%28public%29/featured/page.tsx
import React from 'react';
// Perbaikan: Menggunakan path relatif agar komponen dapat diimpor dengan benar di lingkungan ini.
import Featured from '@/components/sections/FeaturedProductsSection';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Tim Kami - TeknoMedia',
  description: 'Kenali para profesional di balik solusi jaringan dan sistem terintegrasi TeknoMedia.',
};

const FeaturedPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <PublicHeader />
      <main className="flex-grow py-8"> 
        <Featured />
      </main>
      <PublicFooter />
    </div>
  );
};

export default FeaturedPage;