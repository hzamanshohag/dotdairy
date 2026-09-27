"use server";

import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// GET ABOUT
// ==========================================

export async function getAbout() {
  try {
    await connectDB();

    const about = await About.findOne().lean();

    if (!about) {
      return {
        success: false,
        message: "About data not found.",
        data: null,
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(about)),
    };
  } catch (error) {
    console.error("Get about error:", error);

    return {
      success: false,
      message: "Failed to load about data.",
      data: null,
    };
  }
}

// ==========================================
// UPLOAD ABOUT IMAGE
// ==========================================

export async function uploadAboutImage(formData: FormData) {
  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return {
        success: false,
        message: "No image selected.",
      };
    }

    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        message: "Please select an image.",
      };
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: "Image must be smaller than 5MB.",
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "about",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary upload failed."));
            return;
          }

          resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    return {
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    };
  } catch (error) {
    console.error("About image upload error:", error);

    return {
      success: false,
      message: "Image upload failed.",
    };
  }
}

// ==========================================
// DELETE ABOUT IMAGE
// ==========================================

export async function deleteAboutImage(publicId: string) {
  try {
    if (!publicId) {
      return {
        success: false,
        message: "Public ID is required.",
      };
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return {
        success: false,
        message: "Failed to delete image.",
      };
    }

    return {
      success: true,
      message: "Image deleted successfully.",
    };
  } catch (error) {
    console.error("Delete about image error:", error);

    return {
      success: false,
      message: "Failed to delete image.",
    };
  }
}

// ==========================================
// UPDATE ABOUT
// ==========================================

export async function updateAbout(data: {
  sectionLabel: string;
  title: string;
  highlightedTitle: string;
  descriptions: string[];

  image: {
    url: string;
    publicId: string;
    alt: string;
  };

  videoId: string;

  stats: {
    value: string;
    label: string;
  }[];

  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}) {
  try {
    await connectDB();

    const about = await About.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(about)),
      message: "About section updated successfully.",
    };
  } catch (error) {
    console.error("Update about error:", error);

    return {
      success: false,
      message: "Failed to update about section.",
    };
  }
}
