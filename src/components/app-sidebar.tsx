"use client";

import {
  LayoutDashboard,
  FileText,
  LogOut,
  ChevronUp,
  User2,
  Settings,
  Sparkles,
  CircleDot,
  PanelsTopLeft,
  MessageSquareText,
  Inbox,
  Users,
  ShieldCheck,
  Wrench,
  UserCircle,
  PlugZap,
  Globe,
  Check,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/store/auth/authSlice";
import { setAdminLocale, selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const navGroups = [
    {
      group: t.groups.workspace,
      items: [
        {
          label: t.nav.dashboard,
          href: "/admin",
          icon: LayoutDashboard,
          exact: true,
          hint: t.nav.dashboard_hint,
        },
        {
          label: t.nav.pages,
          href: "/admin/pages",
          icon: FileText,
          exact: false,
          hint: t.nav.pages_hint,
        },
        {
          label: t.nav.leads,
          href: "/admin/leads",
          icon: Inbox,
          exact: false,
          hint: t.nav.leads_hint,
        },
        {
          label: t.nav.pricing,
          href: "/admin/pricing-plans",
          icon: PanelsTopLeft,
          exact: false,
          hint: t.nav.pricing_hint,
        },
        {
          label: t.nav.forms,
          href: "/admin/forms",
          icon: MessageSquareText,
          exact: false,
          hint: t.nav.forms_hint,
        },
      ],
    },
    {
      group: t.groups.team,
      items: [
        {
          label: t.nav.users,
          href: "/admin/team/users",
          icon: Users,
          exact: false,
          hint: t.nav.users_hint,
        },
        {
          label: t.nav.roles,
          href: "/admin/team/roles",
          icon: ShieldCheck,
          exact: false,
          hint: t.nav.roles_hint,
        },
      ],
    },
    {
      group: t.groups.settings,
      items: [
        {
          label: t.nav.general,
          href: "/admin/settings/general",
          icon: Wrench,
          exact: false,
          hint: t.nav.general_hint,
        },
        {
          label: t.nav.account,
          href: "/admin/settings/account",
          icon: UserCircle,
          exact: false,
          hint: t.nav.account_hint,
        },
        {
          label: t.nav.integrations,
          href: "/admin/settings/integrations",
          icon: PlugZap,
          exact: false,
          hint: t.nav.integrations_hint,
        },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    dispatch(logout());
    router.push("/admin/login");
    router.refresh();
  };

  const handleLocaleChange = (newLocale: string) => {
    dispatch(setAdminLocale(newLocale as LocaleCode));
  };

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-[#d7dfdb] bg-white">
      <SidebarContent className="gap-4 px-2 pb-4 pt-4">
        {navGroups.map((group, groupIdx) => (
          <SidebarGroup
            key={group.group}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ animationDelay: `${groupIdx * 120}ms` }}
          >
            <SidebarGroupLabel className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 group-data-[collapsible=icon]:hidden">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {group.items.map(({ label, href, icon: Icon, exact, hint }) => {
                  const active = isActive(href, exact);
                  return (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={label}
                        size="lg"
                        className={cn(
                          "rounded-xl px-3 py-5 transition-all text-xs",
                          active
                            ? "bg-[#37C100] text-white shadow-lg shadow-[#37C100]/25 hover:bg-[#2d9802]"
                            : "text-muted-foreground hover:bg-[#f4fbf1] hover:text-[#1D2931]",
                        )}
                      >
                        <Link href={href} className="flex w-full items-center gap-3">
                          <div
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              active ? "bg-white/20" : "bg-muted",
                            )}
                          >
                            <Icon size={17} strokeWidth={2.4} />
                          </div>
                          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                            <span className="truncate text-[12px] font-black uppercase tracking-[1px]">{label}</span>
                            <span className={cn("text-[9px] font-bold uppercase tracking-wider", active ? "text-[#eaf8df]" : "text-muted-foreground/70")}>{hint}</span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <div className="relative overflow-hidden rounded-2xl border border-[#d7dfdb] bg-gradient-to-br from-[#f4fbf1] via-white to-white p-4 shadow-sm">
            <div className="absolute -right-7 -top-8 opacity-20">
              <Sparkles size={64} className="text-[#37C100]" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f7a39]">{t.sidebar.cms_scope}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {t.sidebar.cms_scope_desc}
            </p>
            <button
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#1D2931] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#111827]"
              onClick={() => router.push("/admin/pricing-plans")}
            >
              <CircleDot size={12} /> {t.sidebar.open_pricing}
            </button>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="mx-4 opacity-50" />

      <SidebarFooter className="bg-white p-4">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 w-full rounded-xl border border-[#d7dfdb] bg-white transition hover:bg-[#f4fbf1] hover:border-[#b9d9a7]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf8df] text-[#1f7a39]">
                    <Globe size={16} strokeWidth={2.4} />
                  </div>
                  <div className="ml-1 min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
                    <p className="truncate text-xs font-bold text-foreground">
                      {currentLocale === "en" ? "English (EN)" : "Hrvatski (HR)"}
                    </p>
                    <p className="truncate text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground/70">
                      {t.sidebar.site_language}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" sideOffset={12} className="w-48 rounded-xl bg-white p-1.5 shadow-xl">
                <DropdownMenuLabel className="mb-1 px-2 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground/60">
                  {t.sidebar.select_language}
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleLocaleChange}>
                  <DropdownMenuRadioItem
                    value="en"
                    className="cursor-pointer rounded-lg px-2 py-2 text-xs font-bold text-muted-foreground data-[state=checked]:bg-[#f4fbf1] data-[state=checked]:text-[#1f7a39]"
                  >
                    <div className="flex w-full items-center justify-between">
                      English (EN)
                      {currentLocale === "en" && <Check size={14} />}
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="hr"
                    className="cursor-pointer rounded-lg px-2 py-2 text-xs font-bold text-muted-foreground data-[state=checked]:bg-[#f4fbf1] data-[state=checked]:text-[#1f7a39]"
                  >
                    <div className="flex w-full items-center justify-between">
                      Hrvatski (HR)
                      {currentLocale === "hr" && <Check size={14} />}
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-14 w-full rounded-2xl border border-[#d7dfdb] bg-white shadow-sm transition hover:bg-[#f4fbf1] hover:border-[#b9d9a7]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf8df] text-[#1f7a39]">
                    <User2 size={19} strokeWidth={2.2} />
                  </div>
                  <div className="ml-1 min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
                    <p className="truncate text-sm font-bold text-foreground">Hrescic Admin</p>
                    <p className="pt-0 truncate text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Super Admin</p>
                  </div>
                  <ChevronUp size={14} className="text-muted-foreground/60 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={12}
                className="w-64 rounded-2xl border border-[#d7dfdb] bg-white p-2 shadow-xl"
              >
                <DropdownMenuLabel className="mb-1.5 rounded-xl bg-[#f4fbf1] px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#37C100] text-white">
                      <User2 size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black">Hrescic Admin</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1f7a39]">Hrescic</p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => router.push("/admin/settings/account")}
                  className="cursor-pointer gap-3 rounded-xl py-2.5 text-xs font-bold text-muted-foreground hover:bg-[#f4fbf1] hover:text-[#1f7a39]"
                >
                  <Settings size={16} />
                  <span>{t.sidebar.account_settings}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1.5" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer gap-3 rounded-xl py-2.5 text-xs font-black text-destructive hover:bg-destructive/10"
                >
                  <LogOut size={16} />
                  <span>{t.sidebar.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
