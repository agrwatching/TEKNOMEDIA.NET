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
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PublicFooter: React.FC = () => {
  const [stars, setStars] = useState<
    Array<{ left: number; top: number; delay: number }>
  >([]);

  // ✨ Generate stars hanya di client
  useEffect(() => {
    setStars(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  // 🔑 Scroll Function untuk smooth scroll ke section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden py-12 md:py-20">
      {/* 🎨 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-cyan-500/20 to-green-500/20 animate-gradient-flow" />
      </div>

      {/* ✨ Animated Background Particles & Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" />

        {/* Animated stars/particles */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* KOLOM 1: Logo & Deskripsi */}
          <div className="animate-fade-in-up">
            {/* START: Link membungkus Logo & Teks */}
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
                  className="transition-all duration-500 rounded-full group-hover:scale-110 group-hover:rotate-6"
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-white to-cyan-200 bg-clip-text group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                TEKNOMEDIA
              </span>
            </Link>
            {/* END: Link */}

            <p
              className="text-gray-300 mb-6 text-sm leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Membangun masa depan pendidikan dengan teknologi inovatif dan
              solusi digital terpadu.
            </p>

            {/* Social Media Icons with Stagger Animation */}
            <div className="flex space-x-3">
              {[
                {
                  href: "https://facebook.com",
                  icon: Facebook,
                  label: "Facebook",
                  delay: "0.2s",
                  hoverClasses: "hover:bg-[#1877F2] hover:shadow-[#1877F2]/50",
                },
                {
                  href: "https://instagram.com",
                  icon: Instagram,
                  label: "Instagram",
                  delay: "0.3s",
                  hoverClasses:
                    "hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF0069] hover:shadow-[#FF0069]/50",
                },
                {
                  href: "https://linkedin.com",
                  icon: Linkedin,
                  label: "LinkedIn",
                  delay: "0.4s",
                  hoverClasses: "hover:bg-[#0A66C2] hover:shadow-[#0A66C2]/50",
                },
                {
                  href: "https://youtube.com",
                  icon: Youtube,
                  label: "YouTube",
                  delay: "0.5s",
                  hoverClasses: "hover:bg-[#FF0000] hover:shadow-[#FF0000]/50",
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
                    hover:shadow-lg group 
                    border border-white/10
                    ${social.hoverClasses}
                  `}
                  style={{ animationDelay: social.delay }}
                >
                  <social.icon className="w-4 h-4 text-white group-hover:animate-wiggle" />
                </Link>
              ))}
            </div>
          </div>

          {/* KOLOM 2: Produk */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-lg font-bold mb-4 pb-2 relative group text-white">
              Produk Kami
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />
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
                <li
                  key={idx}
                  className="animate-fade-in-left"
                  style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <Link
                    href={item.href}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="hover:text-cyan-400 transition-all duration-300 inline-flex items-center group/link"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover/link:w-4 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                    <span className="relative">
                      {item.text}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: Perusahaan */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-lg font-bold mb-4 pb-2 relative group text-white">
              Perusahaan
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                // Link navigasi menggunakan smooth scroll ke ID elemen
                { id: "about", text: "Tentang Kami" },
                { id: "company", text: "Karir" },
                { id: "/blog", text: "Blog" },
                { id: "team", text: "Partnership" },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="animate-fade-in-left"
                  style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-cyan-400 transition-all duration-300 text-left inline-flex items-center group/link"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover/link:w-4 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                    <span className="relative">
                      {item.text}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 4: Kontak */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <h3 className="text-lg font-bold mb-4 pb-2 relative group text-white">
              Hubungi Kami
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li
                className="flex items-start group animate-fade-in-left"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-white/10">
                  <MapPin className="w-4 h-4 text-cyan-400 group-hover:animate-bounce" />
                </div>
                <span className="break-words group-hover:text-white transition-colors duration-300 leading-relaxed">
                  M9JH+PJV, Jl. Lemah Mulya, Lemahmulya, Kec. Majalaya,
                  Karawang, Jawa Barat 41371
                </span>
              </li>
              <li
                className="flex items-center group animate-fade-in-left"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center mr-3 flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-white/10">
                  <Phone className="w-4 h-4 text-cyan-400 group-hover:animate-wiggle" />
                </div>
                <Link
                  href="tel:+6281294942081"
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  +62 812 9494 2081
                </Link>
              </li>
              <li
                className="flex items-start group animate-fade-in-left"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-white/10">
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
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

        {/* Animated Divider */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-0 h-px w-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Hak Cipta dengan Animasi */}
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span className="animate-pulse-slow">©</span>
            <span>{new Date().getFullYear()}</span>
            <span className="font-semibold text-white hover:text-cyan-400 transition-colors duration-300 cursor-default">
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
