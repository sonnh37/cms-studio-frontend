"use client";
import { Breadcrumbs } from "@/components/common/breadcrumb";
import { AlbumForm } from "@/components/forms/album-form";
import { Album } from "@/types/album";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { albumId: string } }) {
    const [album, setAlbum] = useState<Album | null>(null);

    // Fetch album data when params.albumId changes
    useEffect(() => {
        if (params.albumId) {
            axios.get(`https://localhost:7192/album-management/albums/${params.albumId}`)
                .then(response => {
                    setAlbum(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch album data', err);
                });
        }
    }, [params.albumId]);

    // Set breadcrumb items based on params.albumId and album data
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Album', link: '/dashboard/album' },
        { title: `${params.albumId}`, link: `/dashboard/album/${params.albumId}` }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <AlbumForm initialData={album} />
        </>
    );
}
