"use client"
import {Breadcrumbs} from "@/components/user/breadcrumb";
import {OutfitForm} from "@/components/dashboard/tables/outfits/form";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Outfit', link: '/dashboard/outfit'}
];
export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <OutfitForm initialData={null}/>
        </>
    )
}
