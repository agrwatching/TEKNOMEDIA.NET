// src/app/(public)/consultation/page.tsx\
import React from 'react';
import Consultation from '@/components/sections/consultation';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Tim Kami - TeknoMedia',
  description: 'Kenali para profesional di balik solusi jaringan dan sistem terintegrasi TeknoMedia.',
};

const ConsultationPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-slate-900">
      <PublicHeader />
      <main className="flex-grow py-8 bg-gradient-to-b from-gray-50 via-white to-gray-50"> 
        <Consultation />
      </main>
      <PublicFooter />
    </div>
  );
};

export default ConsultationPage;