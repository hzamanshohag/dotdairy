import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fffaf3] px-4">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-50 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <SearchX className="h-11 w-11 text-[#d71920]" />
        </div>

        {/* 404 */}
        <p className="mt-8 text-7xl font-black tracking-tight text-[#d71920] sm:text-8xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          পেজটি পাওয়া যায়নি
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে নেওয়া হয়েছে অথবা
          ঠিকানাটি সঠিক নয়।
        </p>

        {/* Home Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d71920] px-7 py-3 font-semibold text-white shadow-md transition hover:bg-[#b9141a] hover:shadow-lg"
          >
            <Home className="h-4 w-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Brand */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-sm font-semibold text-gray-700">পাড়া সন্দেশ</p>

          <p className="mt-1 text-xs text-gray-400">নওগাঁর ঐতিহ্যবাহী স্বাদ</p>
        </div>
      </div>
    </main>
  );
}
