"use client";
import {TableCell, TableRow} from "@/components/ui/table";
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
import {fetchOutfits} from "@/services/outfit-service";
import {Outfit} from "@/types/outfit";
import {OutfitGetAllQuery} from "@/types/queries/outfit-query";
import axios from "axios";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import TabsListCustom from "@/components/dashboard/tabs-list";
import BaseTable from "@/components/dashboard/base-table";
import {createTableOutfitColumns} from "./table-columns";

export default function OutfitTable() {
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [queryParams, setQueryParams] = useState<OutfitGetAllQuery>({
        pageNumber: 1,
        pageSize: 10,
        sortOrder: 1,
        isPagination: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchOutfits(queryParams);
                setOutfits(result);
            } catch (error) {
                console.error("Failed to fetch outfits:", error);
            }
        };

        fetchData();
    }, [queryParams]);

    const tableColumns = createTableOutfitColumns();

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
                        href="/dashboard/outfit/new"
                    >
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="fill-primary-foreground h-3.5 w-3.5"/>
                            Add Outfit
                        </Button>
                    </Link>
                </div>
            </div>
            <TabsContent value="all">
                <BaseTable
                    tableHeadings={tableColumns.filter((col) => col.isDisplay)}
                    tableRows={<OutfitTableCustom outfits={outfits} tableHeadings={tableColumns}/>}
                    label={"outfit"}
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
    outfits: Outfit[];
    tableHeadings: any[];
}

function OutfitTableCustom({outfits, tableHeadings}: TableRowsCustomProps) {
    const router = useRouter();

    const handleEditClick = (outfitId: string) => {
        router.push(`/dashboard/outfit/${outfitId}`);
    };

    const handlePhotosClick = (outfitId: string) => {
        router.push(`/dashboard/outfit/${outfitId}/photos`);
    };

    const handleDeleteClick = async (outfitId: string) => {
        try {
            const response = await axios.delete(`https://localhost:7192/outfits`, {
                params: {Id: outfitId},
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Outfit deleted successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(`Failed to delete outfit with ID: ${outfitId}`, error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete outfit. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>
            {outfits.map((outfit: Outfit) => (
                <TableRow key={outfit.id}>
                    {tableHeadings
                        .filter((col) => col.isDisplay)
                        .map((col) => (
                            <React.Fragment key={col.key}>{col.render(outfit)}</React.Fragment>
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
                                <DropdownMenuItem onClick={() => handlePhotosClick(outfit.id)}>
                                    Photos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditClick(outfit.id)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(outfit.id)}>
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
