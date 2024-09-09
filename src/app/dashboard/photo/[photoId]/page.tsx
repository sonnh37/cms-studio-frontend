"use client";
import {Breadcrumbs} from "@/components/user/breadcrumb";
import {PhotoForm} from "@/components/dashboard/tables/photos/form";
import {Photo} from "@/types/photo";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Page({params}: { params: { photoId: string } }) {
    const [photo, setPhoto] = useState<Photo | null>(null);

    // Fetch photo data when params.photoId changes
    useEffect(() => {
        if (params.photoId) {
            axios
                .get(`https://localhost:7192/photo-management/photos/${params.photoId}`)
                .then((response) => {
                    setPhoto(response.data.result);
                })
                .catch((err) => {
                    console.error("Failed to fetch photo data", err);
                });
        }
    }, [params.photoId]);

    // Set breadcrumb items based on params.photoId and photo data
    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Photo", link: "/dashboard/photo"},
        {title: `${params.photoId}`, link: `/dashboard/photo/${params.photoId}`},
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <PhotoForm initialData={photo}/>
        </>
    );
}
