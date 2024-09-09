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
import {fetchAlbums} from "@/services/album-service";
import {Album} from "@/types/album";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import Swal from "sweetalert2";
import TabsListCustom from "@/components/dashboard/tabs-list";
import BaseTable from "@/components/dashboard/base-table";
import React from "react";
import {createTableAlbumColumns} from "./table-columns";

export default function AlbumTable() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [queryParams, setQueryParams] = useState<AlbumGetAllQuery>({
        pageNumber: 1,
        pageSize: 10,
        sortOrder: 1,
        isPagination: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchAlbums(queryParams);
                setAlbums(result);
            } catch (error) {
                console.error("Failed to fetch albums:", error);
            }
        };

        fetchData();
    }, [queryParams]);

    const tableColumns = createTableAlbumColumns();

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
                        href="/dashboard/album/new"
                    >
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="fill-primary-foreground h-3.5 w-3.5"/>
                            Add Album
                        </Button>
                    </Link>
                </div>
            </div>
            <TabsContent value="all">
                <BaseTable
                    tableHeadings={tableColumns.filter((col) => col.isDisplay)}
                    tableRows={<AlbumTableCustom albums={albums} tableHeadings={tableColumns}/>}
                    label={"album"}
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
    albums: Album[];
    tableHeadings: any[];
}

function AlbumTableCustom({albums, tableHeadings}: TableRowsCustomProps) {
    const router = useRouter();

    const handleEditClick = (albumId: string) => {
        router.push(`/dashboard/album/${albumId}`);
    };

    const handlePhotosClick = (albumId: string) => {
        router.push(`/dashboard/album/${albumId}/photos`);
    };

    const handleDeleteClick = async (albumId: string) => {
        try {
            const response = await axios.delete(`https://localhost:7192/albums`, {
                params: {Id: albumId},
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Album deleted successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(`Failed to delete album with ID: ${albumId}`, error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete album. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <>
            {albums.map((album: Album) => (
                <TableRow key={album.id}>
                    {tableHeadings
                        .filter((col) => col.isDisplay)
                        .map((col) => (
                            <React.Fragment key={col.key}>{col.render(album)}</React.Fragment>
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
                                <DropdownMenuItem onClick={() => handlePhotosClick(album.id)}>
                                    Photos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditClick(album.id)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(album.id)}>
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
