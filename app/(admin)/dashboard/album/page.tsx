"use client";

import { Breadcrumbs } from "@/components/common/breadcrumb";
import AlbumTable from "@/components/tables/album-table";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Album', link: '/dashboard/album' }
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <AlbumTable />
        </>
    );
}


