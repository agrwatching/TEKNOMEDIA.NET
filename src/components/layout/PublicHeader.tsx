"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Constants for dropdown items
const ELEARNING_ITEMS = [
  {
    href: "#",
    label: "Teknomedia E-Learning",
    description: "Platform pembelajaran digital",
    icon: "📚",
    external: true,
  },
  {
    href: "https://lms.xplore.id/",
    label: "LMS Store",
    description: "Marketplace e-learning",
    icon: "🛒",
    external: true,
  },
];

const BLOG_ITEMS = [
  {
    href: "/article",
    label: "Hot Articles",
    icon: "🔥",
    external: false,
  },
  {
    href: "https://www.smksteknologi.sch.id/",
    label: "SMK TEKNOLOGI",
    icon: "🏫",
    external: true,
  },
  {
    href: "https://smkalhurriyyah.sch.id/",
    label: "SMK AL HURIYYAH",
    icon: "🏫",
    external: true,
  },
];

const MENU_ITEMS = [
  {
    href: "/mitra",
    label: "Mitra",
    icon: "🤝",
  },
  {
    href: "/consultation",
    label: "Consultation",
    icon: "💼",
  },
  {
    href: "/featured",
    label: "Pencapaian",
    icon: "🏆",
  },
  {
    href: "/team",
    label: "Team",
    icon: "👥",
  },
  {
    href: "/galeri",
    label: "Galeri",
    icon: "🖼️",
  },
];

const NavLinkItem: React.FC<{
  href: string;
  children: React.ReactNode;
  isTransparent: boolean;
  onClick?: () => void;
}> = ({ href, children, isTransparent, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;
  const textColor = isTransparent ? "text-white" : "text-gray-900";

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative py-1 ${textColor} font-semibold transition-all duration-300 group ${
        isActive ? "text-blue-600" : "hover:text-blue-600"
      }`}
    >
      {children}

      {/* Animated Underline */}
      <span
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 ${
          isActive ? "w-full" : isHovered ? "w-full" : "w-0"
        }`}
      />

      {/* Glow Effect */}
      {isHovered && (
        <span className="absolute inset-0 blur-xl bg-blue-500/20 -z-10 animate-pulse" />
      )}
    </Link>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isElearningOpen, setIsElearningOpen] = useState(false);

  // Mobile dropdown states
  const [isMobileMenuOpen_dropdown, setIsMobileMenuOpen_dropdown] =
    useState(false);
  const [isMobileBlogOpen, setIsMobileBlogOpen] = useState(false);
  const [isMobileElearningOpen, setIsMobileElearningOpen] = useState(false);

  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const blogDropdownRef = useRef<HTMLDivElement>(null);
  const elearningDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (
        isBlogOpen &&
        blogDropdownRef.current &&
        !blogDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBlogOpen(false);
      }
      if (
        isElearningOpen &&
        elearningDropdownRef.current &&
        !elearningDropdownRef.current.contains(event.target as Node)
      ) {
        setIsElearningOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isBlogOpen, isElearningOpen]);

  const isTransparent = !isScrolled && isHomePage;
  const textColor = isTransparent ? "text-white" : "text-gray-900";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top Glow Line */}
      <div
        className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transform origin-left transition-all duration-700 ${
          isScrolled ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Animation */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />

              <Image
                src="/teknomedia.png"
                alt="Teknomedia Logo"
                width={48}
                height={48}
                className="rounded-full transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 border-2 border-white/20"
                priority
              />

              {/* Sparkle Effect */}
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
            </div>

            <h1
              className={`text-2xl font-black ${
                isTransparent
                  ? "text-white"
                  : "bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent"
              } transform group-hover:scale-105 transition-transform duration-300`}
            >
              TEKNOMEDIA
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinkItem href="/" isTransparent={isTransparent}>
              Home
            </NavLinkItem>

            {/* Desktop Menu Dropdown */}
            <div className="relative" ref={menuDropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-all duration-300 group ${
                  isMenuOpen ? "text-blue-600" : "hover:text-blue-600"
                }`}
              >
                Menu
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${
                    isMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
                {/* Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                    isMenuOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 z-50 overflow-hidden animate-[slideDown_0.3s_ease-out] p-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-2xl -z-10" />

                  {MENU_ITEMS.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group/item relative flex items-center gap-4 px-5 py-4 mb-2 rounded-2xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover/item:from-blue-500/10 group-hover/item:via-cyan-500/10 group-hover/item:to-purple-500/10 transition-all duration-500 rounded-2xl" />

                      {/* Icon with animated background */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover/item:opacity-70 transition-opacity duration-300" />
                        <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover/item:from-blue-500 group-hover/item:to-cyan-500 transition-all duration-300">
                          <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 relative z-10">
                        <div className="font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors text-base">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 group-hover/item:text-gray-700 transition-colors">
                          Lihat {item.label.toLowerCase()}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-blue-600 rotate-[-90deg] transform group-hover/item:translate-x-1 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop E-Learning Dropdown */}
            <div className="relative" ref={elearningDropdownRef}>
              <button
                onClick={() => setIsElearningOpen(!isElearningOpen)}
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-all duration-300 group ${
                  isElearningOpen ? "text-blue-600" : "hover:text-blue-600"
                }`}
              >
                E-Learning
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${
                    isElearningOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
                {/* Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                    isElearningOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isElearningOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 z-50 overflow-hidden animate-[slideDown_0.3s_ease-out] p-2">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl -z-10" />

                  {ELEARNING_ITEMS.map((item, index) => {
                    const Component = item.external ? "a" : Link;
                    const externalProps = item.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {};

                    return (
                      <Component
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsElearningOpen(false)}
                        className="group/item relative flex items-center gap-4 px-5 py-4 mb-2 rounded-2xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                        {...externalProps}
                      >
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-emerald-500/0 to-teal-500/0 group-hover/item:from-green-500/10 group-hover/item:via-emerald-500/10 group-hover/item:to-teal-500/10 transition-all duration-500 rounded-2xl" />

                        {/* Icon with animated background */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl blur-lg opacity-0 group-hover/item:opacity-70 transition-opacity duration-300" />
                          <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover/item:from-green-500 group-hover/item:to-emerald-500 transition-all duration-300 shadow-lg">
                            <span className="text-3xl group-hover/item:scale-110 transition-transform duration-300">
                              {item.icon}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 relative z-10">
                          <div className="font-bold text-gray-900 group-hover/item:text-green-600 transition-colors text-base">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-500 group-hover/item:text-gray-700 transition-colors mt-1">
                              {item.description}
                            </div>
                          )}
                        </div>

                        {/* Arrow indicator */}
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-green-600 rotate-[-90deg] transform group-hover/item:translate-x-1 transition-all duration-300" />
                      </Component>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop Blog Dropdown */}
            <div className="relative" ref={blogDropdownRef}>
              <button
                onClick={() => setIsBlogOpen(!isBlogOpen)}
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-all duration-300 group ${
                  isBlogOpen ? "text-blue-600" : "hover:text-blue-600"
                }`}
              >
                Blog
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${
                    isBlogOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                    isBlogOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>

              {isBlogOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 z-50 overflow-hidden animate-[slideDown_0.3s_ease-out] p-2">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-orange-400/20 to-red-400/20 rounded-full blur-2xl -z-10" />

                  {BLOG_ITEMS.map((item, index) => {
                    const Component = item.external ? "a" : Link;
                    const externalProps = item.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {};

                    return (
                      <Component
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsBlogOpen(false)}
                        className="group/item relative flex items-center gap-4 px-5 py-4 mb-2 rounded-2xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                        {...externalProps}
                      >
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover/item:from-purple-500/10 group-hover/item:via-pink-500/10 group-hover/item:to-orange-500/10 transition-all duration-500 rounded-2xl" />

                        {/* Icon with animated background */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-0 group-hover/item:opacity-70 transition-opacity duration-300" />
                          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover/item:from-purple-500 group-hover/item:to-pink-500 transition-all duration-300 shadow-md">
                            <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                              {item.icon}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 relative z-10">
                          <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition-colors text-base">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500 group-hover/item:text-gray-700 transition-colors">
                            {item.external
                              ? "Blog eksternal"
                              : "Artikel terbaru"}
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-purple-600 rotate-[-90deg] transform group-hover/item:translate-x-1 transition-all duration-300" />
                      </Component>
                    );
                  })}
                </div>
              )}
            </div>

            <NavLinkItem href="/contact" isTransparent={isTransparent}>
              Contact
            </NavLinkItem>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textColor} p-2 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="animate-[spin_0.3s_ease-out]" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 backdrop-blur-xl shadow-2xl rounded-b-3xl p-6 border-t border-white/60 animate-[slideDown_0.3s_ease-out]">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400/10 to-pink-400/10 rounded-full blur-2xl -z-10" />

            <div className="flex flex-col space-y-4 relative z-10">
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative flex items-center gap-3 text-gray-900 hover:text-blue-600 transition-all duration-300 py-4 px-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-2xl" />
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300 shadow-sm">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    🏠
                  </span>
                </div>
                <span className="font-bold text-base relative z-10">Home</span>
              </Link>

              {/* Mobile Menu Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setIsMobileMenuOpen_dropdown(!isMobileMenuOpen_dropdown)
                  }
                  className="w-full group relative flex items-center justify-between gap-3 text-gray-900 hover:text-blue-600 transition-all duration-300 py-4 px-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 shadow-sm">
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        📋
                      </span>
                    </div>
                    <span className="font-bold text-base relative z-10">
                      Menu
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                      isMobileMenuOpen_dropdown ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isMobileMenuOpen_dropdown && (
                  <div className="space-y-2 pl-4 animate-[slideDown_0.3s_ease-out]">
                    {MENU_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group relative flex items-center gap-3 py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-xl" />
                        <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 shadow-sm relative z-10">
                          <span className="text-lg group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                        </div>
                        <span className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors relative z-10">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile E-Learning Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() =>
                    setIsMobileElearningOpen(!isMobileElearningOpen)
                  }
                  className="w-full group relative flex items-center justify-between gap-3 text-gray-900 hover:text-green-600 transition-all duration-300 py-4 px-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500 rounded-2xl" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300 shadow-sm">
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        📚
                      </span>
                    </div>
                    <span className="font-bold text-base relative z-10">
                      E-Learning
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                      isMobileElearningOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isMobileElearningOpen && (
                  <div className="space-y-2 pl-4 animate-[slideDown_0.3s_ease-out]">
                    {ELEARNING_ITEMS.map((item) => {
                      const Component = item.external ? "a" : Link;
                      const externalProps = item.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {};

                      return (
                        <Component
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group relative flex items-center gap-3 py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-green-400 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 overflow-hidden"
                          {...externalProps}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500 rounded-xl" />
                          <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300 shadow-sm relative z-10">
                            <span className="text-xl group-hover:scale-110 transition-transform">
                              {item.icon}
                            </span>
                          </div>
                          <div className="flex-1 relative z-10">
                            <div className="font-semibold text-sm text-gray-900 group-hover:text-green-600 transition-colors">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </Component>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Blog Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsMobileBlogOpen(!isMobileBlogOpen)}
                  className="w-full group relative flex items-center justify-between gap-3 text-gray-900 hover:text-purple-600 transition-all duration-300 py-4 px-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 shadow-sm">
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        📝
                      </span>
                    </div>
                    <span className="font-bold text-base relative z-10">
                      Blog
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                      isMobileBlogOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isMobileBlogOpen && (
                  <div className="space-y-2 pl-4 animate-[slideDown_0.3s_ease-out]">
                    {BLOG_ITEMS.map((item) => {
                      const Component = item.external ? "a" : Link;
                      const externalProps = item.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {};

                      return (
                        <Component
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group relative flex items-center gap-3 py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 overflow-hidden"
                          {...externalProps}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-xl" />
                          <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 shadow-sm relative z-10">
                            <span className="text-lg group-hover:scale-110 transition-transform">
                              {item.icon}
                            </span>
                          </div>
                          <div className="flex-1 relative z-10">
                            <div className="font-semibold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                              {item.external
                                ? "Blog eksternal"
                                : "Artikel terbaru"}
                            </div>
                          </div>
                        </Component>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative flex items-center gap-3 text-gray-900 hover:text-green-600 transition-all duration-300 py-4 px-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500 rounded-2xl" />
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300 shadow-sm">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    📞
                  </span>
                </div>
                <span className="font-bold text-base relative z-10">
                  Contact
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
