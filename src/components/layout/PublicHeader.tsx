"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, Users, MessageCircle, Trophy, UsersRound, Image as ImageIcon, BookOpen, ShoppingCart, Flame, School, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Constants for dropdown items
const ELEARNING_ITEMS = [
  { href: "#", label: "E-Learning", icon: BookOpen, external: true },
  { href: "https://lms.xplore.id/", label: "LMS Store", icon: ShoppingCart, external: true },
];

const BLOG_ITEMS = [
  { href: "/article", label: "Hot Articles", icon: Flame, external: false },
  { href: "https://www.smksteknologi.sch.id/", label: "SMK TEKNOLOGI", icon: School, external: true },
  { href: "https://smkalhurriyyah.sch.id/", label: "SMK AL HURIYYAH", icon: School, external: true },
];

const MENU_ITEMS = [
  { href: "/mitra", label: "Mitra", icon: Users },
  { href: "/consultation", label: "Consultation", icon: MessageCircle },
  { href: "/featured", label: "Pencapaian", icon: Trophy },
  { href: "/team", label: "Team", icon: UsersRound },
  { href: "/galeri", label: "Galeri", icon: ImageIcon },
];

const NavLinkItem: React.FC<{
  href: string;
  children: React.ReactNode;
  isTransparent: boolean;
  onClick?: () => void;
}> = ({ href, children, isTransparent, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = false;
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
      <span
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 ${
          isActive ? "w-full" : isHovered ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
};

type DropdownItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

const ACCENTS = [
  { tile: "bg-gradient-to-br from-blue-500 to-blue-600", hoverText: "group-hover:text-blue-600", hoverBg: "group-hover:bg-blue-50/70" },
  { tile: "bg-gradient-to-br from-cyan-400 to-cyan-500", hoverText: "group-hover:text-cyan-600", hoverBg: "group-hover:bg-cyan-50/70" },
  { tile: "bg-gradient-to-br from-green-400 to-green-500", hoverText: "group-hover:text-green-600", hoverBg: "group-hover:bg-green-50/70" },
];

// Desktop dropdown panel (unchanged)
const DesktopDropdownPanel: React.FC<{ items: DropdownItem[]; onItemClick: () => void }> = ({ items, onItemClick }) => {
  return (
    <div className="absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl shadow-gray-900/15 animate-fade-in-down">
      {items.map((item, index) => {
        const Icon = item.icon;
        const accent = ACCENTS[index % ACCENTS.length];
        const itemClassName = `group relative flex items-center gap-3 overflow-hidden rounded-xl px-2.5 py-3 text-sm text-gray-700 transition-all duration-200 hover:pl-3.5 ${accent.hoverBg}`;
        const content = (
          <>
            <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3 ${accent.tile}`}>
              <Icon size={18} />
            </span>
            <span className={`flex-1 font-semibold text-gray-700 transition-colors duration-200 ${accent.hoverText}`}>{item.label}</span>
            <ChevronDown size={14} className="-rotate-90 flex-shrink-0 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </>
        );
        return item.external ? (
          <a key={item.href} href={item.href} onClick={onItemClick} target="_blank" rel="noopener noreferrer" className={itemClassName}>{content}</a>
        ) : (
          <Link key={item.href} href={item.href} onClick={onItemClick} className={itemClassName}>{content}</Link>
        );
      })}
    </div>
  );
};

// Mobile accordion row — dipakai di dalam slide-in drawer
const MobileAccordionSection: React.FC<{
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: DropdownItem[];
  onItemClick: () => void;
}> = ({ label, isOpen, onToggle, items, onItemClick }) => {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-5 py-4 text-left font-semibold transition-colors ${
          isOpen ? "text-blue-600" : "text-gray-800"
        }`}
      >
        {label}
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : "text-gray-400"}`} />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-5 pb-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              const accent = ACCENTS[index % ACCENTS.length];
              const itemClassName =
                "flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm text-gray-700 transition-colors active:scale-[0.98]";
              const content = (
                <>
                  <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white shadow-sm ${accent.tile}`}>
                    <Icon size={16} />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </>
              );
              return item.external ? (
                <a key={item.href} href={item.href} onClick={onItemClick} target="_blank" rel="noopener noreferrer" className={itemClassName}>{content}</a>
              ) : (
                <Link key={item.href} href={item.href} onClick={onItemClick} className={itemClassName}>{content}</Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isElearningOpen, setIsElearningOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mobile accordion states (di dalam drawer)
  const [isMobileMenuSectionOpen, setIsMobileMenuSectionOpen] = useState(false);
  const [isMobileBlogSectionOpen, setIsMobileBlogSectionOpen] = useState(false);
  const [isMobileElearningSectionOpen, setIsMobileElearningSectionOpen] = useState(false);

  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const blogDropdownRef = useRef<HTMLDivElement>(null);
  const elearningDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (isBlogOpen && blogDropdownRef.current && !blogDropdownRef.current.contains(event.target as Node)) {
        setIsBlogOpen(false);
      }
      if (isElearningOpen && elearningDropdownRef.current && !elearningDropdownRef.current.contains(event.target as Node)) {
        setIsElearningOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isBlogOpen, isElearningOpen]);

  // Kunci scroll body saat drawer mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileMenuSectionOpen(false);
    setIsMobileBlogSectionOpen(false);
    setIsMobileElearningSectionOpen(false);
  };

  const isTransparent = !isScrolled && isHomePage;
  const textColor = isTransparent ? "text-white" : "text-gray-900";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isScrolled || !isHomePage ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        style={{ transform: "translateZ(0)" }}
      >
        <div className={`h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transform origin-left transition-all duration-700 ${isScrolled ? "scale-x-100" : "scale-x-0"}`} />

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
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
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col leading-tight">
                <h1 className={`text-lg font-black ${isTransparent ? "text-white" : "bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent"} transform group-hover:scale-105 transition-transform duration-300`}>
                  PT TEKNOMEDIA
                </h1>
                <span className={`text-sm font-semibold ${isTransparent ? "text-white/90" : "bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent"} transform group-hover:scale-105 transition-transform duration-300`}>
                  EDUKASI NUSANTARA
                </span>
              </div>
            </Link>

            {/* Desktop Menu (unchanged) */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinkItem href="/" isTransparent={isTransparent}>Home</NavLinkItem>

              <div className="relative" ref={menuDropdownRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`relative py-1 ${textColor} font-semibold flex items-center transition-colors duration-300 ${isMenuOpen ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  Menu
                  <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : "rotate-0"}`} />
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${isMenuOpen ? "w-full" : "w-0 hover:w-full"}`} />
                </button>
                {isMenuOpen && <DesktopDropdownPanel items={MENU_ITEMS} onItemClick={() => setIsMenuOpen(false)} />}
              </div>

              <div className="relative" ref={elearningDropdownRef}>
                <button
                  onClick={() => setIsElearningOpen(!isElearningOpen)}
                  className={`relative py-1 ${textColor} font-semibold flex items-center transition-colors duration-300 ${isElearningOpen ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  E-Learning
                  <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isElearningOpen ? "rotate-180" : "rotate-0"}`} />
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${isElearningOpen ? "w-full" : "w-0 hover:w-full"}`} />
                </button>
                {isElearningOpen && <DesktopDropdownPanel items={ELEARNING_ITEMS} onItemClick={() => setIsElearningOpen(false)} />}
              </div>

              <div className="relative" ref={blogDropdownRef}>
                <button
                  onClick={() => setIsBlogOpen(!isBlogOpen)}
                  className={`relative py-1 ${textColor} font-semibold flex items-center transition-colors duration-300 ${isBlogOpen ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  Blog
                  <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isBlogOpen ? "rotate-180" : "rotate-0"}`} />
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${isBlogOpen ? "w-full" : "w-0 hover:w-full"}`} />
                </button>
                {isBlogOpen && <DesktopDropdownPanel items={BLOG_ITEMS} onItemClick={() => setIsBlogOpen(false)} />}
              </div>

              <NavLinkItem href="/contact" isTransparent={isTransparent}>Contact</NavLinkItem>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ${textColor} p-2 rounded-lg hover:bg-white/10 transition-all duration-300`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Buka menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {mounted &&
        createPortal(
          <>
            {/* Mobile Drawer: backdrop */}
            <div
              className={`fixed inset-0 z-[60] bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              onClick={closeMobileMenu}
            />

            {/* Mobile Drawer: panel geser dari kanan */}
            <div
              className={`fixed inset-y-0 right-0 z-[70] h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex h-full flex-col overflow-y-auto">
                {/* Header drawer */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
                  <div className="flex items-center gap-2">
                    <Image src="/teknomedia.png" alt="Teknomedia Logo" width={32} height={32} className="rounded-full" />
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-sm font-black text-transparent">
                      TEKNOMEDIA
                    </span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                    aria-label="Tutup menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Isi drawer */}
                <div className="flex-1">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="block border-b border-gray-100 px-5 py-4 font-semibold text-gray-800 transition-colors hover:text-blue-600"
                  >
                    Home
                  </Link>

                  <MobileAccordionSection
                    label="Menu"
                    isOpen={isMobileMenuSectionOpen}
                    onToggle={() => setIsMobileMenuSectionOpen((v) => !v)}
                    items={MENU_ITEMS}
                    onItemClick={closeMobileMenu}
                  />
                  <MobileAccordionSection
                    label="E-Learning"
                    isOpen={isMobileElearningSectionOpen}
                    onToggle={() => setIsMobileElearningSectionOpen((v) => !v)}
                    items={ELEARNING_ITEMS}
                    onItemClick={closeMobileMenu}
                  />
                  <MobileAccordionSection
                    label="Blog"
                    isOpen={isMobileBlogSectionOpen}
                    onToggle={() => setIsMobileBlogSectionOpen((v) => !v)}
                    items={BLOG_ITEMS}
                    onItemClick={closeMobileMenu}
                  />

                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="block border-b border-gray-100 px-5 py-4 font-semibold text-gray-800 transition-colors hover:text-blue-600"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default Header;