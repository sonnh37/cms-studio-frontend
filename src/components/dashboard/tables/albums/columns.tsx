"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Album} from "@/types/album";
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


export const columns: ColumnDef<Album>[] = [
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
        accessorKey: "background",
        header: "Background Image",
        cell: ({row}) => {
            const backgroundUrl = row.getValue("background") as string; // Lấy URL của hình ảnh từ dữ liệu album
            return (
                <Link href={backgroundUrl}>
                    <Image
                        alt={`Album background`}
                        className="aspect-square rounded-md object-cover"
                        height={64}
                        width={64}
                        src={backgroundUrl} // Sử dụng đường dẫn hình ảnh từ dữ liệu
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: "createdDate",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Data created"/>
        ),
        cell: ({ row }) => {
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
        cell: ({ row }) => {
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
                        <DropdownMenuItem>View details</DropdownMenuItem>
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
