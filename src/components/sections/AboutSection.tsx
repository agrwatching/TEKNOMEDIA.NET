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
  showFullContent?: boolean;
  partnerLimit?: number;
  showViewAllPartners?: boolean;
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

      {/* KONTEN FOTO, VISI, MISI */}
      {showFullContent && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* FOTO KIRI */}
            <div className="relative">
              <div className="relative grid grid-cols-2 gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                {teamPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md transform transition-transform duration-300 cursor-pointer"
                    style={{
                      zIndex: 10 + index,
                      transform:
                        hoveredPhoto === index
                          ? `rotate(0deg) scale(1.05)`
                          : `rotate(${(index - 1.5) * 4}deg)`,
                    }}
                    onMouseEnter={() => setHoveredPhoto(index)}
                    onMouseLeave={() => setHoveredPhoto(null)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* KONTEN KANAN */}
            <div className="space-y-8">
              
              {/* JUDUL */}
              <div className="mb-8">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold tracking-wide uppercase border border-blue-200">
                    Company Profile
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  About Us
                </h2>

                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
              </div>

              {/* DESKRIPSI */}
              <p className="text-lg text-gray-600 text-justify leading-relaxed hover:text-gray-900 transition-colors duration-300">
                Teknomedia adalah perusahaan penyedia layanan edukasi berbasis industri dan solusi teknologi yang berfokus pada peningkatan kompetensi digital generasi muda serta mendukung kebutuhan teknologi untuk institusi dan bisnis.
              </p>

              {/* VISI */}
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center">
                  <span className="mr-3 text-orange-500 text-3xl">✨</span>
                  Visi Kami
                </h3>
                <p className="text-gray-900">
                  Menjadi penyedia layanan edukasi industri dan solusi teknologi yang inovatif dan terpercaya.
                </p>
              </div>

              {/* MISI */}
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-orange-500 mb-3 flex items-center">
                  <span className="mr-3 text-blue-600 text-3xl">🚀</span>
                  Misi Kami
                </h3>
                <ul className="space-y-3 text-gray-900">
                  {missionItems.map((item, index) => (
                    <li key={index} className="flex items-start hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-3 text-orange-500 font-bold text-lg">•</span>
                      <span className="hover:text-orange-500 transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KEMITRAAN STRATEGIS */}
      <div id="company" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold tracking-wide uppercase border border-blue-200">
              Partnership
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Kemitraan Strategis
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Berkolaborasi dengan mitra terpercaya untuk memberikan solusi terbaik dan mendukung pertumbuhan bisnis Anda.
          </p>
        </div>

        {/* PARTNERSHIP CARDS WRAPPER */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          
          {/* TOP BAR */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {partnerLimit ? 'Mitra Pilihan Kami' : 'Semua Mitra Resmi'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Dipercaya oleh industri terkemuka</p>
            </div>

            {/* Tombol "Lihat Semua Mitra" */}
            {showViewAllPartners && (
              <Link
                href="/mitra"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Lihat Semua Mitra
              </Link>
            )}
          </div>

          {/* CARD SECTION */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="group relative bg-white rounded-xl border border-blue-200 shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  {/* GRADIENT TOP */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 to-orange-500"></div>

                  <div className="p-6 flex flex-col flex-grow">
                    
                    {/* LOGO CONTAINER */}
                    <div className="relative mb-4 flex justify-center h-32">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        width={200}
                        height={128}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="text-center mb-4 flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {partner.name}
                      </h3>

                      <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold mb-3 border border-blue-200">
                        {partner.category}
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {partner.description}
                      </p>
                    </div>

                    {/* CTA BUTTON */}
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold text-center block transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <span className="flex items-center justify-center">
                        Kunjungi {partner.name}
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;