import { NextResponse } from "next/server";
import { getUserModel } from "@/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { z } from "zod";
import { getJwtSecret } from "@/lib/runtime";
import { logAuditEvent } from "@/lib/audit";

const JWT_SECRET = getJwtSecret();

const loginSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(256),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    const User = await getUserModel();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    if (typeof user.password !== "string") {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role || "sales_crm" },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    const cookieString = serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    await logAuditEvent({
      action: "admin.login",
      entityType: "session",
      actor: {
        id: user._id.toString(),
        email: user.email,
        role: user.role || "sales_crm",
      },
      request: req,
    });

    const response = NextResponse.json({ 
      success: true, 
      user: { ...userWithoutPassword, _id: user._id.toString() } 
    });
    response.headers.set('Set-Cookie', cookieString);
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
