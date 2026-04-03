"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Filter, Loader2, MessageSquare, RefreshCw, Save } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";

type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "closed_won"
  | "closed_lost"
  | "spam";

type LeadFormType = "demo" | "ask";

type LeadTimelineEntry = {
  type: "created" | "status_changed" | "assigned" | "note";
  note: string;
  createdAt: string;
  by?: {
    id?: string | null;
    email?: string | null;
    role?: string | null;
  };
};

type LeadRecord = {
  _id: unknown;
  formType: LeadFormType;
  name: string;
  email: string;
  company?: string | null;
  website?: string | null;
  message: string;
  page?: string;
  locale?: string;
  status: LeadStatus;
  assigneeId?: string | null;
  followUpAt?: string | null;
  createdAt: string;
  updatedAt: string;
  timeline?: LeadTimelineEntry[];
};

type LeadsResponse = {
  success?: boolean;
  error?: string;
  leads?: LeadRecord[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

type LeadDetailResponse = {
  success?: boolean;
  error?: string;
  lead?: LeadRecord;
};

type TabKey = "all" | "demo" | "ask";

const PAGE_SIZE = 25;

function getObjectId(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const maybeValue = value as { $oid?: unknown };
    if (typeof maybeValue.$oid === "string") return maybeValue.$oid;
  }
  return "";
}

function toLocalDatetimeInput(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
}

function toIsoFromLocalInput(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return date.toISOString();
}

async function readJsonSafe<T>(res: Response): Promise<T> {
  try {
    return (await res.json()) as T;
  } catch {
    return {} as T;
  }
}

export default function LeadsAdminPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [tab, setTab] = useState<TabKey>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [savingDetail, setSavingDetail] = useState(false);

  const [detailStatus, setDetailStatus] = useState<LeadStatus>("new");
  const [detailAssigneeId, setDetailAssigneeId] = useState("");
  const [detailFollowUpAt, setDetailFollowUpAt] = useState("");
  const [detailNote, setDetailNote] = useState("");

  const activeFormType = useMemo<LeadFormType | undefined>(() => {
    if (tab === "demo") return "demo";
    if (tab === "ask") return "ask";
    return undefined;
  }, [tab]);

  const loadLeads = async (showLoader = true, requestedPage = page) => {
    if (showLoader) setLoading(true);
    else setRefreshing(true);
    setError("");

    try {
      const url = new URL("/api/admin/leads", window.location.origin);
      url.searchParams.set("page", String(requestedPage));
      url.searchParams.set("pageSize", String(PAGE_SIZE));
      if (activeFormType) url.searchParams.set("formType", activeFormType);
      if (statusFilter !== "all") url.searchParams.set("status", statusFilter);
      if (search.trim().length > 0) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString(), { cache: "no-store" });
      const payload = await readJsonSafe<LeadsResponse>(res);

      if (!res.ok || !payload.success) {
        throw new Error(payload.error || "Failed to load leads");
      }

      const nextLeads = Array.isArray(payload.leads) ? payload.leads : [];
      setLeads(nextLeads);
      setTotal(payload.pagination?.total || 0);
      setTotalPages(payload.pagination?.totalPages || 1);

      if (nextLeads.length > 0) {
        const existingSelection = selectedLeadId && nextLeads.some((lead) => getObjectId(lead._id) === selectedLeadId);
        if (!existingSelection) {
          const firstId = getObjectId(nextLeads[0]._id);
          setSelectedLeadId(firstId);
          void loadLeadDetail(firstId);
        }
      } else {
        setSelectedLeadId("");
        setSelectedLead(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load leads";
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadLeadDetail = async (id: string) => {
    if (!id) return;
    setDetailLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { cache: "no-store" });
      const payload = await readJsonSafe<LeadDetailResponse>(res);

      if (!res.ok || !payload.success || !payload.lead) {
        throw new Error(payload.error || "Failed to load lead detail");
      }

      setSelectedLead(payload.lead);
      setDetailStatus(payload.lead.status);
      setDetailAssigneeId(payload.lead.assigneeId || "");
      setDetailFollowUpAt(toLocalDatetimeInput(payload.lead.followUpAt || null));
      setDetailNote("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load lead detail";
      setError(message);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    void loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, statusFilter, page]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    await loadLeads(true, 1);
  };

  const handleOpenLead = async (lead: LeadRecord) => {
    const id = getObjectId(lead._id);
    if (!id) return;
    setSelectedLeadId(id);
    await loadLeadDetail(id);
  };

  const handleSaveLead = async () => {
    if (!selectedLeadId) return;
    setSavingDetail(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        status: detailStatus,
        assigneeId: detailAssigneeId.trim().length > 0 ? detailAssigneeId.trim() : null,
        followUpAt: toIsoFromLocalInput(detailFollowUpAt),
        note: detailNote.trim() || undefined,
      };

      const res = await fetch(`/api/admin/leads/${selectedLeadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const response = await readJsonSafe<LeadDetailResponse>(res);

      if (!res.ok || !response.success) {
        throw new Error(response.error || "Failed to update lead");
      }

      setSuccess(t.leads.detail.update_success);
      await loadLeads(false);
      await loadLeadDetail(selectedLeadId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update lead";
      setError(message);
    } finally {
      setSavingDetail(false);
    }
  };

  const tabButtonClass = (value: TabKey) =>
    `rounded-xl border px-3 py-2 text-sm font-semibold transition ${
      tab === value
        ? "border-[#37C100] bg-[#f4fbf1] text-[#1f7a39]"
        : "border-[#d7dfdb] bg-white text-muted-foreground hover:bg-[#f4fbf1]"
    }`;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#d7dfdb] bg-gradient-to-r from-[#f4fbf1] via-white to-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{t.leads.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.leads.desc}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
            {t.leads.total}: <span className="font-semibold text-foreground">{total}</span>
          </div>
        </div>
      </section>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</div>}
      {success && (
        <div className="rounded-lg border border-[#b9d9a7] bg-[#f4fbf1] px-4 py-2.5 text-sm text-[#1f7a39]">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {success}
          </span>
        </div>
      )}

      <section className="rounded-2xl border border-[#d7dfdb] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button className={tabButtonClass("all")} onClick={() => { setTab("all"); setPage(1); }}>
            {t.leads.tabs.all}
          </button>
          <button className={tabButtonClass("demo")} onClick={() => { setTab("demo"); setPage(1); }}>
            {t.leads.tabs.demo}
          </button>
          <button className={tabButtonClass("ask")} onClick={() => { setTab("ask"); setPage(1); }}>
            {t.leads.tabs.ask}
          </button>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as "all" | LeadStatus); setPage(1); }}
                className="h-9 rounded-xl border border-[#d7dfdb] pl-8 pr-2 text-sm"
              >
                <option value="all">{t.leads.filters.all_statuses}</option>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="qualified">qualified</option>
                <option value="closed_won">closed_won</option>
                <option value="closed_lost">closed_lost</option>
                <option value="spam">spam</option>
              </select>
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.leads.filters.search_placeholder}
                className="h-9 w-[230px] rounded-xl border border-[#d7dfdb] px-3 text-sm"
              />
              <button type="submit" className="rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold hover:bg-[#f4fbf1]">
                {t.common.search}
              </button>
            </form>
            <button
              onClick={() => void loadLeads(false)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-[#d7dfdb] px-3 py-2 text-sm font-semibold hover:bg-[#f4fbf1] disabled:opacity-60"
            >
              {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {t.leads.filters.refresh}
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <section className="rounded-2xl border border-[#d7dfdb] bg-white p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-left text-xs font-bold uppercase tracking-[0.11em] text-muted-foreground">
                  <th className="px-2 py-2">{t.leads.table.type}</th>
                  <th className="px-2 py-2">{t.leads.table.name}</th>
                  <th className="px-2 py-2">{t.leads.table.email}</th>
                  <th className="px-2 py-2">{t.leads.table.status}</th>
                  <th className="px-2 py-2">{t.leads.table.created}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-2 py-10 text-center text-muted-foreground">
                      {t.leads.table.loading}
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-2 py-10 text-center text-muted-foreground">
                      {t.leads.table.empty}
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const id = getObjectId(lead._id);
                    const selected = id === selectedLeadId;
                    return (
                      <tr
                        key={id || `${lead.email}-${lead.createdAt}`}
                        onClick={() => void handleOpenLead(lead)}
                        className={`cursor-pointer border-b border-[#f1f3f5] transition ${
                          selected ? "bg-[#f4fbf1]" : "hover:bg-[#f9fafb]"
                        }`}
                      >
                        <td className="px-2 py-3 font-semibold uppercase">{lead.formType}</td>
                        <td className="px-2 py-3">{lead.name}</td>
                        <td className="px-2 py-3">{lead.email}</td>
                        <td className="px-2 py-3">{lead.status}</td>
                        <td className="px-2 py-3">{new Date(lead.createdAt).toLocaleString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#e5e7eb] pt-3 text-sm">
            <p className="text-muted-foreground">
              {t.common.page_of.replace("{page}", String(page)).replace("{total}", String(Math.max(totalPages, 1)))}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-lg border border-[#d7dfdb] px-3 py-1.5 font-semibold hover:bg-[#f4fbf1] disabled:opacity-50"
              >
                {t.common.prev}
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="rounded-lg border border-[#d7dfdb] px-3 py-1.5 font-semibold hover:bg-[#f4fbf1] disabled:opacity-50"
              >
                {t.common.next}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#d7dfdb] bg-white p-4 shadow-sm">
          {detailLoading ? (
            <div className="py-16 text-center text-sm text-muted-foreground">{t.leads.detail.loading}</div>
          ) : !selectedLead ? (
            <div className="py-16 text-center text-sm text-muted-foreground">{t.leads.detail.select_placeholder}</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{t.leads.detail.summary_title}</p>
                <h3 className="mt-1 text-lg font-black">{selectedLead.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {selectedLead.formType} • {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>

              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.leads.detail.status}</span>
                <select
                  value={detailStatus}
                  onChange={(e) => setDetailStatus(e.target.value as LeadStatus)}
                  className="h-10 w-full rounded-xl border border-[#d7dfdb] px-3"
                >
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="qualified">qualified</option>
                  <option value="closed_won">closed_won</option>
                  <option value="closed_lost">closed_lost</option>
                  <option value="spam">spam</option>
                </select>
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.leads.detail.assignee}</span>
                <input
                  value={detailAssigneeId}
                  onChange={(e) => setDetailAssigneeId(e.target.value)}
                  placeholder={t.leads.detail.assignee_placeholder}
                  className="h-10 w-full rounded-xl border border-[#d7dfdb] px-3"
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.leads.detail.follow_up}</span>
                <input
                  type="datetime-local"
                  value={detailFollowUpAt}
                  onChange={(e) => setDetailFollowUpAt(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#d7dfdb] px-3"
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t.leads.detail.note}
                </span>
                <textarea
                  value={detailNote}
                  onChange={(e) => setDetailNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-[#d7dfdb] p-3"
                />
              </label>

              <button
                onClick={() => void handleSaveLead()}
                disabled={savingDetail}
                className="inline-flex items-center gap-2 rounded-xl bg-[#37C100] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#2d9802] disabled:opacity-60"
              >
                {savingDetail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" /> {t.leads.detail.save_btn}
                  </>
                )}
              </button>

              <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
                <p className="mb-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" /> {t.leads.detail.message}
                </p>
                <p className="whitespace-pre-wrap text-sm">{selectedLead.message}</p>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{t.leads.detail.timeline}</p>
                <div className="max-h-[220px] space-y-2 overflow-y-auto pr-1">
                  {(selectedLead.timeline || []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.leads.detail.no_timeline}</p>
                  ) : (
                    (selectedLead.timeline || []).map((entry, index) => (
                      <div key={`${entry.type}-${entry.createdAt}-${index}`} className="rounded-lg border border-[#eef2f7] p-2.5 text-xs">
                        <p className="font-semibold uppercase tracking-[0.08em] text-[#1D2931]">
                          {entry.type}
                        </p>
                        <p className="mt-1 text-sm text-[#374151]">{entry.note}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleString()} • {entry.by?.email || "system"}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
