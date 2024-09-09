"use client";

import {Breadcrumbs} from "@/components/user/breadcrumb";
import OutfitTable from "@/components/dashboard/tables/outfits/table";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Outfit', link: '/dashboard/outfit'}
];

export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <OutfitTable/>
        </>
    );
}


