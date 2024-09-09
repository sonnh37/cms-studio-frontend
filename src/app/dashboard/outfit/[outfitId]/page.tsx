"use client";
import {Breadcrumbs} from "@/components/user/breadcrumb";
import {OutfitForm} from "@/components/dashboard/tables/outfits/form";
import {Outfit} from "@/types/outfit";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Page({params}: { params: { outfitId: string } }) {
    const [outfit, setOutfit] = useState<Outfit | null>(null);

    // Fetch outfit data when params.outfitId changes
    useEffect(() => {
        if (params.outfitId) {
            axios.get(`https://localhost:7192/outfits/${params.outfitId}`)
                .then(response => {
                    setOutfit(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch outfit data', err);
                });
        }
    }, [params.outfitId]);

    // Set breadcrumb items based on params.outfitId and outfit data
    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Outfit', link: '/dashboard/outfit'},
        {title: `${params.outfitId}`, link: `/dashboard/outfit/${params.outfitId}`}
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <OutfitForm initialData={outfit}/>
        </>
    );
}
