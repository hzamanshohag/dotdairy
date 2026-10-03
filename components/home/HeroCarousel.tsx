"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroImage {
  url: string;
  publicId: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  /* =========================================
     AUTO SLIDE
  ========================================= */

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  /* =========================================
     PREVIOUS
  ========================================= */

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  /* =========================================
     NEXT
  ========================================= */

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  /* =========================================
     EMPTY STATE
  ========================================= */

  if (!images || images.length === 0) {
    return (
      <div className="relative mx-auto w-full max-w-[500px]">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-[#fffdf7] shadow-lg ring-1 ring-[#ead9bd]">
          <div className="text-center text-[#8b0808]">
            <p className="text-lg font-bold">পাড়া সন্দেশ</p>

            <p className="mt-1 text-sm">কোনো ছবি পাওয়া যায়নি</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      {/* ================================================= */}
      {/* IMAGE CARD */}
      {/* ================================================= */}

      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#fffdf7] shadow-lg ring-1 ring-[#ead9bd]">
        {/* ================================================= */}
        {/* SLIDES */}
        {/* ================================================= */}

        {images.map((image, index) => (
          <div
            key={image.publicId}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentImage === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt || "নওগাঁর বিখ্যাত পাড়া সন্দেশ"}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-contain"
            />
          </div>
        ))}

        {/* ================================================= */}
        {/* OVERLAY */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* ================================================= */}
        {/* HERITAGE BADGE */}
        {/* ================================================= */}

        <div className="absolute left-4 top-4 z-30 rounded-full bg-[#8b0808] px-4 py-3 text-center text-white shadow-lg sm:left-5 sm:top-5 sm:px-5 sm:py-4">
          <p className="text-[10px] sm:text-xs">নওগাঁর</p>

          <p className="text-xs font-bold sm:text-sm">ঐতিহ্যবাহী</p>

          <p className="text-xs font-bold text-yellow-300 sm:text-sm">
            প্যারা সন্দেশ
          </p>
        </div>

        {/* ================================================= */}
        {/* CAROUSEL CONTROLS */}
        {/* ================================================= */}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5b0909]/20 bg-white/95 text-[#5b0909] shadow-md backdrop-blur transition hover:bg-white active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* INDICATORS */}

            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 shadow-md backdrop-blur">
              {images.map((_, index) => (
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

            {/* NEXT */}

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5b0909]/20 bg-white/95 text-[#5b0909] shadow-md backdrop-blur transition hover:bg-white active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
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
  );
}
