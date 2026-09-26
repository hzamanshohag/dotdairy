import Image from "next/image";
import {
  Award,
  BadgePercent,
  Leaf,
  ShieldCheck,
  Gift,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "আসল নওগাঁর স্বাদ",
  },
  {
    icon: BadgePercent,
    title: "মানসম্মত উপকরণ",
  },
  {
    icon: Leaf,
    title: "ভেজাল ও নিরাপদ",
  },
  {
    icon: ShieldCheck,
    title: "স্বাস্থ্যসম্মত প্রস্তুতি",
  },
  {
    icon: Gift,
    title: "নিরাপদ প্যাকেজিং",
  },
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="scroll-mt-20 bg-[#fffaf0]">
      {/* =====================================================
          WHY US
      ===================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {/* Section Header */}
        <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <h2 className="text-2xl font-black leading-tight text-[#5b0909] sm:text-3xl">
            আমাদের পাড়া সন্দেশ
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6b4a3c] sm:text-base">
            নির্বাচিত স্বাদ, ঐতিহ্যবাহী মায়া ও যত্নের সমন্বয়ে তৈরি।
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex min-h-[110px] flex-col items-center justify-center rounded-xl border border-[#eadfc9] bg-[#fffdf8] px-3 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d8c18a] hover:shadow-md sm:min-h-[120px]"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5b0909] text-[#f5b400] transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <p className="mt-3 text-xs font-bold leading-5 text-[#4b2920] sm:text-sm">
                  {feature.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          HERITAGE
      ===================================================== */}
      <div className="bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          {/* =================================================
              IMAGE
          ================================================= */}
          <div className="relative h-[250px] w-full sm:h-[320px] lg:h-[390px]">
            <Image
              src="https://i.ibb.co.com/3JpC15Y/Chat-GPT-Image-Sep-26-2026-09-03-55-PM.png"
              alt="নওগাঁর পাড়া সন্দেশের ঐতিহ্য"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Heritage Badge */}
            <div className="absolute right-4 top-4 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#a70d0d] px-2 text-center text-[11px] font-bold leading-4 text-white shadow-xl ring-4 ring-white/20 sm:right-6 sm:top-6 sm:h-[105px] sm:w-[105px] sm:text-sm sm:leading-5">
              <div>
                <p>নওগাঁর ঐতিহ্য</p>
                <p className="text-[#ffd84d]">আমাদের গর্ব</p>
              </div>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}
          <div className="flex items-center px-5 py-9 sm:px-8 sm:py-11 lg:px-10 lg:py-12 xl:px-12">
            <div className="max-w-xl">
              {/* Label */}
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#a70d0d] sm:text-sm">
                আমাদের ঐতিহ্য
              </p>

              {/* Heading */}
              <h3 className="text-2xl font-black leading-tight text-[#5b0909] sm:text-3xl lg:text-[32px]">
                নওগাঁর পাড়া সন্দেশের ঐতিহ্য
              </h3>

              {/* Paragraphs */}
              <div className="mt-4 space-y-3 text-sm leading-6 text-[#5b4035] sm:mt-5 sm:text-base sm:leading-7">
                <p>
                  নওগাঁর পাড়া সন্দেশ শুধু একটি মিষ্টি নয়, এটি আমাদের ঐতিহ্য,
                  সংস্কৃতি ও গর্বের একটি অংশ। বহু বছর ধরে আমাদের স্থানীয়
                  কারিগরদের হাতে তৈরি এই সন্দেশ আজও তার স্বাদ ও মান ধরে রেখেছে।
                </p>

                <p>
                  খাঁটি দুধ, মানসম্মত ছানা এবং ঐতিহ্যবাহী প্রস্তুত প্রণালী
                  ব্যবহার করে আমরা তৈরি করি নওগাঁর বিখ্যাত পাড়া সন্দেশ।
                </p>
              </div>

              {/* Decorative Divider */}
              <div className="mt-5 flex items-center gap-3 sm:mt-6">
                <div className="h-px w-12 bg-[#a70d0d]/30 sm:w-16" />

                <span className="text-lg leading-none text-[#a70d0d]">❧</span>

                <div className="h-px w-12 bg-[#a70d0d]/30 sm:w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
