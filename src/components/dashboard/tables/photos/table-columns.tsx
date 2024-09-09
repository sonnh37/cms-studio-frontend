import {createTableColumnsBase} from "@/components/dashboard/base-table-column";
import {TableCell} from "@/components/ui/table";
import {Photo} from "@/types/photo";
import Image from "next/image";

export const createTablePhotoColumns = () => {
    const baseColumns = createTableColumnsBase();

    const photoColumns = [
        {
            key: "background",
            label: "Background",
            className: "",
            isDisplay: true,
            render: (item: Photo) => (
                <TableCell key="background" className="hidden sm:table-cell">
                    <Image
                        alt={`${item.title} image`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item.src || "/placeholder.svg"}
                        width="64"
                    />
                </TableCell>
            ),
        },
        {
            key: "title",
            label: "Title",
            className: "",
            isDisplay: true,
            render: (item: Photo) => (
                <TableCell key="title" className="font-medium">
                    {item.title || "No Title"}
                </TableCell>
            ),
        },
        {
            key: "description",
            label: "Description",
            className: "hidden md:table-cell",
            isDisplay: true,
            render: (item: Photo) => (
                <TableCell key="description">{item.description || "N/A"}</TableCell>
            ),
        },
        {
            key: "href",
            label: "Href",
            className: "",
            isDisplay: true,
            render: (item: Photo) => (
                <TableCell key="href" className="font-medium">
                    {item.href || "No Href"}
                </TableCell>
            ),
        },
        {
            key: "tag",
            label: "Tag",
            className: "",
            isDisplay: true,
            render: (item: Photo) => (
                <TableCell key="tag" className="font-medium">
                    {item.tag || "No Tag"}
                </TableCell>
            ),
        },
    ];

    // Kết hợp các cột cơ bản với các cột riêng biệt cho Photo
    return [...photoColumns, ...baseColumns];
};