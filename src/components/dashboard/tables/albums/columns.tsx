// import {createTableColumnsBase} from "@/components/dashboard/base-table-column";
// import {TableCell} from "@/components/ui/table";
// import {Album} from "@/types/album";
// import Image from "next/image";
//
// export const createTableAlbumColumns = () => {
//     const baseColumns = createTableColumnsBase();
//
//     const albumColumns = [
//         {
//             key: "background",
//             label: "Background",
//             className: "",
//             isDisplay: true,
//             render: (item: Album) => (
//                 <TableCell key="background" className="hidden sm:table-cell">
//                     <Image
//                         alt={`${item.title} image`}
//                         className="aspect-square rounded-md object-cover"
//                         height="64"
//                         src={item.background || "/placeholder.svg"}
//                         width="64"
//                     />
//                 </TableCell>
//             ),
//         },
//         {
//             key: "title",
//             label: "Title",
//             className: "",
//             isDisplay: true,
//             render: (item: Album) => (
//                 <TableCell key="title" className="font-medium">
//                     {item.title || "No Title"}
//                 </TableCell>
//             ),
//         },
//         {
//             key: "description",
//             label: "Description",
//             className: "hidden md:table-cell",
//             isDisplay: true,
//             render: (item: Album) => (
//                 <TableCell key="description">{item.description || "N/A"}</TableCell>
//             ),
//         },
//         // Bạn có thể thêm các cột tùy chỉnh khác cho Album tại đây
//     ];
//
//     // Kết hợp các cột cơ bản với các cột riêng biệt cho Album
//     return [...albumColumns, ...baseColumns];
// };


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
import {DataTableColumnHeader} from "@/components/dashboard/data-table-column-header";
import axios from "axios";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";


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
