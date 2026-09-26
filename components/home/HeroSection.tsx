"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MapPin,
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroImages = [
  {
    src: "https://i.ibb.co.com/qM80XwGL/Whats-App-Image-2026-09-26-at-8-26-35-PM.jpg",
    alt: "নওগাঁর বিখ্যাত পাড়া সন্দেশ",
  },
  {
    src: "https://i.ibb.co.com/qM80XwGL/Whats-App-Image-2026-09-26-at-8-26-35-PM.jpg",
    alt: "নওগাঁর ঐতিহ্যবাহী পাড়া সন্দেশ",
  },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  /* ================= AUTO SLIDE ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= PREVIOUS ================= */

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  /* ================= NEXT ================= */

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="bg-[#f8ead1]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="order-1">
            {/* Location */}
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#d99a00] sm:mb-5 sm:text-base">
              <MapPin className="h-5 w-5 fill-[#f2a900] text-[#f2a900]" />

              <span>নওগাঁ জেলার বিখ্যাত</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-4xl font-black leading-[1.15] tracking-tight text-[#5b0909] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              নওগাঁর ঐতিহ্যবাহী
              <span className="mt-1 block text-[#ed1c24] sm:mt-2">
                পাড়া সন্দেশ
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#5b4035] sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              খাঁটি গরুর দুধ, মানসম্মত ছানা ও ঐতিহ্যবাহী রেসিপিতে তৈরি নওগাঁর
              বিখ্যাত পাড়া সন্দেশ।
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              {/* Order Button */}
              <Link
                href="#order"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#c9141b] active:scale-[0.98]"
              >
                <ShoppingCart className="h-4 w-4" />

                <span>এখনই অর্ডার করুন</span>

                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* About Button */}
              <Link
                href="#about"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#5b0909] px-6 py-3 text-sm font-bold text-[#5b0909] transition hover:bg-[#5b0909] hover:text-white active:scale-[0.98]"
              >
                আরো জানুন
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#6b4a3c] sm:text-sm">
              <span>✓ খাঁটি দুধ</span>
              <span>✓ তাজা প্রস্তুত</span>
              <span>✓ নিরাপদ প্যাকেজিং</span>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT IMAGE CAROUSEL */}
          {/* ================================================= */}

          <div className="order-2">
            <div className="relative mx-auto w-full max-w-[500px]">
              {/* Image Card */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#fffdf7] shadow-lg ring-1 ring-[#ead9bd]">
                {/* ================================================= */}
                {/* SLIDES */}
                {/* ================================================= */}

                {heroImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      currentImage === index
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-contain"
                    />
                  </div>
                ))}

                {/* ================================================= */}
                {/* SUBTLE OVERLAY */}
                {/* ================================================= */}

                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                {/* ================================================= */}
                {/* HERITAGE BADGE */}
                {/* ================================================= */}

                <div className="absolute left-4 top-4 z-30 rounded-full bg-[#8b0808] px-4 py-3 text-center text-white shadow-lg sm:left-5 sm:top-5 sm:px-5 sm:py-4">
                  <p className="text-[10px] sm:text-xs">নওগাঁর</p>

                  <p className="text-xs font-bold sm:text-sm">ঐতিহ্যবাহী</p>

                  <p className="text-xs font-bold text-yellow-300 sm:text-sm">
                    পাড়া সন্দেশ
                  </p>
                </div>

                {/* ================================================= */}
                {/* CAROUSEL CONTROLS */}
                {/* ================================================= */}

                <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous image"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5b0909]/20 bg-white/95 text-[#5b0909] shadow-md backdrop-blur transition hover:bg-white active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Indicators */}
                  <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 shadow-md backdrop-blur">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImage(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentImage === index
                            ? "w-6 bg-[#ed1c24]"
                            : "w-2 bg-[#5b0909]/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5b0909]/20 bg-white/95 text-[#5b0909] shadow-md backdrop-blur transition hover:bg-white active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ================================================= */}
              {/* DECORATIVE LINE */}
              {/* ================================================= */}

              <div className="mx-auto mt-4 flex w-32 items-center justify-center gap-2">
                <div className="h-px flex-1 bg-[#8b0808]/30" />

                <div className="text-sm text-[#ed1c24]">❧</div>

                <div className="h-px flex-1 bg-[#8b0808]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
