import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { redirect } from "next/navigation";
import { authenticateAdmin } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await authenticateAdmin();
  const isAuthenticated = Boolean(auth);

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <main className="flex-1 p-4 md:p-8 max-w-screen-2xl mx-auto w-full overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
