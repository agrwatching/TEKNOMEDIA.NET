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
  isCore?: boolean; // Tandai apakah team inti
}

interface TeamSectionProps {
  limit?: number; // Batasi jumlah yang ditampilkan
  showViewAll?: boolean; // Tampilkan tombol "Lihat Semua Tim"
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
    whatsapp: "628123456789",
    isCore: true,
  },
  {
    image: "/pp2.jpg",
    name: "INDRA ADE, S. Kom",
    role: "E-Learning System Developer & Network Specialist",
    description:
      "Bertanggung jawab dalam perancangan dan pengembangan platform e-learning perusahaan...",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "628123456789",
    isCore: true,
  },
  {
    image: "/pp3.jpg",
    name: "YUSUF FAISAL",
    role: "Windows Server Administrator & Infrastructure Engineer",
    description:
      "Mengelola dan mengoptimalkan server berbasis Windows untuk memastikan performa dan keamanan sistem perusahaan...",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "628123456789",
    isCore: true,
  },
  {
    image: "/pp4.jpg",
    name: "AGRA",
    role: "Full Stack Web Developer & System Application Engineer",
    description:
      "Mengembangkan website company profile sekaligus merancang aplikasi berbasis web...",
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "628123456789",
    isCore: true,
  },
  // Tambahkan member lainnya di sini (non-core team)
];

const TeamSection: React.FC<TeamSectionProps> = ({
  limit,
  showViewAll = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter team members berdasarkan limit
  const displayedMembers = limit ? teamMembers.slice(0, limit) : teamMembers;

  return (
    <section
      id="team"
      className="py-16 md:py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 animate-[gridMove_20s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 animate-pulse">
              <span className="inline-block mr-2">⚡</span>{" "}
              {limit ? "Tim Inti Kami" : "Meet Our Team"}{" "}
              <span className="inline-block ml-2">⚡</span>
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>

          <h3 className="mt-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {limit ? "Para Profesional di Balik" : "Kenali Seluruh Tim"}
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              {limit ? "Koneksi Andal Anda" : "Profesional Teknomedia"}
            </span>
          </h3>

          <p className="mt-6 max-w-3xl text-lg text-gray-300 mx-auto leading-relaxed">
            {limit
              ? "Kami adalah perpaduan antara teknisi bersertifikasi dan ahli strategi bisnis yang berdedikasi."
              : "Tim lengkap yang siap membantu kesuksesan teknologi dan bisnis Anda."}
          </p>

          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
        </div>

        {/* Grid Anggota Tim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedMembers.map((member, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative animate-[slideUp_0.8s_ease-out_both] h-full"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-full flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 rounded-2xl border border-indigo-500/30 text-center transition-all duration-500 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-3 overflow-hidden">
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    hoveredIndex === index
                      ? "animate-[shimmer_2s_linear_infinite]"
                      : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.1) 50%, transparent 70%)",
                    backgroundSize: "200% 200%",
                  }}
                />

                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-indigo-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-indigo-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400" />

                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent transition-transform duration-1000 ${
                    hoveredIndex === index
                      ? "translate-y-0"
                      : "-translate-y-full"
                  }`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-transform duration-1000 ${
                    hoveredIndex === index
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                />

                {/* Foto Tim */}
                <div className="relative mx-auto w-32 h-32 mb-6 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/50 transition-all duration-700 ${
                      hoveredIndex === index
                        ? "rotate-180 scale-110"
                        : "rotate-0"
                    }`}
                  />

                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/70 group-hover:border-indigo-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent ${
                        hoveredIndex === index
                          ? "animate-[scan_2s_linear_infinite]"
                          : "opacity-0"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <div className="inline-block">
                    <p className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300 min-h-[2.5rem]">
                      {member.role}
                    </p>
                    <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow min-h-[4.5rem]">
                    {member.description}
                  </p>

                  <div className="pt-3 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full animate-[growBar_1s_ease-out_forwards] w-[85%]" />
                    <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full animate-[growBar_1.2s_ease-out_forwards] w-[70%]" />
                    <div className="h-1 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full animate-[growBar_1.4s_ease-out_forwards] w-[90%]" />
                  </div>

                  {/* Social Media Links */}
                  <div className="pt-4 flex justify-center gap-3 flex-shrink-0">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-blue-500 hover:bg-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-sky-400 hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      aria-label="Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12"
                      aria-label="WhatsApp"
                    >
                      <MessageSquare size={18} />
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Tombol View All - Hanya muncul jika showViewAll = true */}
        {showViewAll && (
          <div
            className="text-center mt-16 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
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
