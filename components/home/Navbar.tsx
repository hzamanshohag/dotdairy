"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "#about" },
  { label: "পণ্য সমূহ", href: "#products" },
  { label: "কেন আমাদের পণ্য", href: "#why-us" },
{ label: "গ্রাহকদের মতামত", href: "#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#5b0909] shadow-md">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="relative flex h-12 w-28 shrink-0 items-center"
        >
          <Image
            src="/img/logo.svg"
            alt="নওগাঁর প্যারা সন্দেশ"
            fill
            priority
            sizes="112px"
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                index === 0
                  ? "text-[#f2c94c]"
                  : "text-white hover:text-[#f2c94c]"
              }`}
            >
              {item.label}

              {index === 0 && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#f2c94c]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Order Button */}
        <Link
          href="#order"
          className="hidden items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#c9141b] hover:shadow-lg md:flex"
        >
          <ShoppingCart className="h-4 w-4" />
          অর্ডার করুন
        </Link>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="#order"
            onClick={closeMenu}
            className="flex items-center gap-1.5 rounded-full bg-[#ed1c24] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#c9141b]"
          >
            <ShoppingCart className="h-4 w-4" />
            অর্ডার
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={
              isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 overflow-hidden border-t border-white/10 bg-[#5b0909]">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
            {navLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={isOpen ? 0 : -1}
                onClick={closeMenu}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  index === 0
                    ? "bg-white/10 text-[#f2c94c]"
                    : "text-white hover:bg-white/10 hover:pl-6 hover:text-[#f2c94c]"
                }`}
              >
                {item.label}

                {index === 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f2c94c]" />
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
