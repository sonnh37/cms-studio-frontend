import NavbarDashboard from "@/components/dashboard/layout/navbar"
import SidebarDashboard from "@/components/dashboard/layout/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <div className="flex min-h-screen top-0 w-full flex-col bg-muted/40">
            <SidebarDashboard />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <NavbarDashboard />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    </section>
}