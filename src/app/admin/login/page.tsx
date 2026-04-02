"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { loginThunk } from "@/lib/store/auth/authThunks";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err || "Authentication failed");
      toast.error(err || "Authentication failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#f4fbf1] via-white to-[#f8fafb] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#d7dfdb] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#37C100]">Hrescic</p>
          <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#1D2931]">Hrescic Admin Login</h1>
          <p className="mt-2 text-sm text-[#6b7280]">Sign in to manage Hrescic website SEO and route settings.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1D2931]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-md border border-[#d7dfdb] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37C100]/30"
              placeholder="admin@hrescic.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1D2931]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-md border border-[#d7dfdb] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37C100]/30"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="mt-6 flex h-10 w-full items-center justify-center rounded-md bg-[#37C100] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#2d9802]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
