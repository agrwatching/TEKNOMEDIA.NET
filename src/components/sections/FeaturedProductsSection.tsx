// src/components/sections/FeaturedProductsSection.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Sparkles, Zap, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface Achievement {
  image: string;
  title: string;
  description: string;
  tag: string;
  link?: string;
}

interface FeaturedProductsSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

const achievements: Achievement[] = [
  {
    image: "/instalasi.webp",
    title: 'Instalasi Jaringan Kampus Negeri',
    description: 'Implementasi jaringan fiber optik dan WiFi kampus untuk mendukung proses belajar mengajar berbasis digital.',
    tag: 'Project Besar',
    link: '/',
  },
  {
    image: "/elearning.jpg",
    title: 'Pengembangan Platform E-Learning',
    description: 'Sistem pembelajaran digital lengkap dengan modul, video, ujian online, hingga pelaporan otomatis.',
    tag: 'Inovasi Digital',
    link: '/',
  },
  {
    image: "/server.jpg",
    title: 'Integrasi Server & Infrastruktur IT',
    description: 'Setup Windows Server, manajemen user, dan konfigurasi infrastruktur IT untuk sekolah & instansi.',
    tag: 'Solusi Profesional',
    link: '/',
  },
];

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ 
  limit,
  showViewAll = false 
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Limit achievements if needed
  const displayedAchievements = limit ? achievements.slice(0, limit) : achievements;

  return (
    <section id="achievements" className="py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* Floating Geometric Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-indigo-300/50 to-transparent animate-slide-down" />
        <div className="absolute top-0 right-1/3 w-px h-40 bg-gradient-to-b from-purple-300/50 to-transparent animate-slide-down" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Icon Decoration */}
          <div className="flex justify-center items-center gap-3 mb-4 animate-fade-in">
            <Sparkles className="w-6 h-6 text-indigo-500 animate-spin-slow" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
            <Zap className="w-6 h-6 text-purple-500 animate-float" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <Sparkles className="w-6 h-6 text-indigo-500 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>

          <div className="space-y-2 animate-fade-in-up">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]">
              Karya & Pencapaian
            </h2>
            <p className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Tim Profesional{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Kami
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-200/50 -rotate-1 animate-expand" />
              </span>
            </p>
          </div>

          <p className="max-w-3xl text-lg text-gray-600 mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Dokumentasi kegiatan, presentasi, dan kolaborasi kami dalam memberikan solusi digital terbaik untuk dunia pendidikan Indonesia.
          </p>
        </div>

        {/* Grid Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayedAchievements.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 h-full flex flex-col">
                
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Border Animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                {/* Image Section */}
                <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    priority={index < 3}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Scan Line Effect */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent ${hoveredCard === index ? 'animate-scan-horizontal' : 'opacity-0'}`}
                  />

                  {/* Tag Badge */}
                  <span className="absolute top-3 right-3 flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Award size={14} className="mr-1.5 animate-pulse" />
                    {item.tag}
                  </span>

                  {/* Corner Accent */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-indigo-500/20 border-r-[40px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Section */}
                <div className="relative p-6 space-y-4 flex-grow flex flex-col">
                  
                  {/* Title with underline animation */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500" />
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                    {item.description}
                  </p>

                  {/* Button */}
                  <Link
                    href={item.link || '#'}
                    className="relative w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group/btn mt-auto"
                  >
                    {/* Button shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    
                    <ImageIcon size={18} className="mr-2 transform group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">Lihat Dokumentasi</span>
                    <ArrowRight size={16} className="ml-2 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Bottom corner decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20">
                  <div className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-indigo-200/50 rounded-tr-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right" />
                </div>

                {/* Floating number badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - Hanya tampil kalau showViewAll = true DAN ada limit */}
        {showViewAll && limit && (
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link
              href="/featured"
              className="group inline-flex items-center justify-center px-10 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden"
            >
              {/* Button background slide effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              
              <Sparkles size={20} className="mr-2 relative z-10 animate-pulse" />
              <span className="relative z-10">Lihat Semua Pencapaian</span>
              <ArrowRight size={20} className="ml-2 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;