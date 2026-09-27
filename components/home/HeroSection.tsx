import Link from "next/link";
import { MapPin, ShoppingCart, ArrowRight } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { getHeroData } from "@/lib/hero";


export default async function HeroSection() {
  const hero = await getHeroData();

  if (!hero) {
    return null;
  }

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

              <span>{hero.locationText}</span>
            </div>

            {/* Heading */}

            <h1 className="max-w-2xl text-4xl font-black leading-[1.15] tracking-tight text-[#5b0909] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              {hero.title}

              <span className="mt-1 block text-[#ed1c24] sm:mt-2">
                {hero.highlightedTitle}
              </span>
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-xl text-sm leading-6 text-[#5b4035] sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {hero.description}
            </p>

            {/* Buttons */}

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              {/* Order Button */}

              <Link
                href="#order"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#c9141b] active:scale-[0.98]"
              >
                <ShoppingCart className="h-4 w-4" />

                <span>{hero.orderButtonText}</span>

                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* About Button */}

              <Link
                href="#about"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#5b0909] px-6 py-3 text-sm font-bold text-[#5b0909] transition hover:bg-[#5b0909] hover:text-white active:scale-[0.98]"
              >
                {hero.aboutButtonText}
              </Link>
            </div>

            {/* Trust */}

            {hero.trustItems?.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#6b4a3c] sm:text-sm">
                {hero.trustItems.map((item: string, index: number) => (
                  <span key={`${item}-${index}`}>✓ {item}</span>
                ))}
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* RIGHT IMAGE CAROUSEL */}
          {/* ================================================= */}

          <div className="order-2">
            <HeroCarousel images={hero.images} />
          </div>
        </div>
      </div>
    </section>
  );
}
