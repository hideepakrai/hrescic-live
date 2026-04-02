"use client";

import { useEffect, useState, useMemo } from "react";
import { CheckCircle2, RefreshCw, Save, Layout, MessageSquare, HelpCircle } from "lucide-react";
import {
  DEFAULT_LETS_TALK_CONTENT,
  getCmsDocumentId,
  getCmsStatus,
  parseLetsTalkHeroContent,
  parseLetsTalkFormSectionContent,
  toLocalizedPayload,
  LETS_TALK_HERO_KEY,
  LETS_TALK_DEMO_KEY,
  LETS_TALK_ASK_KEY,
  type CmsStatus,
  type LetsTalkHeroContent,
  type LetsTalkFormSectionContent,
} from "@/lib/cms-content";

type ApiPayload = {
  success?: boolean;
  error?: string;
  items?: unknown[];
};

type AdminMePayload = {
  success?: boolean;
  error?: string;
  admin?: {
    role?: string;
    rawRole?: string | null;
  };
  permissions?: {
    canWriteFormsCms?: boolean;
    canWriteCms?: boolean;
  };
};

type FormModule = "hero" | "demo" | "ask";

const MODULES: { key: FormModule; label: string; icon: any; cmsKey: string }[] = [
  { key: "hero", label: "Hero + Contact", icon: Layout, cmsKey: LETS_TALK_HERO_KEY },
  { key: "demo", label: "Demo Form Content", icon: MessageSquare, cmsKey: LETS_TALK_DEMO_KEY },
  { key: "ask", label: "Ask Form Content", icon: HelpCircle, cmsKey: LETS_TALK_ASK_KEY },
];

async function readApiPayload(res: Response): Promise<ApiPayload> {
  try {
    return (await res.json()) as ApiPayload;
  } catch {
    return {};
  }
}

async function readAdminPayload(res: Response): Promise<AdminMePayload> {
  try {
    return (await res.json()) as AdminMePayload;
  } catch {
    return {};
  }
}

export default function FormsCmsPage() {
  const [activeModule, setActiveModule] = useState<FormModule>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [adminRawRole, setAdminRawRole] = useState("");
  const [canWriteFormsCms, setCanWriteFormsCms] = useState(true);

  // Per-module data
  const [docs, setDocs] = useState<Record<string, any>>({});
  const [heroContent, setHeroContent] = useState<LetsTalkHeroContent>({
    ...DEFAULT_LETS_TALK_CONTENT,
    contact: { ...DEFAULT_LETS_TALK_CONTENT.contact },
  });
  const [demoContent, setDemoContent] = useState<LetsTalkFormSectionContent>({
    ...DEFAULT_LETS_TALK_CONTENT.demo,
  });
  const [askContent, setAskContent] = useState<LetsTalkFormSectionContent>({
    ...DEFAULT_LETS_TALK_CONTENT.ask,
  });
  const [statuses, setStatuses] = useState<Record<string, CmsStatus>>({
    [LETS_TALK_HERO_KEY]: "published",
    [LETS_TALK_DEMO_KEY]: "published",
    [LETS_TALK_ASK_KEY]: "published",
  });

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [meRes, heroRes, demoRes, askRes] = await Promise.all([
        fetch("/api/admin/me", { cache: "no-store" }),
        fetch(`/api/admin/cms/settings?key=${LETS_TALK_HERO_KEY}&limit=1`, { cache: "no-store" }),
        fetch(`/api/admin/cms/settings?key=${LETS_TALK_DEMO_KEY}&limit=1`, { cache: "no-store" }),
        fetch(`/api/admin/cms/settings?key=${LETS_TALK_ASK_KEY}&limit=1`, { cache: "no-store" }),
      ]);

      const mePayload = await readAdminPayload(meRes);
      if (!meRes.ok || !mePayload.success) {
        throw new Error(mePayload.error || "Failed to load current admin profile");
      }

      setAdminRole(mePayload.admin?.role || "");
      setAdminRawRole(mePayload.admin?.rawRole || mePayload.admin?.role || "");
      setCanWriteFormsCms(mePayload.permissions?.canWriteFormsCms ?? mePayload.permissions?.canWriteCms ?? false);

      const heroPayload = await readApiPayload(heroRes);
      const demoPayload = await readApiPayload(demoRes);
      const askPayload = await readApiPayload(askRes);

      const newDocs: Record<string, any> = {};
      const newStatuses: Record<string, CmsStatus> = { ...statuses };

      if (heroPayload.success && Array.isArray(heroPayload.items) && heroPayload.items[0]) {
        const item = heroPayload.items[0] as any;
        newDocs[LETS_TALK_HERO_KEY] = item;
        newStatuses[LETS_TALK_HERO_KEY] = getCmsStatus(item.status);
        setHeroContent(parseLetsTalkHeroContent(item));
      }

      if (demoPayload.success && Array.isArray(demoPayload.items) && demoPayload.items[0]) {
        const item = demoPayload.items[0] as any;
        newDocs[LETS_TALK_DEMO_KEY] = item;
        newStatuses[LETS_TALK_DEMO_KEY] = getCmsStatus(item.status);
        setDemoContent(parseLetsTalkFormSectionContent(item, "demo"));
      }

      if (askPayload.success && Array.isArray(askPayload.items) && askPayload.items[0]) {
        const item = askPayload.items[0] as any;
        newDocs[LETS_TALK_ASK_KEY] = item;
        newStatuses[LETS_TALK_ASK_KEY] = getCmsStatus(item.status);
        setAskContent(parseLetsTalkFormSectionContent(item, "ask"));
      }

      setDocs(newDocs);
      setStatuses(newStatuses);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load form CMS data";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleSave = async () => {
    if (!canWriteFormsCms) return;

    setSaving(true);
    setError("");
    setSuccess("");

    const moduleInfo = MODULES.find(m => m.key === activeModule)!;
    const cmsKey = moduleInfo.cmsKey;
    const doc = docs[cmsKey];
    const docId = doc ? getCmsDocumentId(doc._id) : "";

    let dataPayload: any = {};
    if (activeModule === "hero") {
      dataPayload = {
        heroTitle: toLocalizedPayload(heroContent.heroTitle),
        heroDescription: toLocalizedPayload(heroContent.heroDescription),
        captchaLabel: toLocalizedPayload(heroContent.captchaLabel),
        contact: {
          email: heroContent.contact.email.trim(),
          phone: heroContent.contact.phone.trim(),
          location: heroContent.contact.location.trim(),
        },
      };
    } else if (activeModule === "demo") {
      dataPayload = {
        panelTitle: toLocalizedPayload(demoContent.panelTitle),
        panelDescription: toLocalizedPayload(demoContent.panelDescription),
        nameLabel: toLocalizedPayload(demoContent.nameLabel),
        emailLabel: toLocalizedPayload(demoContent.emailLabel),
        companyLabel: toLocalizedPayload(demoContent.companyLabel),
        websiteLabel: toLocalizedPayload(demoContent.websiteLabel),
        messageLabel: toLocalizedPayload(demoContent.messageLabel),
        messagePlaceholder: toLocalizedPayload(demoContent.messagePlaceholder),
        submitLabel: toLocalizedPayload(demoContent.submitLabel),
        successMessage: toLocalizedPayload(demoContent.successMessage),
        errorMessage: toLocalizedPayload(demoContent.errorMessage),
        noteText: toLocalizedPayload(demoContent.noteText),
        switchPrompt: toLocalizedPayload(demoContent.switchPrompt),
        switchLinkLabel: toLocalizedPayload(demoContent.switchLinkLabel),
      };
    } else {
      dataPayload = {
        panelTitle: toLocalizedPayload(askContent.panelTitle),
        panelDescription: toLocalizedPayload(askContent.panelDescription),
        nameLabel: toLocalizedPayload(askContent.nameLabel),
        emailLabel: toLocalizedPayload(askContent.emailLabel),
        companyLabel: toLocalizedPayload(askContent.companyLabel),
        websiteLabel: toLocalizedPayload(askContent.websiteLabel),
        messageLabel: toLocalizedPayload(askContent.messageLabel),
        messagePlaceholder: toLocalizedPayload(askContent.messagePlaceholder),
        submitLabel: toLocalizedPayload(askContent.submitLabel),
        successMessage: toLocalizedPayload(askContent.successMessage),
        errorMessage: toLocalizedPayload(askContent.errorMessage),
        noteText: toLocalizedPayload(askContent.noteText),
        switchPrompt: toLocalizedPayload(askContent.switchPrompt),
        switchLinkLabel: toLocalizedPayload(askContent.switchLinkLabel),
      };
    }

    const payload = {
      key: cmsKey,
      slug: cmsKey,
      status: statuses[cmsKey],
      title: toLocalizedPayload(`Forms CMS - ${moduleInfo.label}`),
      summary: toLocalizedPayload(`Editable content for ${moduleInfo.label}`),
      order: activeModule === "hero" ? 1 : activeModule === "demo" ? 2 : 3,
      data: dataPayload,
    };

    try {
      const endpoint = docId ? `/api/admin/cms/settings/${docId}` : "/api/admin/cms/settings";
      const method = docId ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const response = await readApiPayload(res);
      if (!res.ok || !response.success) {
        throw new Error(response.error || `Failed to save ${moduleInfo.label}`);
      }

      setSuccess(`${moduleInfo.label} saved successfully.`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#d7dfdb] bg-gradient-to-r from-[#f4fbf1] via-white to-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Forms CMS</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage Let&apos;s Talk sections independently.
            </p>
          </div>
          <div className="space-y-2 text-right text-xs">
            <div className="bg-[#37C100] hover:bg-[#2d9802] text-white px-6 py-3 rounded-full text-sm font-medium transition-all">
              Role: <span className="font-semibold text-foreground uppercase tracking-wider">{adminRawRole}</span>
            </div>
          </div>
        </div>
      </section>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-lg border border-[#b9d9a7] bg-[#f4fbf1] px-4 py-2.5 text-sm text-[#1f7a39]">{success}</div>}

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-[#d7dfdb] bg-white p-4 shadow-sm h-fit">
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-foreground">Form Sections</h2>
          <nav className="space-y-1.5">
            {MODULES.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  activeModule === m.key ? "bg-[#f4fbf1] border border-[#b9d9a7] text-[#1f7a39]" : "hover:bg-muted border border-transparent"
                }`}
              >
                <m.icon className="h-4 w-4" />
                <span className="text-sm font-bold">{m.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="rounded-2xl border border-[#d7dfdb] bg-white p-6 shadow-sm min-h-[400px]">
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e5e7eb]">
            <h2 className="text-xl font-black tracking-tight">{MODULES.find(m => m.key === activeModule)?.label}</h2>
            <select
              value={statuses[MODULES.find(m => m.key === activeModule)!.cmsKey]}
              onChange={(e) => {
                const key = MODULES.find(m => m.key === activeModule)!.cmsKey;
                setStatuses(prev => ({ ...prev, [key]: e.target.value as CmsStatus }));
              }}
              className="rounded-lg border border-border rounded-md border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold uppercase transition"
              disabled={!canWriteFormsCms}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <fieldset disabled={!canWriteFormsCms || loading} className="space-y-6">
            {activeModule === "hero" && (
              <div className="grid gap-5">
                <label className="space-y-1.5 text-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hero Title</span>
                  <input
                    value={heroContent.heroTitle}
                    onChange={(e) => setHeroContent(p => ({ ...p, heroTitle: e.target.value }))}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3 focus:outline-none focus:ring-1 focus:ring-[#37C100]/30 transition"
                  />
                </label>
                <label className="space-y-1.5 text-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hero Description</span>
                  <textarea
                    value={heroContent.heroDescription}
                    onChange={(e) => setHeroContent(p => ({ ...p, heroDescription: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3 focus:outline-none focus:ring-1 focus:ring-[#37C100]/30 transition"
                  />
                </label>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</span>
                    <input
                      value={heroContent.contact.email}
                      onChange={(e) => setHeroContent(p => ({ ...p, contact: { ...p.contact, email: e.target.value } }))}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3"
                    />
                  </label>
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone</span>
                    <input
                      value={heroContent.contact.phone}
                      onChange={(e) => setHeroContent(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3"
                    />
                  </label>
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location</span>
                    <input
                      value={heroContent.contact.location}
                      onChange={(e) => setHeroContent(p => ({ ...p, contact: { ...p.contact, location: e.target.value } }))}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3"
                    />
                  </label>
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Captcha Label</span>
                    <input
                      value={heroContent.captchaLabel}
                      onChange={(e) => setHeroContent(p => ({ ...p, captchaLabel: e.target.value }))}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3"
                    />
                  </label>
                </div>
              </div>
            )}

            {(activeModule === "demo" || activeModule === "ask") && (
              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Panel Title</span>
                    <input
                      value={activeModule === "demo" ? demoContent.panelTitle : askContent.panelTitle}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeModule === "demo") setDemoContent(p => ({ ...p, panelTitle: val }));
                        else setAskContent(p => ({ ...p, panelTitle: val }));
                      }}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3"
                    />
                  </label>
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Submit Button Label</span>
                    <input
                      value={activeModule === "demo" ? demoContent.submitLabel : askContent.submitLabel}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeModule === "demo") setDemoContent(p => ({ ...p, submitLabel: val }));
                        else setAskContent(p => ({ ...p, submitLabel: val }));
                      }}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3 font-bold"
                    />
                  </label>
                </div>
                <label className="space-y-1.5 text-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Panel Description</span>
                  <textarea
                    value={activeModule === "demo" ? demoContent.panelDescription : askContent.panelDescription}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (activeModule === "demo") setDemoContent(p => ({ ...p, panelDescription: val }));
                      else setAskContent(p => ({ ...p, panelDescription: val }));
                    }}
                    rows={2}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-3 bg-muted/20 p-4 rounded-xl">
                  <label className="space-y-1 text-sm">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Name Label</span>
                    <input
                      value={activeModule === "demo" ? demoContent.nameLabel : askContent.nameLabel}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeModule === "demo") setDemoContent(p => ({ ...p, nameLabel: val }));
                        else setAskContent(p => ({ ...p, nameLabel: val }));
                      }}
                      className="w-full rounded-lg border border-[#e5e7eb] p-2 text-xs"
                    />
                  </label>
                  <label className="space-y-1 text-sm">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Email Label</span>
                    <input
                      value={activeModule === "demo" ? demoContent.emailLabel : askContent.emailLabel}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeModule === "demo") setDemoContent(p => ({ ...p, emailLabel: val }));
                        else setAskContent(p => ({ ...p, emailLabel: val }));
                      }}
                      className="w-full rounded-lg border border-[#e5e7eb] p-2 text-xs"
                    />
                  </label>
                  {activeModule === "demo" && (
                    <label className="space-y-1 text-sm">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Company Label</span>
                      <input
                        value={demoContent.companyLabel}
                        onChange={(e) => setDemoContent(p => ({ ...p, companyLabel: e.target.value }))}
                        className="w-full rounded-lg border border-[#e5e7eb] p-2 text-xs"
                      />
                    </label>
                  )}
                </div>

                <label className="space-y-1.5 text-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Message Label</span>
                  <input
                    value={activeModule === "demo" ? demoContent.messageLabel : askContent.messageLabel}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (activeModule === "demo") setDemoContent(p => ({ ...p, messageLabel: val }));
                      else setAskContent(p => ({ ...p, messageLabel: val }));
                    }}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3"
                  />
                </label>
                <label className="space-y-1.5 text-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Message Placeholder</span>
                  <textarea
                    value={activeModule === "demo" ? demoContent.messagePlaceholder : askContent.messagePlaceholder}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (activeModule === "demo") setDemoContent(p => ({ ...p, messagePlaceholder: val }));
                      else setAskContent(p => ({ ...p, messagePlaceholder: val }));
                    }}
                    rows={2}
                    className="w-full rounded-xl border border-[#e5e7eb] p-3 text-sm italic"
                  />
                </label>

                <div className="grid gap-5 md:grid-cols-2 bg-gradient-to-br from-white to-[#f4fbf1] p-5 rounded-2xl border border-[#d7dfdb]">
                   <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1f7a39]">Success Message</span>
                    <input
                      value={activeModule === "demo" ? demoContent.successMessage : askContent.successMessage}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeModule === "demo") setDemoContent(p => ({ ...p, successMessage: val }));
                        else setAskContent(p => ({ ...p, successMessage: val }));
                      }}
                      className="w-full rounded-xl border border-[#b9d9a7] p-3 text-[#1f7a39] bg-[#f4fbf1]"
                    />
                  </label>
                  <label className="space-y-1.5 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bottom Note</span>
                    <input
                      value={activeModule === "demo" ? demoContent.noteText : askContent.noteText}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeModule === "demo") setDemoContent(p => ({ ...p, noteText: val }));
                        else setAskContent(p => ({ ...p, noteText: val }));
                      }}
                      className="w-full rounded-xl border border-[#e5e7eb] p-3"
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t border-[#e5e7eb]">
              <button
                onClick={() => void loadData()}
                disabled={loading || saving}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Reload
              </button>
              <button
                onClick={() => void handleSave()}
                disabled={loading || saving || !canWriteFormsCms}
                className="inline-flex items-center gap-2 rounded-xl bg-[#37C100] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2d9802] shadow-lg shadow-[#37C100]/20 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : (
                  <>
                    <Save className="h-4 w-4" />
                    Save {MODULES.find(m => m.key === activeModule)?.label}
                  </>
                )}
              </button>
            </div>
          </fieldset>
        </section>
      </div>

      <div className="rounded-xl border border-[#b9d9a7] bg-[#f4fbf1] p-3 text-[10px] text-[#1f7a39] font-bold uppercase tracking-widest text-center">
        <CheckCircle2 className="inline h-3 w-3 mr-2 mb-0.5" />
        Split management enabled. Section updates are now independent.
      </div>
    </div>
  );
}
