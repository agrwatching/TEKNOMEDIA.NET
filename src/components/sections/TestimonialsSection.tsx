// src/components/sections/TestimonialsSection.tsx
"use client";

import React, { useState } from 'react';
import { Quote, Star, CheckCircle, TrendingUp } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  logo: string;
  rating?: number;
}

// Data Testimoni Klien
const testimonials: Testimonial[] = [
  {
    quote: 'Instalasi Fiber Optik untuk kantor baru kami berjalan sangat cepat dan hasilnya melebihi ekspektasi. Koneksi stabil 24 jam penuh!',
    name: 'Dewi Sartika',
    role: 'IT Manager, PT Global Sinergi',
    avatar: '/cwk1.png',
    logo: 'Logo Sinergi',
    rating: 5,
  },
  {
    quote: 'Kami menggunakan paket WiFi Mesh untuk gudang kami yang luas. Tidak ada lagi zona mati, semua proses logistik berjalan lancar.',
    name: 'Budi Santoso',
    role: 'Operation Lead, Toko Maju Jaya',
    avatar: '/cwk2.jpg',
    logo: 'Logo Maju Jaya',
    rating: 5,
  },
  {
    quote: 'Konsultasi jaringannya sangat membantu. Mereka merancang topologi yang benar-benar efisien dan ramah budget. Sangat direkomendasikan.',
    name: 'Ayu Lestari',
    role: 'Owner, Kedai Kopi Hangat',
    avatar: '/cwk3.jpg',
    logo: 'Logo Kedai Hangat',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* Trust Badges - Static */}
          <div className="flex justify-center items-center gap-6 mb-4 animate-fade-in">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">100% Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-semibold text-gray-700">Top Rated</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] animate-fade-in">
              Apa Kata Klien Kami?
            </h2>
            
            <div className="relative inline-block">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900 animate-fade-in-up">
                Dipercaya oleh Perusahaan
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    dan Bisnis Terbaik
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* Rating Stars - Static */}
          <div className="flex justify-center items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-gray-600 font-semibold">5.0 / 5.0</span>
          </div>
        </div>

        {/* Grid Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Card Container */}
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                
                {/* Top Gradient Border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote Icon */}
                <div className="relative mb-6">
                  <Quote 
                    size={40} 
                    className={`relative text-indigo-500 transform transition-all duration-500 ${activeCard === index ? 'scale-110 rotate-12' : 'rotate-0'}`}
                  />
                </div>
                
                {/* Quote Text */}
                <div className="relative space-y-4">
                  <p className="text-base leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    <span className="text-indigo-500 font-serif text-2xl leading-none">"</span>
                    {testimonial.quote}
                    <span className="text-indigo-500 font-serif text-2xl leading-none">"</span>
                  </p>

                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transform scale-x-75 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="relative h-14 w-14 rounded-full object-cover border-2 border-white shadow-md transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  {/* Name & Role */}
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-indigo-500 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Bottom Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-100">
                    <circle cx="100" cy="100" r="80" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-semibold">500+ Projects</span>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">98% Satisfaction</span>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div className="flex items-center gap-2 text-gray-600">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold">10+ Years Experience</span>
          </div>
        </div>

      </div>

    </section>
  );
};

export default TestimonialsSection;