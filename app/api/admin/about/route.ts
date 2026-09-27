import { NextResponse } from "next/server";

import About from "@/models/About";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const about = await About.findOne().lean();

    if (!about) {
      return NextResponse.json(
        {
          success: false,
          message: "About data not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: about,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/about error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch About data.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
