import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "পাড়া সন্দেশ (প্রিমিয়াম)",
    description:
      "খাঁটি গরুর দুধ ও মানসম্মত ছানা দিয়ে তৈরি ঐতিহ্যবাহী পাড়া সন্দেশ।",
    price: "৬৫০ টাকা",
    weight: "৫০০ গ্রাম",
    image:
      "https://i.ibb.co.com/Zz4YRrKD/Chat-GPT-Image-Sep-26-2026-08-45-25-PM.png",
  },
  {
    id: 2,
    name: "পাড়া সন্দেশ (স্পেশাল)",
    description: "নওগাঁর ঐতিহ্যবাহী রেসিপিতে তৈরি সুস্বাদু ও নরম পাড়া সন্দেশ।",
    price: "৮৫০ টাকা",
    weight: "১ কেজি",
    image:
      "https://i.ibb.co.com/rGqVLpXZ/Chat-GPT-Image-Sep-26-2026-08-49-49-PM.png",
  },
  {
    id: 3,
    name: "মিষ্টি প্যাক (পাড়া সন্দেশ)",
    description:
      "উপহার ও বিশেষ অনুষ্ঠানের জন্য সুন্দরভাবে সাজানো মিষ্টির প্যাক।",
    price: "১২০০ টাকা",
    weight: "১.৫ কেজি",
    image:
      "https://i.ibb.co.com/Zz4YRrKD/Chat-GPT-Image-Sep-26-2026-08-45-25-PM.png",
  },
  {
    id: 4,
    name: "স্পেশাল পাড়া সন্দেশ",
    description: "বিশেষ মানের উপকরণ দিয়ে তৈরি আমাদের প্রিমিয়াম পাড়া সন্দেশ।",
    price: "১০০০ টাকা",
    weight: "১ কেজি",
    image:
      "https://i.ibb.co.com/TM5wSkMx/Chat-GPT-Image-Sep-26-2026-08-44-15-PM.png",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="bg-[#4d0707] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            আমাদের পাড়া সন্দেশ
          </h2>

          <p className="mt-1 text-sm text-[#f5dfc2] sm:text-base">
            নির্বাচিত স্বাদ, ঐতিহ্যবাহী মায়ায়
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border-2 border-[#d7b58b] bg-[#fffaf0] shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3dfc0]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base font-bold text-[#5b0909] sm:text-lg">
                  {product.name}
                </h3>

                <p className="mt-1 min-h-[48px] text-xs leading-5 text-[#5b4035] sm:text-sm">
                  {product.description}
                </p>

                {/* Weight + Price */}
                <div className="mt-3 space-y-1 text-xs text-[#5b4035] sm:text-sm">
                  <p>
                    <span className="font-semibold">ওজন:</span> {product.weight}
                  </p>

                  <p>
                    <span className="font-semibold">মূল্য:</span>{" "}
                    <span className="font-bold text-[#e31b23]">
                      {product.price}
                    </span>
                  </p>
                </div>

                {/* Order Button */}
                <Link
                  href="#order"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#e51b23] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#c9141b]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  অর্ডার করুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
