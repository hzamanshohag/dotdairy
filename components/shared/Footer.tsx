import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUp, ShoppingCart } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#300000] text-white">
      {/* =====================================================
          TOP CTA
      ===================================================== */}
      <section className="border-b border-[#651414] bg-[#3b0000]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:px-6 md:flex-row md:justify-between md:gap-6 lg:px-8">
          {/* Product Image */}
          <div className="relative hidden h-16 w-40 shrink-0 sm:block lg:h-20 lg:w-48">
            <Image
              src="/images/footer-sandesh.png"
              alt="নওগাঁর পাড়া সন্দেশ"
              fill
              sizes="192px"
              className="object-contain"
            />
          </div>

          {/* CTA Text */}
          <div className="text-center md:flex-1 md:text-left">
            <p className="text-base font-semibold leading-6 text-white sm:text-lg">
              নওগাঁর ঐতিহ্যবাহী স্বাদ
            </p>

            <h2 className="text-lg font-black leading-7 text-[#f5c400] sm:text-xl lg:text-2xl">
              এখন আপনার ঘরে
            </h2>
          </div>

          {/* CTA Button */}
          <Link
            href="#order"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e51b23] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#c9141b] sm:px-6 sm:py-3 sm:text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>এখনই অর্ডার করুন</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3 lg:gap-12">
            {/* =================================================
                BRAND
            ================================================= */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label="নওগাঁ পাড়া সন্দেশ"
              >
                <Image
                  src="/images/logo.svg"
                  alt="নওগাঁ পাড়া সন্দেশ"
                  width={110}
                  height={60}
                  className="h-auto w-[85px] sm:w-[95px]"
                />
              </Link>

              <h3 className="mt-2.5 text-sm font-bold text-[#f5c400] sm:text-base">
                নওগাঁর পাড়া সন্দেশ
              </h3>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-gray-300 sm:text-sm sm:leading-6">
                নওগাঁর ঐতিহ্যবাহী পাড়া সন্দেশ। খাঁটি দুধ, মানসম্মত ছানা এবং
                ঐতিহ্যবাহী রেসিপিতে তৈরি আমাদের সুস্বাদু সন্দেশ।
              </p>
            </div>

            {/* =================================================
                QUICK LINKS
            ================================================= */}
            <div>
              <h3 className="mb-3 text-sm font-bold text-white sm:text-base">
                কুইক লিংক
              </h3>

              <ul className="space-y-1.5 text-xs text-gray-300 sm:space-y-2 sm:text-sm">
                <li>
                  <Link
                    href="/"
                    className="inline-block transition hover:text-[#f5c400]"
                  >
                    হোম
                  </Link>
                </li>

                <li>
                  <Link
                    href="#about"
                    className="inline-block transition hover:text-[#f5c400]"
                  >
                    আমাদের সম্পর্কে
                  </Link>
                </li>

                <li>
                  <Link
                    href="#products"
                    className="inline-block transition hover:text-[#f5c400]"
                  >
                    পণ্য সমূহ
                  </Link>
                </li>

                <li>
                  <Link
                    href="#why-us"
                    className="inline-block transition hover:text-[#f5c400]"
                  >
                    কেন আমাদের পণ্য
                  </Link>
                </li>

                <li>
                  <Link
                    href="#faq"
                    className="inline-block transition hover:text-[#f5c400]"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* =================================================
                CONTACT
            ================================================= */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-sm font-bold text-white sm:text-base">
                যোগাযোগ
              </h3>

              <ul className="space-y-2.5 text-xs text-gray-300 sm:space-y-3 sm:text-sm">
                {/* Location */}
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c400]" />

                  <span>নওগাঁ, বাংলাদেশ</span>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[#f5c400]" />

                  <a
                    href="tel:+8801XXXXXXXXX"
                    className="break-all transition hover:text-[#f5c400]"
                  >
                    +880 1XXX-XXXXXX
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[#f5c400]" />

                  <a
                    href="mailto:info@example.com"
                    className="break-all transition hover:text-[#f5c400]"
                  >
                    info@example.com
                  </a>
                </li>

                {/* Facebook */}
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 transition hover:text-[#1877f2]"
                  >
                    <FaFacebookF className="h-4 w-4 shrink-0 text-[#1877f2]" />
                    <span>Facebook পেজ</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}
      <div className="border-t border-[#551010]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center sm:px-6 sm:py-4 lg:px-8">
          <p className="text-[10px] leading-5 text-gray-400 sm:text-xs">
            © 2026 নওগাঁ পাড়া সন্দেশ | সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>

      {/* =====================================================
          BACK TO TOP
      ===================================================== */}
      <Link
        href="#"
        aria-label="Back to top"
        className="fixed bottom-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[#8a2525] bg-[#5b0909] text-[#f5c400] shadow-lg transition hover:bg-[#e51b23] sm:bottom-5 sm:right-5"
      >
        <ArrowUp className="h-4 w-4" />
      </Link>
    </footer>
  );
}
