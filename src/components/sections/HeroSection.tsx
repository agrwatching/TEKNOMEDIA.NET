"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";

const SLIDE_INTERVAL = 5000;

const slides = [
  { id: 1, image: "/hero-1.jpg", alt: "Education Technology" },
  { id: 2, image: "/hero-2.jpg", alt: "Digital Learning" },
  { id: 3, image: "/hero-3.jpg", alt: "E-Learning Platform" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  // 🔄 Auto-Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // ✨ Text Animation Trigger
  useEffect(() => {
    setTextVisible(false);
    const textTimer = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(textTimer);
  }, [currentSlide]);

  // 🔑 Scroll Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* 📝 Konten Teks dengan Animasi */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4 max-w-5xl">
          
          {/* Welcome Badge */}
          <div 
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-6 transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
            <span className="text-sm font-semibold tracking-wider">SELAMAT DATANG</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
          </div>

          {/* Main Title */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 transition-all duration-700 delay-100 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block">
              Selamat Datang di
            </span>
            <br />
            <span className="relative inline-block mt-2">
              {/* Main Text with Gradient */}
              <span className="relative bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 bg-clip-text text-transparent font-black">
                TEKNOMEDIA
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <div className={`mb-10 transition-all duration-700 delay-300 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              <span className="inline-block">Solusi</span>{' '}
              <span className="font-bold text-cyan-300">Edukasi</span>
              <span>,</span>{' '}
              <span className="font-bold text-blue-300">Teknologi</span>
              <span>, dan</span>{' '}
              <span className="font-bold text-green-300">Internet Bisnis</span>
              <br />
              <span>dalam</span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Satu Platform Terpadu</span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-500/30 to-green-500/30 -rotate-1" />
              </span>
            </p>
          </div>

          {/* CTA Button dengan Animasi */}
          <div className={`flex flex-col items-center gap-6 transition-all duration-700 delay-500 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button
              onClick={() => scrollToSection("about")}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 rounded-full text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Button Shine Effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
                Mulai Menjelajah
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </span>
            </button>

            {/* Scroll Indicator - TETAP DIPERTAHANKAN */}
            <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity animate-bounce">
              <span className="text-xs uppercase tracking-widest">Scroll Down</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
              index === currentSlide
                ? "w-8 bg-gradient-to-r from-blue-500 to-green-500 shadow-lg shadow-cyan-500/50"
                : "w-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSection;