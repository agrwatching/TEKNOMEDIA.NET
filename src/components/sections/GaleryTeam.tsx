"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Camera, Eye, ZoomIn, Heart, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/g1.jpg",
    title: "Instalasi Jaringan Kampus",
    description:
      "Implementasi infrastruktur jaringan kampus dengan teknologi terkini untuk mendukung ekosistem digital pendidikan tinggi.",
  },
  {
    id: 2,
    image: "/g2.jpg",
    title: "Meeting & Diskusi Proyek",
    description:
      "Sesi brainstorming dan perencanaan strategis bersama tim untuk merancang solusi IT yang optimal bagi institusi pendidikan.",
  },
  {
    id: 3,
    image: "/g3.jpg",
    title: "Training E-Learning",
    description:
      "Pelatihan komprehensif penggunaan platform e-learning untuk meningkatkan kompetensi digital guru dan staf sekolah.",
  },
  {
    id: 4,
    image: "/g4.jpg",
    title: "Setup Server Sekolah",
    description:
      "Konfigurasi dan deployment Windows Server untuk manajemen user, database, dan sistem informasi akademik sekolah.",
  },
  {
    id: 5,
    image: "/g5.jpg",
    title: "Maintenance Perangkat",
    description:
      "Pemeliharaan rutin dan preventif terhadap perangkat jaringan, access point, switch, dan infrastruktur IT sekolah.",
  },
  {
    id: 6,
    image: "/g6.jpg",
    title: "Implementasi Fiber Optik",
    description:
      "Pemasangan dan konfigurasi jaringan fiber optik untuk koneksi internet berkecepatan tinggi dan stabil di lingkungan kampus.",
  },
  {
    id: 7,
    image: "/g7.jpg",
    title: "Pengembangan Platform E-Learning",
    description:
      "Develop dan customize platform pembelajaran digital yang user-friendly untuk mendukung proses belajar mengajar online.",
  },
  {
    id: 8,
    image: "/g8.jpg",
    title: "Integrasi Server & Infrastruktur IT",
    description:
      "Integrasi sistem server, database, dan infrastruktur IT untuk menciptakan ekosistem digital yang terintegrasi dan efisien.",
  },
];

interface GaleryTeamProps {
  limit?: number;
  showViewAll?: boolean;
}

const GaleryTeam: React.FC<GaleryTeamProps> = ({ 
  limit, 
  showViewAll = false 
}) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleLike = useCallback((id: number) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      newLiked.has(id) ? newLiked.delete(id) : newLiked.add(id);
      return newLiked;
    });
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

  const displayedGallery = useMemo(() => 
    limit ? galleryItems.slice(0, limit) : galleryItems,
    [limit]
  );

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === displayedGallery.length - 1 ? 0 : prev + 1
    );
  }, [displayedGallery.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayedGallery.length - 1 : prev - 1
    );
  }, [displayedGallery.length]);

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
      <section
        id="galeri-tim"
        className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-gray-50 to-white relative overflow-hidden"
      >
        {/* Optimized Background - Reduced to 2 elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <Camera 
            className="absolute top-20 left-10 w-32 h-32 text-indigo-200 animate-float-slow" 
            style={{ willChange: 'transform' }}
          />
          <div 
            className="absolute bottom-40 right-20 w-24 h-28 border-8 border-indigo-100 shadow-lg rotate-12 animate-sway"
            style={{ willChange: 'transform' }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Header - Animated once on load */}
          <div className="text-center mb-16 space-y-6">
            <div className="flex justify-center items-center gap-4 mb-4 animate-fade-in-down">
              <Camera className="w-8 h-8 text-indigo-500" />
              <Eye className="w-8 h-8 text-purple-500" />
              <ImageIcon className="w-8 h-8 text-pink-500" />
            </div>

            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] animate-fade-in">
              {limit ? 'Galeri Pilihan' : 'Galeri Kegiatan'}
            </h2>

            <p className="text-4xl md:text-5xl font-extrabold text-gray-900 animate-fade-in-up">
              {limit ? 'Dokumentasi Pilihan' : 'Dokumentasi Tim'}
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Profesional Kami
              </span>
            </p>

            <p className="max-w-3xl text-lg text-gray-600 mx-auto leading-relaxed animate-fade-in-up">
              {limit 
                ? 'Mengabadikan momen kolaborasi, instalasi jaringan, dan implementasi solusi digital terbaik.'
                : 'Mengabadikan momen kolaborasi, instalasi jaringan, dan implementasi solusi digital terbaik untuk institusi pendidikan.'
              }
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedGallery.map((item, index) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative animate-zoom-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  willChange: 'transform, opacity'
                }}
              >
                <div className="relative bg-white rounded-lg shadow-xl border-8 border-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-2 overflow-hidden flex flex-col h-full">
                  
                  {/* Image Container */}
                  <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                    <NextImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ willChange: 'transform' }}
                      priority={index < 3}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                        <ZoomIn className="w-8 h-8 text-indigo-600" />
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Like photo"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          likedItems.has(item.id)
                            ? "fill-red-500 text-red-500 scale-110"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Caption */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <button 
                      onClick={() => openModal(index)}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <ImageIcon size={18} className="mr-2" />
                      Lihat Foto
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {showViewAll && (
            <div className="mt-16 text-center">
              <a
                href="/galeri"
                className="group inline-flex items-center justify-center px-10 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-500 shadow-md hover:shadow-2xl relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                <Camera className="mr-3 relative z-10" />
                <span className="relative z-10">Lihat Galeri Lengkap</span>
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
              {currentImageIndex + 1} / {displayedGallery.length}
            </span>
          </div>

          {/* Main Image Container */}
          <div 
            className="flex items-center justify-center h-full p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-6xl w-full h-[80vh] animate-zoom-in">
              <NextImage
                src={displayedGallery[currentImageIndex].image}
                alt={displayedGallery[currentImageIndex].title}
                fill
                sizes="90vw"
                className="object-contain rounded-lg"
                priority
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {displayedGallery[currentImageIndex].title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {displayedGallery[currentImageIndex].description}
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

export default GaleryTeam;