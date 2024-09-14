"use client";

import {ContentLayout} from "@/components/dashboard/content-layout";
import {HomeDashboard} from "@/components/dashboard/sections/home-dashboard";
import {Breadcrumbs} from "@/components/user/breadcrumb";

const breadcrumbItems = [{title: "Dashboard", link: "/dashboard"}];
export default function Page() {
    return (
        <ContentLayout title="Dashboard">
            <Breadcrumbs items={breadcrumbItems}/>
            <HomeDashboard/>
        </ContentLayout>
    );
}
