"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import AlbumTable from "@/components/dashboard/tables/albums/table";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Album', link: '/dashboard/album'}
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <AlbumTable/>
        </>
    );
}


