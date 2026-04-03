"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import { 
  Globe, 
  Settings2, 
  Image as ImageIcon, 
  Share2, 
  Mail, 
  Save, 
  Loader2, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SettingsLayout from "../SettingsLayout";

export default function GeneralSettingsPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Hrescic",
    siteDescription: "Creative and strategy agency",
    logoUrl: "/assets/Image/hrescic-logo.svg",
    faviconUrl: "/favicon.ico",
    socialLinks: {
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    },
    supportEmail: "hello@hrescic.com",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings/general");
        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/settings/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
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
      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1D2931]">{t.general_settings.title}</h1>
          <p className="text-sm text-muted-foreground">{t.general_settings.desc}</p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BASIC INFO */}
        <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                <Globe size={20} />
              </div>
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.general_settings.site_identity}</CardTitle>
                <CardDescription className="text-xs">{t.general_settings.site_identity_desc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.site_name}</label>
                <Input 
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.support_email}</label>
                <Input 
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                  className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.site_desc}</label>
              <Textarea 
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 py-3 min-h-[100px] text-sm focus:ring-[#37C100]"
                placeholder={t.general_settings.site_desc_placeholder}
              />
            </div>
          </CardContent>
        </Card>

        {/* BRANDING */}
        <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                <ImageIcon size={20} />
              </div>
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.general_settings.branding}</CardTitle>
                <CardDescription className="text-xs">{t.general_settings.branding_desc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.logo_label}</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle size={12} className="text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>{t.general_settings.logo_tooltip}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex gap-4">
                  <Input 
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                    placeholder="/assets/logo.svg"
                    className="flex-1 rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d7dfdb] bg-[#f9fafb] p-2">
                    <img src={settings.logoUrl || "/assets/Image/hrescic-logo.svg"} alt="Preview" className="h-full w-auto object-contain" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.favicon_label}</label>
                <Input 
                  value={settings.faviconUrl}
                  onChange={(e) => setSettings({...settings, faviconUrl: e.target.value})}
                  className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SOCIAL LINKS */}
        <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                <Share2 size={20} />
              </div>
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.general_settings.social_presence}</CardTitle>
                <CardDescription className="text-xs">{t.general_settings.social_presence_desc}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.instagram_label}</label>
                <Input 
                  value={settings.socialLinks.instagram}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})}
                  className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.general_settings.linkedin_label}</label>
                <Input 
                  value={settings.socialLinks.linkedin}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, linkedin: e.target.value}})}
                  className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER ACTIONS */}
        <div className="sticky bottom-8 z-10 flex items-center justify-between rounded-3xl border border-[#d7dfdb] bg-white/80 p-6 shadow-none backdrop-blur-md">
          <div className="flex items-center gap-4 pl-4">
            {success ? (
              <div className="flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-[11px]">
                <CheckCircle size={16} /> {t.general_settings.save_success}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground leading-relaxed italic max-w-xs">
                {t.general_settings.footer_msg}
              </div>
            )}
          </div>
          <Button 
            disabled={submitting} 
            type="submit"
            className="rounded-2xl bg-[#1D2931] px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-black shadow-xl shadow-[#1D2931]/20"
          >
            {submitting ? t.general_settings.saving_btn : t.general_settings.save_btn}
          </Button>
        </div>
      </form>
      </div>
    </SettingsLayout>
  );
}
