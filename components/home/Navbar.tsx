"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const navLinks = [
  {
    label: "হোম",
    href: "/",
  },
  {
    label: "আমাদের সম্পর্কে",
    href: "#about",
  },
  {
    label: "পণ্য সমূহ",
    href: "#products",
  },
  {
    label: "কেন আমাদের পণ্য",
    href: "#why-us",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#5b0909]/20 bg-[#5b0909]">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
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
              className={`relative py-2 text-sm font-semibold transition ${
                index === 0
                  ? "text-[#f2c94c]"
                  : "text-white hover:text-[#f2c94c]"
              }`}
            >
              {item.label}

              {index === 0 && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#f2c94c]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Order Button */}
        <Link
          href="#order"
          className="hidden items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#c9141b] md:flex"
        >
          <ShoppingCart className="h-4 w-4" />
          অর্ডার করুন
        </Link>

        {/* Mobile button */}
        <Link
          href="#order"
          className="flex items-center gap-2 rounded-full bg-[#ed1c24] px-4 py-2 text-xs font-bold text-white md:hidden"
        >
          <ShoppingCart className="h-4 w-4" />
          অর্ডার
        </Link>
      </div>
    </header>
  );
}
