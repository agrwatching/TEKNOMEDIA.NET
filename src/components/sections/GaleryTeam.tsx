"use client";

import React, { useState } from "react";
import { ImageIcon, Camera, Eye, ZoomIn, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/colabvtnet.jpg",
    title: "Meeting & Diskusi Proyek",
    description:
      "Sesi brainstorming bersama tim untuk merancang solusi jaringan sekolah modern.",
  },
  {
    id: 2,
    image: "/gurutamu.jpg",
    title: "Implementasi Fiber Optik",
    description:
      "Tim lapangan melakukan penarikan kabel dan konfigurasi perangkat FO.",
  },
  {
    id: 3,
    image: "/elearning.jpg",
    title: "Training E-Learning",
    description:
      "Pelatihan penggunaan platform e-learning untuk guru dan staf sekolah.",
  },
  {
    id: 4,
    image: "/server.jpg",
    title: "Setup Server Sekolah",
    description:
      "Konfigurasi Windows Server untuk manajemen user dan data sekolah.",
  },
  {
    id: 5,
    image: "/maintenancep.jpg",
    title: "Maintenance Perangkat",
    description:
      "Pemeliharuan rutin access point dan switch jaringan.",
  },
  {
    id: 6,
    image: "/colab.png",
    title: "Kolaborasi Tim",
    description:
      "Dokumentasi kolaborasi internal untuk meningkatkan layanan digital.",
  },
];

interface GaleryTeamProps {
  limit?: number; // Batasi jumlah galeri yang ditampilkan
  showViewAll?: boolean; // Tampilkan tombol "Lihat Galeri Lengkap"
}

const GaleryTeam: React.FC<GaleryTeamProps> = ({ 
  limit, 
  showViewAll = false 
}) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedItems);
    newLiked.has(id) ? newLiked.delete(id) : newLiked.add(id);
    setLikedItems(newLiked);
  };

  // Filter gallery berdasarkan limit
  const displayedGallery = limit 
    ? galleryItems.slice(0, limit) 
    : galleryItems;

  return (
    <section
      id="galeri-tim"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-gray-50 to-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <Camera className="absolute top-20 left-10 w-32 h-32 text-indigo-200 animate-[float_8s_ease-in-out_infinite] rotate-12" />
        <Camera className="absolute bottom-32 right-20 w-40 h-40 text-purple-200 animate-[float_10s_ease-in-out_infinite] -rotate-12" />

        <div className="absolute top-40 right-10 w-24 h-28 border-8 border-white shadow-lg rotate-12 animate-[sway_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-40 left-20 w-20 h-24 border-8 border-white shadow-lg -rotate-6 animate-[sway_7s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Camera className="w-8 h-8 text-indigo-500 animate-[shake_2s_ease-in-out_infinite]" />
            <Eye className="w-8 h-8 text-purple-500 animate-pulse" />
            <ImageIcon className="w-8 h-8 text-pink-500 animate-[shake_2s_ease-in-out_infinite]" />
          </div>

          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]">
            {limit ? 'Galeri Pilihan' : 'Galeri Kegiatan'}
          </h2>

          <p className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {limit ? 'Dokumentasi Pilihan' : 'Dokumentasi Tim'}
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Profesional Kami
            </span>
          </p>

          <p className="max-w-3xl text-lg text-gray-600 mx-auto leading-relaxed">
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
              className="group relative animate-[zoomIn_0.6s_ease-out_both]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-white rounded-lg shadow-xl border-8 border-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-2 overflow-hidden flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Flash */}
                  <div
                    className={`absolute inset-0 bg-white ${
                      hoveredItem === item.id
                        ? "animate-[flash_0.5s_ease-out]"
                        : "opacity-0"
                    }`}
                  />

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>

                  {/* Like */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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

                  <button className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-xl transition-all duration-300">
                    <ImageIcon size={18} className="mr-2" />
                    Lihat Foto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - Hanya muncul jika showViewAll = true */}
        {showViewAll && (
          <div className="mt-16 text-center">
            <Link
              href="/galeri"
              className="group inline-flex items-center justify-center px-10 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-500 shadow-md hover:shadow-2xl relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

              <Camera className="mr-3 relative z-10" />
              <span className="relative z-10">Lihat Galeri Lengkap</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default GaleryTeam;