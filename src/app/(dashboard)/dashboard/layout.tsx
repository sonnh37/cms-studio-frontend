"use client";
import AdminPanelLayout from "@/components/dashboard/admin-panel-layout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import {RefreshProvider} from "@/components/dashboard/refresh-context";

const queryClient = new QueryClient();

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <RefreshProvider>
            <QueryClientProvider client={queryClient}>
                <AdminPanelLayout>{children}</AdminPanelLayout>
            </QueryClientProvider>
        </RefreshProvider>

    );
}
