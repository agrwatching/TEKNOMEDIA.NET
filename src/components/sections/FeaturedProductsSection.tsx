// src/components/sections/FeaturedProductsSection.tsx
"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Award, Sparkles, Zap, ArrowRight, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    title: 'Instalasi Jaringan Kampus Negeri',
    description: 'Implementasi jaringan fiber optik dan WiFi kampus untuk mendukung proses belajar mengajar berbasis digital.',
    tag: 'Project Besar',
    link: '/',
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    title: 'Pengembangan Platform E-Learning',
    description: 'Sistem pembelajaran digital lengkap dengan modul, video, ujian online, hingga pelaporan otomatis.',
    tag: 'Inovasi Digital',
    link: '/',
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const openModal = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  // Memoize displayed achievements
  const displayedAchievements = useMemo(() => 
    limit ? achievements.slice(0, limit) : achievements,
    [limit]
  );

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === displayedAchievements.length - 1 ? 0 : prev + 1
    );
  }, [displayedAchievements.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayedAchievements.length - 1 : prev - 1
    );
  }, [displayedAchievements.length]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, closeModal, prevImage, nextImage]);

  return (
    <>
      <section id="achievements" className="py-16 md:py-24 bg-white relative overflow-hidden">
        
        {/* Optimized Background - Reduced animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow" 
            style={{ willChange: 'opacity, transform' }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow" 
            style={{ animationDelay: '1s', willChange: 'opacity, transform' }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            {/* Icon Decoration - Animated once on load */}
            <div className="flex justify-center items-center gap-3 mb-4 animate-fade-in">
              <Sparkles className="w-6 h-6 text-indigo-500" />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
              <Zap className="w-6 h-6 text-purple-500" />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              <Sparkles className="w-6 h-6 text-indigo-500" />
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
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-200/50 -rotate-1" />
                </span>
              </p>
            </div>

            <p className="max-w-3xl text-lg text-gray-600 mx-auto leading-relaxed animate-fade-in-up">
              Dokumentasi kegiatan, presentasi, dan kolaborasi kami dalam memberikan solusi digital terbaik untuk dunia pendidikan Indonesia.
            </p>
          </div>

          {/* Grid Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {displayedAchievements.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="group relative animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Card Container */}
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 h-full flex flex-col">
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Border Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  {/* Image Section */}
                  <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index > 1 ? "lazy" : "eager"}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      style={{ willChange: 'transform' }}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Tag Badge */}
                    <span className="absolute top-3 right-3 flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <Award size={14} className="mr-1.5" />
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
                    <button
                      onClick={() => openModal(index)}
                      className="relative w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group/btn mt-auto"
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      
                      <Image size={18} className="mr-2 transform group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="relative z-10">Lihat Pencapaian</span>
                      <ArrowRight size={16} className="ml-2 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
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

          {/* CTA Button */}
          {showViewAll && limit && (
            <div className="text-center animate-fade-in-up">
              <a
                href="/featured"
                className="group inline-flex items-center justify-center px-10 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden"
              >
                {/* Button background slide effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                <Sparkles size={20} className="mr-2 relative z-10" />
                <span className="relative z-10">Lihat Semua Pencapaian</span>
                <ArrowRight size={20} className="ml-2 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Modal Fullscreen */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white font-semibold">
              {currentImageIndex + 1} / {displayedAchievements.length}
            </span>
          </div>

          {/* Tag Badge */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50">
            <span className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
              <Award size={16} className="mr-2" />
              {displayedAchievements[currentImageIndex].tag}
            </span>
          </div>

          {/* Main Image Container */}
          <div 
            className="flex items-center justify-center h-full p-4 md:p-8 pt-28 pb-32"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-6xl w-full animate-zoom-in">
              <img
                src={displayedAchievements[currentImageIndex].image}
                alt={displayedAchievements[currentImageIndex].title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 rounded-b-lg">
                <h3 className="text-3xl font-bold text-white mb-3">
                  {displayedAchievements[currentImageIndex].title}
                </h3>
                <p className="text-gray-200 text-base leading-relaxed">
                  {displayedAchievements[currentImageIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Keyboard Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Tekan ESC untuk keluar • ← → untuk navigasi
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProductsSection;