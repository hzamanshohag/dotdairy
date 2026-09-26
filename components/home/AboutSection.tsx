import Image from "next/image";
import { Award, Heart, ShieldCheck, Leaf, PackageCheck } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "ঐতিহ্যবাহী রেসিপি",
    description: "প্রজন্মের পর প্রজন্ম ধরে চলে আসা ঐতিহ্যবাহী রেসিপি।",
  },
  {
    icon: Heart,
    title: "মানসম্মত উপকরণ",
    description: "খাঁটি ও মানসম্মত উপকরণ দিয়ে তৈরি।",
  },
  {
    icon: Leaf,
    title: "স্বাস্থ্যকর উপাদান",
    description: "প্রাকৃতিক ও সতেজ উপাদান ব্যবহার করা হয়।",
  },
  {
    icon: ShieldCheck,
    title: "নিরাপদ প্রস্তুতি",
    description: "স্বাস্থ্যসম্মত পরিবেশে যত্নসহকারে প্রস্তুত।",
  },
  {
    icon: PackageCheck,
    title: "যত্ন সহকারে প্যাকেজিং",
    description: "নিরাপদ প্যাকেজিংয়ের মাধ্যমে আপনার কাছে পৌঁছে দিই।",
  },
];

export default function AboutSection() {
  return (
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
                src="https://i.ibb.co.com/qYbB6mLM/Chat-GPT-Image-Sep-26-2026-08-38-12-PM.png"
                alt="নওগাঁর বিখ্যাত পাড়া সন্দেশ"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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
                আমাদের সম্পর্কে
              </p>
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-3xl font-black leading-tight text-[#570808] sm:text-4xl lg:text-[42px]">
              নওগাঁর বিখ্যাত{" "}
              <span className="text-[#d71920]">পাড়া সন্দেশ</span>
            </h2>

            {/* Description */}
            <div className="mt-5 max-w-xl space-y-3 text-sm leading-7 text-gray-700 sm:text-[15px]">
              <p>
                নওগাঁর ঐতিহ্যবাহী পাড়া সন্দেশ একটি বিখ্যাত ও জনপ্রিয় মিষ্টি।
                এর স্বাদ, ঘ্রাণ এবং অনন্য তৈরির প্রক্রিয়ার জন্য এটি সবার কাছে
                বিশেষভাবে পরিচিত।
              </p>

              <p>
                খাঁটি দুধ, উন্নতমানের ছানা এবং যত্নসহকারে নির্বাচিত উপকরণ
                ব্যবহার করে আমরা তৈরি করি আমাদের পাড়া সন্দেশ।
              </p>

              <p>
                ঐতিহ্যের স্বাদ ও আধুনিক মানের সমন্বয়ে আমাদের লক্ষ্য হলো নওগাঁর
                বিখ্যাত এই মিষ্টির স্বাদ সবার কাছে পৌঁছে দেওয়া।
              </p>
            </div>

            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="mt-7 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {/* Stat 1 */}
              <div className="rounded-2xl border border-[#ead9bd] bg-[#fff0d0] px-2 py-4 text-center sm:px-4">
                <p className="text-xl font-black text-[#8b0808] sm:text-2xl">
                  ১০০%
                </p>

                <p className="mt-1 text-[10px] font-medium text-gray-600 sm:text-xs">
                  খাঁটি উপকরণ
                </p>
              </div>

              {/* Stat 2 */}
              <div className="rounded-2xl border border-[#ead9bd] bg-[#fff0d0] px-2 py-4 text-center sm:px-4">
                <p className="text-xl font-black text-[#8b0808] sm:text-2xl">
                  তাজা
                </p>

                <p className="mt-1 text-[10px] font-medium text-gray-600 sm:text-xs">
                  প্রতিদিন প্রস্তুত
                </p>
              </div>

              {/* Stat 3 */}
              <div className="rounded-2xl border border-[#ead9bd] bg-[#fff0d0] px-2 py-4 text-center sm:px-4">
                <p className="text-xl font-black text-[#8b0808] sm:text-2xl">
                  হোম
                </p>

                <p className="mt-1 text-[10px] font-medium text-gray-600 sm:text-xs">
                  ডেলিভারি সুবিধা
                </p>
              </div>
            </div>
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
          {/* Heading */}
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-[#ead9bd] bg-[#fffdf7] p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b978] hover:shadow-lg sm:p-5"
                >
                  {/* Icon */}
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#620909] text-yellow-300 shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  {/* Title */}
                  <h4 className="mt-3 text-xs font-bold leading-5 text-[#570808] sm:mt-4 sm:text-sm">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-[10px] leading-4 text-gray-600 sm:text-xs sm:leading-5">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
