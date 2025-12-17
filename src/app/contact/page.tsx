// src/app/(public)/contact/page.tsx\
import React from 'react';
import ContactSection from '@/components/sections/ContactSection';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

export const metadata = {
  title: 'Tim Kami - TeknoMedia',
  description: 'Kenali para profesional di balik solusi jaringan dan sistem terintegrasi TeknoMedia.',
};

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PublicHeader />
      <main className="flex-grow py-16 bg-white"> 
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
};

export default ContactPage;