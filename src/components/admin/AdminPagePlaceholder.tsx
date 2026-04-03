"use client";

import { LucideIcon, Sparkles } from "lucide-react";
import Link from "next/link";

interface AdminPagePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function AdminPagePlaceholder({
  title,
  description,
  icon: Icon,
}: AdminPagePlaceholderProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7dfdb] bg-white/50 p-12 text-center shadow-sm">
      <div className="relative mb-8">
        <div className="absolute -right-4 -top-4 animate-pulse opacity-40 text-[#37C100]">
          <Sparkles size={32} />
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eaf8df] text-[#1f7a39] shadow-xl shadow-[#37C100]/10">
          <Icon size={40} strokeWidth={1.8} />
        </div>
      </div>

      <h1 className="text-2xl font-black uppercase tracking-tight text-[#1D2931]">
        {title} <span className="ml-2 inline-flex items-center rounded-full bg-[#1D2931] px-3 py-1 text-[10px] font-black text-white">BETA</span>
      </h1>
      
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/admin"
          className="rounded-xl bg-[#1D2931] px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#111827] shadow-lg shadow-[#1D2931]/15"
        >
          Return to Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="rounded-xl border border-[#d7dfdb] px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#1D2931] transition hover:bg-[#f4fbf1]"
        >
          Go Back
        </button>
      </div>

      <div className="mt-12 flex items-center gap-2">
        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#37C100]" style={{ animationDelay: "0ms" }} />
        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#37C100]" style={{ animationDelay: "150ms" }} />
        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#37C100]" style={{ animationDelay: "300ms" }} />
        <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1f7a39]/60">Module Under Construction</span>
      </div>
    </div>
  );
}
