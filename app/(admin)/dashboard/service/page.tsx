"use client";

import { Breadcrumbs } from "@/components/common/breadcrumb";
import ServiceTable from "@/components/tables/service-table";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' }
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <ServiceTable />
        </>
    );
}


