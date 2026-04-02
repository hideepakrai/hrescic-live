import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { authenticateAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const isPublicEnabled = process.env.ENABLE_LEGACY_PUBLIC_APIS === "true";
    if (!isPublicEnabled) {
        const auth = await authenticateAdmin();
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
    }

    try {
        const client = await clientPromise;
        const db = client.db("kolp_tenant_acadivate");
        const pages = await db.collection("pages").find({}).toArray();
        return NextResponse.json({ success: true, pages });
    } catch (error) {
        console.error("Error fetching pages:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch pages" }, { status: 500 });
    }
}   
