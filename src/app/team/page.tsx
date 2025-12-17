//src/app/%28public%29/team/page.tsx
import React from 'react';
// Perbaikan: Menggunakan path relatif agar komponen dapat diimpor dengan benar di lingkungan ini.
import TeamSection from '@/components/sections/TeamSection';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Tim Kami - TeknoMedia',
  description: 'Kenali para profesional di balik solusi jaringan dan sistem terintegrasi TeknoMedia.',
};

const TeamPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <PublicHeader />
      <main className="flex-grow py-8"> 
        <TeamSection />
      </main>
      <PublicFooter />
    </div>
  );
};

export default TeamPage;