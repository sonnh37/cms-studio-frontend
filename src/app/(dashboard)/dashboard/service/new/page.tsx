"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import {ServiceForm} from "@/components/dashboard/tables/services/form";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Service', link: '/dashboard/service'}
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <ServiceForm initialData={null}/>
        </>
    );
}


