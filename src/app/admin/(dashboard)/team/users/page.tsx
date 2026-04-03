"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAdminLocale } from "@/lib/store/features/adminLocaleSlice";
import { LocaleCode } from "@/types/localization";
import { ADMIN_TRANSLATIONS } from "@/lib/translations";
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  Mail, 
  CheckCircle2, 
  XCircle,
  Loader2,
  RefreshCw,
  Plus
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const currentLocale = useSelector(selectAdminLocale) as LocaleCode;
  const t = ADMIN_TRANSLATIONS[currentLocale] || ADMIN_TRANSLATIONS.en;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "sales_crm" });
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddDialogOpen(false);
        setNewUser({ name: "", email: "", role: "sales_crm" });
        fetchUsers();
        // Show success with generated password
        alert(`${t.team.add_success_alert}\n\n${t.team.temp_password_label}: ${data.generatedPassword}`);
      } else {
        // Show specific error from server
        alert(data.error || t.team.add_error_generic);
      }
    } catch (error) {
      alert(t.team.add_error_network);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleUserStatus = async (user: User) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user._id, isActive: !user.isActive }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const r = role?.toLowerCase() || "sales_crm";
    switch (r) {
      case "super_admin":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none shadow-none text-[10px] font-black uppercase tracking-wider px-2">Super Admin</Badge>;
      case "content_manager":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none shadow-none text-[10px] font-black uppercase tracking-wider px-2">Editor</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none text-[10px] font-black uppercase tracking-wider px-2">Sales CRM</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1D2931]">{t.team.title}</h1>
          <p className="text-sm text-muted-foreground">{t.team.desc}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsers} 
            disabled={loading}
            className="rounded-xl border-[#d7dfdb] text-[11px] font-black uppercase tracking-widest text-[#1D2931]"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            <span className="hidden ml-2 sm:inline">{t.team.refresh}</span>
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-[#37C100] hover:bg-[#2d9802] text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-[#37C100]/20">
                <UserPlus size={14} className="mr-2" />
                {t.team.add_member}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-[#d7dfdb] bg-white p-8">
              <form onSubmit={handleAddUser}>
                <DialogHeader className="mb-6 text-center">
                  <DialogTitle className="text-xl font-black uppercase tracking-tight text-[#1D2931]">{t.team.add_modal_title}</DialogTitle>
                  <DialogDescription className="text-sm">
                    {t.team.add_modal_desc}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.team.full_name}</label>
                    <Input 
                      placeholder="Jane Doe" 
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      required
                      className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb] px-4 py-6 text-sm focus:ring-[#37C100]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.team.email_address}</label>
                    <Input 
                      type="email" 
                      placeholder="jane@company.com" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      required
                      className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb] px-4 py-6 text-sm focus:ring-[#37C100]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.team.assigned_role}</label>
                    <Select 
                      value={newUser.role}
                      onValueChange={(val) => setNewUser({...newUser, role: val})}
                    >
                      <SelectTrigger className="rounded-2xl border-[#d7dfdb] bg-[#f9fafb] px-4 py-6 text-sm">
                        <SelectValue placeholder={t.team.select_role} />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-[#d7dfdb] bg-white text-xs font-bold uppercase tracking-tight">
                        <SelectItem value="super_admin">{t.team.roles_list.super_admin.title}</SelectItem>
                        <SelectItem value="content_manager">{t.team.roles_list.content_manager.title}</SelectItem>
                        <SelectItem value="sales_crm">{t.team.roles_list.sales_crm.title}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="mt-8">
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full rounded-2xl bg-[#1D2931] py-6 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-[#1D2931]/20 hover:bg-[#000]"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : t.team.create_btn}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-3xl border border-[#d7dfdb] bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#d7dfdb] bg-[#f9fafb]/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder={t.team.search_placeholder} 
              className="pl-10 rounded-xl border-[#d7dfdb] bg-white h-10 text-sm focus:ring-[#37C100]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#f9fafb]">
              <TableRow className="border-b border-[#d7dfdb] hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 h-10 px-6 py-4">{t.team.table_user}</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 h-10 px-6 py-4">{t.team.table_role}</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 h-10 px-6 py-4">{t.team.table_status}</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 h-10 px-6 py-4">{t.team.table_joined}</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60 h-10 px-6 py-4 text-right">{t.team.table_actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-[#d7dfdb]/50 animate-pulse">
                    <TableCell className="px-6 py-4"><div className="h-4 w-32 bg-gray-100 rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-20 bg-gray-100 rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-24 bg-gray-100 rounded" /></TableCell>
                    <TableCell className="px-6 py-4"><div className="h-4 w-8 bg-gray-100 rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground px-6 py-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="text-[#d7dfdb]" size={32} />
                      <p className="text-sm">{t.team.no_members}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user._id} className="border-b border-[#d7dfdb]/50 hover:bg-[#f9fafb]/30">
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf8df] text-[#1f7a39] font-black uppercase">
                          {user.name?.charAt(0) || user.email?.charAt(0) || "?"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-[#1D2931]">{user.name || "Unknown"}</span>
                          <span className="text-xs text-muted-foreground">{user.email || "No Email"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {user.isActive ? (
                          <div className="flex items-center gap-1.5 text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">{t.team.active}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">{t.team.deactivated}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#f4fbf1] hover:text-[#37C100]">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-[#d7dfdb] bg-white shadow-xl">
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-[#1D2931]/60">{t.team.member_actions}</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-[#d7dfdb]" />
                          <DropdownMenuItem className="text-sm py-2 hover:bg-[#f4fbf1] cursor-pointer" onClick={() => (window as any).location.href = `mailto:${user.email}`}>
                            <Mail size={14} className="mr-2" /> {t.team.email_user}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm py-2 hover:bg-[#f4fbf1] cursor-pointer" onClick={() => toggleUserStatus(user)}>
                            {user.isActive ? <XCircle size={14} className="mr-2 text-red-500" /> : <CheckCircle2 size={14} className="mr-2 text-green-500" />}
                            {user.isActive ? t.team.deactivate_btn : t.team.activate_btn}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
