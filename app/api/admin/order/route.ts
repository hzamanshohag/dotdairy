import { NextRequest, NextResponse } from "next/server";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "./actions";

import type { OrderStatus } from "@/models/Order";

// ==========================================
// GET ORDERS
// ==========================================

export async function GET() {
  try {
    const result = await getOrders();

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    console.error("GET /api/admin/order error:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to load orders.",

        data: [],
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// CREATE ORDER
// ==========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await createOrder(body);

    return NextResponse.json(result, {
      status: result.success ? 201 : 400,
    });
  } catch (error) {
    console.error("POST /api/admin/order error:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Invalid order request.",
      },
      {
        status: 400,
      },
    );
  }
}

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { id, status } = body as {
      id?: string;
      status?: OrderStatus;
    };

    if (!id) {
      return NextResponse.json(
        {
          success: false,

          message: "Order ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!status) {
      return NextResponse.json(
        {
          success: false,

          message: "Order status is required.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await updateOrderStatus(id, status);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error("PATCH /api/admin/order error:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to update order.",
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// DELETE ORDER
// ==========================================

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,

          message: "Order ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await deleteOrder(id);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error("DELETE /api/admin/order error:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to delete order.",
      },
      {
        status: 500,
      },
    );
  }
}
