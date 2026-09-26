import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

type PasswordRequest = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

async function changePassword(req: Request) {
  console.log("=================================");
  console.log("CHANGE PASSWORD API CALLED");
  console.log("METHOD:", req.method);
  console.log("=================================");

  try {
    // ========================================
    // 1. Check NextAuth session
    // ========================================

    const session = await auth();

    console.log("SESSION:", session);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    // ========================================
    // 2. Read request body
    // ========================================

    let body: PasswordRequest;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request body.",
        },
        { status: 400 },
      );
    }

    const { currentPassword, newPassword, confirmPassword } = body;

    // ========================================
    // 3. Validate fields
    // ========================================

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Current password, new password and confirm password are required.",
        },
        { status: 400 },
      );
    }

    // ========================================
    // 4. Validate password length
    // ========================================

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be at least 6 characters.",
        },
        { status: 400 },
      );
    }

    // ========================================
    // 5. Confirm password
    // ========================================

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New passwords do not match.",
        },
        { status: 400 },
      );
    }

    // ========================================
    // 6. Connect MongoDB
    // ========================================

    await connectDB();

    console.log("MongoDB connected");

    // ========================================
    // 7. Get logged-in admin email
    // ========================================

    const email = session.user.email.toLowerCase().trim();

    console.log("Admin email:", email);

    // ========================================
    // 8. Find admin
    // ========================================

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("Admin not found");

      return NextResponse.json(
        {
          success: false,
          message: "Admin account not found.",
        },
        { status: 404 },
      );
    }

    console.log("Admin found:", admin._id.toString());

    // ========================================
    // 9. Make sure passwordHash exists
    // ========================================

    if (!admin.passwordHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin password is not configured.",
        },
        { status: 500 },
      );
    }

    // ========================================
    // 10. Check current password
    // ========================================

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      admin.passwordHash,
    );

    console.log("Current password match:", passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 400 },
      );
    }

    // ========================================
    // 11. Prevent same password
    // ========================================

    const samePassword = await bcrypt.compare(newPassword, admin.passwordHash);

    if (samePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from your current password.",
        },
        { status: 400 },
      );
    }

    // ========================================
    // 12. Hash new password
    // ========================================

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // ========================================
    // 13. Update password
    // ========================================

    admin.passwordHash = hashedPassword;

    await admin.save();

    console.log("PASSWORD UPDATED SUCCESSFULLY");

    // ========================================
    // 14. Success
    // ========================================

    return NextResponse.json(
      {
        success: true,
        message: "Password changed successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}

// PUT
export async function PUT(req: Request) {
  return changePassword(req);
}

// POST - optional fallback
export async function POST(req: Request) {
  return changePassword(req);
}
