import Image from "next/image";
import { redirect } from "next/navigation";

import { ShoppingCart, User, Phone, Home } from "lucide-react";

import { getProducts } from "@/app/api/admin/product/actions";

import { createOrder } from "@/app/api/admin/order/actions";

import type { ProductType } from "@/app/api/admin/product/actions";

import type { CreateOrderInput } from "@/app/api/admin/order/actions";

import QuantitySelector from "./QuantitySelector";

// ==========================================
// TYPES
// ==========================================

type OrderSectionProps = {
  searchParams?: Promise<{ order?: string }>;
};

// ==========================================
// ORDER ACTION
// ==========================================

async function submitOrder(formData: FormData) {
  "use server";

  // ========================================
  // PRODUCT
  // ========================================

  const productId = String(formData.get("productId") ?? "").trim();

  // ========================================
  // QUANTITY
  // (read from the per-product hidden input)
  // ========================================

  const rawQuantity = Number(formData.get(`qty-${productId}`) ?? 1);

  const quantity =
    Number.isFinite(rawQuantity) && rawQuantity > 0
      ? Math.floor(rawQuantity)
      : 1;

  // ========================================
  // CUSTOMER
  // ========================================

  const name = String(formData.get("name") ?? "").trim();

  const phone = String(formData.get("phone") ?? "").trim();

  const address = String(formData.get("address") ?? "").trim();

  const note = String(formData.get("note") ?? "").trim();

  // ========================================
  // VALIDATION
  // ========================================

  if (!productId || !name || !phone || !address) {
    redirect("/?order=invalid#order");
  }

  // ========================================
  // ORDER DATA
  // ========================================

  const orderData: CreateOrderInput = {
    productId,

    quantity,

    customer: {
      name,
      phone,
      address,
      note,
    },
  };

  // ========================================
  // CREATE ORDER
  // ========================================

  const result = await createOrder(orderData);

  if (!result.success) {
    console.error(result.message);

    redirect("/?order=error#order");
  }

  // redirect() must stay outside try/catch
  redirect("/?order=success#order");
}

// ==========================================
// ORDER SECTION
// ==========================================

export default async function OrderSection({
  searchParams,
}: OrderSectionProps) {
  // ========================================
  // ORDER STATUS (from redirect)
  // ========================================

  const orderStatus = (await searchParams)?.order;

  // ========================================
  // GET PRODUCTS
  // ========================================

  const productsResult = await getProducts();

  // ========================================
  // ACTIVE PRODUCTS ONLY
  // ========================================

  const products: ProductType[] = productsResult.success
    ? productsResult.data.filter((product) => product.isActive)
    : [];

  // ========================================
  // UI
  // ========================================

  return (
    <section id="order" className="bg-[#fff8e9] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#5b0909] px-4 py-1.5 text-sm font-semibold text-[#f5c400]">
            সহজে অর্ডার করুন
          </span>

          <h2 className="mt-3 text-3xl font-black text-[#5b0909] sm:text-4xl">
            আজই অর্ডার করুন
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b4a3d] sm:text-base">
            আপনার পছন্দের প্যারা সন্দেশ নির্বাচন করুন এবং নিচের ফর্মটি পূরণ করে
            সহজেই অর্ডার সম্পন্ন করুন।
          </p>
        </div>

        {/* =====================================
            ORDER RESULT MESSAGE
        ====================================== */}

        {orderStatus === "success" && (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm font-semibold text-green-700">
            আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে
            যোগাযোগ করব।
          </div>
        )}

        {orderStatus === "invalid" && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
            অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন।
          </div>
        )}

        {orderStatus === "error" && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
            অর্ডার সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
          </div>
        )}

        {/* =====================================
            NO PRODUCTS
        ====================================== */}

        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#eadfc9] bg-white p-10 text-center">
            <ShoppingCart className="mx-auto h-10 w-10 text-gray-300" />

            <p className="mt-3 text-gray-500">
              বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না।
            </p>
          </div>
        ) : (
          <form action={submitOrder}>
            {/* =================================
                PRODUCTS
            ================================== */}

            <div className="mb-10">
              <div className="mb-5">
                <h3 className="text-xl font-bold text-[#5b0909]">
                  আপনার পণ্য নির্বাচন করুন
                </h3>

                <p className="mt-1 text-sm text-[#75584d]">
                  আপনার পছন্দের প্যাকেজটি নির্বাচন করুন।
                </p>
              </div>

              <div className="space-y-3">
                {products.map((product, index) => (
                  <label
                    key={String(product._id)}
                    htmlFor={`product-${String(product._id)}`}
                    className="relative block cursor-pointer overflow-hidden rounded-xl border-2 border-[#eadfc9] bg-white p-3 transition-all duration-200 hover:border-[#d9bd70] sm:p-4"
                  >
                    {/* =========================
                          BADGE
                      ========================== */}

                    {index === 0 && (
                      <div className="pointer-events-none absolute right-[-38px] top-[12px] z-20 w-[125px] rotate-45">
                        <div className="bg-[#ef5b3c] py-1 text-center text-[10px] font-bold leading-tight text-white shadow-md sm:text-xs">
                          জনপ্রিয়
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                      {/* =======================
                            RADIO
                        ======================== */}

                      <div className="shrink-0 pt-1 sm:pt-0">
                        <input
                          id={`product-${String(product._id)}`}
                          type="radio"
                          name="productId"
                          value={String(product._id)}
                          defaultChecked={index === 0}
                          className="h-5 w-5 accent-[#d9a400] sm:h-6 sm:w-6"
                          required
                        />
                      </div>

                      {/* =======================
                            IMAGE
                        ======================== */}

                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-white sm:h-24 sm:w-24">
                        {product.image?.url ? (
                          <Image
                            src={product.image.url}
                            alt={product.image.alt || product.name}
                            fill
                            sizes="96px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      {/* =======================
                            PRODUCT INFO
                        ======================== */}

                      <div className="min-w-0 flex-1 pr-2">
                        <h4 className="line-clamp-2 text-sm font-bold leading-5 text-black sm:text-xl sm:leading-7">
                          {product.name}
                        </h4>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
                          {product.description}
                        </p>

                        <p className="mt-1 text-[11px] italic leading-4 text-gray-500 sm:text-sm">
                          Weight: {product.weight}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-3 sm:gap-5">
                          {/* =================
                                QUANTITY
                            ================== */}

                          <QuantitySelector
                            productId={String(product._id)}
                            price={product.price}
                          />

                          {/* =================
                                PRICE
                            ================== */}

                          {/* <p className="whitespace-nowrap text-base font-bold text-[#111] sm:text-xl">
                            ৳ {product.price}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* =================================
                BILLING
            ================================== */}

            <div className="rounded-2xl border border-[#eadfc9] bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-7">
                <h3 className="text-2xl font-black text-[#5b0909]">
                  Billing Details
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  আপনার ডেলিভারি তথ্য প্রদান করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                {/* =================================
                    NAME
                ================================== */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    আপনার নাম *
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="আপনার নাম লিখুন"
                      autoComplete="name"
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10"
                    />
                  </div>
                </div>

                {/* =================================
                    PHONE
                ================================== */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    মোবাইল নম্বর *
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      autoComplete="tel"
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10"
                    />
                  </div>
                </div>

                {/* =================================
                    ADDRESS
                ================================== */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    সম্পূর্ণ ঠিকানা *
                  </label>

                  <div className="relative">
                    <Home className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={3}
                      placeholder="বাড়ি/রোড/গ্রাম/মহল্লা লিখুন"
                      autoComplete="street-address"
                      className="min-h-[90px] w-full resize-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm leading-6 outline-none transition focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10"
                    />
                  </div>
                </div>

                {/* =================================
                    NOTE
                ================================== */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="note"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    অতিরিক্ত নির্দেশনা
                  </label>

                  <textarea
                    id="note"
                    name="note"
                    rows={2}
                    placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
                    className="min-h-[70px] w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10"
                  />
                </div>
              </div>

              {/* =================================
                  DELIVERY INFO
              ================================== */}

              <div className="mt-8 rounded-xl bg-[#fff8e9] p-5">
                <h4 className="mb-3 text-lg font-bold text-[#5b0909]">
                  অর্ডার সংক্রান্ত তথ্য
                </h4>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>• ১০০০ টাকার বেশি অর্ডারে ডেলিভারি চার্জ ফ্রি।</p>

                  <p>• ১০০০ টাকার কম অর্ডারে ডেলিভারি চার্জ ৳80।</p>
                </div>
              </div>

              {/* =================================
                  SUBMIT
              ================================== */}

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex min-w-[230px] items-center justify-center gap-2 rounded-lg bg-[#e31b23] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#c9141b]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  অর্ডার সম্পন্ন করুন
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
