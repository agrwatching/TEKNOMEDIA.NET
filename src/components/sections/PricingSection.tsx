"use client";

import React, { useState } from 'react';
import { Check, Sparkles, Crown, Zap, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
  name: string;
  tagline: string;
  icon: any;
  gradient: string;
  glowColor: string;
  originalPrice?: string;
  discountPrice?: string;
  priceLabel: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Paket Starter',
    tagline: 'Website siap pakai dengan template pilihan kami',
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    originalPrice: 'Rp 8.000.000',
    discountPrice: 'Rp 5.500.000',
    priceLabel: 'One Time Payment',
    features: [
      'Website Profesional (Template Pilihan Kami)',
      'Responsive Design (Mobile & Desktop)',
      'Hosting 1 Tahun (Renewabel)',
      'Domain Gratis .com / .sch.id / .id',
      'SSL Certificate Included',
      'Email Profesional (5 Akun)',
      'Halaman Utama (5-7 Pages)',
      'Konten Input oleh Client',
      'Revisi Design (2x)',
      'Training Penggunaan Website',
      'Support 3 Bulan',
    ],
  },
  {
    name: 'Paket Professional',
    tagline: 'Website custom dengan kontrol penuh',
    icon: Sparkles,
    gradient: 'from-indigo-500 to-purple-500',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    popular: true,
    badge: '🔥 Paling Laris',
    originalPrice: 'Rp 15.000.000',
    discountPrice: 'Rp 10.500.000',
    priceLabel: 'One Time Payment',
    features: [
      'Website Custom Sesuai Permintaan',
      'Design Brand Identity Matching',
      'Hosting 1 Tahun + Domain Premium',
      'Custom Domain (.co.id / .ac.id / dll)',
      'SSL Certificate + Email Unlimited',
      'Halaman Unlimited',
      'Fitur Khusus (Gallery, Blog, Portal Berita)',
      'Dashboard Admin Panel',
      'SEO Optimization Basic',
      'Input Konten oleh Tim Kami (50%)',
      'Revisi Design (5x)',
      'Training & Dokumentasi Lengkap',
      'Support 6 Bulan',
      'Maintenance Gratis 3 Bulan',
    ],
  },
  {
    name: 'Paket Custom Solution',
    tagline: 'Solusi lengkap all-in dengan full service',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    badge: '👑 Full Package',
    priceLabel: 'Konsultasi & Negosiasi',
    features: [
      'Website / Aplikasi Custom Complex',
      'System Integration (SIMPEN, PPDB, ERP)',
      'Custom Development (Fitur Khusus)',
      'Multi Platform (Web + Mobile App)',
      'Hosting Premium / VPS Dedicated',
      'Custom Domain + Email Enterprise',
      'Full Content Management by Our Team',
      'API Integration (Payment, SMS, dll)',
      'Advanced Dashboard & Analytics',
      'Layanan Guru Tamu & Training Team',
      'Digital Marketing Strategy & Setup',
      'Dedicated Project Manager',
      'Revisi Unlimited',
      'Support & Maintenance 1 Tahun',
      'Server Monitoring 24/7',
      'SLA 99.9% Uptime Guarantee',
    ],
  },
];

const PricingSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 animate-fade-in">
            <span className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 text-sm font-semibold uppercase tracking-wider border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-sm">
              💎 Paket Pembuatan Website
            </span>
          </div>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 animate-fade-in-up [animation-delay:0.1s]">
            Wujudkan Website{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Impian Anda
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600 mx-auto animate-fade-in-up leading-relaxed [animation-delay:0.2s]">
            Kami bantu Anda dari konsep hingga launching. Website profesional, hosting handal, dan dukungan penuh dari tim berpengalaman.
          </p>

          {/* PROMO BANNER */}
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg shadow-red-500/30 animate-pulse-slow [animation-delay:0.3s]">
            <Star className="w-5 h-5" />
            Promo Akhir Tahun - Hemat hingga 30%!
            <Star className="w-5 h-5" />
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative animate-fade-in-up ${
                plan.popular ? 'md:scale-105 md:-mt-4' : ''
              }`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* BADGE */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`px-6 py-2 rounded-full text-white text-sm font-bold shadow-lg animate-pulse-slow ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-500/50' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/50'
                  }`}>
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* CARD CONTAINER */}
              <div
                className={`relative h-full bg-white p-8 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-xl ${
                  plan.popular
                    ? 'border-indigo-500 shadow-indigo-500/20'
                    : 'border-gray-200 hover:border-indigo-300 hover:shadow-indigo-500/10'
                }`}
              >
                {/* GLOW EFFECT ON HOVER - Outside card only */}
                <div
                  className={`absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-20 blur-3xl bg-gradient-to-r ${plan.gradient}`}
                ></div>

                {/* TOP ACCENT */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${plan.gradient}`}
                ></div>

                {/* ICON */}
                <div className="mb-6 inline-flex">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${plan.gradient} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* PLAN NAME & TAGLINE */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 min-h-[2.5rem] font-medium">{plan.tagline}</p>

                {/* PRICE */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  {plan.originalPrice && plan.discountPrice ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg text-gray-400 line-through font-semibold">
                          {plan.originalPrice}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                          HEMAT!
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          {plan.discountPrice}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 font-medium">{plan.priceLabel}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          Hubungi Kami
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 font-medium">{plan.priceLabel}</p>
                    </>
                  )}
                </div>

                {/* FEATURES LIST */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mt-0.5`}
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-800 text-sm leading-relaxed font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA BUTTON */}
                <Link href="/consultation">
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden group/btn bg-gradient-to-r ${plan.gradient} hover:shadow-2xl`}
                    style={{
                      boxShadow: hoveredIndex === index ? `0 10px 40px ${plan.glowColor}` : 'none',
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {plan.originalPrice ? 'Pesan Sekarang' : 'Konsultasi & Negosiasi'}
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* GUARANTEE BANNER */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 animate-fade-in-up [animation-delay:0.8s]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  ✨ Yang Anda Dapatkan
                </h4>
                <p className="text-gray-600 text-sm">
                  Website profesional + Hosting 1 tahun + Domain gratis + Training + Support penuh dari tim ahli
                </p>
              </div>
            </div>
            <Link href="/consultation">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Mulai Konsultasi
              </button>
            </Link>
          </div>
        </div>

        {/* FAQ TEASER */}
        <div className="mt-12 text-center animate-fade-in [animation-delay:1s]">
          <p className="text-gray-600 mb-3">
            💬 Butuh paket khusus atau punya budget tertentu?
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-300 group"
          >
            Diskusikan kebutuhan Anda dengan tim kami
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* PAYMENT INFO */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 animate-fade-in [animation-delay:1.1s]">
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-2">
              <strong>💳 Metode Pembayaran:</strong> Transfer Bank • Cicilan 0% • PO untuk Instansi
            </p>
            <p className="text-xs text-gray-600">
              <strong>⏱️ Timeline:</strong> Starter 2-3 minggu • Professional 4-6 minggu • Custom (tergantung kompleksitas)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;