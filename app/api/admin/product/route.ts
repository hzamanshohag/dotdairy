import { NextResponse } from "next/server";

import {
  createProduct,
  getProducts,
} from "./actions";

// ==========================================
// GET
// ==========================================

export async function GET() {
  try {
    const result = await getProducts();

    return NextResponse.json(
      result,
      {
        status: result.success
          ? 200
          : 500,
      },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/product error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load products.",
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// POST
// ==========================================

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    const result =
      await createProduct(body);

    return NextResponse.json(
      result,
      {
        status: result.success
          ? 201
          : 400,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/admin/product error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create product.",
      },
      {
        status: 500,
      },
    );
  }
}