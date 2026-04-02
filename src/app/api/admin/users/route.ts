import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { authorizeAdmin, AdminRole } from "@/lib/auth";
import { getUserModel } from "@/models";
import { logAuditEvent } from "@/lib/audit";
import { z } from "zod";

function isRole(value: unknown): value is AdminRole {
  return value === "super_admin" || value === "content_manager" || value === "sales_crm";
}

function createRandomPassword(length = 12): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%";
  let output = "";
  for (let i = 0; i < length; i += 1) {
    output += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return output;
}

const createUserSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  role: z.enum(["super_admin", "content_manager", "sales_crm"]).optional(),
  password: z.string().min(8).max(256).optional(),
});

const updateUserSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["super_admin", "content_manager", "sales_crm"]).optional(),
  name: z.string().trim().min(1).max(120).optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const User = await getUserModel();
    const users = await User.find({}).sort({ createdAt: -1 }).toArray();

    const safeUsers = users.map(({ password, ...rest }) => rest);
    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const rawBody = await req.json();
    const parsed = createUserSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid user payload" }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const name = parsed.data.name.trim();
    const role = parsed.data.role || "sales_crm";
    const rawPassword =
      typeof parsed.data.password === "string" && parsed.data.password.trim().length >= 8
        ? parsed.data.password
        : createRandomPassword();

    const User = await getUserModel();
    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(rawPassword, 10);
    const now = new Date();

    const result = await User.insertOne({
      name,
      email,
      role,
      password: hashed,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    await logAuditEvent({
      action: "user.created",
      entityType: "user",
      entityId: result.insertedId.toString(),
      details: { role, email },
      actor: authResult.auth,
      request: req,
    });

    return NextResponse.json({
      success: true,
      userId: result.insertedId.toString(),
      generatedPassword: rawPassword,
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const authResult = await authorizeAdmin(["super_admin"]);
  if (!authResult.ok || !authResult.auth) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const rawBody = await req.json();
    const parsed = updateUserSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid update payload" }, { status: 400 });
    }

    const body = parsed.data;

    if (!ObjectId.isValid(body.id)) {
      return NextResponse.json({ success: false, error: "Valid user id is required" }, { status: 400 });
    }

    const setPayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.role && isRole(body.role)) {
      setPayload.role = body.role;
    }

    if (typeof body.name === "string" && body.name.trim().length > 0) {
      setPayload.name = body.name.trim();
    }

    if (typeof body.isActive === "boolean") {
      setPayload.isActive = body.isActive;
    }

    if (Object.keys(setPayload).length === 1) {
      return NextResponse.json({ success: false, error: "No update payload provided" }, { status: 400 });
    }

    const User = await getUserModel();
    const result = await User.findOneAndUpdate(
      { _id: new ObjectId(body.id) },
      { $set: setPayload },
      { returnDocument: "after" },
    );

    if (!result) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    await logAuditEvent({
      action: "user.updated",
      entityType: "user",
      entityId: body.id,
      details: { patchKeys: Object.keys(setPayload) },
      actor: authResult.auth,
      request: req,
    });

    const { password, ...safeUser } = result;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}
