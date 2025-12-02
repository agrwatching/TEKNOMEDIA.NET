// src/components/sections/WhyUsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Wifi, Server, Briefcase } from "lucide-react";

const advantages = [
  {
    icon: GraduationCap,
    title: "Edukasi Berbasis Industri",
    description:
      "Program kelas industri, teaching factory, guru tamu, dan project based learning yang dirancang sesuai kebutuhan dunia kerja modern.",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: Server,
    title: "Solusi IT & Hosting Profesional",
    description:
      "Layanan IT solution, pengelolaan server, hosting, dan integrasi teknologi untuk mendukung kebutuhan digital sekolah maupun bisnis.",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    icon: Wifi,
    title: "Internet Dedicated & Broadband Bisnis",
    description:
      "Layanan internet cepat dan stabil untuk sekolah, UMKM, hingga perusahaan dengan dukungan teknis penuh dan SLA profesional.",
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    icon: Briefcase,
    title: "Pendampingan & Kemitraan Jangka Panjang",
    description:
      "Kami tidak hanya menyediakan layanan, tetapi mendampingi hingga implementasi berjalan optimal melalui komunikasi transparan.",
    gradient: "from-orange-500 to-red-500",
    glowColor: "rgba(249, 115, 22, 0.5)",
  },
];

const WhyUsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  const [floatingParticles, setFloatingParticles] = useState<Array<{left: number}>>([]);
  
  const backgroundImage = "https://picsum.photos/id/1015/1600/900";

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10
      }))
    );
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setFloatingParticles(
        Array.from({ length: 6 }, () => ({
          left: 20 + Math.random() * 60
        }))
      );
    }
  }, [hoveredIndex]);

  return (
    <section
      id="why-us"
      className="relative py-20 md:py-32 bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 z-0"></div>
      
      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-500/20 to-transparent animate-beam-1"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-purple-500/20 to-transparent animate-beam-2"></div>
        <div className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-cyan-500/20 to-transparent animate-beam-3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-16 text-white">
          <div className="inline-block animate-fade-in-down">
            <span className="inline-block text-lg font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white px-6 py-3 rounded-2xl backdrop-blur-md border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-pulse-glow relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative z-10">Keunggulan Kami</span>
            </span>
          </div>
          
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Mengapa Memilih{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Teknomedia
            </span>
            ?
          </h2>
          
          <p className="mt-6 max-w-3xl text-xl text-gray-300 mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Kami memberikan solusi lengkap untuk pendidikan, teknologi, dan layanan internet yang dapat diandalkan.
          </p>

          <div className="mt-8 flex justify-center items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>

        {/* GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-white/15 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] overflow-hidden">
                
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-r ${advantage.gradient}`} style={{ boxShadow: hoveredIndex === index ? `0 0 60px ${advantage.glowColor}` : 'none' }}></div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${advantage.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                  
                  <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-r ${advantage.gradient} rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500`}>
                    <advantage.icon className="w-10 h-10 text-white animate-pulse-slow" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:animate-spin-slow"></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {advantage.title}
                </h3>

                <p className="text-sm text-gray-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
                  {advantage.description}
                </p>

                <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${advantage.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>

              {hoveredIndex === index && floatingParticles.length > 0 && (
                <>
                  {floatingParticles.map((particle, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-float-up pointer-events-none"
                      style={{
                        left: `${particle.left}%`,
                        bottom: '10%',
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;