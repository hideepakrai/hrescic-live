"use client";

import { useRef, useState } from "react";
import {
  Bell,
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  Save,
  Shield,
  Upload,
  User,
} from "lucide-react";

export default function AccountSettingsPage() {
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const [logoPreview, setLogoPreview] = useState<string | null>("/assets/Image/hrescic-logo.svg");
  const [faviconPreview, setFaviconPreview] = useState<string | null>("/assets/Image/favicon.svg");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "Hrescic Admin",
    email: "admin@hrescic.com",
    role: "Super Admin",
    phone: "",
    bio: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new_: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    leads: true,
    demos: true,
    seo: false,
    system: false,
  });

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFaviconPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    showToast("Profile updated successfully.");
    setSaving(false);
  };

  const handleSaveAssets = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    showToast("Brand assets saved.");
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new_ || !passwords.confirm) {
      showToast("Please fill all password fields.");
      return;
    }
    if (passwords.new_ !== passwords.confirm) {
      showToast("New passwords do not match.");
      return;
    }
    if (passwords.new_.length < 8) {
      showToast("Password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPasswords({ current: "", new_: "", confirm: "" });
    showToast("Password changed successfully.");
    setSaving(false);
  };

  const inputClass =
    "w-full rounded-xl border border-[#d7dfdb] bg-white px-4 py-2.5 text-sm text-[#1D2931] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#37C100]/25 focus:border-[#37C100] transition-all";

  const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#4b5563]";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {toast && (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl bg-[#1D2931] px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
          <CheckCircle2 size={16} className="text-[#37C100]" />
          {toast}
        </div>
      )}

      <section className="rounded-2xl border border-[#d7dfdb] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#c7d2cc] bg-[#f4fbf1] p-2">
                <img src={faviconPreview || "/assets/Image/favicon.svg"} alt="Hrescic favicon" className="h-full w-full object-contain" />
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#37C100] text-white shadow"
                onClick={() => faviconInputRef.current?.click()}
              >
                <Camera size={12} />
              </button>
            </div>

            <div>
              <p className="text-2xl font-black leading-none text-[#1D2931]">HRESCIC</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#37C100]">AGENCY ADMIN PANEL</p>
            </div>
          </div>

          <div className="h-px flex-1 bg-[#e5ece8] sm:h-16 sm:w-px sm:flex-none" />

          <div>
            <p className="text-3xl font-bold text-[#1D2931]">{profile.name}</p>
            <p className="text-base text-[#374151]">{profile.email}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#eaf8df] px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#1f7a39]">
              <Shield size={12} /> {profile.role}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="overflow-hidden rounded-2xl border border-[#d7dfdb] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#dfe7e2] bg-[#f4fbf1] px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#37C100]/15 text-[#1f7a39]">
                <User size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D2931]">Profile Information</h2>
                <p className="text-[11px] text-[#6b7280]">Update your personal details</p>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    className={inputClass}
                    placeholder="+385 99 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280]" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    className={`${inputClass} pl-9`}
                    placeholder="admin@hrescic.com"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  className={inputClass}
                  placeholder="A short bio about you..."
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#37C100] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2d9802] disabled:opacity-60"
                >
                  <Save size={14} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#d7dfdb] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#dfe7e2] bg-[#f4fbf1] px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf8df] text-[#1f7a39]">
                <ImageIcon size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D2931]">Brand Assets</h2>
                <p className="text-[11px] text-[#6b7280]">Manage Hrescic logo and favicon</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label className={labelClass}>Main Logo</label>
                <div className="rounded-xl border-2 border-dashed border-[#cbd8d2] bg-[#f7faf8] p-4 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-40 items-center justify-center rounded-lg border border-[#d7dfdb] bg-white p-2">
                    <img src={logoPreview || "/assets/Image/hrescic-logo.svg"} alt="Hrescic logo" className="max-h-12 max-w-full object-contain" />
                  </div>
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1D2931] px-4 py-2 text-xs font-bold text-white hover:bg-[#111827]"
                  >
                    <Upload size={14} /> Upload Logo
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className={labelClass}>Favicon</label>
                <div className="rounded-xl border-2 border-dashed border-[#cbd8d2] bg-[#f7faf8] p-4 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl border border-[#d7dfdb] bg-white p-2">
                    <img src={faviconPreview || "/assets/Image/favicon.svg"} alt="Hrescic favicon preview" className="h-full w-full object-contain" />
                  </div>
                  <input ref={faviconInputRef} type="file" accept="image/*" onChange={handleFaviconUpload} className="hidden" />
                  <button
                    onClick={() => faviconInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1D2931] px-4 py-2 text-xs font-bold text-white hover:bg-[#111827]"
                  >
                    <Upload size={14} /> Upload Favicon
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#dfe7e2] px-6 py-4">
              <button
                onClick={handleSaveAssets}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#37C100] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2d9802] disabled:opacity-60"
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save Assets"}
              </button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#d7dfdb] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#dfe7e2] bg-[#f8fafb] px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e5eaee] text-[#1D2931]">
                <Lock size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D2931]">Change Password</h2>
                <p className="text-[11px] text-[#6b7280]">Update your login credentials</p>
              </div>
            </div>

            <div className="space-y-4 p-6">
              {[
                { label: "Current Password", key: "current", show: showCurrentPwd, toggle: setShowCurrentPwd },
                { label: "New Password", key: "new_", show: showNewPwd, toggle: setShowNewPwd },
                { label: "Confirm New Password", key: "confirm", show: showConfirmPwd, toggle: setShowConfirmPwd },
              ].map(({ label, key, show, toggle }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      value={(passwords as Record<string, string>)[key]}
                      onChange={(e) => setPasswords((prev) => ({ ...prev, [key]: e.target.value }))}
                      className={`${inputClass} pr-10`}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      onClick={() => toggle((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1D2931]"
                    >
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleChangePassword}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1D2931] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#111827] disabled:opacity-60"
                >
                  <Lock size={14} />
                  {saving ? "Saving..." : "Update Password"}
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-[#d7dfdb] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#dfe7e2] bg-[#f4fbf1] px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf8df] text-[#1f7a39]">
                <Bell size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1D2931]">Notifications</h2>
                <p className="text-[11px] text-[#6b7280]">Control admin alerts</p>
              </div>
            </div>

            <div className="space-y-3 p-6">
              {(
                [
                  { key: "leads", label: "New Lead Submissions", desc: "Alert on every new lead form entry" },
                  { key: "demos", label: "Demo Booking Requests", desc: "Alert when a demo request is submitted" },
                  { key: "seo", label: "SEO Publishing Alerts", desc: "Alert when page SEO status changes" },
                  { key: "system", label: "System Notices", desc: "Alert on admin system updates" },
                ] as const
              ).map(({ key, label, desc }) => (
                <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition hover:bg-[#f7faf8]">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="peer sr-only"
                    />
                    <div className="h-5 w-9 rounded-full bg-[#d1d5db] transition-colors peer-checked:bg-[#37C100]" />
                    <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1D2931]">{label}</p>
                    <p className="text-[11px] text-[#6b7280]">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#d7dfdb] bg-[#f4fbf1] p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Shield size={16} className="text-[#1f7a39]" />
              <h2 className="text-sm font-bold text-[#1D2931]">Account Security</h2>
            </div>
            <ul className="space-y-3 text-xs text-[#4b5563]">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#1f7a39]" />
                Role: <span className="ml-auto font-bold text-[#1D2931]">{profile.role}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#1f7a39]" />
                2FA Enabled: <span className="ml-auto font-bold text-[#1D2931]">No</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#1f7a39]" />
                Last Login: <span className="ml-auto font-bold text-[#1D2931]">Today</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
