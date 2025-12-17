"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  CheckCircle2,
  Sparkles,
  Send,
  Bot,
  Mail,
  Phone,
} from "lucide-react";

interface Message {
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const ConsultationSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: 'Halo! 👋 Saya asisten virtual Teknomedia. Saya akan membantu Anda menjadwalkan konsultasi. Mari kita mulai!',
      timestamp: new Date()
    },
    {
      type: 'bot',
      text: 'Siapa nama lengkap Anda?',
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  const services = [
    'Kelas Industri & Teaching Factory',
    'Jasa Guru Tamu & Pembelajaran Proyek',
    'Program Digital Marketing',
    'IT Solution & Hosting Services',
    'Internet Dedicated & Broadband Bisnis',
    'Maintenance & Dukungan Teknis'
  ];

  const questions = [
    { field: 'name', question: 'Siapa nama lengkap Anda?', type: 'text' },
    { field: 'email', question: 'Boleh saya tahu alamat email Anda?', type: 'email' },
    { field: 'phone', question: 'Nomor telepon/WhatsApp yang bisa dihubungi?', type: 'tel' },
    { field: 'company', question: 'Dari perusahaan atau institusi mana Anda? (Optional - ketik "skip" untuk melewati)', type: 'text' },
    { field: 'service', question: 'Layanan apa yang Anda minati? Pilih nomor:\n\n' + services.map((s, i) => `${i + 1}. ${s}`).join('\n'), type: 'select' },
    { field: 'preferredDate', question: 'Kapan tanggal yang Anda inginkan untuk konsultasi? (Format: YYYY-MM-DD atau ketik "skip")', type: 'date' },
    { field: 'preferredTime', question: 'Jam berapa yang cocok untuk Anda? (Format: HH:MM atau ketik "skip")', type: 'time' },
    { field: 'message', question: 'Ada pesan atau kebutuhan khusus yang ingin Anda sampaikan? (Optional - ketik "skip" untuk melewati)', type: 'textarea' }
  ];

  useLayoutEffect(() => {
    // Force reset scroll SEBELUM browser paint
    if (isInitialMount.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    // Mark bahwa initial mount sudah selesai
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && !isInitialMount.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      type: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = () => {
    if (!currentInput.trim()) return;

    const userInput = currentInput.trim();
    addUserMessage(userInput);
    setCurrentInput('');

    const currentQuestion = questions[currentStep];
    
    if (userInput.toLowerCase() === 'skip' && 
        (currentQuestion.field === 'company' || 
         currentQuestion.field === 'preferredDate' || 
         currentQuestion.field === 'preferredTime' || 
         currentQuestion.field === 'message')) {
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(prev => prev + 1);
          addBotMessage(questions[currentStep + 1].question);
        } else {
          finishConversation();
        }
      }, 1000);
      return;
    }

    if (currentQuestion.type === 'select') {
      const serviceIndex = parseInt(userInput) - 1;
      if (serviceIndex >= 0 && serviceIndex < services.length) {
        setFormData(prev => ({ ...prev, service: services[serviceIndex] }));
        setTimeout(() => {
          addBotMessage(`Baik, ${services[serviceIndex]}. Saya catat! ✅`);
          setTimeout(() => {
            if (currentStep < questions.length - 1) {
              setCurrentStep(prev => prev + 1);
              addBotMessage(questions[currentStep + 1].question);
            } else {
              finishConversation();
            }
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          addBotMessage('Mohon pilih nomor yang sesuai (1-6)');
        }, 800);
      }
    } else if (currentQuestion.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(userInput)) {
        setFormData(prev => ({ ...prev, email: userInput }));
        setTimeout(() => {
          addBotMessage(`Terima kasih! Email ${userInput} sudah saya catat. ✅`);
          setTimeout(() => {
            if (currentStep < questions.length - 1) {
              setCurrentStep(prev => prev + 1);
              addBotMessage(questions[currentStep + 1].question);
            }
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          addBotMessage('Email tidak valid. Mohon masukkan email yang benar (contoh: nama@email.com)');
        }, 800);
      }
    } else if (currentQuestion.type === 'tel') {
      const phoneRegex = /^[0-9]{10,15}$/;
      const cleanPhone = userInput.replace(/\D/g, '');
      if (phoneRegex.test(cleanPhone)) {
        setFormData(prev => ({ ...prev, phone: cleanPhone }));
        setTimeout(() => {
          addBotMessage(`Nomor ${cleanPhone} sudah tersimpan! ✅`);
          setTimeout(() => {
            if (currentStep < questions.length - 1) {
              setCurrentStep(prev => prev + 1);
              addBotMessage(questions[currentStep + 1].question);
            }
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          addBotMessage('Nomor telepon tidak valid. Mohon masukkan 10-15 digit angka.');
        }, 800);
      }
    } else {
      setFormData(prev => ({ ...prev, [currentQuestion.field]: userInput }));
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(prev => prev + 1);
          addBotMessage(questions[currentStep + 1].question);
        } else {
          finishConversation();
        }
      }, 1000);
    }
  };

  const finishConversation = () => {
    setTimeout(() => {
      addBotMessage(`Sempurna! Terima kasih ${formData.name}! 🎉`);
      setTimeout(() => {
        addBotMessage('Data Anda sudah saya terima. Tim kami akan segera menghubungi Anda untuk konfirmasi jadwal konsultasi.');
        setTimeout(() => {
          addBotMessage('Ada yang bisa saya bantu lagi? Ketik "reset" untuk memulai dari awal.');
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([
      {
        type: 'bot',
        text: 'Halo! 👋 Saya asisten virtual Teknomedia. Saya akan membantu Anda menjadwalkan konsultasi. Mari kita mulai!',
        timestamp: new Date()
      },
      {
        type: 'bot',
        text: 'Siapa nama lengkap Anda?',
        timestamp: new Date()
      }
    ]);
    setCurrentStep(0);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      preferredDate: '',
      preferredTime: ''
    });
    setCurrentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      
      {/* GRID BACKGROUND - Tetap dipertahankan karena ringan */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-16 md:py-24">
        {/* HEADER SECTION */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 text-sm font-semibold uppercase tracking-wider border border-indigo-500/20 shadow-lg animate-pulse-glow backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Konsultasi Gratis
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up [animation-delay:0.1s]">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              Chat dengan Asisten Virtual Kami
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.2s]">
            Dapatkan solusi terbaik untuk kebutuhan teknologi dan pendidikan Anda melalui percakapan yang mudah dan cepat.
          </p>

          {/* DECORATIVE LINE */}
          <div className="mt-8 flex justify-center items-center space-x-3 animate-fade-in [animation-delay:0.3s]">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-500"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* RIGHT COLUMN - INFO */}
          <div className="space-y-8 animate-fade-in-right lg:order-2 order-1 [animation-delay:0.5s]">
            {/* KENAPA MEMILIH KAMI */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              
              <h3 className="text-2xl font-bold mb-6 relative z-10">
                Kenapa Memilih Teknomedia?
              </h3>

              <div className="space-y-4 relative z-10">
                {[
                  "Tim profesional berpengalaman 10+ tahun",
                  "Solusi disesuaikan dengan kebutuhan Anda",
                  "Dukungan teknis 24/7",
                  "Harga kompetitif dan transparan",
                  "Layanan survei lokasi gratis",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-fade-in-left"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KONTAK INFO */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Atau Hubungi Langsung
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:shadow-lg transition-all duration-300 animate-fade-in-up [animation-delay:0.7s]">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telepon / WhatsApp</p>
                    <p className="font-bold text-gray-900">+62 812 9494 2081</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300 animate-fade-in-up [animation-delay:0.8s]">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold text-gray-900">
                      teknomediainfo77@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 animate-fade-in-up [animation-delay:0.9s]">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Jam Operasional:</strong>
                  <br />
                  Senin - Jumat: 08:00 - 17:00 WIB
                  <br />
                  Sabtu: 08:00 - 14:00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN - CHATBOT */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 relative overflow-hidden animate-fade-in-left flex flex-col h-[600px] lg:h-[800px] lg:order-1 order-2 [animation-delay:0.4s]">
            {/* TOP GRADIENT BAR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            {/* CHAT HEADER */}
            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Asisten Teknomedia</h3>
                  <p className="text-sm text-gray-500">Online - Siap Membantu</p>
                </div>
              </div>
            </div>

            {/* MESSAGES AREA */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${msg.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-4 border-t border-gray-200/50 bg-gray-50/50 flex-shrink-0">
              {currentInput.toLowerCase() === 'reset' ? (
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Mulai Percakapan Baru
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!currentInput.trim()}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;