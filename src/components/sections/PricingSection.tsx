"use client";

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const PricingSection: React.FC = () => {

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* GUARANTEE BANNER - DIBUAT LEBIH LEBAR */}
        <div className="max-w-6xl mx-auto">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 animate-fade-in-up [animation-delay:0.8s] shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    ✨ Yang Anda Dapatkan
                  </h4>
                  <p className="text-gray-700 text-base leading-relaxed max-w-2xl">
                    Website profesional + Hosting/VPS + Domain gratis + Trainer Expert untuk Guru Tamu, CBT, Aplikasi Software + Training & Support penuh dari tim ahli
                  </p>
                </div>
              </div>
              <Link href="/consultation">
                <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  Mulai Konsultasi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;