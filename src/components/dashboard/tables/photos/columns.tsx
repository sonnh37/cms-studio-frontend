"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Photo} from "@/types/photo";
import React from "react";
import {MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Checkbox} from "@/components/ui/checkbox";
import {DataTableColumnHeader} from "@/components/dashboard/data-table/data-table-column-header";
import axios from "axios";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";


export const columns: ColumnDef<Photo>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Title"/>
        )
    },
    {
        accessorKey: "description",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Description"/>
        ),
    },
    {
        accessorKey: "src",
        header: "Src Image",
        cell: ({row}) => {
            const backgroundUrl = row.getValue("src") as string;
            return (
                <Link href={backgroundUrl}>
                    <Image
                        alt={`Photo background`}
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        width={64}
                        src={backgroundUrl}
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: "href",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Href link to"/>
        ),
    },
    {
        accessorKey: "tag",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tag"/>
        ),
    },
    {
        accessorKey: "createdDate",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Data created"/>
        ),
        cell: ({row}) => {
            const date = new Date(row.getValue("createdDate"));
            return date.toLocaleDateString('en-US', {
                weekday: 'short', // Thu
                year: 'numeric',  // 2022
                month: 'short',   // Oct
                day: 'numeric'    // 20
            });
        }
    },
    {
        accessorKey: "isDeleted",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title=""/>
        ),
        cell: ({row}) => {
            const isDeleted = row.getValue("isDeleted") as boolean;
            if (!isDeleted) {
                return (
                    <Badge variant="secondary">Active</Badge>
                );
            }
            return (
                <Badge variant="destructive">Deactivate</Badge>
            );
        },
        filterFn: (row, id, value) => {
            const isDeletedValue = row.getValue(id) as boolean;
            return value.includes(isDeletedValue.toString()); // Chuyển đổi boolean sang string để so sánh
        },
        enableGlobalFilter: false
    },
    {
        id: "actions",
        cell: ({row}) => {
            const model = row.original

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(model.id)}
                        >
                            Copy model ID
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePhotosClick(model.id)}>
                            View photos
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>

                        <DropdownMenuItem onClick={() => handleEditClick(model.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(model.id)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
