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
      className={`relative py-1 ${textColor} font-semibold transition-colors duration-300 ${
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
  const [isMobileMenuOpen_dropdown, setIsMobileMenuOpen_dropdown] = useState(false);
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
              <Image
                src="/teknomedia.png"
                alt="Teknomedia Logo"
                width={48}
                height={48}
                className="rounded-full transform group-hover:scale-110 transition-transform duration-300 relative z-10 border-2 border-white/20"
                priority
              />

              {/* Sparkle Effect */}
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-colors duration-300 ${
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
                    isMenuOpen ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden p-2">
                  {MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group/item flex items-center gap-4 px-5 py-4 mb-2 rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl group-hover/item:bg-blue-500 transition-colors duration-300">
                        <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                          {item.icon}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors text-base">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          Lihat {item.label.toLowerCase()}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-blue-600 rotate-[-90deg] transition-colors duration-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop E-Learning Dropdown */}
            <div className="relative" ref={elearningDropdownRef}>
              <button
                onClick={() => setIsElearningOpen(!isElearningOpen)}
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-colors duration-300 ${
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
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                    isElearningOpen ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isElearningOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden p-2">
                  {ELEARNING_ITEMS.map((item) => {
                    const Component = item.external ? "a" : Link;
                    const externalProps = item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {};

                    return (
                      <Component
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsElearningOpen(false)}
                        className="group/item flex items-center gap-4 px-5 py-4 mb-2 rounded-xl hover:bg-green-50 transition-all duration-300"
                        {...externalProps}
                      >
                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-xl group-hover/item:bg-green-500 transition-colors duration-300 shadow-md">
                          <span className="text-3xl group-hover/item:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="font-bold text-gray-900 group-hover/item:text-green-600 transition-colors text-base">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </div>
                          )}
                        </div>

                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-green-600 rotate-[-90deg] transition-colors duration-300" />
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
                className={`relative py-1 ${textColor} font-semibold flex items-center transition-colors duration-300 ${
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
                    isBlogOpen ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </button>

              {isBlogOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden p-2">
                  {BLOG_ITEMS.map((item) => {
                    const Component = item.external ? "a" : Link;
                    const externalProps = item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {};

                    return (
                      <Component
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsBlogOpen(false)}
                        className="group/item flex items-center gap-4 px-5 py-4 mb-2 rounded-xl hover:bg-purple-50 transition-all duration-300"
                        {...externalProps}
                      >
                        {/* Icon */}
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-xl group-hover/item:bg-purple-500 transition-colors duration-300 shadow-md">
                          <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition-colors text-base">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.external ? "Blog eksternal" : "Artikel terbaru"}
                          </div>
                        </div>

                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-purple-600 rotate-[-90deg] transition-colors duration-300" />
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
            className={`md:hidden ${textColor} p-2 rounded-lg hover:bg-white/10 transition-all duration-300`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 bg-white rounded-b-2xl shadow-xl p-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-3 text-gray-900 hover:text-blue-600 transition-colors duration-300 py-4 px-5 rounded-xl bg-gray-50 hover:bg-blue-50"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                  <span className="text-xl">🏠</span>
                </div>
                <span className="font-bold text-base">Home</span>
              </Link>

              {/* Mobile Menu Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsMobileMenuOpen_dropdown(!isMobileMenuOpen_dropdown)}
                  className="w-full group flex items-center justify-between gap-3 text-gray-900 hover:text-blue-600 transition-colors duration-300 py-4 px-5 rounded-xl bg-gray-50 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                      <span className="text-xl">📋</span>
                    </div>
                    <span className="font-bold text-base">Menu</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isMobileMenuOpen_dropdown ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isMobileMenuOpen_dropdown && (
                  <div className="space-y-2 pl-4">
                    {MENU_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-blue-50 border border-gray-200 transition-all duration-300"
                      >
                        <div className="w-9 h-9 flex items-center justify-center bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <span className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
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
                  onClick={() => setIsMobileElearningOpen(!isMobileElearningOpen)}
                  className="w-full group flex items-center justify-between gap-3 text-gray-900 hover:text-green-600 transition-colors duration-300 py-4 px-5 rounded-xl bg-gray-50 hover:bg-green-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                      <span className="text-xl">📚</span>
                    </div>
                    <span className="font-bold text-base">E-Learning</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isMobileElearningOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isMobileElearningOpen && (
                  <div className="space-y-2 pl-4">
                    {ELEARNING_ITEMS.map((item) => {
                      const Component = item.external ? "a" : Link;
                      const externalProps = item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};

                      return (
                        <Component
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group flex items-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-green-50 border border-gray-200 transition-all duration-300"
                          {...externalProps}
                        >
                          <div className="w-11 h-11 flex items-center justify-center bg-green-100 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                            <span className="text-xl">{item.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900 group-hover:text-green-600 transition-colors">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500">
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
                  className="w-full group flex items-center justify-between gap-3 text-gray-900 hover:text-purple-600 transition-colors duration-300 py-4 px-5 rounded-xl bg-gray-50 hover:bg-purple-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-xl group-hover:bg-purple-500 transition-colors duration-300">
                      <span className="text-xl">📝</span>
                    </div>
                    <span className="font-bold text-base">Blog</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isMobileBlogOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isMobileBlogOpen && (
                  <div className="space-y-2 pl-4">
                    {BLOG_ITEMS.map((item) => {
                      const Component = item.external ? "a" : Link;
                      const externalProps = item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};

                      return (
                        <Component
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group flex items-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-purple-50 border border-gray-200 transition-all duration-300"
                          {...externalProps}
                        >
                          <div className="w-9 h-9 flex items-center justify-center bg-purple-100 rounded-lg group-hover:bg-purple-500 transition-colors duration-300">
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.external ? "Blog eksternal" : "Artikel terbaru"}
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
                className="group flex items-center gap-3 text-gray-900 hover:text-green-600 transition-colors duration-300 py-4 px-5 rounded-xl bg-gray-50 hover:bg-green-50"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                  <span className="text-xl">📞</span>
                </div>
                <span className="font-bold text-base">Contact</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;