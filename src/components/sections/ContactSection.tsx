// src/components/sections/ContactSection.tsx
"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  HelpCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Sparkles,
  CheckCircle2,
  Zap
} from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-green-50 via-indigo-500/40 to-purple-500/30">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Animated Beams */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-indigo-500/50 to-transparent animate-beam-1" />
        <div className="absolute top-0 right-1/3 w-px h-40 bg-gradient-to-b from-purple-500/50 to-transparent animate-beam-2" />
        <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent animate-beam-3" />
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-float-particle" style={{ animationDuration: '6s' }} />
        <div className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full animate-float-particle" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-float-particle" style={{ animationDuration: '7s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center items-center gap-3 mb-4 animate-fade-in">
            <Sparkles className="w-6 h-6 text-indigo-500 animate-spin-slow" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
            <MessageSquare className="w-6 h-6 text-purple-500 animate-float" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <Sparkles className="w-6 h-6 text-indigo-500 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>

          <div className="space-y-2 animate-fade-in-up">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]">
              Hubungi Kami
            </h2>
            <p className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Mari{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Berdiskusi
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-200/50 -rotate-1 animate-expand" />
              </span>
            </p>
          </div>

          <p className="max-w-3xl text-lg text-gray-600 mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Kami siap membantu mewujudkan solusi digital terbaik untuk institusi pendidikan Anda. Hubungi kami sekarang!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Alamat */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 hover:-translate-y-2 animate-fade-in-left overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top border gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MapPin className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Alamat Kantor
                  </h3>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    M9JH+PJV, Jl. Lemah Mulya, Lemahmulya, Kec. Majalaya, Karawang, Jawa Barat 41371
                  </p>
                </div>
              </div>
            </div>

            {/* Telepon */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all duration-500 hover:-translate-y-2 animate-fade-in-left overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    Telepon & WhatsApp
                  </h3>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500 mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    +62 812 9494 2081
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 hover:-translate-y-2 animate-fade-in-left overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mail className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Email
                  </h3>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500 mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    teknomediainfo77@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-500 hover:-translate-y-2 animate-fade-in-left overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Clock className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    Jam Operasional
                  </h3>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500 mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Senin - Jumat: 08.00 - 17.00<br />
                    Sabtu: 08.00 - 14.00<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl overflow-hidden animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-text" style={{ backgroundSize: '200% 100%' }} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-white animate-pulse" />
                  <h3 className="text-lg font-bold text-white">
                    Ikuti Kami
                  </h3>
                </div>
                <p className="text-white/80 text-sm mb-4">Dapatkan update terbaru dari kami</p>
                <div className="flex gap-3">
                  <a href="#" className="group/social w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-12 border border-white/20">
                    <Facebook className="w-5 h-5 text-white group-hover/social:animate-wiggle" />
                  </a>
                  <a href="#" className="group/social w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-12 border border-white/20">
                    <Instagram className="w-5 h-5 text-white group-hover/social:animate-wiggle" />
                  </a>
                  <a href="#" className="group/social w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-12 border border-white/20">
                    <Linkedin className="w-5 h-5 text-white group-hover/social:animate-wiggle" />
                  </a>
                  <a href="#" className="group/social w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-12 border border-white/20">
                    <Youtube className="w-5 h-5 text-white group-hover/social:animate-wiggle" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-right">
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Kirim Pesan
                    </h3>
                    <p className="text-sm text-gray-500">Kami akan merespon dalam 24 jam</p>
                  </div>
                </div>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl flex items-center gap-3 animate-fade-in shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 animate-pulse" />
                    <div>
                      <p className="text-green-800 text-sm font-semibold">Pesan Berhasil Terkirim! 🎉</p>
                      <p className="text-green-700 text-xs">Kami akan segera menghubungi Anda.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nama */}
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all group-hover:border-gray-300"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all group-hover:border-gray-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Telepon */}
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all group-hover:border-gray-300"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>

                    {/* Subjek */}
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Subjek <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all group-hover:border-gray-300"
                      >
                        <option value="">Pilih Subjek</option>
                        <option value="konsultasi">Konsultasi Proyek</option>
                        <option value="kerjasama">Kerjasama</option>
                        <option value="support">Technical Support</option>
                        <option value="informasi">Informasi Produk</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  {/* Pesan */}
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none group-hover:border-gray-300"
                      placeholder="Tuliskan pesan Anda di sini..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn relative w-full inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    
                    {/* Glow effect */}
                    <span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors duration-300" />
                    
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        <span className="relative z-10">Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2 relative z-10 transform group-hover/btn:translate-x-1 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span className="relative z-10">Kirim Pesan Sekarang</span>
                        <Sparkles size={18} className="ml-2 relative z-10 animate-pulse" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-gray-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-indigo-500/30 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-purple-500/30 rounded-br-2xl" />
          
          <div className="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5849226004443!2d107.37645707556266!3d-6.318126093671301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69770002e947c5%3A0x65cc7df9abea9603!2sTEKNOMEDIA.NET!5e0!3m2!1sid!2sid!4v1764738414350!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;