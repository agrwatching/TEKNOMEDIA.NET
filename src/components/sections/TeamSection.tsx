"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  MessageSquare,
} from "lucide-react";

interface TeamMember {
  image: string;
  name: string;
  role: string;
  description: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  whatsapp?: string;
}

interface TeamSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

// =====================================================================
// DATA ANGGOTA TIM
// Tinggal tambah/kurang object di array ini, layout & warna otomatis
// menyesuaikan (grid wrap otomatis, tema warna cycling per index).
// Field social media opsional — kalau tidak diisi, ikonnya tidak muncul.
// =====================================================================
const teamMembers: TeamMember[] = [
  {
    image: "/pp1.jpg",
    name: "TARMA, S.Kom",
    role: "Chief Executive Officer (CEO)",
    description:
      "Pemimpin strategis yang mengarahkan visi perusahaan dalam pengembangan solusi jaringan terintegrasi...",
    instagram: "https://instagram.com/tarma",
    facebook: "https://facebook.com/tarma",
    twitter: "https://twitter.com/tarma",
    whatsapp: "+6281294942081",
  },
  {
    image: "/pp2.jpg",
    name: "AGRA",
    role: "Staff & Expertise",
    description:
      "Memimpin inovasi teknologi perusahaan dengan keahlian dalam arsitektur sistem...",
    instagram: "https://instagram.com/tarma",
    facebook: "https://facebook.com/tarma",
    twitter: "https://twitter.com/tarma",
    whatsapp: "+6281351184785",
  },
  {
    image: "/pp3.jpg",
    name: "YUSUF FAISAL",
    role: "Staff & Expertise",
    description:
      "Spesialis konfigurasi Mikrotik, manajemen server, dan pengembangan aplikasi berbasis jaringan untuk infrastruktur IT yang handal.",
    instagram: "https://instagram.com/tarma",
    facebook: "https://facebook.com/tarma",
    twitter: "https://twitter.com/tarma",
    whatsapp: "+628999994994",
  },
];

// =====================================================================
// TEMA WARNA — className ditulis lengkap (bukan template string) supaya
// tidak kena purge Tailwind. Tambah objek baru di sini kalau mau varian
// warna lebih banyak; akan otomatis cycling lewat index % THEMES.length.
// =====================================================================
const THEMES = [
  {
    border: "border-indigo-500/30",
    borderHover: "group-hover:border-indigo-400",
    corner: "border-indigo-500/50",
    cornerHover: "group-hover:border-indigo-400",
    ring: "border-indigo-500/70",
    ringHover: "group-hover:border-indigo-400",
    glow: "from-indigo-500 to-purple-500",
    overlay: "from-indigo-900/60",
    text: "text-indigo-400",
    textHover: "group-hover:text-indigo-300",
    titleHover: "group-hover:text-indigo-300",
    underline: "from-indigo-500 to-purple-500",
    shadowHover: "hover:shadow-indigo-500/30",
    bottomLine: "via-indigo-500",
  },
  {
    border: "border-purple-500/30",
    borderHover: "group-hover:border-purple-400",
    corner: "border-purple-500/50",
    cornerHover: "group-hover:border-purple-400",
    ring: "border-purple-500/70",
    ringHover: "group-hover:border-purple-400",
    glow: "from-purple-500 to-pink-500",
    overlay: "from-purple-900/60",
    text: "text-purple-400",
    textHover: "group-hover:text-purple-300",
    titleHover: "group-hover:text-purple-300",
    underline: "from-purple-500 to-pink-500",
    shadowHover: "hover:shadow-purple-500/30",
    bottomLine: "via-purple-500",
  },
] as const;

const SOCIAL_ICON_BASE =
  "p-1 sm:p-1.5 rounded-lg bg-slate-700/50 text-gray-400 transition-all duration-300 transform hover:scale-110";

const SOCIAL_LINKS: {
  key: keyof Pick<
    TeamMember,
    "linkedin" | "instagram" | "facebook" | "twitter" | "whatsapp"
  >;
  icon: typeof Linkedin;
  label: string;
  hoverClass: string;
  toHref: (value: string) => string;
}[] = [
  {
    key: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    hoverClass:
      "hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30",
    toHref: (v) => v,
  },
  {
    key: "instagram",
    icon: Instagram,
    label: "Instagram",
    hoverClass:
      "hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30",
    toHref: (v) => v,
  },
  {
    key: "facebook",
    icon: Facebook,
    label: "Facebook",
    hoverClass:
      "hover:text-blue-500 hover:bg-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30",
    toHref: (v) => v,
  },
  {
    key: "twitter",
    icon: Twitter,
    label: "Twitter",
    hoverClass:
      "hover:text-sky-400 hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30",
    toHref: (v) => v,
  },
  {
    key: "whatsapp",
    icon: MessageSquare,
    label: "WhatsApp",
    hoverClass:
      "hover:text-green-400 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30",
    toHref: (v) => `https://wa.me/${v}`,
  },
];

function TeamCard({ member, theme }: { member: TeamMember; theme: (typeof THEMES)[number] }) {
  const activeSocials = SOCIAL_LINKS.filter((s) => member[s.key]);

  return (
    <div className="group relative">
      <div
        className={`relative h-full flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border ${theme.border} ${theme.borderHover} text-center transition-all duration-500 hover:shadow-2xl ${theme.shadowHover} hover:-translate-y-2 md:hover:-translate-y-3 overflow-hidden`}
      >
        <div
          className={`absolute top-0 left-0 w-5 h-5 sm:w-8 sm:h-8 border-l-2 border-t-2 ${theme.corner} transition-all duration-300 group-hover:w-8 group-hover:h-8 md:group-hover:w-12 md:group-hover:h-12 ${theme.cornerHover}`}
        />
        <div
          className={`absolute bottom-0 right-0 w-5 h-5 sm:w-8 sm:h-8 border-r-2 border-b-2 ${theme.corner} transition-all duration-300 group-hover:w-8 group-hover:h-8 md:group-hover:w-12 md:group-hover:h-12 ${theme.cornerHover}`}
        />

        {/* Foto Tim */}
        <div className="relative mx-auto w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 mb-2 sm:mb-4 flex-shrink-0">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
          />

          <div
            className={`relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 ${theme.ring} ${theme.ringHover} transition-all duration-500`}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 56px, (max-width: 768px) 80px, 112px"
              className="object-cover transform group-hover:scale-125 transition-transform duration-700"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${theme.overlay} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
          </div>

          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-1 sm:space-y-2 flex flex-col flex-grow">
          <h3
            className={`text-xs sm:text-sm md:text-lg font-bold text-white ${theme.titleHover} transition-colors duration-300 line-clamp-2`}
          >
            {member.name}
          </h3>

          <div className="inline-block">
            <p
              className={`text-[10px] sm:text-xs md:text-sm font-semibold ${theme.text} ${theme.textHover} transition-colors duration-300 min-h-[1.75rem] sm:min-h-[2.5rem] line-clamp-2`}
            >
              {member.role}
            </p>
            <div
              className={`h-0.5 w-full bg-gradient-to-r ${theme.underline} mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
            />
          </div>

          <p className="hidden sm:block text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow line-clamp-4">
            {member.description}
          </p>

          {activeSocials.length > 0 && (
            <div className="pt-2 sm:pt-3 flex justify-center gap-1 sm:gap-2 flex-shrink-0 flex-wrap">
              {activeSocials.map(({ key, icon: Icon, label, hoverClass, toHref }) => (
                <a
                  key={key}
                  href={toHref(member[key] as string)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${SOCIAL_ICON_BASE} ${hoverClass}`}
                  aria-label={label}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${theme.bottomLine} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
        />
      </div>
    </div>
  );
}

export default function TeamSection({ limit, showViewAll = false }: TeamSectionProps) {
  const members = limit ? teamMembers.slice(0, limit) : teamMembers;

  return (
    <section id="team" className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
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

        {/* Grid Tim: 2 kolom mobile, 4 kolom desktop, wrap otomatis untuk jumlah orang berapa pun */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {members.map((member, index) => (
            <TeamCard key={member.name} member={member} theme={THEMES[index % THEMES.length]} />
          ))}
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
}