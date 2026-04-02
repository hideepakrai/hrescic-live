import { NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/auth";
import { getLeadModel, getCmsCollectionModel } from "@/models";
import { LEAD_STATUSES } from "@/lib/leads";
import { CMS_COLLECTIONS } from "@/lib/cms";

export async function GET() {
  const authResult = await authorizeAdmin(["super_admin", "content_manager", "sales_crm"]);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const Lead = await getLeadModel();

    const [totalLeads, newLeads, contactedLeads] = await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
    ]);

    const byStatus: Record<string, number> = {};
    await Promise.all(
      LEAD_STATUSES.map(async (status) => {
        byStatus[status] = await Lead.countDocuments({ status });
      }),
    );

    const cmsCounts: Record<string, number> = {};
    await Promise.all(
      CMS_COLLECTIONS.map(async (collection) => {
        const Collection = await getCmsCollectionModel(collection);
        cmsCounts[collection] = await Collection.countDocuments({});
      }),
    );

    return NextResponse.json({
      success: true,
      summary: {
        leads: {
          total: totalLeads,
          new: newLeads,
          contacted: contactedLeads,
          byStatus,
        },
        cms: cmsCounts,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard summary:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch summary" }, { status: 500 });
  }
}
