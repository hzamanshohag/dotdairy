"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Loader2,
  Package,
  Plus,
  Trash2,
  Upload,
  X,
  Pencil,
  Save,
  Ban,
} from "lucide-react";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "@/app/api/admin/product/actions";

// ==========================================
// TYPES
// ==========================================

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  weight: string;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductManagerProps {
  initialProducts?: Product[];
}

type ProductForm = {
  name: string;
  description: string;
  price: string;
  weight: string;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  isActive: boolean;
};

const initialForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  weight: "",
  image: {
    url: "",
    publicId: "",
    alt: "",
  },
  isActive: true,
};

export default function ProductManager({
  initialProducts = [],
}: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const isEditing = editingId !== null;

  // ========================================
  // IMAGE UPLOAD
  // ========================================

  async function handleImageUpload(file: File) {
    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadProductImage(formData);

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setForm((previous) => ({
        ...previous,
        image: {
          ...previous.image,
          url: result.data.url,
          publicId: result.data.publicId,
          alt: previous.image.alt || previous.name,
        },
      }));

      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.error("Upload image error:", error);
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveImage() {
    setForm((previous) => ({
      ...previous,
      image: {
        url: "",
        publicId: "",
        alt: "",
      },
    }));
  }

  // ========================================
  // RESET / CANCEL EDIT
  // ========================================

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
  }

  // ========================================
  // START EDITING
  // ========================================

  function handleEdit(product: Product) {
    setEditingId(product._id);
    setForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      weight: product.weight ?? "",
      image: {
        url: product.image?.url ?? "",
        publicId: product.image?.publicId ?? "",
        alt: product.image?.alt ?? "",
      },
      isActive: product.isActive ?? true,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ========================================
  // CREATE / UPDATE PRODUCT
  // ========================================

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!form.name.trim()) {
      setMessage("Product name is required.");
      return;
    }

    if (!form.description.trim()) {
      setMessage("Product description is required.");
      return;
    }

    if (!form.price.trim()) {
      setMessage("Product price is required.");
      return;
    }

    if (!form.weight.trim()) {
      setMessage("Product weight is required.");
      return;
    }

    if (!form.image.url || !form.image.publicId) {
      setMessage("Please upload a product image.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: form.price.trim(),
        weight: form.weight.trim(),
        image: {
          url: form.image.url,
          publicId: form.image.publicId,
          alt: form.image.alt.trim() || form.name.trim(),
        },
        isActive: form.isActive,
      };

      if (editingId) {
        const result = await updateProduct(editingId, payload);

        if (!result.success) {
          setMessage(result.message);
          return;
        }

        setProducts((previous) =>
          previous.map((product) =>
            product._id === editingId
              ? (result.data as Product)
              : product,
          ),
        );

        setMessage("Product updated successfully.");
      } else {
        const result = await createProduct(payload);

        if (!result.success) {
          setMessage(result.message);
          return;
        }

        setProducts((previous) => [result.data as Product, ...previous]);
        setMessage("Product added successfully.");
      }

      setForm(initialForm);
      setEditingId(null);
    } catch (error) {
      console.error(
        isEditing ? "Update product error:" : "Create product error:",
        error,
      );
      setMessage(
        isEditing
          ? "Failed to update product."
          : "Failed to add product.",
      );
    } finally {
      setSaving(false);
    }
  }

  // ========================================
  // DELETE PRODUCT
  // ========================================

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(product._id);
      setMessage("");

      const result = await deleteProduct(product._id);

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setProducts((previous) =>
        previous.filter((item) => item._id !== product._id),
      );

      if (editingId === product._id) {
        setForm(initialForm);
        setEditingId(null);
      }

      setMessage("Product deleted successfully.");
    } catch (error) {
      console.error("Delete product error:", error);
      setMessage("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <Package className="h-6 w-6 text-[#d71920]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your products
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm"
          >
            {message}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* ADD / EDIT FORM */}
          <section className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {isEditing ? "Edit Product" : "Add Product"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {isEditing
                    ? "Update the product details"
                    : "Create a new product"}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                {isEditing ? (
                  <Pencil className="h-5 w-5 text-[#d71920]" />
                ) : (
                  <Plus className="h-5 w-5 text-[#d71920]" />
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Image
                </label>

                {form.image.url ? (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200">
                    <Image
                      src={form.image.url}
                      alt={form.image.alt || form.name || "Product"}
                      width={600}
                      height={450}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={saving || uploading}
                      aria-label="Remove selected image"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 shadow-md transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <label className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      Change image
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        disabled={uploading || saving}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) void handleImageUpload(file);
                          event.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <label
                    className={`flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#d71920] hover:bg-red-50 ${
                      uploading ? "pointer-events-none opacity-60" : ""
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-7 w-7 animate-spin text-[#d71920]" />
                        <span className="mt-2 text-sm text-gray-500">
                          Uploading...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-7 w-7 text-gray-400" />
                        <span className="mt-2 text-sm font-semibold text-gray-600">
                          Upload Image
                        </span>
                        <span className="mt-1 text-xs text-gray-400">
                          PNG, JPG or WEBP · Maximum 5MB
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      disabled={uploading || saving}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void handleImageUpload(file);
                        event.target.value = "";
                      }}
                    />
                  </label>
                )}
              </div>

              {/* PRODUCT NAME */}
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={form.name}
                  disabled={saving}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  placeholder="প্যারা সন্দেশ (প্রিমিয়াম)"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#d71920] focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="product-description"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="product-description"
                  value={form.description}
                  disabled={saving}
                  rows={4}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      description: event.target.value,
                    }))
                  }
                  placeholder="খাঁটি গরুর দুধ ও মানসম্মত ছানা দিয়ে তৈরি ঐতিহ্যবাহী প্যারা সন্দেশ।"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#d71920] focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                />
              </div>

              {/* PRICE + WEIGHT */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="product-price"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    id="product-price"
                    type="text"
                    value={form.price}
                    disabled={saving}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        price: event.target.value,
                      }))
                    }
                    placeholder="৬৫০ টাকা"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#d71920] focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="product-weight"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Weight
                  </label>
                  <input
                    id="product-weight"
                    type="text"
                    value={form.weight}
                    disabled={saving}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        weight: event.target.value,
                      }))
                    }
                    placeholder="৫০০ গ্রাম"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#d71920] focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* ALT TEXT */}
              <div>
                <label
                  htmlFor="product-alt"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Image Alt Text
                </label>
                <input
                  id="product-alt"
                  type="text"
                  value={form.image.alt}
                  disabled={saving}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      image: {
                        ...previous.image,
                        alt: event.target.value,
                      },
                    }))
                  }
                  placeholder="প্যারা সন্দেশ"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#d71920] focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                />
              </div>

              {/* ACTIVE STATUS */}
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  disabled={saving}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      isActive: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#d71920]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active product
                </span>
              </label>

              {/* SUBMIT / CANCEL */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d71920] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b9141a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isEditing ? "Updating Product..." : "Adding Product..."}
                    </>
                  ) : isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      Update Product
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add Product
                    </>
                  )}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={saving || uploading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                  >
                    <Ban className="h-4 w-4" />
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* PRODUCT LIST */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  All Products
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"}
                </p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                  <Package className="h-7 w-7 text-gray-300" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-700">
                  No products yet
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Add your first product using the form.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article
                    key={product._id}
                    className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${
                      editingId === product._id
                        ? "border-[#d71920] ring-1 ring-red-100"
                        : "border-gray-200"
                    }`}
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative aspect-[4/3] bg-gray-100">
                      {product.image?.url ? (
                        <Image
                          src={product.image.url}
                          alt={product.image.alt || product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-10 w-10 text-gray-300" />
                        </div>
                      )}

                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>

                      <button
                        type="button"
                        onClick={() => void handleDelete(product)}
                        disabled={deletingId === product._id || saving}
                        aria-label={`Delete ${product.name}`}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 shadow-md transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === product._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="text-sm text-gray-500">
                          {product.weight}
                        </span>
                        <span className="font-bold text-[#d71920]">
                          {product.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        disabled={saving || deletingId !== null}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d71920] px-4 py-2.5 text-sm font-semibold text-[#d71920] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Pencil className="h-4 w-4" />
                        {editingId === product._id
                          ? "Currently Editing"
                          : "Edit Product"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
