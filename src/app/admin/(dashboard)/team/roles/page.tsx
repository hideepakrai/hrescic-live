"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Check, 
  Lock, 
  Info, 
  Eye, 
  Edit3, 
  Settings, 
  Users, 
  Save,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RolesPermissionsPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initial state derived from the translations/config
  const [roles, setRoles] = useState([
    {
      id: "super_admin",
      title: t.team.roles_list.super_admin.title,
      description: t.team.roles_list.super_admin.desc,
      badge: t.team.roles_list.super_admin.badge,
      permissions: [
        { id: "analytics", module: t.team.modules.analytics, access: t.team.access_full, icon: Info },
        { id: "cms", module: t.team.modules.cms, access: t.team.access_full, icon: Edit3 },
        { id: "team", module: t.team.modules.team, access: t.team.access_full, icon: Users },
        { id: "settings", module: t.team.modules.settings, access: t.team.access_full, icon: Settings },
        { id: "integrations", module: t.team.modules.integrations, access: t.team.access_full, icon: Lock },
      ],
    },
    {
      id: "content_manager",
      title: t.team.roles_list.content_manager.title,
      description: t.team.roles_list.content_manager.desc,
      badge: t.team.roles_list.content_manager.badge,
      permissions: [
        { id: "analytics", module: t.team.modules.analytics, access: t.team.access_view, icon: Info },
        { id: "cms", module: t.team.modules.cms, access: t.team.access_full, icon: Edit3 },
        { id: "team", module: t.team.modules.team, access: t.team.access_locked, icon: Users },
        { id: "settings", module: t.team.modules.settings, access: t.team.access_locked, icon: Settings },
        { id: "integrations", module: t.team.modules.integrations, access: t.team.access_locked, icon: Lock },
      ],
    },
    {
      id: "sales_crm",
      title: t.team.roles_list.sales_crm.title,
      description: t.team.roles_list.sales_crm.desc,
      badge: t.team.roles_list.sales_crm.badge,
      permissions: [
        { id: "analytics", module: t.team.modules.analytics, access: t.team.access_view, icon: Info },
        { id: "cms", module: t.team.modules.cms, access: t.team.access_locked, icon: Edit3 },
        { id: "leads", module: t.team.modules.leads, access: t.team.access_full, icon: Users },
        { id: "settings", module: t.team.modules.settings, access: t.team.access_locked, icon: Settings },
        { id: "integrations", module: t.team.modules.integrations, access: t.team.access_locked, icon: Lock },
      ],
    },
  ]);

  const handlePermissionChange = (roleId: string, permId: string, newAccess: string) => {
    setRoles(prevRoles => 
      prevRoles.map(role => {
        if (role.id === roleId) {
          return {
            ...role,
            permissions: role.permissions.map(p => 
              p.id === permId ? { ...p, access: newAccess } : p
            )
          };
        }
        return role;
      })
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setHasChanges(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const getAccessIcon = (access: string) => {
    if (access === t.team.access_full) return <CheckCircle2 size={14} className="text-green-600" />;
    if (access === t.team.access_view) return <Eye size={14} className="text-blue-600" />;
    return <Lock size={14} className="text-red-400" />;
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1D2931]">{t.team.roles_title}</h1>
          <p className="text-sm text-muted-foreground">{t.team.roles_desc}</p>
        </div>
        
        {hasChanges && (
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="rounded-2xl bg-[#37C100] px-8 py-6 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-[#37C100]/20 hover:bg-[#2d9802] animate-in fade-in slide-in-from-right-4"
          >
            {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
            {saving ? t.common.saving : t.common.save}
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {roles.map((roleInfo) => (
          <Card key={roleInfo.id} className="rounded-[32px] border border-[#d7dfdb] bg-white shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                  <Shield size={24} />
                </div>
                <Badge className="bg-[#1D2931] text-white border-none shadow-none text-[9px] font-black uppercase tracking-widest px-3 py-1">
                  {roleInfo.badge}
                </Badge>
              </div>
              <CardTitle className="text-xl font-black uppercase tracking-tight text-[#1D2931]">{roleInfo.title}</CardTitle>
              <CardDescription className="text-sm mt-2">{roleInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6 flex-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/40 mb-2">{t.team.module_access}</h3>
              <div className="space-y-5">
                {roleInfo.permissions.map((perm) => (
                  <div key={perm.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground group-hover:text-[#37C100] transition-colors">
                        <perm.icon size={16} />
                      </div>
                      <span className="text-xs font-bold text-[#1D2931]">{perm.module}</span>
                    </div>
                    
                    <Select 
                      value={perm.access} 
                      onValueChange={(val) => handlePermissionChange(roleInfo.id, perm.id, val)}
                    >
                      <SelectTrigger className="h-8 w-28 rounded-lg border-[#d7dfdb] bg-[#f9fafb] px-2 text-[10px] font-black uppercase tracking-widest focus:ring-[#37C100]">
                        <div className="flex items-center gap-2">
                          {getAccessIcon(perm.access)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[#d7dfdb] bg-white">
                        <SelectItem value={t.team.access_full} className="text-[10px] font-black uppercase tracking-widest text-green-600">{t.team.access_full}</SelectItem>
                        <SelectItem value={t.team.access_view} className="text-[10px] font-black uppercase tracking-widest text-blue-600">{t.team.access_view}</SelectItem>
                        <SelectItem value={t.team.access_locked} className="text-[10px] font-black uppercase tracking-widest text-red-400">{t.team.access_locked}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FLOATING SUCCESS MESSAGE */}
      {saveSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#1D2931] px-6 py-4 text-white shadow-2xl">
            <CheckCircle2 size={20} className="text-[#37C100]" />
            <span className="text-xs font-black uppercase tracking-widest">{t.general_settings.save_success}</span>
          </div>
        </div>
      )}

      <div className="rounded-[32px] border border-dashed border-[#d7dfdb] bg-[#f9fafb]/50 p-10 flex items-center justify-center text-center">
        <div className="max-w-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm border border-[#d7dfdb] mx-auto mb-6">
            <Info className="text-[#37C100]" size={32} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight text-[#1D2931]">{t.team.security_enforcement}</h3>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            {t.team.security_desc}
          </p>
        </div>
      </div>
    </div>
  );
}
