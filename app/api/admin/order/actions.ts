"use server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

import type { OrderStatus } from "@/models/Order";

// ==========================================
// TYPES
// ==========================================

export interface CreateOrderInput {
  productId: string;

  quantity: number;

  customer: {
    name: string;
    phone: string;
    address: string;
    note?: string;
  };
}

// ==========================================
// ORDER TYPE
// ==========================================

export interface OrderType {
  _id: string;

  productId: string;

  productName: string;

  weight: string;

  quantity: number;

  price: string;

  totalPrice: number;

  customer: {
    name: string;
    phone: string;
    address: string;
    note: string;
  };

  status: OrderStatus;

  createdAt: string;

  updatedAt: string;
}

// ==========================================
// RESULT TYPES
// ==========================================

export type GetOrdersResult =
  | {
      success: true;
      data: OrderType[];
    }
  | {
      success: false;
      message: string;
      data: OrderType[];
    };

export type OrderActionResult =
  | {
      success: true;
      data: OrderType;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export type SimpleOrderResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

// ==========================================
// PRICE HELPER
// ==========================================

function getNumericPrice(price: string): number {
  if (!price) {
    return 0;
  }

  // Convert Bangla numbers to English numbers
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  const convertedPrice = price.replace(
    /[০-৯]/g,
    (digit) => englishDigits[banglaDigits.indexOf(digit)],
  );

  // Remove currency symbols and other characters
  const numericPrice = convertedPrice.replace(/[^0-9.]/g, "");

  const parsedPrice = Number(numericPrice);

  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

// ==========================================
// CREATE ORDER
// ==========================================

export async function createOrder(
  data: CreateOrderInput,
): Promise<OrderActionResult> {
  try {
    await connectDB();

    // --------------------------------------
    // VALIDATION
    // --------------------------------------

    if (!data?.productId) {
      return {
        success: false,
        message: "Product is required.",
      };
    }

    if (
      !data.quantity ||
      data.quantity < 1 ||
      !Number.isInteger(data.quantity)
    ) {
      return {
        success: false,
        message: "Invalid quantity.",
      };
    }

    if (!data.customer?.name?.trim()) {
      return {
        success: false,
        message: "Customer name is required.",
      };
    }

    if (!data.customer?.phone?.trim()) {
      return {
        success: false,
        message: "Phone number is required.",
      };
    }

    if (!data.customer?.address?.trim()) {
      return {
        success: false,
        message: "Address is required.",
      };
    }

    // --------------------------------------
    // GET PRODUCT
    // --------------------------------------

    const product = await Product.findById(data.productId).lean();

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    // --------------------------------------
    // CHECK PRODUCT STATUS
    // --------------------------------------

    if (product.isActive === false) {
      return {
        success: false,
        message: "This product is currently unavailable.",
      };
    }

    // --------------------------------------
    // GET PRODUCT PRICE
    // --------------------------------------

    const unitPrice = getNumericPrice(product.price);

    if (unitPrice <= 0) {
      return {
        success: false,
        message: "Invalid product price.",
      };
    }

    // --------------------------------------
    // CALCULATE TOTAL PRICE
    // --------------------------------------
    //
    // totalPrice = quantity × price
    //
    // Example:
    // price = 500
    // quantity = 3
    // totalPrice = 1500
    //
    // --------------------------------------

    const totalPrice = unitPrice * data.quantity;

    // --------------------------------------
    // CREATE ORDER
    // --------------------------------------

    const order = await Order.create({
      productId: product._id.toString(),

      productName: product.name,

      weight: product.weight,

      quantity: data.quantity,

      price: product.price,

      totalPrice,

      customer: {
        name: data.customer.name.trim(),

        phone: data.customer.phone.trim(),

        address: data.customer.address.trim(),

        note: data.customer.note?.trim() || "",
      },

      // New orders always start as pending
      status: "pending",
    });

    // --------------------------------------
    // RETURN ORDER
    // --------------------------------------

    return {
      success: true,

      data: JSON.parse(JSON.stringify(order)),

      message: "অর্ডার সফলভাবে গ্রহণ করা হয়েছে।",
    };
  } catch (error) {
    console.error("Create order error:", error);

    return {
      success: false,

      message: "অর্ডার তৈরি করতে সমস্যা হয়েছে।",
    };
  }
}

// ==========================================
// GET ALL ORDERS
// ==========================================

export async function getOrders(): Promise<GetOrdersResult> {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return {
      success: true,

      data: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    console.error("Get orders error:", error);

    return {
      success: false,

      message: "Failed to load orders.",

      data: [],
    };
  }
}

// ==========================================
// GET SINGLE ORDER
// ==========================================

export async function getOrder(id: string): Promise<OrderActionResult> {
  try {
    await connectDB();

    if (!id) {
      return {
        success: false,
        message: "Order ID is required.",
      };
    }

    const order = await Order.findById(id).lean();

    if (!order) {
      return {
        success: false,

        message: "Order not found.",
      };
    }

    return {
      success: true,

      data: JSON.parse(JSON.stringify(order)),

      message: "Order loaded successfully.",
    };
  } catch (error) {
    console.error("Get order error:", error);

    return {
      success: false,

      message: "Failed to load order.",
    };
  }
}

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<OrderActionResult> {
  try {
    await connectDB();

    // --------------------------------------
    // VALIDATE ID
    // --------------------------------------

    if (!id) {
      return {
        success: false,

        message: "Order ID is required.",
      };
    }

    // --------------------------------------
    // VALID STATUSES
    // --------------------------------------

    const allowedStatuses: OrderStatus[] = [
      "pending",
      "approved",
      "delivered",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return {
        success: false,

        message: "Invalid order status.",
      };
    }

    // --------------------------------------
    // UPDATE STATUS
    // --------------------------------------

    const order = await Order.findByIdAndUpdate(
      id,

      {
        $set: {
          status,
        },
      },

      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!order) {
      return {
        success: false,

        message: "Order not found.",
      };
    }

    return {
      success: true,

      data: JSON.parse(JSON.stringify(order)),

      message: `Order status changed to ${status}.`,
    };
  } catch (error) {
    console.error("Update order status error:", error);

    return {
      success: false,

      message: "Failed to update order status.",
    };
  }
}

// ==========================================
// DELETE ORDER
// ==========================================

export async function deleteOrder(id: string): Promise<SimpleOrderResult> {
  try {
    await connectDB();

    // --------------------------------------
    // VALIDATE ID
    // --------------------------------------

    if (!id) {
      return {
        success: false,

        message: "Order ID is required.",
      };
    }

    // --------------------------------------
    // FIND ORDER
    // --------------------------------------

    const order = await Order.findById(id);

    if (!order) {
      return {
        success: false,

        message: "Order not found.",
      };
    }

    // --------------------------------------
    // DELETE ORDER
    // --------------------------------------

    await Order.findByIdAndDelete(id);

    return {
      success: true,

      message: "Order deleted successfully.",
    };
  } catch (error) {
    console.error("Delete order error:", error);

    return {
      success: false,

      message: "Failed to delete order.",
    };
  }
}
