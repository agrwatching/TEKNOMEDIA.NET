// src/components/sections/ServicesSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { GraduationCap, Server, Wifi, Globe, Users, Cloud } from 'lucide-react';
import Link from 'next/link';

// Data Layanan Teknomedia
const services = [
  {
    icon: GraduationCap,
    title: 'Kelas Industri & Teaching Factory',
    description: 'Program pembelajaran berbasis industri dan praktik langsung yang dirancang sesuai kebutuhan dunia kerja modern.',
    gradient: 'from-indigo-500 to-purple-500',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
  {
    icon: Users,
    title: 'Jasa Guru Tamu & Pembelajaran Proyek',
    description: 'Menghadirkan praktisi industri untuk mengajar langsung serta membimbing project-based learning di sekolah.',
    gradient: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(251, 146, 60, 0.5)',
  },
  {
    icon: Globe,
    title: 'Program Digital Marketing',
    description: 'Pelatihan dan pendampingan digital marketing untuk sekolah maupun bisnis guna meningkatkan kemampuan branding digital.',
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    icon: Server,
    title: 'IT Solution & Hosting Services',
    description: 'Layanan manajemen server, hosting, website, aplikasi, dan solusi teknologi informasi untuk bisnis dan institusi.',
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.5)',
  },
  {
    icon: Cloud,
    title: 'Penyedia VPS & Cloud Server',
    description: 'Layanan Virtual Private Server dan cloud hosting dengan performa tinggi, keamanan maksimal, dan dukungan teknis 24/7.',
    gradient: 'from-violet-500 to-fuchsia-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
  {
    icon: Wifi,
    title: 'Internet Dedicated & Broadband Bisnis',
    description: 'Layanan internet cepat, stabil, dan memiliki SLA profesional untuk sekolah, UMKM, hingga perusahaan besar.',
    gradient: 'from-red-500 to-pink-500',
    glowColor: 'rgba(239, 68, 68, 0.5)',
  },
];

const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [floatingParticles, setFloatingParticles] = useState<Array<{left: number, top: number}>>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setFloatingParticles(
        Array.from({ length: 8 }, () => ({
          left: 20 + Math.random() * 60,
          top: 20 + Math.random() * 60
        }))
      );
    }
  }, [hoveredIndex]);

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* GRID LINES BACKGROUND */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 animate-fade-in">
            <span className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 text-sm font-semibold uppercase tracking-wider border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)] animate-pulse-glow backdrop-blur-sm">
              Layanan Utama
            </span>
          </div>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              Solusi Lengkap untuk Pendidikan & Teknologi
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600 mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Teknomedia menyediakan layanan terpadu untuk mendukung transformasi digital melalui pendidikan industri, teknologi informasi, hingga layanan internet berkecepatan tinggi.
          </p>

          {/* DECORATIVE LINE */}
          <div className="mt-8 flex justify-center items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-500"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>

        {/* GRID LAYANAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative animate-fade-in-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              
              {/* CARD CONTAINER */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:border-transparent overflow-hidden">
                
                {/* ANIMATED GRADIENT BORDER ON HOVER */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-r ${service.gradient}`} style={{ boxShadow: hoveredIndex === index ? `0 0 60px ${service.glowColor}` : 'none' }}></div>

                {/* TOP GRADIENT BAR */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* CORNER ACCENTS */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* ICON CONTAINER */}
                <div className="relative mb-6 inline-flex">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                  
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${service.gradient} shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <service.icon className="w-8 h-8 text-white animate-pulse-slow" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-50 group-hover:animate-spin-slow transition-opacity duration-500" style={{ borderImage: `linear-gradient(to right, var(--tw-gradient-stops)) 1`, borderImageSlice: 1 }}></div>
                </div>

                {/* CONTENT */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* ANIMATED PROGRESS BAR */}
                <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                </div>

                {/* SHINE EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>

              {/* FLOATING PARTICLES ON HOVER */}
              {hoveredIndex === index && floatingParticles.length > 0 && (
                <>
                  {floatingParticles.map((particle, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-indigo-500 rounded-full animate-float-up pointer-events-none" style={{ left: `${particle.left}%`, top: `${particle.top}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA BUTTON - UPDATED WITH LINK */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Link href="/consultation">
            <button className="group relative inline-flex items-center justify-center px-10 py-4 rounded-xl text-lg font-bold text-white overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-all duration-500 hover:scale-110 active:scale-95">
              
              {/* Gradient background animation */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              
              <span className="relative z-10 flex items-center">
                Konsultasi & Jadwalkan Survei
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>

              {/* PULSE RING */}
              <div className="absolute inset-0 rounded-xl border-2 border-white/50 animate-ping-slow"></div>
            </button>
          </Link>

          {/* HELPER TEXT */}
          <p className="mt-6 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            Hubungi kami untuk mendapatkan solusi terbaik sesuai kebutuhan Anda
          </p>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;