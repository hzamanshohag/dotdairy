"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  productId: string;
  price: string;
}

function getPrice(price: string): number {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  const converted = price.replace(/[০-৯]/g, (digit) => {
    return englishDigits[banglaDigits.indexOf(digit)];
  });

  const numericPrice = converted.replace(/[^0-9.]/g, "");

  const parsedPrice = Number(numericPrice);

  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

export default function QuantitySelector({
  productId,
  price,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const unitPrice = getPrice(price);

  const totalPrice = unitPrice * quantity;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {/* Quantity */}
      <input type="hidden" name={`qty-${productId}`} value={quantity} />

      {/* Total price */}
      <input type="hidden" name={`total-${productId}`} value={totalPrice} />

      <div className="flex items-center gap-3">
        {/* Quantity Selector */}

        <div className="flex h-8 overflow-hidden rounded-md border border-gray-200 bg-white sm:h-10">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex w-8 items-center justify-center text-gray-700 transition hover:bg-gray-100 active:bg-gray-200 sm:w-10"
          >
            −
          </button>

          <div className="flex w-9 items-center justify-center border-x border-gray-200 text-xs font-semibold sm:w-12 sm:text-sm">
            {quantity}
          </div>

          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="flex w-8 items-center justify-center text-gray-700 transition hover:bg-gray-100 active:bg-gray-200 sm:w-10"
          >
            +
          </button>
        </div>

        {/* Updated Price */}

        <div className="text-sm font-semibold text-gray-900">
          ৳ {totalPrice} টাকা
        </div>
      </div>
    </div>
  );
}
