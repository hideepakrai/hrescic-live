"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import { Wrench, UserCircle, PlugZap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const tabs = [
    {
      id: "general",
      label: t.nav.general, // "GENERAL"
      hint: t.nav.general_hint, // "SITE CONFIG"
      href: "/admin/settings/general",
      icon: Wrench,
    },
    {
      id: "account",
      label: t.nav.account, // "ACCOUNT"
      hint: t.nav.account_hint, // "YOUR PROFILE"
      href: "/admin/settings/account",
      icon: UserCircle,
    },
    {
      id: "integrations",
      label: t.nav.integrations, // "INTEGRATIONS"
      hint: t.nav.integrations_hint, // "EXTERNAL APPS"
      href: "/admin/settings/integrations",
      icon: PlugZap,
    },
  ];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* VERTICAL SUB-NAV */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 px-4">
            {t.groups.settings}
          </h2>
        </div>
        
        <nav className="space-y-3">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "group flex items-center gap-4 rounded-[22px] px-3 py-2 transition-all duration-300",
                  active
                    ? "bg-[#37C100] text-white shadow-xl shadow-[#37C100]/25 translate-x-2"
                    : "bg-white border border-[#d7dfdb] text-[#1D2931] hover:bg-[#f4fbf1] hover:border-[#b9d9a7] hover:translate-x-1"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl transition-colors",
                  active ? "bg-white/20" : "bg-[#f9fafb] text-[#1D2931]/60 group-hover:bg-white"
                )}>
                  <tab.icon size={22} strokeWidth={2.2} />
                </div>
                
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[13px] font-black uppercase tracking-tight truncate">
                    {tab.label}
                  </span>
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-widest truncate",
                    active ? "text-[#eaf8df]" : "text-muted-foreground/70"
                  )}>
                    {tab.hint}
                  </span>
                </div>

                {active && (
                  <div className="mr-1">
                    <ChevronRight size={16} strokeWidth={3} />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 w-full min-w-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
