import { NextResponse } from "next/server";
import { getUserModel } from "@/models";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const User = await getUserModel();
    const email = "admin@hrescic.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const now = new Date();
    await User.updateOne(
      { email },
      {
        $set: {
          name: "Super Admin",
          role: "super_admin",
          password: hashedPassword,
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Admin credentials have been created or reset successfully.",
      credentials: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error("Failed to setup admin:", error);
    return NextResponse.json(
      { success: false, error: "Failed to setup admin" },
      { status: 500 }
    );
  }
}
