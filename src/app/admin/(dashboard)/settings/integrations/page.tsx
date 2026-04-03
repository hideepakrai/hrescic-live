"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import { 
  PlugZap, 
  BarChart3, 
  ShieldCheck, 
  Mail, 
  Save, 
  Loader2, 
  CheckCircle, 
  Key,
  Info,
  Server,
  ToggleLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SettingsLayout from "../SettingsLayout";

export default function IntegrationsPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [integrations, setIntegrations] = useState({
    ga4Id: "",
    recaptchaPublicKey: "",
    recaptchaPrivateKey: "",
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "",
    smtpFromName: "Hrescic",
    notificationsEnabled: true,
    notifyRecipients: "",
  });

  useEffect(() => {
    async function fetchIntegrations() {
      try {
        const res = await fetch("/api/admin/settings/integrations");
        const data = await res.json();
        if (data.success) {
          setIntegrations(data.integrations);
        }
      } catch (error) {
        console.error("Failed to fetch integrations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchIntegrations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/settings/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(integrations),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save integrations:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#37C100]" size={40} />
      </div>
    );
  }

  return (
    <SettingsLayout>
      <div className="max-w-7xl space-y-8 pb-10">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1D2931]">{t.integrations.title}</h1>
          <p className="text-sm text-muted-foreground">{t.integrations.desc}</p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ANALYTICS & SECURITY */}
          <div className="space-y-8">
            <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
              <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.integrations.analytics_title}</CardTitle>
                    <CardDescription className="text-xs">{t.integrations.analytics_desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.integrations.ga4_label}</label>
                  <Input 
                    value={integrations.ga4Id}
                    onChange={(e) => setIntegrations({...integrations, ga4Id: e.target.value})}
                    placeholder="G-XXXXXXXXXX"
                    className="rounded-xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-11 text-sm focus:ring-[#37C100]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
              <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.integrations.recaptcha_title}</CardTitle>
                    <CardDescription className="text-xs">{t.integrations.recaptcha_desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 text-green-600">{t.integrations.site_key_label}</label>
                  <Input 
                    value={integrations.recaptchaPublicKey}
                    onChange={(e) => setIntegrations({...integrations, recaptchaPublicKey: e.target.value})}
                    placeholder="6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="rounded-xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-11 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 text-red-600">{t.integrations.secret_key_label}</label>
                  <Input 
                    type="password"
                    value={integrations.recaptchaPrivateKey}
                    onChange={(e) => setIntegrations({...integrations, recaptchaPrivateKey: e.target.value})}
                    placeholder="••••••••••••••••••••••••••••••••••••"
                    className="rounded-xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-11 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MESSAGING & SMTP */}
          <div className="space-y-8">
            <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
              <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.integrations.smtp_title}</CardTitle>
                    <CardDescription className="text-xs">{t.integrations.smtp_desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.integrations.hostname}</label>
                    <Input value={integrations.smtpHost} onChange={(e) => setIntegrations({...integrations, smtpHost: e.target.value})} className="rounded-xl border-[#d7dfdb] h-11 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.integrations.port}</label>
                    <Input value={integrations.smtpPort} onChange={(e) => setIntegrations({...integrations, smtpPort: e.target.value})} className="rounded-xl border-[#d7dfdb] h-11 text-sm" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.integrations.username}</label>
                    <Input value={integrations.smtpUser} onChange={(e) => setIntegrations({...integrations, smtpUser: e.target.value})} className="rounded-xl border-[#d7dfdb] h-11 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.integrations.password}</label>
                    <Input type="password" value={integrations.smtpPass} onChange={(e) => setIntegrations({...integrations, smtpPass: e.target.value})} className="rounded-xl border-[#d7dfdb] h-11 text-sm" />
                  </div>
                </div>
                <Separator className="bg-[#d7dfdb]" />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.integrations.recipients}</label>
                  <Input value={integrations.notifyRecipients} onChange={(e) => setIntegrations({...integrations, notifyRecipients: e.target.value})} className="rounded-xl border-[#d7dfdb] h-11 text-sm" placeholder="admin@hrescic.com, leads@hrescic.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="sticky bottom-8 z-10 flex items-center justify-between rounded-3xl border border-[#d7dfdb] bg-white/80 p-6 shadow-none backdrop-blur-md">
          <div className="flex items-center gap-4 pl-4">
            {success ? (
              <div className="flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-[11px]">
                <CheckCircle size={16} /> {t.integrations.save_success}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground leading-relaxed italic max-w-sm">
                <Info size={14} className="inline mr-1 mb-0.5" /> {t.integrations.footer_note}
              </div>
            )}
          </div>
          <Button 
            disabled={submitting} 
            type="submit"
            className="rounded-2xl bg-[#1D2931] px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-black shadow-none shadow-[#1D2931]/20"
          >
            {submitting ? t.integrations.syncing_btn : t.integrations.sync_btn}
          </Button>
        </div>
      </form>
      </div>
    </SettingsLayout>
  );
}
