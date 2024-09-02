"use client"
import { Breadcrumbs } from "@/components/common/breadcrumb";
import { AlbumForm } from "@/components/forms/album-form";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Album', link: '/dashboard/album' }
];
export default function Page() {
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <AlbumForm initialData={null} />
        </>
    )
}
