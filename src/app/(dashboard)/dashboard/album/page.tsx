"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import DataTableAlbums from "@/components/dashboard/tables/albums";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Album', link: '/dashboard/album'}
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <DataTableAlbums/>
        </>
    );
}


