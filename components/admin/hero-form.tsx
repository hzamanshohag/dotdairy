"use client";

import Image from "next/image";
import {
  useState,
  useTransition,
} from "react";

import {
  Upload,
  Trash2,
  Save,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import {
  deleteHeroImage,
  updateHero,
  uploadHeroImage,
} from "@/app/api/admin/hero/actions";



/* =========================================================
   TYPES
========================================================= */

interface HeroImage {
  url: string;
  publicId: string;
  alt: string;
}

interface HeroData {
  locationText: string;
  title: string;
  highlightedTitle: string;
  description: string;
  orderButtonText: string;
  aboutButtonText: string;
  trustItems: string[];
  images: HeroImage[];
}

interface HeroFormProps {
  hero: HeroData;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function HeroForm({
  hero,
}: HeroFormProps) {
  const [isPending, startTransition] =
    useTransition();

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] =
    useState<HeroData>({
      locationText:
        hero.locationText,

      title:
        hero.title,

      highlightedTitle:
        hero.highlightedTitle,

      description:
        hero.description,

      orderButtonText:
        hero.orderButtonText,

      aboutButtonText:
        hero.aboutButtonText,

      trustItems:
        hero.trustItems,

      images:
        hero.images,
    });

  /* =======================================================
     UPDATE TEXT
  ======================================================= */

  const updateField = (
    field: keyof HeroData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =======================================================
     TRUST ITEMS
  ======================================================= */

  const addTrustItem = () => {
    setForm((prev) => ({
      ...prev,

      trustItems: [
        ...prev.trustItems,
        "",
      ],
    }));
  };

  const updateTrustItem = (
    index: number,
    value: string
  ) => {
    setForm((prev) => {
      const trustItems = [
        ...prev.trustItems,
      ];

      trustItems[index] = value;

      return {
        ...prev,
        trustItems,
      };
    });
  };

  const removeTrustItem = (
    index: number
  ) => {
    setForm((prev) => ({
      ...prev,

      trustItems:
        prev.trustItems.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* =======================================================
     UPLOAD IMAGE
  ======================================================= */

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select an image."
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Image must be smaller than 5MB."
      );

      return;
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const result =
        await uploadHeroImage(
          formData
        );

      if (
        !result.success ||
        !result.data
      ) {
        alert(
          result.message ||
            "Upload failed."
        );

        return;
      }

      setForm((prev) => ({
        ...prev,

        images: [
          ...prev.images,

          {
            url:
              result.data.url,

            publicId:
              result.data.publicId,

            alt: "",
          },
        ],
      }));
    } catch (error) {
      console.error(error);

      alert(
        "Image upload failed."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  /* =======================================================
     DELETE IMAGE
  ======================================================= */

  const handleDeleteImage =
    async (index: number) => {
      const image =
        form.images[index];

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this image?"
        );

      if (!confirmed) {
        return;
      }

      try {
        const result =
          await deleteHeroImage(
            image.publicId
          );

        if (!result.success) {
          alert(
            result.message ||
              "Delete failed."
          );

          return;
        }

        setForm((prev) => ({
          ...prev,

          images:
            prev.images.filter(
              (_, i) =>
                i !== index
            ),
        }));
      } catch (error) {
        console.error(error);

        alert(
          "Failed to delete image."
        );
      }
    };

  /* =======================================================
     UPDATE IMAGE ALT
  ======================================================= */

  const updateImageAlt = (
    index: number,
    value: string
  ) => {
    setForm((prev) => {
      const images = [
        ...prev.images,
      ];

      images[index] = {
        ...images[index],
        alt: value,
      };

      return {
        ...prev,
        images,
      };
    });
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSubmit = () => {
    startTransition(async () => {
      const result =
        await updateHero({
          ...form,

          trustItems:
            form.trustItems.filter(
              (item) =>
                item.trim() !== ""
            ),
        });

      if (result.success) {
        alert(
          "Hero section updated successfully!"
        );
      } else {
        alert(
          result.message ||
            "Something went wrong."
        );
      }
    });
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* HERO CONTENT */}
      {/* ================================================= */}

      <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Hero Content
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Edit the text displayed on your homepage.
          </p>
        </div>

        <div className="space-y-5">

          {/* Location */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Location Text
            </label>

            <input
              value={
                form.locationText
              }
              onChange={(e) =>
                updateField(
                  "locationText",
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="নওগাঁ জেলার বিখ্যাত"
            />
          </div>

          {/* Main title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Main Title
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                updateField(
                  "title",
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="নওগাঁর ঐতিহ্যবাহী"
            />
          </div>

          {/* Highlight */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Highlighted Title
            </label>

            <input
              value={
                form.highlightedTitle
              }
              onChange={(e) =>
                updateField(
                  "highlightedTitle",
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="পাড়া সন্দেশ"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              value={
                form.description
              }
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              rows={4}
              className="w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="Hero description..."
            />
          </div>

          {/* Buttons */}

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Order Button
              </label>

              <input
                value={
                  form.orderButtonText
                }
                onChange={(e) =>
                  updateField(
                    "orderButtonText",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                About Button
              </label>

              <input
                value={
                  form.aboutButtonText
                }
                onChange={(e) =>
                  updateField(
                    "aboutButtonText",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* TRUST ITEMS */}
      {/* ================================================= */}

      <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-6 flex items-center justify-between gap-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Trust Items
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage the trust points shown below the buttons.
            </p>
          </div>

          <button
            type="button"
            onClick={
              addTrustItem
            }
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />

            Add
          </button>

        </div>

        <div className="space-y-3">

          {form.trustItems.map(
            (item, index) => (
              <div
                key={index}
                className="flex gap-2"
              >

                <input
                  value={item}
                  onChange={(e) =>
                    updateTrustItem(
                      index,
                      e.target.value
                    )
                  }
                  className="flex-1 rounded-lg border px-4 py-3 outline-none transition focus:border-red-500"
                  placeholder="খাঁটি দুধ"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeTrustItem(
                      index
                    )
                  }
                  className="rounded-lg border px-3 text-red-500 transition hover:bg-red-50"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>
            )
          )}

        </div>
      </section>

      {/* ================================================= */}
      {/* IMAGES */}
      {/* ================================================= */}

      <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Hero Images
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload and manage your hero carousel images.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">

            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />

                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />

                Upload Image
              </>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={
                handleUpload
              }
              className="hidden"
            />
          </label>

        </div>

        {form.images.length ===
        0 ? (
          <div className="rounded-xl border-2 border-dashed p-10 text-center text-gray-500">
            No hero images uploaded.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {form.images.map(
              (image, index) => (
                <div
                  key={
                    image.publicId
                  }
                  className="overflow-hidden rounded-xl border bg-gray-50"
                >

                  {/* Image */}

                  <div className="relative aspect-square">

                    <Image
                      src={
                        image.url
                      }
                      alt={
                        image.alt ||
                        "Hero image"
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain"
                    />

                    {/* Number */}

                    <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                      Image{" "}
                      {index + 1}
                    </div>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteImage(
                          index
                        )
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                  {/* Alt */}

                  <div className="p-4">

                    <label className="mb-2 block text-xs font-semibold text-gray-600">
                      Alt Text
                    </label>

                    <input
                      value={
                        image.alt
                      }
                      onChange={(e) =>
                        updateImageAlt(
                          index,
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:border-red-500"
                      placeholder="Image alt text"
                    />

                  </div>
                </div>
              )
            )}

          </div>
        )}
      </section>

      {/* ================================================= */}
      {/* SAVE BUTTON */}
      {/* ================================================= */}

      <div className="sticky bottom-4 z-50 flex justify-end">

        <button
          type="button"
          onClick={
            handleSubmit
          }
          disabled={
            isPending ||
            uploading
          }
          className="inline-flex items-center gap-2 rounded-xl bg-[#ed1c24] px-6 py-3 font-bold text-white shadow-xl transition hover:bg-[#c9141b] disabled:cursor-not-allowed disabled:opacity-60"
        >

          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />

              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />

              Save Changes
            </>
          )}

        </button>

      </div>
    </div>
  );
}