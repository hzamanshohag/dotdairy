"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Award,
  Heart,
  ShieldCheck,
  Leaf,
  PackageCheck,
  Play,
  X,
} from "lucide-react";

type AboutData = {
  sectionLabel: string;

  title: string;

  highlightedTitle: string;

  descriptions: string[];

  image: {
    url: string;
    publicId: string;
    alt: string;
  };

  videoId: string;

  stats: {
    value: string;
    label: string;
  }[];

  features: {
    title: string;
    description: string;
    icon: string;
  }[];
};

interface AboutSectionClientProps {
  about: AboutData;
}

const iconMap = {
  Award,
  Heart,
  ShieldCheck,
  Leaf,
  PackageCheck,
};

export default function AboutSectionClient({ about }: AboutSectionClientProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section
        id="about"
        className="scroll-mt-20 bg-[#fff8eb] py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ================================================= */}
          {/* MAIN ABOUT */}
          {/* ================================================= */}

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* ================================================= */}
            {/* IMAGE */}
            {/* ================================================= */}

            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#f3e5cd] shadow-xl">
                <Image
                  src={about.image.url}
                  alt={about.image.alt || "নওগাঁর বিখ্যাত পাড়া সন্দেশ"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                {/* ================================================= */}
                {/* YOUTUBE PLAY BUTTON */}
                {/* ================================================= */}

                {about.videoId && (
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    aria-label="ভিডিও দেখুন"
                    className="group absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  >
                    <span className="absolute h-24 w-24 animate-ping rounded-full bg-[#ed1c24]/30 sm:h-28 sm:w-28" />

                    <span className="absolute h-20 w-20 rounded-full border-4 border-white/40 sm:h-24 sm:w-24" />

                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#ed1c24] text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c9141b] sm:h-20 sm:w-20">
                      <Play className="ml-1 h-7 w-7 fill-white sm:h-9 sm:w-9" />
                    </span>
                  </button>
                )}

                {about.videoId && (
                  <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                    ▶ ভিডিও দেখুন
                  </div>
                )}
              </div>

              {/* ================================================= */}
              {/* HERITAGE BADGE */}
              {/* ================================================= */}

              <div className="absolute -right-2 -top-2 flex h-[92px] w-[92px] items-center justify-center rounded-full border-4 border-[#fff8eb] bg-[#8b0808] text-center text-white shadow-xl sm:-right-3 sm:-top-3 sm:h-[110px] sm:w-[110px]">
                <div>
                  <p className="text-[10px] sm:text-xs">নওগাঁর</p>

                  <p className="text-xs font-bold sm:text-sm">ঐতিহ্যবাহী</p>

                  <p className="text-xs font-bold text-yellow-300 sm:text-sm">
                    পাড়া সন্দেশ
                  </p>
                </div>
              </div>

              {/* ================================================= */}
              {/* SMALL DECORATION */}
              {/* ================================================= */}

              <div className="absolute -bottom-3 left-5 flex items-center gap-2 rounded-full border border-[#ead9bd] bg-white px-4 py-2 shadow-md sm:left-8">
                <span className="h-2 w-2 rounded-full bg-[#d71920]" />

                <span className="text-xs font-semibold text-[#570808]">
                  নওগাঁর ঐতিহ্যের স্বাদ
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* CONTENT */}
            {/* ================================================= */}

            <div className="lg:pl-2">
              {/* Label */}

              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-[#d71920]" />

                <p className="text-xs font-bold uppercase tracking-wider text-[#d71920] sm:text-sm">
                  {about.sectionLabel}
                </p>
              </div>

              {/* Heading */}

              <h2 className="max-w-xl text-3xl font-black leading-tight text-[#570808] sm:text-4xl lg:text-[42px]">
                {about.title}{" "}
                <span className="text-[#d71920]">{about.highlightedTitle}</span>
              </h2>

              {/* Description */}

              <div className="mt-5 max-w-xl space-y-3 text-sm leading-7 text-gray-700 sm:text-[15px]">
                {about.descriptions?.map((description, index) => (
                  <p key={`${index}-${description}`}>{description}</p>
                ))}
              </div>

              {/* ================================================= */}
              {/* STATS */}
              {/* ================================================= */}

              {about.stats?.length > 0 && (
                <div className="mt-7 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                  {about.stats.map((stat, index) => (
                    <div
                      key={`${stat.label}-${index}`}
                      className="rounded-2xl border border-[#ead9bd] bg-[#fff0d0] px-2 py-4 text-center sm:px-4"
                    >
                      <p className="text-xl font-black text-[#8b0808] sm:text-2xl">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-gray-600 sm:text-xs">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================================================= */}
          {/* DIVIDER */}
          {/* ================================================= */}

          <div className="my-12 flex items-center justify-center gap-3 sm:my-16">
            <div className="h-px w-16 bg-[#d71920]/20 sm:w-24" />

            <span className="text-lg text-[#d71920]">❧</span>

            <div className="h-px w-16 bg-[#d71920]/20 sm:w-24" />
          </div>

          {/* ================================================= */}
          {/* FEATURES */}
          {/* ================================================= */}

          <div>
            <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#d71920]">
                আমাদের বিশেষত্ব
              </p>

              <h3 className="text-2xl font-black text-[#570808] sm:text-3xl">
                কেন আমাদের পাড়া সন্দেশ?
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                মান, ঐতিহ্য এবং ভালোবাসার সমন্বয়ে তৈরি প্রতিটি সন্দেশ।
              </p>
            </div>

            {/* Feature Cards */}

            {about.features?.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
                {about.features.map((feature, index) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap];

                  return (
                    <div
                      key={`${feature.title}-${index}`}
                      className="group rounded-2xl border border-[#ead9bd] bg-[#fffdf7] p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b978] hover:shadow-lg sm:p-5"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#620909] text-yellow-300 shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                        {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" />}
                      </div>

                      <h4 className="mt-3 text-xs font-bold leading-5 text-[#570808] sm:mt-4 sm:text-sm">
                        {feature.title}
                      </h4>

                      <p className="mt-2 text-[10px] leading-4 text-gray-600 sm:text-xs sm:leading-5">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* YOUTUBE MODAL */}
      {/* ===================================================== */}

      {isVideoOpen && about.videoId && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-[#ed1c24] active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${about.videoId}?autoplay=1&rel=0`}
                title="নওগাঁর পাড়া সন্দেশ"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
