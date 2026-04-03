"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import { 
  UserCircle, 
  Lock, 
  Mail, 
  Shield, 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SettingsLayout from "../SettingsLayout";

export default function AccountPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
  });

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("/api/admin/me");
        const data = await res.json();
        if (data.success) {
          setProfile(data.admin);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setError(t.account.password_mismatch);
      setSubmitting(false);
      return;
    }

    try {
      const payload: any = { name: profile.name };
      if (passwords.newPassword) {
        payload.password = passwords.newPassword;
      }

      const res = await fetch("/api/admin/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setPasswords({ newPassword: "", confirmPassword: "" });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (error) {
      setError("An unexpected error occurred");
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
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1D2931]">{t.account.title}</h1>
          <p className="text-sm text-muted-foreground">{t.account.desc}</p>
        </div>

      <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
        {/* PROFILE OVERVIEW */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-3xl border border-[#d7dfdb] bg-[#f9fafb]/30 shadow-sm overflow-hidden text-center p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-[#1D2931] shadow-xl border border-[#d7dfdb] text-4xl font-black uppercase">
                {profile.name?.charAt(0) || profile.email?.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{profile.name || "Admin"}</h2>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
              <Badge className="bg-[#37C100] text-white border-none shadow-none text-[9px] font-black uppercase tracking-widest px-3 py-1">
                {profile.role?.replace("_", " ")}
              </Badge>
            </div>
          </Card>

          <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold text-[#1D2931]">
                <Shield size={16} className="text-[#37C100]" />
                {t.account.security_level}: {t.account.level_basic}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[#1D2931]">
                <Mail size={16} className="text-[#37C100]" />
                {t.account.email_verified}
              </div>
            </div>
          </Card>
        </div>

        {/* PROFILE FORMS */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleUpdateProfile} className="space-y-8">
            <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
              <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                    <UserCircle size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.account.profile_info}</CardTitle>
                    <CardDescription className="text-xs">{t.account.profile_info_desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.account.full_name}</label>
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Enter your name"
                    className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                  />
                </div>
                <div className="space-y-2 opacity-60">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.account.email_address}</label>
                  <Input 
                    value={profile.email}
                    disabled
                    className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/30 px-4 h-12 text-sm cursor-not-allowed"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
              <CardHeader className="bg-[#f9fafb]/50 border-b border-[#d7dfdb] p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1D2931] shadow-sm border border-[#d7dfdb]">
                    <Lock size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight text-[#1D2931]">{t.account.password_security}</CardTitle>
                    <CardDescription className="text-xs">{t.account.password_security_desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.account.new_password}</label>
                    <Input 
                      type={showPassword ? "text" : "password"}
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      placeholder="Min 8 characters"
                      className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-10 text-muted-foreground hover:text-[#37C100]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.account.confirm_password}</label>
                    <Input 
                      type={showPassword ? "text" : "password"}
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                      placeholder="Repeat new password"
                      className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb]/50 px-4 h-12 text-sm focus:ring-[#37C100]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-[#f9fafb]/20 border-t border-[#d7dfdb] p-8">
                <div className="flex w-full items-center justify-between">
                  {success ? (
                    <div className="flex items-center gap-2 text-green-600 font-bold text-[11px] uppercase tracking-widest animate-in fade-in slide-in-from-left-2">
                      <CheckCircle size={16} /> {t.account.update_success}
                    </div>
                  ) : error ? (
                    <div className="flex items-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-widest">
                      <AlertCircle size={16} /> {error}
                    </div>
                  ) : (
                    <div className="text-[10px] text-muted-foreground font-medium max-w-xs">
                      {t.account.security_note}
                    </div>
                  )}
                  <Button 
                    disabled={submitting} 
                    type="submit"
                    className="rounded-2xl bg-[#1D2931] px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-black shadow-xl shadow-[#1D2931]/20"
                  >
                    {submitting ? t.account.updating : t.account.update_btn}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
      </div>
    </SettingsLayout>
  );
}
