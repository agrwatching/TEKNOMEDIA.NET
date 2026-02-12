"use client";

import React, { useState } from "react";
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface TeamMember {
  image: string;
  name: string;
  role: string;
  description: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  isCore?: boolean;
}

interface TeamSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

// Data Anggota Tim
const teamMembers: TeamMember[] = [
  {
    image: "/pp1.jpg",
    name: "TARMA, S.Kom",
    role: "Chief Executive Officer (CEO)",
    description:
      "Pemimpin strategis yang mengarahkan visi perusahaan dalam pengembangan solusi jaringan terintegrasi...",
    linkedin: "#",
    instagram: "https://instagram.com/tarma",
    facebook: "https://facebook.com/tarma",
    twitter: "https://twitter.com/tarma",
    whatsapp: "+6281294942081",
    isCore: true,
  },
  {
    image: "/pp2.jpg",
    name: "AGRA",
    role: "Chief Technology Officer (CTO)",
    description:
      "Memimpin inovasi teknologi perusahaan dengan keahlian dalam arsitektur sistem...",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "+6281351184785",
    isCore: true,
  },
  {
    image: "/pp3.jpg",
    name: "YUSUF FAISAL",
    role: "Staff & Expertise",
    description:
      "Spesialis konfigurasi Mikrotik, manajemen server, dan pengembangan aplikasi berbasis jaringan untuk infrastruktur IT yang handal.",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "+628999994994",
    isCore: true,
  },
  {
    image: "/pp4.jpeg",
    name: "MUHAMMAD RIZAL",
    role: "Staff & Expertise",
    description:
      "Software Engineer berpengalaman dalam membangun aplikasi web modern dengan fokus pada clean code dan best practices development.",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "+6285179718031",
    isCore: true,
  },
    {
    image: "/pp5.jpeg",
    name: "SRI AYU LESTARI ",
    role: "Staff & Expertise",
    description:
      "Ahli dalam manajemen bisnis dan strategi digital marketing untuk mengembangkan brand awareness dan pertumbuhan perusahaan.",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "+62895389740013",
    isCore: true,
  },
    {
    image: "/pp6.jpeg",
    name: "MUHAMMAD RIZKY SAPUTRA",
    role: "Staff & Expertise",
    description:
      "Spesialis manajemen bisnis dan digital marketing dengan keahlian dalam mengoptimalkan strategi pemasaran online dan analisis data.",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "+6282320543219",
    isCore: true,
  },
];

const TeamSection: React.FC<TeamSectionProps> = ({
  limit,
  showViewAll = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Pisahkan leadership (CEO & CTO) dan staff
  const leadership = teamMembers.slice(0, 2);
  const staff = teamMembers.slice(2);

  return (
    <section
      id="team"
      className="py-16 md:py-24 bg-slate-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">
              <span className="inline-block mr-2">⚡</span> Meet Our Team{" "}
              <span className="inline-block ml-2">⚡</span>
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>

          <h3 className="mt-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Struktur Organisasi
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tim Profesional Teknomedia & Edulab
            </span>
          </h3>

          <p className="mt-6 max-w-3xl text-lg text-gray-300 mx-auto leading-relaxed">
            Tim lengkap yang siap membantu kesuksesan teknologi dan bisnis Anda.
          </p>
        </div>

        {/* Organizational Structure */}
        <div className="space-y-8">
          {/* Leadership Level - CEO & CTO */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-start-2">
              {leadership[0] && (
                <div
                  onMouseEnter={() => setHoveredIndex(0)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative"
                >
                  <div className="relative h-full flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-indigo-500/30 text-center transition-all duration-500 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-3 overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-indigo-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-indigo-400" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400" />

                    {/* Foto Tim */}
                    <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 mb-4 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/70 group-hover:border-indigo-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
                        <img
                          src={leadership[0].image}
                          alt={leadership[0].name}
                          className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-2 flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                        {leadership[0].name}
                      </h3>

                      <div className="inline-block">
                        <p className="text-xs md:text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300 min-h-[2.5rem]">
                          {leadership[0].role}
                        </p>
                        <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                        {leadership[0].description}
                      </p>

                      {/* Social Media Links */}
                      <div className="pt-3 flex justify-center gap-2 flex-shrink-0">
                        <a
                          href={leadership[0].linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={16} />
                        </a>
                        <a
                          href={leadership[0].instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="Instagram"
                        >
                          <Instagram size={16} />
                        </a>
                        <a
                          href={leadership[0].facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-500 hover:bg-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="Facebook"
                        >
                          <Facebook size={16} />
                        </a>
                        <a
                          href={leadership[0].twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-sky-400 hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="Twitter"
                        >
                          <Twitter size={16} />
                        </a>
                        <a
                          href={`https://wa.me/${leadership[0].whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="WhatsApp"
                        >
                          <MessageSquare size={16} />
                        </a>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                </div>
              )}
            </div>

            <div>
              {leadership[1] && (
                <div
                  onMouseEnter={() => setHoveredIndex(1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative"
                >
                  <div className="relative h-full flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-indigo-500/30 text-center transition-all duration-500 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-3 overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-indigo-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-indigo-400" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400" />

                    {/* Foto Tim */}
                    <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 mb-4 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/70 group-hover:border-indigo-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
                        <img
                          src={leadership[1].image}
                          alt={leadership[1].name}
                          className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-2 flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                        {leadership[1].name}
                      </h3>

                      <div className="inline-block">
                        <p className="text-xs md:text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300 min-h-[2.5rem]">
                          {leadership[1].role}
                        </p>
                        <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                        {leadership[1].description}
                      </p>

                      {/* Social Media Links */}
                      <div className="pt-3 flex justify-center gap-2 flex-shrink-0">
                        <a
                          href={leadership[1].linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={16} />
                        </a>
                        <a
                          href={leadership[1].instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="Instagram"
                        >
                          <Instagram size={16} />
                        </a>
                        <a
                          href={leadership[1].facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-500 hover:bg-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="Facebook"
                        >
                          <Facebook size={16} />
                        </a>
                        <a
                          href={leadership[1].twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-sky-400 hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="Twitter"
                        >
                          <Twitter size={16} />
                        </a>
                        <a
                          href={`https://wa.me/${leadership[1].whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110"
                          aria-label="WhatsApp"
                        >
                          <MessageSquare size={16} />
                        </a>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Staff Level - 4 kolom desktop, 2 kolom mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div
                key={index + 2}
                onMouseEnter={() => setHoveredIndex(index + 2)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="relative h-full flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-purple-500/30 text-center transition-all duration-500 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-3 overflow-hidden">
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-pink-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-pink-400" />

                  {/* Foto Tim */}
                  <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 mb-4 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/70 group-hover:border-purple-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-2 flex flex-col flex-grow">
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {member.name}
                    </h3>

                    <div className="inline-block">
                      <p className="text-xs md:text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300 min-h-[2.5rem]">
                        {member.role}
                      </p>
                      <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 to-pink-500 mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                      {member.description}
                    </p>

                    {/* Social Media Links */}
                    <div className="pt-3 flex justify-center gap-2 flex-shrink-0">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-110"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={16} />
                      </a>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-110"
                        aria-label="Instagram"
                      >
                        <Instagram size={16} />
                      </a>
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-500 hover:bg-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-110"
                        aria-label="Facebook"
                      >
                        <Facebook size={16} />
                      </a>
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-sky-400 hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-110"
                        aria-label="Twitter"
                      >
                        <Twitter size={16} />
                      </a>
                      <a
                        href={`https://wa.me/${member.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700/50 text-gray-400 hover:text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110"
                        aria-label="WhatsApp"
                      >
                        <MessageSquare size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol View All */}
        {showViewAll && (
          <div className="text-center mt-16">
            <Link
              href="/team"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/70 hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Lihat Semua Tim</span>
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;