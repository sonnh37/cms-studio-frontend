"use client";
import NavbarDashboard from "@/components/dashboard/layouts/navbar-dashboard"
import SidebarDashboard from "@/components/dashboard/layouts/sidebar-dashboard"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from 'react';

const queryClient = new QueryClient();

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <section>
                <div className="flex min-h-screen top-0 w-full flex-col bg-muted/40">
                    <SidebarDashboard/>
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20">
                        <NavbarDashboard/>
                        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </QueryClientProvider>
    );
}
