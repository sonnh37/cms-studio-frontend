"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import ServiceTable from "@/components/dashboard/tables/services/table";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: '/dashboard/service'}
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <ServiceTable/>
        </>
    );
}


