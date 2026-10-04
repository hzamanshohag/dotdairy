"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "রাকিব হাসান",
    image: "/images/reviews/user-1.jpg",
    review:
      "নওগাঁর প্যারা সন্দেশের অসাধারণ স্বাদ। একবার খাওয়ার পর আবারও খেতে ইচ্ছে করে।",
  },
  {
    name: "মো. রাকিবুল ইসলাম",
    image: "/images/reviews/user-2.jpg",
    review:
      "খুবই ভালো মানের সন্দেশ। স্বাদ এবং মান দুটোই দারুণ। পরিবারের সবাই পছন্দ করেছে।",
  },
  {
    name: "সুমি আক্তার",
    image: "/images/reviews/user-3.jpg",
    review: "নওগাঁর আসল স্বাদ পেয়েছি। প্যারা সন্দেশের স্বাদ সত্যিই অসাধারণ।",
  },
  {
    name: "রহমান করিম",
    image: "/images/reviews/user-4.jpg",
    review:
      "সুস্বাদু এবং খুব ভালো মানের প্যারা সন্দেশ। সুন্দর প্যাকেজিং এবং দ্রুত ডেলিভারি।",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * We use duplicated cards so the carousel
   * can move smoothly without jumping.
   */
  const slides = [...testimonials, ...testimonials];

  const next = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const previous = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  /*
   * Reset position after reaching duplicated slides.
   */
  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  /*
   * Auto slide
   */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="overflow-hidden bg-[#fffaf0] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="mb-1 text-xs font-bold tracking-wide text-[#a70d0d] sm:text-sm">
            গ্রাহকদের ভালোবাসা
          </p>

          <h2 className="text-2xl font-black text-[#5b0909] sm:text-3xl lg:text-4xl">
            গ্রাহকদের মতামত
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6b4a3c]">
            আমাদের প্যারা সন্দেশ সম্পর্কে আমাদের প্রিয় গ্রাহকদের অভিজ্ঞতা।
          </p>

          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#e31b23]" />
        </div>

        {/* ================= CAROUSEL ================= */}

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ================= PREVIOUS ================= */}

          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="
              absolute left-0 top-1/2 z-20
              hidden h-11 w-11
              -translate-x-1/2 -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[#ead9bd]
              bg-white
              text-[#5b0909]
              shadow-lg
              transition-all
              hover:bg-[#5b0909]
              hover:text-white
              active:scale-95
              lg:flex
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* ================= VIEWPORT ================= */}

          <div className="overflow-hidden">
            {/* ================= TRACK ================= */}

            <div
              className="
                flex
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(
                  calc(
                    -${currentIndex} * (
                      100% / 1
                    )
                  )
                )`,
              }}
            >
              {slides.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="
                    w-full
                    shrink-0
                    px-1.5

                    sm:w-1/2

                    lg:w-1/3
                  "
                >
                  {/* ================= CARD ================= */}

                  <div
                    className="
                      group
                      relative
                      flex
                      min-h-[230px]
                      h-full
                      flex-col
                      rounded-2xl
                      border
                      border-[#ead9bd]
                      bg-white
                      p-5
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      sm:p-6
                    "
                  >
                    {/* Quote */}

                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#fff0d0]
                        text-[#a70d0d]
                      "
                    >
                      <Quote className="h-4 w-4" />
                    </div>

                    {/* ================= USER ================= */}

                    <div className="flex items-center gap-3">
                      {/* Avatar */}

                      <div
                        className="
                          relative
                          h-12
                          w-12
                          shrink-0
                          overflow-hidden
                          rounded-full
                          border-2
                          border-[#f3e5c8]
                          bg-[#fff8eb]
                        "
                      >
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>

                      {/* User Info */}

                      <div className="min-w-0 pr-8">
                        <h3 className="truncate text-sm font-bold text-[#4b2920] sm:text-base">
                          {testimonial.name}
                        </h3>

                        {/* Stars */}

                        <div className="mt-1 flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className="
                                h-3.5
                                w-3.5
                                fill-[#f5b400]
                                text-[#f5b400]
                              "
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}

                    <div className="my-4 h-px bg-[#f0e4d0]" />

                    {/* ================= REVIEW ================= */}

                    <p className="flex-1 text-sm leading-6 text-[#5b4035]">
                      “{testimonial.review}”
                    </p>

                    {/* Bottom accent */}

                    <div
                      className="
                        mt-5
                        h-1
                        w-10
                        rounded-full
                        bg-[#e31b23]
                        transition-all
                        duration-300
                        group-hover:w-16
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= NEXT ================= */}

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="
              absolute right-0 top-1/2 z-20
              hidden h-11 w-11
              translate-x-1/2 -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[#ead9bd]
              bg-white
              text-[#5b0909]
              shadow-lg
              transition-all
              hover:bg-[#5b0909]
              hover:text-white
              active:scale-95
              lg:flex
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* ================= MOBILE CONTROLS ================= */}

        <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#ead9bd]
              bg-white
              text-[#5b0909]
              shadow-sm
              transition
              hover:bg-[#5b0909]
              hover:text-white
              active:scale-95
            "
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots */}

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              bg-white
              px-3
              py-2
              shadow-sm
            "
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentIndex % testimonials.length === index
                      ? "w-6 bg-[#e31b23]"
                      : "w-2 bg-[#5b0909]/25"
                  }
                `}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#ead9bd]
              bg-white
              text-[#5b0909]
              shadow-sm
              transition
              hover:bg-[#5b0909]
              hover:text-white
              active:scale-95
            "
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ================= DESKTOP DOTS ================= */}

        <div className="mt-7 hidden items-center justify-center gap-1.5 lg:flex">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  currentIndex % testimonials.length === index
                    ? "w-7 bg-[#e31b23]"
                    : "w-2 bg-[#5b0909]/25"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
