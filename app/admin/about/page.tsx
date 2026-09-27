"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  Upload,
  Save,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

import {
  deleteAboutImage,
  getAbout,
  updateAbout,
  uploadAboutImage,
} from "@/app/api/admin/about/actions";

interface AboutForm {
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
}

const defaultForm: AboutForm = {
  sectionLabel: "আমাদের সম্পর্কে",

  title: "নওগাঁর বিখ্যাত",

  highlightedTitle: "পাড়া সন্দেশ",

  descriptions: [
    "নওগাঁর ঐতিহ্যবাহী পাড়া সন্দেশ তার অনন্য স্বাদ ও গুণমানের জন্য পরিচিত।",
  ],

  image: {
    url: "",
    publicId: "",
    alt: "",
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
  ],
};

const icons = ["Award", "Heart", "Leaf", "ShieldCheck", "PackageCheck"];

export default function AboutAdminPage() {
  const [form, setForm] = useState<AboutForm>(defaultForm);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // ==========================================
  // LOAD ABOUT
  // ==========================================

  useEffect(() => {
    async function loadAbout() {
      try {
        setLoading(true);

        const result = await getAbout();

        if (!result.success) {
          throw new Error(result.message || "Failed to load About.");
        }

        if (result.data) {
          setForm({
            sectionLabel: result.data.sectionLabel || defaultForm.sectionLabel,

            title: result.data.title || defaultForm.title,

            highlightedTitle:
              result.data.highlightedTitle || defaultForm.highlightedTitle,

            descriptions: result.data.descriptions || [],

            image: {
              url: result.data.image?.url || "",
              publicId: result.data.image?.publicId || "",
              alt: result.data.image?.alt || "",
            },

            videoId: result.data.videoId || "",

            stats: result.data.stats || [],

            features: result.data.features || [],
          });
        }
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load About section.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadAbout();
  }, []);

  // ==========================================
  // BASIC INPUT
  // ==========================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // DESCRIPTION
  // ==========================================

  const updateDescription = (index: number, value: string) => {
    setForm((prev) => {
      const descriptions = [...prev.descriptions];

      descriptions[index] = value;

      return {
        ...prev,
        descriptions,
      };
    });
  };

  const addDescription = () => {
    setForm((prev) => ({
      ...prev,
      descriptions: [...prev.descriptions, ""],
    }));
  };

  const removeDescription = (index: number) => {
    setForm((prev) => ({
      ...prev,
      descriptions: prev.descriptions.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // STATS
  // ==========================================

  const updateStat = (
    index: number,
    field: "value" | "label",
    value: string,
  ) => {
    setForm((prev) => {
      const stats = [...prev.stats];

      stats[index] = {
        ...stats[index],
        [field]: value,
      };

      return {
        ...prev,
        stats,
      };
    });
  };

  const addStat = () => {
    setForm((prev) => ({
      ...prev,
      stats: [
        ...prev.stats,
        {
          value: "",
          label: "",
        },
      ],
    }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // FEATURES
  // ==========================================

  const updateFeature = (
    index: number,
    field: "title" | "description" | "icon",
    value: string,
  ) => {
    setForm((prev) => {
      const features = [...prev.features];

      features[index] = {
        ...features[index],
        [field]: value,
      };

      return {
        ...prev,
        features,
      };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        {
          title: "",
          description: "",
          icon: "Award",
        },
      ],
    }));
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      setError("");

      setMessage("");

      const formData = new FormData();

      formData.append("file", file);

      const result = await uploadAboutImage(formData);

      if (!result.success || !result.data) {
        throw new Error(result.message || "Image upload failed.");
      }

      setForm((prev) => ({
        ...prev,

        image: {
          ...prev.image,

          url: result.data!.url,

          publicId: result.data!.publicId,
        },
      }));

      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  // ==========================================
  // DELETE IMAGE
  // ==========================================

  const handleDeleteImage = async () => {
    if (!form.image.publicId) {
      setForm((prev) => ({
        ...prev,

        image: {
          ...prev.image,
          url: "",
          publicId: "",
        },
      }));

      return;
    }

    try {
      setUploading(true);

      setError("");

      const result = await deleteAboutImage(form.image.publicId);

      if (!result.success) {
        throw new Error(result.message || "Failed to delete image.");
      }

      setForm((prev) => ({
        ...prev,

        image: {
          ...prev.image,
          url: "",
          publicId: "",
        },
      }));

      setMessage("Image deleted successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to delete image.",
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);

      setError("");

      setMessage("");

      const result = await updateAbout({
        sectionLabel: form.sectionLabel.trim(),

        title: form.title.trim(),

        highlightedTitle: form.highlightedTitle.trim(),

        descriptions: form.descriptions.filter((item) => item.trim() !== ""),

        image: {
          url: form.image.url,

          publicId: form.image.publicId,

          alt: form.image.alt.trim(),
        },

        videoId: form.videoId.trim(),

        stats: form.stats,

        features: form.features,
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to update About.");
      }

      setMessage("About section updated successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to update About.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">About Section</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your About section content.
          </p>
        </div>

        {/* SUCCESS */}

        {message && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* =====================================
              BASIC INFORMATION
          ====================================== */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Section Label
                </label>

                <input
                  name="sectionLabel"
                  value={form.sectionLabel}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  YouTube Video ID
                </label>

                <input
                  name="videoId"
                  value={form.videoId}
                  onChange={handleChange}
                  placeholder="dQw4w9WgXcQ"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Highlighted Title
                </label>

                <input
                  name="highlightedTitle"
                  value={form.highlightedTitle}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
            </div>
          </section>

          {/* =====================================
              IMAGE
          ====================================== */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">About Image</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* PREVIEW */}

              <div className="relative aspect-video overflow-hidden rounded-xl border bg-gray-100">
                {form.image.url ? (
                  <img
                    src={form.image.url}
                    alt={form.image.alt || "About image"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="mb-3 h-12 w-12" />

                    <span>No image uploaded</span>
                  </div>
                )}

                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </div>

              {/* UPLOAD */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Upload Image
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-5 py-10 transition hover:border-red-400 hover:bg-red-50">
                  <Upload className="h-5 w-5" />

                  {uploading ? "Uploading..." : "Choose Image"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {form.image.url && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    disabled={uploading}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Image
                  </button>
                )}

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium">
                    Image Alt Text
                  </label>

                  <input
                    value={form.image.alt}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,

                        image: {
                          ...prev.image,

                          alt: event.target.value,
                        },
                      }))
                    }
                    placeholder="নওগাঁর পাড়া সন্দেশ"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =====================================
              DESCRIPTIONS
          ====================================== */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Descriptions</h2>

              <button
                type="button"
                onClick={addDescription}
                className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            <div className="space-y-4">
              {form.descriptions.map((description, index) => (
                <div key={index} className="flex gap-3">
                  <textarea
                    value={description}
                    onChange={(event) =>
                      updateDescription(index, event.target.value)
                    }
                    rows={4}
                    className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                    placeholder={`Description ${index + 1}`}
                  />

                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================
              STATS
          ====================================== */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Statistics</h2>

              <button
                type="button"
                onClick={addStat}
                className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" />
                Add Stat
              </button>
            </div>

            <div className="space-y-4">
              {form.stats.map((stat, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl border p-4 md:grid-cols-[1fr_2fr_auto]"
                >
                  <input
                    value={stat.value}
                    onChange={(event) =>
                      updateStat(index, "value", event.target.value)
                    }
                    placeholder="50+"
                    className="rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                  />

                  <input
                    value={stat.label}
                    onChange={(event) =>
                      updateStat(index, "label", event.target.value)
                    }
                    placeholder="বছরের ঐতিহ্য"
                    className="rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                  />

                  <button
                    type="button"
                    onClick={() => removeStat(index)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================
              FEATURES
          ====================================== */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Features</h2>

              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" />
                Add Feature
              </button>
            </div>

            <div className="space-y-5">
              {form.features.map((feature, index) => (
                <div key={index} className="relative rounded-xl border p-5">
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid gap-5 pr-12 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Title
                      </label>

                      <input
                        value={feature.title}
                        onChange={(event) =>
                          updateFeature(index, "title", event.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Icon
                      </label>

                      <select
                        value={feature.icon}
                        onChange={(event) =>
                          updateFeature(index, "icon", event.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                      >
                        {icons.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        Description
                      </label>

                      <textarea
                        value={feature.description}
                        onChange={(event) =>
                          updateFeature(
                            index,
                            "description",
                            event.target.value,
                          )
                        }
                        rows={3}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================
              SAVE
          ====================================== */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex items-center gap-2 rounded-xl bg-[#d71920] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#b9141a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save About
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
