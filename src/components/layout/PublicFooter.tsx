"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PublicFooter: React.FC = () => {
  // 🔑 Scroll Function untuk smooth scroll ke section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden py-12 md:py-20">
      {/* 🎨 Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* KOLOM 1: Logo & Deskripsi */}
          <div>
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4 group cursor-pointer"
            >
              <div className="relative">
                <Image
                  src="/teknomedia.png"
                  alt="Teknomedia Logo"
                  width={48}
                  height={48}
                  className="transition-transform duration-300 rounded-full group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-bold text-white">
                TEKNOMEDIA
              </span>
            </Link>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Membangun masa depan pendidikan dengan teknologi inovatif dan
              solusi digital terpadu.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {[
                {
                  href: "https://facebook.com",
                  icon: Facebook,
                  label: "Facebook",
                  hoverClasses: "hover:bg-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/50",
                },
                {
                  href: "https://instagram.com",
                  icon: Instagram,
                  label: "Instagram",
                  hoverClasses:
                    "hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF0069] hover:shadow-lg hover:shadow-[#FF0069]/50",
                },
                {
                  href: "https://linkedin.com",
                  icon: Linkedin,
                  label: "LinkedIn",
                  hoverClasses: "hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/50",
                },
                {
                  href: "https://youtube.com",
                  icon: Youtube,
                  label: "YouTube",
                  hoverClasses: "hover:bg-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/50",
                },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`
                    w-9 h-9 bg-white/10 backdrop-blur-sm 
                    rounded-full flex items-center justify-center 
                    transition-all duration-300 
                    hover:scale-110 hover:-translate-y-1 
                    group 
                    border border-white/10
                    ${social.hoverClasses}
                  `}
                >
                  <social.icon className="w-4 h-4 text-white group-hover:animate-wiggle" />
                </Link>
              ))}
            </div>
          </div>

          {/* KOLOM 2: Produk */}
          <div>
            <h3 className="text-lg font-bold mb-4 pb-2 relative text-white">
              Produk Kami
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                {
                  href: "https://lms.xplore.id/",
                  text: "LMS Teknomedia",
                  external: true,
                },
                { href: "#", text: "Trophy" },
                { href: "#", text: "Virtual Classroom" },
                { href: "#", text: "Content Library" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: Perusahaan */}
          <div>
            <h3 className="text-lg font-bold mb-4 pb-2 relative text-white">
              Perusahaan
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                { id: "about", text: "Tentang Kami" },
                { id: "company", text: "Karir" },
                { id: "/blog", text: "Blog" },
                { id: "team", text: "Partnership" },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-cyan-400 transition-colors duration-300 text-left"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 4: Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-4 pb-2 relative text-white">
              Hubungi Kami
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="break-words leading-relaxed">
                  M9JH+PJV, Jl. Lemah Mulya, Lemahmulya, Kec. Majalaya,
                  Karawang, Jawa Barat 41371
                </span>
              </li>
              <li className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 flex-shrink-0 border border-white/10">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <Link
                  href="tel:+6281294942081"
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  +62 812 9494 2081
                </Link>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-white/10">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <Link
                  href="mailto:teknomediainfo77@gmail.com"
                  className="break-all hover:text-cyan-400 transition-colors duration-300"
                >
                  teknomediainfo77@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Simple Divider */}
        <div className="mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Hak Cipta */}
        <div className="text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>©</span>
            <span>{new Date().getFullYear()}</span>
            <span className="font-semibold text-white">
              Teknomedia
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-gray-500">
              Powered by Innovation & Technology
            </span>
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-twinkle" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-400/50 animate-twinkle"
              style={{ animationDelay: "0.3s" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400/50 animate-twinkle"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;