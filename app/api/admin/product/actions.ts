"use server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

import {
  v2 as cloudinary,
  UploadApiResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// TYPES
// ==========================================

export interface ProductImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: string;
  weight: string;
  image: ProductImage;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: string;
  weight: string;
  image: ProductImage;
  isActive?: boolean;
}

// ==========================================
// GET PRODUCTS RESULT
// ==========================================

export type GetProductsResult =
  | {
      success: true;

      data: ProductType[];
    }
  | {
      success: false;

      message: string;

      data: ProductType[];
    };

// ==========================================
// IMAGE UPLOAD RESULT
// ==========================================

export type UploadProductImageResult =
  | {
      success: true;

      data: {
        url: string;

        publicId: string;
      };

      message?: string;
    }
  | {
      success: false;

      message: string;
    };

// ==========================================
// PRODUCT ACTION RESULT
// ==========================================

export type ProductActionResult =
  | {
      success: true;

      data: ProductType;

      message: string;
    }
  | {
      success: false;

      message: string;
    };

// ==========================================
// SIMPLE ACTION RESULT
// ==========================================

export type SimpleActionResult =
  | {
      success: true;

      message: string;
    }
  | {
      success: false;

      message: string;
    };

// ==========================================
// GET PRODUCTS
// ==========================================

export async function getProducts(): Promise<GetProductsResult> {
  try {
    await connectDB();

    const products = await Product.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return {
      success: true,

      data: JSON.parse(
        JSON.stringify(products),
      ),
    };
  } catch (error) {
    console.error(
      "Get products error:",
      error,
    );

    return {
      success: false,

      message:
        "Failed to load products.",

      data: [],
    };
  }
}

// ==========================================
// UPLOAD PRODUCT IMAGE
// ==========================================

export async function uploadProductImage(
  formData: FormData,
): Promise<UploadProductImageResult> {
  try {
    const file = formData.get(
      "file",
    ) as File | null;

    if (!file) {
      return {
        success: false,

        message:
          "No image selected.",
      };
    }

    if (!file.type.startsWith("image/")) {
      return {
        success: false,

        message:
          "Please select an image.",
      };
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
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
      await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder: "products",

                resource_type:
                  "image",
              },

              (
                error,
                result,
              ) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(
                    result as UploadApiResponse,
                  );
                }
              },
            );

          uploadStream.end(buffer);
        },
      );

    return {
      success: true,

      data: {
        url: result.secure_url,

        publicId:
          result.public_id,
      },

      message:
        "Image uploaded successfully.",
    };
  } catch (error) {
    console.error(
      "Product image upload error:",
      error,
    );

    return {
      success: false,

      message:
        "Image upload failed.",
    };
  }
}

// ==========================================
// DELETE PRODUCT IMAGE
// ==========================================

export async function deleteProductImage(
  publicId: string,
): Promise<SimpleActionResult> {
  try {
    if (!publicId) {
      return {
        success: false,

        message:
          "Public ID is required.",
      };
    }

    const result =
      await cloudinary.uploader.destroy(
        publicId,

        {
          resource_type:
            "image",
        },
      );

    if (
      result.result !== "ok" &&
      result.result !== "not found"
    ) {
      return {
        success: false,

        message:
          "Failed to delete image.",
      };
    }

    return {
      success: true,

      message:
        "Image deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete product image error:",
      error,
    );

    return {
      success: false,

      message:
        "Failed to delete image.",
    };
  }
}

// ==========================================
// CREATE PRODUCT
// ==========================================

export async function createProduct(
  data: ProductInput,
): Promise<ProductActionResult> {
  try {
    await connectDB();

    const product =
      await Product.create({
        name: data.name,

        description:
          data.description,

        price: data.price,

        weight: data.weight,

        image: {
          url: data.image.url,

          publicId:
            data.image.publicId,

          alt: data.image.alt,
        },

        isActive:
          data.isActive ?? true,
      });

    return {
      success: true,

      data: JSON.parse(
        JSON.stringify(product),
      ),

      message:
        "Product added successfully.",
    };
  } catch (error) {
    console.error(
      "Create product error:",
      error,
    );

    return {
      success: false,

      message:
        "Failed to add product.",
    };
  }
}

// ==========================================
// UPDATE PRODUCT
// ==========================================

export async function updateProduct(
  id: string,

  data: ProductInput,
): Promise<ProductActionResult> {
  try {
    await connectDB();

    const product =
      await Product.findByIdAndUpdate(
        id,

        {
          $set: {
            name: data.name,

            description:
              data.description,

            price: data.price,

            weight: data.weight,

            image: data.image,

            isActive:
              data.isActive ?? true,
          },
        },

        {
          new: true,

          runValidators: true,
        },
      ).lean();

    if (!product) {
      return {
        success: false,

        message:
          "Product not found.",
      };
    }

    return {
      success: true,

      data: JSON.parse(
        JSON.stringify(product),
      ),

      message:
        "Product updated successfully.",
    };
  } catch (error) {
    console.error(
      "Update product error:",
      error,
    );

    return {
      success: false,

      message:
        "Failed to update product.",
    };
  }
}

// ==========================================
// DELETE PRODUCT
// ==========================================

export async function deleteProduct(
  id: string,
): Promise<SimpleActionResult> {
  try {
    await connectDB();

    const product =
      await Product.findById(id).lean();

    if (!product) {
      return {
        success: false,

        message:
          "Product not found.",
      };
    }

    // --------------------------------------
    // DELETE CLOUDINARY IMAGE
    // --------------------------------------

    if (
      product.image?.publicId
    ) {
      try {
        await cloudinary.uploader.destroy(
          product.image.publicId,

          {
            resource_type:
              "image",
          },
        );
      } catch (imageError) {
        console.error(
          "Cloudinary delete error:",
          imageError,
        );
      }
    }

    // --------------------------------------
    // DELETE PRODUCT
    // --------------------------------------

    await Product.findByIdAndDelete(
      id,
    );

    return {
      success: true,

      message:
        "Product deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete product error:",
      error,
    );

    return {
      success: false,

      message:
        "Failed to delete product.",
    };
  }
}