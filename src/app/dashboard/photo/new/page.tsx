"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import {PhotoForm} from "@/components/dashboard/tables/photos/form";

const breadcrumbItems = [
    {title: "Dashboard", link: "/dashboard"},
    {title: "Photo", link: "/dashboard/photo"},
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <PhotoForm initialData={null}/>
        </>
    );
}
