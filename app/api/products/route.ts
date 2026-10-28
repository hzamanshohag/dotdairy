
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: JSON.parse(JSON.stringify(products)),
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load products.",
        data: [],
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
