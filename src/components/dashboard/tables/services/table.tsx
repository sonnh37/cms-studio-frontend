"use client";
import {Badge} from "@/components/ui/badge";
import {TableCell, TableRow} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import {File, ListFilter, MoreHorizontal, PlusCircle} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {fetchServices} from "@/services/service-service";
import {Service} from "@/types/service";
import {ServiceGetAllQuery} from "@/types/queries/service-query";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import Swal from "sweetalert2";
import TabsListCustom from "@/components/dashboard/tabs-list";
import BaseTable from "@/components/dashboard/base-table";
import React from "react";
import {createTableServiceColumns} from "./table-columns";

export default function ServiceTable() {
    const [services, setServices] = useState<Service[]>([]);
    const [queryParams, setQueryParams] = useState<ServiceGetAllQuery>({
        pageNumber: 1,
        pageSize: 10,
        sortOrder: 1,
        isPagination: true,
        isActive: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchServices(queryParams);
                setServices(result);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };

        fetchData();
    }, [queryParams]);

    const tableColumns = createTableServiceColumns();

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsListCustom tabs={tabs}/>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5"/>
                                <span className="sm:whitespace-nowrap">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5"/>
                        <span className=" sm:whitespace-nowrap">Export</span>
                    </Button>
                    <Link
                        className="text-primary-foreground sm:whitespace-nowrap"
                        href="/dashboard/service/new"
                    >
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="fill-primary-foreground h-3.5 w-3.5"/>
                            Add Service
                        </Button>
                    </Link>
                </div>
            </div>
            <TabsContent value="all">
                <BaseTable
                    tableHeadings={tableColumns.filter((col) => col.isDisplay)}
                    tableRows={<ServiceTableCustom services={services} tableHeadings={tableColumns}/>}
                    label={"service"}
                />
            </TabsContent>
        </Tabs>
    );
}

const tabs = [
    {value: "all", label: "All"},
    {value: "active", label: "Active"},
    {value: "draft", label: "Draft"},
    {value: "archived", label: "Archived", className: "hidden sm:flex"},
];

interface TableRowsCustomProps {
    services: Service[];
    tableHeadings: any[];
}

function ServiceTableCustom({services, tableHeadings}: TableRowsCustomProps) {
    const router = useRouter();

    const handleEditClick = (serviceId: string) => {
        router.push(`/dashboard/service/${serviceId}`);
    };

    const handlePhotosClick = (serviceId: string) => {
        router.push(`/dashboard/service/${serviceId}/photos`);
    };

    const handleDeleteClick = async (serviceId: string) => {
        try {
            const response = await axios.delete(`https://localhost:7192/services`, {
                params: {Id: serviceId},
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Service deleted successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(`Failed to delete service with ID: ${serviceId}`, error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete service. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>
            {services.map((service: Service) => (
                <TableRow key={service.id}>
                    {tableHeadings
                        .filter((col) => col.isDisplay)
                        .map((col) => (
                            <React.Fragment key={col.key}>{col.render(service)}</React.Fragment>
                        ))}
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handlePhotosClick(service.id)}>
                                    Photos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditClick(service.id)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(service.id)}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
