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
import {fetchPhotos} from "@/services/photo-service";
import {Photo} from "@/types/photo";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import axios from "axios";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import TabsListCustom from "@/components/dashboard/tabs-list";
import BaseTable from "@/components/dashboard/base-table";
import {createTablePhotoColumns} from "./table-columns";

export default function PhotoTable() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [queryParams, setQueryParams] = useState<PhotoGetAllQuery>({
        pageNumber: 1,
        pageSize: 10,
        sortOrder: 1,
        isPagination: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPhotos(queryParams);
                setPhotos(result);
            } catch (error) {
                console.error("Failed to fetch photos:", error);
            }
        };

        fetchData();
    }, [queryParams]);

    const tableColumns = createTablePhotoColumns();

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
                        href="/dashboard/photo/new"
                    >
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="fill-primary-foreground h-3.5 w-3.5"/>
                            Add Photo
                        </Button>
                    </Link>
                </div>
            </div>
            <TabsContent value="all">
                <BaseTable
                    tableHeadings={tableColumns.filter((col) => col.isDisplay)}
                    tableRows={<PhotoTableCustom photos={photos} tableHeadings={tableColumns}/>}
                    label={"photo"}
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
    photos: Photo[];
    tableHeadings: any[];
}

function PhotoTableCustom({photos, tableHeadings}: TableRowsCustomProps) {
    const router = useRouter();

    const handleEditClick = (photoId: string) => {
        router.push(`/dashboard/photo/${photoId}`);
    };

    const handlePhotosClick = (photoId: string) => {
        router.push(`/dashboard/photo/${photoId}/photos`);
    };

    const handleDeleteClick = async (photoId: string) => {
        try {
            const response = await axios.delete(`https://localhost:7192/photos`, {
                params: {Id: photoId},
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Photo deleted successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(`Failed to delete photo with ID: ${photoId}`, error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete photo. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>
            {photos.map((photo: Photo) => (
                <TableRow key={photo.id}>
                    {tableHeadings
                        .filter((col) => col.isDisplay)
                        .map((col) => (
                            <React.Fragment key={col.key}>{col.render(photo)}</React.Fragment>
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
                                <DropdownMenuItem onClick={() => handlePhotosClick(photo.id)}>
                                    Photos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditClick(photo.id)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(photo.id)}>
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
