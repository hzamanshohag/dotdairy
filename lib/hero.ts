import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/Hero";

export async function getHeroData() {
  try {
    await connectDB();

    let hero = await Hero.findOne().lean();

    // Create default data if database is empty
    if (!hero) {
      const createdHero = await Hero.create({
        locationText: "নওগাঁ জেলার বিখ্যাত",

        title: "নওগাঁর ঐতিহ্যবাহী",

        highlightedTitle: "পাড়া সন্দেশ",

        description:
          "খাঁটি গরুর দুধ, মানসম্মত ছানা ও ঐতিহ্যবাহী রেসিপিতে তৈরি নওগাঁর বিখ্যাত পাড়া সন্দেশ।",

        orderButtonText: "এখনই অর্ডার করুন",

        aboutButtonText: "আরো জানুন",

        trustItems: ["খাঁটি দুধ", "তাজা প্রস্তুত", "নিরাপদ প্যাকেজিং"],

        images: [],
      });

      hero = createdHero.toObject();
    }

    return JSON.parse(JSON.stringify(hero));
  } catch (error) {
    console.error("getHeroData error:", error);

    return null;
  }
}
