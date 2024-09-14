"use client";
import {Breadcrumbs} from "@/components/user/breadcrumb";
import {AlbumForm} from "@/components/dashboard/tables/albums/create-update-form";
import {Album} from "@/types/album";
import axios from "axios";
import {useEffect, useState} from "react";
import {ContentLayout} from "@/components/dashboard/content-layout";

export default function Page({params}: { params: { albumId: string } }) {
    const [album, setAlbum] = useState<Album | null>(null);

    // Fetch album data when params.albumId changes
    useEffect(() => {
        if (params.albumId) {
            axios
                .get(`https://localhost:7192/albums/${params.albumId}`)
                .then((response) => {
                    setAlbum(response.data.result);
                })
                .catch((err) => {
                    console.error("Failed to fetch album data", err);
                });
        }
    }, [params.albumId]);

    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Album", link: "/dashboard/album"},
        {title: `${params.albumId}`, link: `/dashboard/album/${params.albumId}`},
    ];

    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <AlbumForm initialData={album}/>
            </div>
        </ContentLayout>
    );
}
