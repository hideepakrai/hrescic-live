import { NextResponse } from "next/server";
import { getTenantsCollection } from "@/models";
import { authorizeAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await authorizeAdmin(["super_admin"]);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const Tenants = await getTenantsCollection();
    const tenants = await Tenants.find({}).toArray();
    return NextResponse.json({ success: true, tenants });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
