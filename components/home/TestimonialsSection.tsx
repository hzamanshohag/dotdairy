"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

import reviewImage1 from "@/public/img/reviews/1.webp";
import reviewImage2 from "@/public/img/reviews/2.webp";
import reviewImage3 from "@/public/img/reviews/3.webp";
import reviewImage4 from "@/public/img/reviews/4.webp";

const testimonials = [
  {
    name: "রাকিব হাসান",
    image: reviewImage1,
    review:
      "নওগাঁর প্যারা সন্দেশের অসাধারণ স্বাদ। একবার খাওয়ার পর আবারও খেতে ইচ্ছে করে।",
  },
  {
    name: "মো. রাকিবুল ইসলাম",
    image: reviewImage2,
    review:
      "খুবই ভালো মানের সন্দেশ। স্বাদ এবং মান দুটোই দারুণ। পরিবারের সবাই পছন্দ করেছে।",
  },
  {
    name: "সুমি আক্তার",
    image: reviewImage3,
    review:
      "নওগাঁর আসল স্বাদ পেয়েছি। প্যারা সন্দেশের স্বাদ সত্যিই অসাধারণ।",
  },
  {
    name: "রহমান করিম",
    image: reviewImage4,
    review:
      "সুস্বাদু এবং খুব ভালো মানের প্যারা সন্দেশ। সুন্দর প্যাকেজিং এবং দ্রুত ডেলিভারি।",
  },
];

const GAP = 20;

export default function TestimonialsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const transitionRef = useRef(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [transitionEnabled, setTransitionEnabled] =
    useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate cards to create a continuous loop.
  const slides = [...testimonials, ...testimonials];

  const visibleIndex = currentIndex % testimonials.length;

  const updateIndex = useCallback((index: number) => {
    indexRef.current = index;
    setCurrentIndex(index);
  }, []);

  // Measure one card's exact width plus its gap.
  useEffect(() => {
    const viewport = viewportRef.current;
    const card = cardRef.current;

    if (!viewport || !card) return;

    const measure = () => {
      const width = card.getBoundingClientRect().width;
      setStep(width + GAP);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => {
    updateIndex(indexRef.current + 1);
  }, [updateIndex]);

  const previous = useCallback(() => {
    updateIndex(
      indexRef.current === 0
        ? testimonials.length - 1
        : indexRef.current - 1,
    );
  }, [updateIndex]);

  const goTo = useCallback(
    (index: number) => updateIndex(index),
    [updateIndex],
  );

  // Seamless loop reset after reaching the duplicated slides.
  useEffect(() => {
    if (currentIndex < testimonials.length) return;

    const track = viewportRef.current?.firstElementChild as
      | HTMLElement
      | null;

    const timer = window.setTimeout(() => {
      transitionRef.current = false;
      setTransitionEnabled(false);
      updateIndex(0);

      // Force the reset position to render before re-enabling motion.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          transitionRef.current = true;
          setTransitionEnabled(true);
        });
      });
    }, 650);

    return () => window.clearTimeout(timer);
  }, [currentIndex, updateIndex]);

  // Automatic sliding, paused while the pointer is over the carousel.
  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      updateIndex(indexRef.current + 1);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused, updateIndex]);

  return (
    <section className="overflow-hidden bg-[#fffaf0] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
          <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#5b0909] px-4 py-1.5 text-sm font-semibold text-[#f5c400]">
             গ্রাহকদের ভালোবাসা
          </span>

          <h2 className="mt-3 text-3xl font-black text-[#5b0909] sm:text-4xl">
            গ্রাহকদের মতামত
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b4a3d] sm:text-base">
       আমাদের প্যারা সন্দেশ সম্পর্কে আমাদের প্রিয়
            গ্রাহকদের অভিজ্ঞতা।
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null,
              )
            ) {
              setIsPaused(false);
            }
          }}
        >
          {/* Desktop previous button */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="absolute -left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#ead9bd] bg-white text-[#5b0909] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#5b0909] hover:text-white active:scale-95 lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Viewport */}
          <div ref={viewportRef} className="overflow-hidden py-3">
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translate3d(-${currentIndex * step}px, 0, 0)`,
                transition: transitionEnabled
                  ? "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
              }}
              onTransitionEnd={() => {
                if (indexRef.current >= testimonials.length) {
                  transitionRef.current = false;
                }
              }}
            >
              {slides.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  ref={index === 0 ? cardRef : undefined}
                  className="w-full shrink-0 sm:w-[calc(50%-10px)] lg:w-[calc(33.333333%-13.333333px)]"
                >
                  <article className="group relative flex h-full min-h-[245px] flex-col overflow-hidden rounded-3xl border border-[#ead9bd] bg-white p-5 shadow-[0_5px_25px_rgba(91,9,9,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b5a1] hover:shadow-[0_16px_40px_rgba(91,9,9,0.10)] sm:p-6">
                    {/* Decorative quote */}
                    <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0d0] text-[#a70d0d] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <Quote className="h-5 w-5" />
                    </div>

                    {/* Customer */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#f3e5c8] bg-[#fff8eb]">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          sizes="56px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0 pr-9">
                        <h3 className="truncate text-sm font-bold text-[#4b2920] sm:text-base">
                          {testimonial.name}
                        </h3>

                        <div
                          className="mt-2 flex gap-0.5"
                          aria-label="5 out of 5 stars"
                        >
                          {Array.from({ length: 5 }).map(
                            (_, starIndex) => (
                              <Star
                                key={starIndex}
                                className="h-3.5 w-3.5 fill-[#f5b400] text-[#f5b400]"
                              />
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="my-5 h-px bg-gradient-to-r from-[#e7c8a4] via-[#f0e4d0] to-transparent" />

                    {/* Review */}
                    <p className="flex-1 text-sm leading-7 text-[#5b4035] sm:text-[15px]">
                      “{testimonial.review}”
                    </p>

                    {/* Accent */}
                    <div className="mt-5 flex items-center justify-between">
                      <span className="h-1 w-10 rounded-full bg-[#e31b23] transition-all duration-300 group-hover:w-16" />
                      <span className="text-xs font-semibold text-[#a70d0d]/70">
                        Verified Customer
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop next button */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#ead9bd] bg-white text-[#5b0909] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#5b0909] hover:text-white active:scale-95 lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ead9bd] bg-white text-[#5b0909] shadow-sm transition hover:bg-[#5b0909] hover:text-white active:scale-95 lg:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            className="flex items-center gap-2 rounded-full border border-[#ead9bd]/70 bg-white px-4 py-3 shadow-sm"
            aria-label="Choose testimonial"
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={
                  visibleIndex === index ? "true" : undefined
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  visibleIndex === index
                    ? "w-7 bg-[#e31b23]"
                    : "w-2 bg-[#5b0909]/20 hover:bg-[#a70d0d]/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ead9bd] bg-white text-[#5b0909] shadow-sm transition hover:bg-[#5b0909] hover:text-white active:scale-95 lg:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* <p className="mt-3 text-center text-xs text-[#8b6d5b]">
          {String(visibleIndex + 1).padStart(2, "0")} /{" "}
          {String(testimonials.length).padStart(2, "0")}
        </p> */}
      </div>
    </section>
  );
}
