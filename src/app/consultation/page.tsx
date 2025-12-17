"use client";

import React, { useEffect } from "react";
import Consultation from "@/components/sections/consultation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

const ConsultationPage: React.FC = () => {
  useEffect(() => {
    // Scroll ke top saat page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col bg-slate-900">
      <PublicHeader />
      <main className="flex-grow bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <Consultation />
      </main>
      <PublicFooter />
    </div>
  );
};

export default ConsultationPage;
