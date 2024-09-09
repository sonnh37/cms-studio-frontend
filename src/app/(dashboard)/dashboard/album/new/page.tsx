"use client"
import {Breadcrumbs} from "@/components/user/breadcrumb";
import {AlbumForm} from "@/components/dashboard/tables/albums/form";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/dashboard'},
    {title: 'Album', link: '/dashboard/album'}
];
export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <AlbumForm initialData={null}/>
        </>
    )
}
