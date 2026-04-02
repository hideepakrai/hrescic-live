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
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/store/auth/authSlice";

const NAV_ITEMS = [
  {
    group: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
        hint: "Overview",
      },
      {
        label: "Pages CMS",
        href: "/admin/pages",
        icon: FileText,
        exact: false,
        hint: "SEO + Slug",
      },
      {
        label: "Leads Inbox",
        href: "/admin/leads",
        icon: Inbox,
        exact: false,
        hint: "Demo + Ask Forms",
      },
      {
        label: "Pricing CMS",
        href: "/admin/pricing-plans",
        icon: PanelsTopLeft,
        exact: false,
        hint: "Plans & Deliverables",
      },
      {
        label: "Forms CMS",
        href: "/admin/forms",
        icon: MessageSquareText,
        exact: false,
        hint: "Let's Talk Content",
      },
    ],
  },
  {
    group: "Profile",
    items: [
      {
        label: "Account Settings",
        href: "/admin/account-settings",
        icon: Settings,
        exact: false,
        hint: "Admin Profile",
      },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

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

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-[#d7dfdb] bg-white">
      <SidebarContent className="gap-4 px-2 pb-4 pt-4">
        {NAV_ITEMS.map((group, groupIdx) => (
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
                          "rounded-xl px-3 py-5 transition-all",
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
                            <span className="truncate text-sm font-bold">{label}</span>
                            <span className={cn("text-[10px]", active ? "text-[#eaf8df]" : "text-muted-foreground/70")}>{hint}</span>
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f7a39]">CMS Scope</p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Manage SEO + slugs, lead inbox, Plans & Deliverables cards, and Let&apos;s Talk form content from admin.
            </p>
            <button
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#1D2931] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#111827]"
              onClick={() => router.push("/admin/pricing-plans")}
            >
              <CircleDot size={12} /> Open Pricing CMS
            </button>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="mx-4 opacity-50" />

      <SidebarFooter className="bg-white p-4">
        <SidebarMenu>
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
                  onClick={() => router.push("/admin/account-settings")}
                  className="cursor-pointer gap-3 rounded-xl py-2.5 text-xs font-bold text-muted-foreground hover:bg-[#f4fbf1] hover:text-[#1f7a39]"
                >
                  <Settings size={16} />
                  <span>Account Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1.5" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer gap-3 rounded-xl py-2.5 text-xs font-black text-destructive hover:bg-destructive/10"
                >
                  <LogOut size={16} />
                  <span>LOG OUT</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
