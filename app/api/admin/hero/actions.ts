/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Hero from "@/models/Hero";

/* =========================================================
   TYPES
========================================================= */

interface HeroImageInput {
  url: string;
  publicId: string;
  alt: string;
}

interface UpdateHeroInput {
  locationText: string;
  title: string;
  highlightedTitle: string;
  description: string;
  orderButtonText: string;
  aboutButtonText: string;
  trustItems: string[];
  images: HeroImageInput[];
}

/* =========================================================
   GET HERO
========================================================= */

export async function getHero() {
  try {
    await connectDB();

    let hero = await Hero.findOne().lean();

    if (!hero) {
      const createdHero = await Hero.create({
        locationText: "নওগাঁ জেলার বিখ্যাত",

        title: "নওগাঁর ঐতিহ্যবাহী",

        highlightedTitle: "পাড়া সন্দেশ",

        description:
          "খাঁটি গরুর দুধ, মানসম্মত ছানা ও ঐতিহ্যবাহী রেসিপিতে তৈরি নওগাঁর বিখ্যাত পাড়া সন্দেশ।",

        orderButtonText:
          "এখনই অর্ডার করুন",

        aboutButtonText:
          "আরো জানুন",

        trustItems: [
          "খাঁটি দুধ",
          "তাজা প্রস্তুত",
          "নিরাপদ প্যাকেজিং",
        ],

        images: [],
      });

      hero = createdHero.toObject();
    }

    return {
      success: true,
      data: JSON.parse(
        JSON.stringify(hero)
      ),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to load hero section.",
    };
  }
}

/* =========================================================
   UPDATE HERO
========================================================= */

export async function updateHero(
  data: UpdateHeroInput
) {
  try {
    await connectDB();

    const hero =
      await Hero.findOneAndUpdate(
        {},

        {
          locationText:
            data.locationText,

          title:
            data.title,

          highlightedTitle:
            data.highlightedTitle,

          description:
            data.description,

          orderButtonText:
            data.orderButtonText,

          aboutButtonText:
            data.aboutButtonText,

          trustItems:
            data.trustItems,

          images:
            data.images,
        },

        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      ).lean();

    /* Revalidate homepage */

    revalidatePath("/");

    /* Revalidate admin */

    revalidatePath("/admin/hero");

    return {
      success: true,
      message:
        "Hero section updated successfully.",

      data: JSON.parse(
        JSON.stringify(hero)
      ),
    };
  } catch (error) {
    console.error(
      "updateHero error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to update hero section.",
    };
  }
}

/* =========================================================
   UPLOAD IMAGE
========================================================= */

export async function uploadHeroImage(
  formData: FormData
) {
  try {
    const file = formData.get(
      "file"
    ) as File | null;

    if (!file) {
      return {
        success: false,
        message: "Image is required.",
      };
    }

    /* File type */

    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        message:
          "Only image files are allowed.",
      };
    }

    /* File size - 5MB */

    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message:
          "Image must be smaller than 5MB.",
      };
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<any>(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "para-sandesh/hero",

                resource_type:
                  "image",
              },

              (
                error,
                result
              ) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

          uploadStream.end(buffer);
        }
      );

    return {
      success: true,

      data: {
        url: result.secure_url,

        publicId:
          result.public_id,
      },
    };
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error
    );

    return {
      success: false,
      message:
        "Image upload failed.",
    };
  }
}

/* =========================================================
   DELETE IMAGE
========================================================= */

export async function deleteHeroImage(
  publicId: string
) {
  try {
    if (!publicId) {
      return {
        success: false,
        message:
          "Public ID is required.",
      };
    }

    await cloudinary.uploader.destroy(
      publicId
    );

    return {
      success: true,
      message:
        "Image deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Cloudinary delete error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to delete image.",
    };
  }
}