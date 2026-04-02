"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  ChartBar,
  ExternalLink,
  Mail,
  PanelsTopLeft,
} from "lucide-react";

type DashboardSummary = {
  leads: {
    total: number;
    new: number;
    contacted: number;
    byStatus: Record<string, number>;
  };
  cms: Record<string, number>;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/admin/dashboard/summary");
        const payload = await res.json();

        if (!res.ok || !payload.success) {
          throw new Error(payload.error || "Failed to load dashboard summary");
        }

        setSummary(payload.summary as DashboardSummary);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load dashboard summary";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadSummary();
  }, []);

  const cards = useMemo(
    () => [
      {
        label: "Total Leads",
        value: summary?.leads.total ?? 0,
        icon: Mail,
        accent: "bg-[#eaf8df] text-[#1f7a39]",
      },
      {
        label: "New Leads",
        value: summary?.leads.new ?? 0,
        icon: BadgeCheck,
        accent: "bg-[#f4fbf1] text-[#1D2931]",
      },
      {
        label: "Pricing Plan Records",
        value: summary?.cms["pricing-plans"] ?? 0,
        icon: PanelsTopLeft,
        accent: "bg-[#eef5ff] text-[#1D2931]",
      },
      {
        label: "Settings Records",
        value: summary?.cms.settings ?? 0,
        icon: ChartBar,
        accent: "bg-[#eaf8df] text-[#1f7a39]",
      },
    ],
    [summary],
  );

  return (
    <div className="space-y-7">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-[#d7dfdb] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1f7a39]">Live</span>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-3xl font-black tracking-tight">{loading ? "..." : card.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-[#d7dfdb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">How This Admin Works</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Pages CMS</span> controls route slug and SEO metadata.
            </p>
            <p>
              <span className="font-semibold text-foreground">Leads Inbox</span> captures and manages Demo + Ask submissions.
            </p>
            <p>
              <span className="font-semibold text-foreground">Pricing CMS</span> controls Plans & Deliverables cards.
            </p>
            <p>
              <span className="font-semibold text-foreground">Forms CMS</span> controls Let&apos;s Talk form labels and messages.
            </p>
            <p>
              Visual layout and deep section structure still remain in code files under
              <code className="ml-1">src/app</code>, <code className="ml-1">src/pages</code>, and
              <code className="ml-1">src/components</code>.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-[#d7dfdb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-foreground">Quick Links</h2>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/pages"
              className="flex items-center justify-between rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold transition hover:bg-[#f4fbf1]"
            >
              Manage Pages SEO <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/admin/account-settings"
              className="flex items-center justify-between rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold transition hover:bg-[#f4fbf1]"
            >
              Update Account <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center justify-between rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold transition hover:bg-[#f4fbf1]"
            >
              Open Leads Inbox <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/admin/pricing-plans"
              className="flex items-center justify-between rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold transition hover:bg-[#f4fbf1]"
            >
              Manage Pricing Plans <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/admin/forms"
              className="flex items-center justify-between rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold transition hover:bg-[#f4fbf1]"
            >
              Manage Form Content <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
