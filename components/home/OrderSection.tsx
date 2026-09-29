// "use client";

// import Image from "next/image";
// import { useMemo, useState } from "react";
// import {
//   Minus,
//   Plus,
//   ShoppingCart,
//   User,
//   Phone,
//   MapPin,
//   Home,
//   CheckCircle2,
// } from "lucide-react";

// type Product = {
//   id: number;
//   name: string;
//   weight: string;
//   price: number;
//   image: string;
//   badge?: string;
// };

// const products: Product[] = [
//   {
//     id: 1,
//     name: "পাড়া সন্দেশ",
//     weight: "৫০০ গ্রাম",
//     price: 400,
//     image: "/images/products/pera-sandesh.jpg",
//   },
//   {
//     id: 2,
//     name: "পাড়া সন্দেশ",
//     weight: "১ কেজি",
//     price: 800,
//     image: "/images/products/pera-sandesh.jpg",
//   },
//   {
//     id: 3,
//     name: "পাড়া সন্দেশ",
//     weight: "২ কেজি",
//     price: 1500,
//     image: "/images/products/pera-sandesh.jpg",
//     badge: "বেস্ট সেলার",
//   },
// ];

// export default function OrderSection() {
//   const [selectedProduct, setSelectedProduct] = useState<number>(1);
//   const [quantity, setQuantity] = useState<Record<number, number>>({
//     1: 1,
//     2: 1,
//     3: 1,
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     area: "",
//     city: "নওগাঁ",
//     note: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const selected = products.find((product) => product.id === selectedProduct);

//   const currentQuantity = quantity[selectedProduct] || 1;

//   const subtotal = useMemo(() => {
//     if (!selected) return 0;

//     return selected.price * currentQuantity;
//   }, [selected, currentQuantity]);

//   const deliveryCharge = subtotal >= 1000 ? 0 : 80;

//   const total = subtotal + deliveryCharge;

//   const increaseQuantity = (id: number) => {
//     setQuantity((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id: number) => {
//     setQuantity((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) - 1),
//     }));
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selected) return;

//     try {
//       setIsSubmitting(true);

//       const orderData = {
//         productId: selected.id,
//         productName: selected.name,
//         weight: selected.weight,
//         quantity: currentQuantity,
//         price: selected.price,
//         subtotal,
//         deliveryCharge,
//         total,
//         customer: formData,
//       };

//       console.log("ORDER DATA:", orderData);

//       // এখানে আপনার API call করবেন
//       //
//       // const response = await fetch("/api/orders", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify(orderData),
//       // });

//       alert("আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!");
//     } catch (error) {
//       console.error("Order error:", error);
//       alert("অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section id="order" className="bg-[#fff8e9] py-14 sm:py-16 lg:py-20">
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//         {/* ================= HEADER ================= */}

//         <div className="mb-10 text-center">
//           <span className="inline-block rounded-full bg-[#5b0909] px-4 py-1.5 text-sm font-semibold text-[#f5c400]">
//             সহজে অর্ডার করুন
//           </span>

//           <h2 className="mt-3 text-3xl font-black text-[#5b0909] sm:text-4xl">
//             আজই অর্ডার করুন
//           </h2>

//           <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6b4a3d] sm:text-base">
//             আপনার পছন্দের পাড়া সন্দেশ নির্বাচন করুন এবং নিচের ফর্মটি পূরণ করে
//             সহজেই অর্ডার সম্পন্ন করুন।
//           </p>
//         </div>

//         {/* ================= PRODUCTS ================= */}

//         <div className="mb-10">
//           <div className="mb-5">
//             <h3 className="text-xl font-bold text-[#5b0909]">
//               আপনার পণ্য নির্বাচন করুন
//             </h3>

//             <p className="mt-1 text-sm text-[#75584d]">
//               আপনার পছন্দের প্যাকেজটি নির্বাচন করুন।
//             </p>
//           </div>

//           <div className="space-y-3">
//             {products.map((product) => {
//               const isSelected = selectedProduct === product.id;
//               const productQuantity = quantity[product.id] || 1;

//               return (
//                 <div
//                   key={product.id}
//                   onClick={() => setSelectedProduct(product.id)}
//                   className={`relative cursor-pointer overflow-hidden rounded-xl border-2 p-3 transition-all duration-200 sm:p-4 ${
//                     isSelected
//                       ? "border-[#f0a900] bg-[#f1ffd0] shadow-md"
//                       : "border-[#eadfc9] bg-white hover:border-[#d9bd70]"
//                   }`}
//                 >
//                   {/* ===================================== */}
//                   {/* BADGE / RIBBON */}
//                   {/* ===================================== */}

//                   {product.badge && (
//                     <div className="pointer-events-none absolute right-[-38px] top-[12px] z-20 w-[125px] rotate-45">
//                       <div className="bg-[#ef5b3c] py-1 text-center text-[10px] font-bold leading-tight text-white shadow-md sm:text-xs">
//                         {product.badge}
//                       </div>
//                     </div>
//                   )}

//                   {/* ===================================== */}
//                   {/* PRODUCT CONTENT */}
//                   {/* ===================================== */}

//                   <div className="flex items-start gap-3 sm:items-center sm:gap-4">
//                     {/* ================================= */}
//                     {/* RADIO */}
//                     {/* ================================= */}

//                     <div className="shrink-0 pt-1 sm:pt-0">
//                       <div
//                         className={`flex h-6 w-6 items-center justify-center rounded-full border-2 sm:h-7 sm:w-7 ${
//                           isSelected
//                             ? "border-[#d9a400]"
//                             : "border-gray-300 bg-white"
//                         }`}
//                       >
//                         {isSelected && (
//                           <div className="h-3 w-3 rounded-full bg-[#d9a400] sm:h-3.5 sm:w-3.5" />
//                         )}
//                       </div>
//                     </div>

//                     {/* ================================= */}
//                     {/* PRODUCT IMAGE */}
//                     {/* ================================= */}

//                     <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-white sm:h-24 sm:w-24">
//                       <Image
//                         src={product.image}
//                         alt={product.name}
//                         fill
//                         sizes="96px"
//                         className="object-contain"
//                       />
//                     </div>

//                     {/* ================================= */}
//                     {/* PRODUCT INFO */}
//                     {/* ================================= */}

//                     <div className="min-w-0 flex-1 pr-2">
//                       {/* Product Name */}
//                       <h4 className="line-clamp-2 text-sm font-bold leading-5 text-black sm:text-xl sm:leading-7">
//                         {product.name}
//                       </h4>

//                       {/* Weight */}
//                       <p className="mt-1 text-[11px] italic leading-4 text-gray-500 sm:text-sm">
//                         Weight: {product.weight}
//                       </p>

//                       {/* Quantity + Price */}
//                       <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-4">
//                         {/* Quantity */}
//                         <div
//                           className="flex h-8 overflow-hidden rounded-md border border-gray-200 bg-white sm:h-10"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           {/* Minus */}
//                           <button
//                             type="button"
//                             onClick={() => decreaseQuantity(product.id)}
//                             className="flex w-7 items-center justify-center text-gray-600 transition hover:bg-gray-100 sm:w-10"
//                           >
//                             <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
//                           </button>

//                           {/* Quantity */}
//                           <div className="flex w-8 items-center justify-center border-x border-gray-200 text-xs font-semibold sm:w-12 sm:text-sm">
//                             {productQuantity}
//                           </div>

//                           {/* Plus */}
//                           <button
//                             type="button"
//                             onClick={() => increaseQuantity(product.id)}
//                             className="flex w-7 items-center justify-center text-gray-600 transition hover:bg-gray-100 sm:w-10"
//                           >
//                             <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
//                           </button>
//                         </div>

//                         {/* Price */}
//                         <p className="whitespace-nowrap text-base font-bold text-[#111] sm:text-xl">
//                           ৳{" "}
//                           {(product.price * productQuantity).toLocaleString(
//                             "en-BD",
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= BILLING ================= */}

//         <form onSubmit={handleSubmit}>
//           <div className="rounded-2xl border border-[#eadfc9] bg-white p-5 shadow-sm sm:p-8">
//             <div className="mb-7">
//               <h3 className="text-2xl font-black text-[#5b0909]">
//                 Billing Details
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 আপনার ডেলিভারি তথ্য প্রদান করুন।
//               </p>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
//               {/* Name */}
//               <div className="min-w-0">
//                 <label
//                   htmlFor="name"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   আপনার নাম *
//                 </label>

//                 <div className="relative">
//                   <User
//                     className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
//                     aria-hidden="true"
//                   />

//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="আপনার নাম লিখুন"
//                     className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10 sm:h-12 sm:pr-4"
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="min-w-0">
//                 <label
//                   htmlFor="phone"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   মোবাইল নম্বর *
//                 </label>

//                 <div className="relative">
//                   <Phone
//                     className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
//                     aria-hidden="true"
//                   />

//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     inputMode="tel"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="01XXXXXXXXX"
//                     className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10 sm:h-12 sm:pr-4"
//                   />
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="min-w-0 md:col-span-2">
//                 <label
//                   htmlFor="address"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   সম্পূর্ণ ঠিকানা *
//                 </label>

//                 <div className="relative">
//                   <Home
//                     className="absolute left-3 top-3.5 h-4 w-4 text-gray-400"
//                     aria-hidden="true"
//                   />

//                   <textarea
//                     id="address"
//                     name="address"
//                     required
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     rows={3}
//                     placeholder="বাড়ি/রোড/গ্রাম/মহল্লা লিখুন"
//                     className="min-h-[90px] w-full resize-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10 sm:pr-4"
//                   />
//                 </div>
//               </div>

//               {/* Note */}
//               <div className="min-w-0 md:col-span-2">
//                 <label
//                   htmlFor="note"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   অতিরিক্ত নির্দেশনা
//                 </label>

//                 <textarea
//                   id="note"
//                   name="note"
//                   value={formData.note}
//                   onChange={handleInputChange}
//                   rows={2}
//                   placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
//                   className="min-h-[70px] w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-[#a70d0d] focus:ring-2 focus:ring-[#a70d0d]/10 sm:px-4"
//                 />
//               </div>
//             </div>

//             {/* ================= ORDER SUMMARY ================= */}

//             <div className="mt-8 rounded-xl bg-[#fff8e9] p-5">
//               <h4 className="mb-4 text-lg font-bold text-[#5b0909]">
//                 অর্ডার সারাংশ
//               </h4>

//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between gap-4">
//                   <span className="text-gray-600">
//                     {selected?.name} ({selected?.weight}) × {currentQuantity}
//                   </span>

//                   <span className="font-semibold">
//                     ৳ {subtotal.toLocaleString("en-BD")}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">ডেলিভারি চার্জ</span>

//                   <span className="font-semibold">
//                     {deliveryCharge === 0 ? "ফ্রি" : `৳ ${deliveryCharge}`}
//                   </span>
//                 </div>

//                 <div className="border-t border-[#e7d9bc] pt-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-lg font-bold text-[#5b0909]">
//                       সর্বমোট
//                     </span>

//                     <span className="text-2xl font-black text-[#e31b23]">
//                       ৳ {total.toLocaleString("en-BD")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ================= SUBMIT ================= */}

//             <div className="mt-6 flex justify-center">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="inline-flex min-w-[230px] items-center justify-center gap-2 rounded-lg bg-[#e31b23] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#c9141b] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                     অর্ডার হচ্ছে...
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingCart className="h-4 w-4" />
//                     অর্ডার সম্পন্ন করুন
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }



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
            আপনার পছন্দের পাড়া সন্দেশ নির্বাচন করুন এবং নিচের ফর্মটি পূরণ করে
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