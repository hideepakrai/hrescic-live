"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  ChartBar,
  ExternalLink,
  Mail,
  PanelsTopLeft,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Layout,
  MousePointer2,
  Clock,
  Calendar,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";

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
  const [adminName, setAdminName] = useState("Admin");
  
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      setError("");

      try {
        const [summRes, meRes] = await Promise.all([
          fetch("/api/admin/dashboard/summary"),
          fetch("/api/admin/me")
        ]);
        
        const summData = await summRes.json();
        const meData = await meRes.json();

        if (summData.success) {
          setSummary(summData.summary as DashboardSummary);
        }
        
        if (meData.success && meData.admin.name) {
          setAdminName(meData.admin.name);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    void loadSummary();
  }, []);

  const cards = useMemo(
    () => [
      {
        label: t.dashboard.total_leads,
        value: summary?.leads.total ?? 0,
        icon: Mail,
        accent: "bg-[#eaf8df] text-[#1f7a39]",
        description: t.dashboard.leads_desc
      },
      {
        label: t.dashboard.new_leads,
        value: summary?.leads.new ?? 0,
        icon: BadgeCheck,
        accent: "bg-[#37C100] text-white shadow-lg shadow-[#37C100]/20",
        description: t.dashboard.new_leads_desc
      },
      {
        label: t.dashboard.pricing_plans,
        value: summary?.cms["pricing-plans"] ?? 0,
        icon: PanelsTopLeft,
        accent: "bg-[#1D2931] text-white shadow-lg shadow-[#1D2931]/20",
        description: t.dashboard.pricing_desc
      },
      {
        label: t.dashboard.global_settings,
        value: summary?.cms.settings ?? 0,
        icon: ChartBar,
        accent: "bg-white text-[#1D2931] border border-[#d7dfdb]",
        description: t.dashboard.settings_desc
      },
    ],
    [summary, t],
  );

  const capabilities = [
    {
      title: t.capabilities.pages_title,
      description: t.capabilities.pages_desc,
      icon: Layout,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: t.capabilities.leads_title,
      description: t.capabilities.leads_desc,
      icon: Mail,
      color: "bg-green-50 text-green-600"
    },
    {
      title: t.capabilities.pricing_title,
      description: t.capabilities.pricing_desc,
      icon: Layers,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: t.capabilities.team_title,
      description: t.capabilities.team_desc,
      icon: Shield,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(currentLocale === 'hr' ? 'hr-HR' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
  }, [currentLocale]);

  return (
    <div className="space-y-8 pb-10">
      {/* WELCOME HERO */}
      <section className="relative rounded-[2rem] bg-[#1D2931] p-8 md:p-12 overflow-hidden lg:min-h-[220px] flex flex-col justify-center">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={180} />
        </div>
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-[#37C100] font-black uppercase tracking-[0.2em] text-[10px]">
            <Calendar size={14} />
            {formattedDate}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic leading-none">
            {t.dashboard.welcome} <br/>
            <span className="text-[#37C100] not-italic">{adminName}</span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed">
            {t.dashboard.hero_desc}
          </p>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block">
           <Link href="/" target="_blank">
             <Button className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md px-6 py-6 text-xs font-black uppercase tracking-wider gap-2">
               <Globe size={14} /> {t.dashboard.visit_live}
             </Button>
           </Link>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-bold flex items-center gap-2">
           <Shield size={16} /> {error}
        </div>
      )}

      {/* STATS GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="group relative rounded-3xl border border-[#d7dfdb] bg-white p-6 shadow-sm transition hover:shadow-xl hover:-translate-y-1 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${card.accent}`}>
                <card.icon size={24} />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                <Clock size={12} /> {t.dashboard.sync_live}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">{card.label}</h3>
              <p className="text-4xl font-black tracking-tight text-[#1D2931]">
                {loading ? "..." : card.value}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium italic">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* CAPABILITIES & QUICK LINKS */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <article className="rounded-3xl border border-[#d7dfdb] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-[#1D2931]">{t.dashboard.capabilities}</h2>
              <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-bold">{t.dashboard.capabilities_sub}</p>
            </div>
            <MousePointer2 className="text-[#37C100] opacity-30" size={32} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
             {capabilities.map((cap) => (
               <div key={cap.title} className="p-5 rounded-[1.5rem] border border-[#d7dfdb] bg-[#f9fafb]/50 group transition hover:bg-white hover:border-[#37C100]/30 hover:shadow-md">
                 <div className={`p-3 w-fit rounded-xl mb-4 ${cap.color}`}>
                   <cap.icon size={20} />
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-tight text-[#1D2931]">{cap.title}</h3>
                 <p className="mt-2 text-xs leading-5 text-muted-foreground">{cap.description}</p>
               </div>
             ))}
          </div>
          
          <div className="mt-8 p-4 rounded-2xl bg-[#eaf8df]/50 border border-[#37C100]/10 flex items-center justify-between group cursor-help">
             <p className="text-[10px] font-bold text-[#1f7a39] uppercase tracking-widest">
               {t.dashboard.note}
             </p>
             <ArrowRight size={14} className="text-[#37C100] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </article>

        <article className="rounded-3xl border border-[#d7dfdb] bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight text-[#1D2931]">{t.dashboard.quick_actions}</h2>
            <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-bold">{t.dashboard.priority_mgmt}</p>
          </div>

          <div className="grid gap-3 text-xs uppercase font-black tracking-widest">
            {[
              { label: t.nav.pages, href: "/admin/pages", color: "hover:bg-blue-50 hover:text-blue-700" },
              { label: t.nav.account, href: "/admin/settings/account", color: "hover:bg-orange-50 hover:text-orange-700" },
              { label: t.nav.leads, href: "/admin/leads", color: "hover:bg-green-50 hover:text-green-700" },
              { label: t.nav.pricing, href: "/admin/pricing-plans", color: "hover:bg-indigo-50 hover:text-indigo-700" },
              { label: t.nav.general, href: "/admin/settings/general", color: "hover:bg-red-50 hover:text-red-700" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center justify-between rounded-2xl border border-[#d7dfdb] px-5 py-4 text-[11px] font-black tracking-widest uppercase transition-all ${link.color} group`}
              >
                {link.label}
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-current group-hover:bg-opacity-10">
                   <ExternalLink className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
