import {createTableColumnsBase} from "@/components/dashboard/base-table-column";
import {TableCell} from "@/components/ui/table";
import {Album} from "@/types/album";
import Image from "next/image";

export const createTableAlbumColumns = () => {
    const baseColumns = createTableColumnsBase();

    const albumColumns = [
        {
            key: "background",
            label: "Background",
            className: "",
            isDisplay: true,
            render: (item: Album) => (
                <TableCell key="background" className="hidden sm:table-cell">
                    <Image
                        alt={`${item.title} image`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item.background || "/placeholder.svg"}
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
            render: (item: Album) => (
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
            render: (item: Album) => (
                <TableCell key="description">{item.description || "N/A"}</TableCell>
            ),
        },
        // Bạn có thể thêm các cột tùy chỉnh khác cho Album tại đây
    ];

    // Kết hợp các cột cơ bản với các cột riêng biệt cho Album
    return [...albumColumns, ...baseColumns];
};