"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import PhotoTable from "@/components/dashboard/tables/photos/table";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "Photo", link: "/dashboard/photo"},
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <PhotoTable/>
        </>
    );
}
