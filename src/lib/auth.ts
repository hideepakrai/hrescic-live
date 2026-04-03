import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/runtime";

const JWT_SECRET = getJwtSecret();

export type AdminRole = "super_admin" | "content_manager" | "sales_crm";

export interface AuthenticatedAdmin {
  id?: string;
  email?: string;
  name?: string;
  role: AdminRole;
  rawRole?: string;
}

function normalizeRoleToken(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizeAdminRole(input: unknown): AdminRole {
  if (typeof input !== "string") {
    return "sales_crm";
  }

  const normalized = normalizeRoleToken(input);

  if (
    normalized === "super_admin" ||
    normalized === "superadmin" ||
    normalized === "admin" ||
    normalized === "hrescic_admin" ||
    normalized === "administrator" ||
    normalized === "owner" ||
    normalized.includes("owner") ||
    normalized.includes("admin")
  ) {
    return "super_admin";
  }

  if (
    normalized === "content_manager" ||
    normalized === "contentmanager" ||
    normalized === "content" ||
    normalized === "editor" ||
    normalized === "seo_manager" ||
    normalized.includes("editor") ||
    normalized.includes("content")
  ) {
    return "content_manager";
  }

  if (
    normalized === "sales_crm" ||
    normalized === "salescrm" ||
    normalized === "sales" ||
    normalized === "crm" ||
    normalized === "business_development" ||
    normalized.includes("sales") ||
    normalized.includes("crm")
  ) {
    return "sales_crm";
  }

  return "sales_crm";
}

export async function authenticateAdmin(): Promise<AuthenticatedAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id?: string;
      email?: string;
      role?: string;
    };

    return {
      id: decoded.id,
      email: decoded.email,
      role: normalizeAdminRole(decoded.role),
      rawRole: decoded.role,
    };
  } catch (e) {
    return null;
  }
}

export async function authorizeAdmin(allowedRoles?: AdminRole[]) {
  const auth = await authenticateAdmin();

  if (!auth) {
    return {
      ok: false,
      status: 401 as const,
      error: "Unauthorized",
      auth: null,
    };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(auth.role)) {
    return {
      ok: false,
      status: 403 as const,
      error: "Forbidden",
      auth,
    };
  }

  return {
    ok: true,
    status: 200 as const,
    error: null,
    auth,
  };
}
