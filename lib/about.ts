import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";

export async function getAboutData() {
  try {
    await connectDB();

    let about = await About.findOne().lean();

    if (!about) {
      const createdAbout = await About.create({
        sectionLabel: "আমাদের সম্পর্কে",

        title: "নওগাঁর বিখ্যাত",

        highlightedTitle: "পাড়া সন্দেশ",

        descriptions: [
          "নওগাঁর ঐতিহ্যবাহী পাড়া সন্দেশ তার অনন্য স্বাদ ও গুণমানের জন্য পরিচিত।",
          "খাঁটি গরুর দুধ, মানসম্মত ছানা ও ঐতিহ্যবাহী রেসিপিতে তৈরি প্রতিটি সন্দেশে রয়েছে নওগাঁর ঐতিহ্যের স্বাদ।",
        ],

        image: {
          url: "",
          publicId: "",
          alt: "নওগাঁর পাড়া সন্দেশ",
        },

        videoId: "",

        stats: [
          {
            value: "৫০+",
            label: "বছরের ঐতিহ্য",
          },
          {
            value: "১০K+",
            label: "সন্তুষ্ট গ্রাহক",
          },
          {
            value: "১০০%",
            label: "বিশুদ্ধ উপকরণ",
          },
        ],

        features: [
          {
            title: "ঐতিহ্যবাহী রেসিপি",
            description: "প্রজন্মের পর প্রজন্ম ধরে চলে আসা ঐতিহ্যবাহী রেসিপি।",
            icon: "Award",
          },
          {
            title: "বিশুদ্ধ উপকরণ",
            description: "সেরা মানের বিশুদ্ধ উপকরণ ব্যবহার করা হয়।",
            icon: "Leaf",
          },
          {
            title: "মানসম্মত পণ্য",
            description: "প্রতিটি পণ্যের মান নিশ্চিত করা হয়।",
            icon: "ShieldCheck",
          },
          {
            title: "ভালোবাসার তৈরি",
            description:
              "যত্ন ও ভালোবাসার সাথে প্রতিটি সন্দেশ প্রস্তুত করা হয়।",
            icon: "Heart",
          },
          {
            title: "নিরাপদ প্যাকেজিং",
            description: "নিরাপদে পৌঁছে দেওয়ার জন্য মানসম্মত প্যাকেজিং।",
            icon: "PackageCheck",
          },
        ],
      });

      about = createdAbout.toObject();
    }

    return JSON.parse(JSON.stringify(about));
  } catch (error) {
    console.error("getAboutData error:", error);

    return null;
  }
}
