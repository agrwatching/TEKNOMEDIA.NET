"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Data Team Photos
const teamPhotos = [
  { src: "/about2.jpg", alt: "Foto Tim 1" },
  { src: "/about4.jpg", alt: "Foto Tim 2" },
  { src: "/about1.jpg", alt: "Foto Tim 3" },
  { src: "/about3.jpg", alt: "Foto Tim 4" },
];

// Data Mitra - SEMUA DINAMIS DARI SINI
export const partners = [
  {
    id: 1,
    logo: "/vtnet.png",
    name: "VTNet",
    category: "Network Provider",
    description: "Mitra resmi penyedia layanan internet & infrastruktur jaringan terpercaya.",
    website: "https://vtnet.id/"
  },
  {
    id: 2,
    logo: "/vtnet.png",
    name: "Partner 2",
    category: "IT Solutions",
    description: "Solusi teknologi informasi terpadu untuk bisnis modern.",
    website: "https://example.com"
  },
  {
    id: 3,
    logo: "/vtnet.png",
    name: "Partner 3",
    category: "Cloud Services",
    description: "Layanan cloud computing dan hosting berkualitas tinggi.",
    website: "https://example.com"
  },
  {
    id: 4,
    logo: "/vtnet.png",
    name: "Partner 4",
    category: "Cybersecurity",
    description: "Perlindungan keamanan siber untuk infrastruktur digital Anda.",
    website: "https://example.com"
  },
  // Tambahkan mitra baru di sini
];

// Data Misi
const missionItems = [
  "Edukasi kelas industri & teaching factory.",
  "Program digital marketing modern.",
  "Layanan guru tamu untuk sekolah.",
  "Solusi IT & layanan digital.",
  "Layanan internet dedicated & broadband.",
];

interface AboutSectionProps {
  showFullContent?: boolean; // Tampilkan foto, visi, misi (default: true)
  partnerLimit?: number; // Batasi jumlah mitra (default: semua)
  showViewAllPartners?: boolean; // Tampilkan tombol "Lihat Semua Mitra"
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  showFullContent = true,
  partnerLimit,
  showViewAllPartners = false
}) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  // Filter partners berdasarkan limit
  const displayedPartners = partnerLimit 
    ? partners.slice(0, partnerLimit) 
    : partners;

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* KONTEN FOTO, VISI, MISI - Hanya muncul jika showFullContent = true */}
      {showFullContent && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* FOTO KIRI - ENHANCED */}
            <div className="relative animate-fade-in-left">
              <div className="relative grid grid-cols-2 gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 group hover:shadow-2xl transition-all duration-500">
                
                {/* GLOW EFFECT */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

                {teamPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md transform transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      zIndex: 10 + index,
                      transform:
                        hoveredPhoto === index
                          ? `rotate(0deg) translateX(0px) translateY(0px) scale(1.05)`
                          : `rotate(${(index - 1.5) * 4}deg) translateX(${index * 5 - 10}px) translateY(${index * 5 - 10}px)`,
                    }}
                    onMouseEnter={() => setHoveredPhoto(index)}
                    onMouseLeave={() => setHoveredPhoto(null)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}

                {/* GROUP HOVER OVERLAY */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* FLOATING DECORATIONS */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>

            {/* KONTEN KANAN - ENHANCED */}
            <div className="space-y-8 animate-fade-in-right">
              
              {/* JUDUL */}
              <div className="mb-8">
                <div className="inline-block mb-4 animate-fade-in">
                  <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-semibold tracking-wide uppercase border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
                    Company Profile
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent animate-[gradient-shift_3s_ease_infinite]" style={{ backgroundSize: "200% 200%" }}>
                    About Us
                  </span>
                </h2>

                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full shadow-lg"></div>
              </div>

              {/* DESKRIPSI */}
              <p className="text-lg text-gray-600 text-justify leading-relaxed animate-fade-in-up hover:text-gray-900 transition-colors duration-300" style={{ animationDelay: "0.2s" }}>
                Teknomedia adalah perusahaan penyedia layanan edukasi berbasis industri dan solusi teknologi yang berfokus pada peningkatan kompetensi digital generasi muda serta mendukung kebutuhan teknologi untuk institusi dan bisnis.
              </p>

              {/* VISI - ENHANCED */}
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:scale-[1.02] animate-fade-in-up relative overflow-hidden" style={{ animationDelay: "0.3s" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center group-hover:scale-105 transition-transform duration-300">
                    <span className="mr-3 text-orange-500 text-3xl animate-bounce">✨</span>
                    Visi Kami
                  </h3>
                  <p className="text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Menjadi penyedia layanan edukasi industri dan solusi teknologi yang inovatif dan terpercaya.
                  </p>
                </div>
              </div>

              {/* MISI - ENHANCED */}
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:scale-[1.02] animate-fade-in-up relative overflow-hidden" style={{ animationDelay: "0.4s" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-orange-500 mb-3 flex items-center group-hover:scale-105 transition-transform duration-300">
                    <span className="mr-3 text-blue-600 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🚀</span>
                    Misi Kami
                  </h3>
                  <ul className="space-y-3 text-gray-900">
                    {missionItems.map((item, index) => (
                      <li key={index} className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                        <span className="mr-3 text-orange-500 font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                        <span className="group-hover/item:text-orange-500 transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===========================
          KEMITRAAN STRATEGIS - ENHANCED
      ============================ */}
      <div id="company" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-semibold tracking-wide uppercase border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse">
              Partnership
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent animate-[gradient-shift_3s_ease_infinite]" style={{ backgroundSize: "200% 200%" }}>
              Kemitraan Strategis
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Berkolaborasi dengan mitra terpercaya untuk memberikan solusi terbaik dan mendukung pertumbuhan bisnis Anda.
          </p>

          {/* DECORATIVE LINE */}
          <div className="mt-8 flex justify-center items-center space-x-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-500"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>

        {/* PARTNERSHIP CARDS WRAPPER */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          
          {/* ANIMATED BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-orange-500/5 to-blue-500/5 rounded-3xl blur-3xl -z-10 animate-pulse-scale"></div>

          <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-gray-200 shadow-2xl overflow-hidden hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] transition-all duration-500">
            
            {/* TOP BAR */}
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-500/5 to-orange-500/5 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
              
              {/* SHINE EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900">
                  {partnerLimit ? 'Mitra Pilihan Kami' : 'Semua Mitra Resmi'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Dipercaya oleh industri terkemuka</p>
              </div>

              {/* Tombol "Lihat Semua Mitra" - Hanya muncul jika showViewAllPartners = true */}
              {showViewAllPartners && (
                <Link
                  href="/mitra"
                  className="relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 text-white font-semibold transition-all duration-500 overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 border-2 border-purple-500"
                  style={{ backgroundSize: "200% 100%", backgroundPosition: "0% 0%" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "100% 0%")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "0% 0%")}
                >
                  <span className="relative z-10">Lihat Semua Mitra</span>
                </Link>
              )}
            </div>

            {/* CARD SECTION - DINAMIS DARI ARRAY PARTNERS */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group relative bg-white/95 rounded-xl border border-blue-600/40 shadow-xl hover:shadow-blue-600/40 overflow-hidden transition-all duration-500 flex flex-col"
                  >
                    {/* ANIMATED GRADIENT TOP */}
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 animate-[gradient-shift_3s_linear_infinite]" style={{ backgroundSize: "200% 100%" }}></div>

                    {/* GLOW EFFECT */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></div>

                    <div className="p-6 flex flex-col flex-grow relative">
                      
                      {/* LOGO CONTAINER - DINAMIS */}
                      <div className="relative mb-4 flex justify-center h-32">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} Logo`}
                          width={200}
                          height={128}
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 rounded-xl border-2 border-blue-600/20 group-hover:animate-spin-slow"></div>
                      </div>

                      {/* TEXT CONTENT - DINAMIS */}
                      <div className="text-center mb-4 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {partner.name}
                        </h3>

                        <div className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold mb-3 border border-blue-600/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                          {partner.category}
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {partner.description}
                        </p>
                      </div>

                      {/* CTA BUTTON - DINAMIS */}
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 text-white font-semibold text-center block transition-all duration-500 overflow-hidden group/btn hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 border-2 border-purple-500"
                        style={{ backgroundSize: "200% 100%", backgroundPosition: "0% 0%" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "100% 0%")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "0% 0%")}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Kunjungi {partner.name}
                          <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                      </a>
                    </div>

                    {/* SHINE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;