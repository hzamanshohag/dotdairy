import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf3]">
      <div className="flex flex-col items-center text-center">
        {/* Logo / Brand Icon */}
        {/* <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d71920] shadow-lg">
          <span className="text-3xl font-bold text-white">পা</span>
        </div> */}

        {/* Brand */}
        <h1 className="text-2xl font-bold text-gray-900">পাড়া সন্দেশ</h1>

        <p className="mt-2 text-sm text-gray-500">নওগাঁর ঐতিহ্যবাহী স্বাদ</p>

        {/* Loader */}
        <div className="mt-8 flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-[#d71920]" />

          <span className="text-sm text-gray-500">লোড হচ্ছে...</span>
        </div>
      </div>
    </main>
  );
}
