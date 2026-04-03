"use client";

import Link from "next/link";
import { ArrowLeft, Home, TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4fbf1] text-[#37C100]">
            <TriangleAlert size={32} />
          </div>
        </div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#37C100]">Error 404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-[#1D2931] sm:text-5xl uppercase">
          Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-[#1D2931] px-5 py-3 text-xs font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#111827] shadow-lg shadow-[#1D2931]/10"
          >
            <Home size={14} /> Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-[#d7dfdb] px-5 py-3 text-xs font-black uppercase tracking-[0.15em] text-[#1D2931] transition hover:bg-[#f4fbf1]"
          >
            <ArrowLeft size={14} /> Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
