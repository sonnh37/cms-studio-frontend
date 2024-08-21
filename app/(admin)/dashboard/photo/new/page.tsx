"use client";

import { Breadcrumbs } from "@/components/common/breadcrumb";
import { PhotoForm } from "@/components/forms/photo-form";
import PhotoTable from "@/components/tables/photo-table";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Photo', link: '/dashboard/photo' }
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <PhotoForm initialData={null}/>
        </>
    );
}


