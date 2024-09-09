"use client";
import {Breadcrumbs} from "@/components/user/breadcrumb";
import RichEditor from "@/components/user/react-draft-wysiwyg";
import {Service} from "@/types/service";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Page({params}: { params: { serviceId: string } }) {
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        if (params.serviceId) {
            axios.get(`https://localhost:7192/service-management/services/${params.serviceId}`)
                .then(response => {
                    setService(response.data.result);
                })
                .catch(err => {
                    console.error('Failed to fetch service data', err);
                });
        }
    }, [params.serviceId]);

    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Service', link: '/dashboard/service'},
        {title: `${params.serviceId}`, link: `/dashboard/service/${params.serviceId}`}
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            {service && (
                <RichEditor
                    service={service} // Pass the entire service object
                />
            )}
        </>
    );
}
