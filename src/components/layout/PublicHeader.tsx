"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sparkles, Users, MessageCircle, Trophy, UsersRound, Image as ImageIcon, BookOpen, ShoppingCart, Flame, School, Phone } from "lucide-react";
import Image from "next/image";

// Constants for dropdown items
const ELEARNING_ITEMS = [
  {
    href: "#",
    label: "Teknomedia E-Learning",
    icon: BookOpen,
    external: true,
  },
  {
    href: "https://lms.xplore.id/",
    label: "LMS Store",
    icon: ShoppingCart,
    external: true,
  },
];

const BLOG_ITEMS = [
  {
    href: "/article",
    label: "Hot Articles",
    icon: Flame,
    external: false,
  },
  {
    href: "https://www.smksteknologi.sch.id/",
    label: "SMK TEKNOLOGI",
    icon: School,
    external: true,
  },
  {
    href: "https://smkalhurriyyah.sch.id/",
    label: "SMK AL HURIYYAH",
    icon: School,
    external: true,
  },
];

const MENU_ITEMS = [
  {
    href: "/mitra",
    label: "Mitra",
    icon: Users,
  },
  {
    href: "/consultation",
    label: "Consultation",
    icon: MessageCircle,
  },
  {
    href: "/featured",
    label: "Pencapaian",
    icon: Trophy,
  },
  {
    href: "/team",
    label: "Team",
    icon: UsersRound,
  },
  {
    href: "/galeri",
    label: "Galeri",
    icon: ImageIcon,
  },
];

const NavLinkItem: React.FC<{
  href: string;
  children: React.ReactNode;
  isTransparent: boolean;
  onClick?: () => void;
}> = ({ href, children, isTransparent, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = false; // You can add pathname check here
  const textColor = isTransparent ? "text-white" : "text-gray-900";

  return (
    <a
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
    </a>
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

  const isHomePage = true; // You can add pathname check

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
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
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

            <h1
              className={`text-2xl font-black ${
                isTransparent
                  ? "text-white"
                  : "bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent"
              } transform group-hover:scale-105 transition-transform duration-300`}
            >
              TEKNOMEDIA
            </h1>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinkItem href="/" isTransparent={isTransparent}>
              Home
            </NavLinkItem>

            {/* Desktop Menu Dropdown - MINIMALIST */}
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
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ${
                    isMenuOpen ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </button>

              {/* Minimalist Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <Icon size={16} className="flex-shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop E-Learning Dropdown - MINIMALIST */}
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

              {isElearningOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {ELEARNING_ITEMS.map((item) => {
                    const Component = item.external ? "a" : "a";
                    const Icon = item.icon;
                    const externalProps = item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {};

                    return (
                      <Component
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsElearningOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        {...externalProps}
                      >
                        <Icon size={16} className="flex-shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </Component>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop Blog Dropdown - MINIMALIST */}
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
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {BLOG_ITEMS.map((item) => {
                    const Component = item.external ? "a" : "a";
                    const Icon = item.icon;
                    const externalProps = item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {};

                    return (
                      <Component
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsBlogOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        {...externalProps}
                      >
                        <Icon size={16} className="flex-shrink-0" />
                        <span className="text-xs">{item.label}</span>
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

        {/* Mobile Menu - MINIMALIST */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 bg-white rounded-b-xl shadow-lg border-t border-gray-100">
            <div className="py-2">
              {/* Home */}
              <a
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </a>

              {/* Menu Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileMenuOpen_dropdown(!isMobileMenuOpen_dropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                >
                  Menu
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileMenuOpen_dropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileMenuOpen_dropdown && (
                  <div className="bg-gray-50">
                    {MENU_ITEMS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-white transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* E-Learning Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileElearningOpen(!isMobileElearningOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                >
                  E-Learning
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileElearningOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileElearningOpen && (
                  <div className="bg-gray-50">
                    {ELEARNING_ITEMS.map((item) => {
                      const externalProps = item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};

                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-8 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-white transition-colors"
                          {...externalProps}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Blog Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileBlogOpen(!isMobileBlogOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                >
                  Blog
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileBlogOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileBlogOpen && (
                  <div className="bg-gray-50">
                    {BLOG_ITEMS.map((item) => {
                      const externalProps = item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {};

                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-8 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-white transition-colors"
                          {...externalProps}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Contact */}
              <a
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;