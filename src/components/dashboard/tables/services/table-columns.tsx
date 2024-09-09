import {createTableColumnsBase} from "@/components/dashboard/base-table-column";
import {TableCell} from "@/components/ui/table";
import {Service} from "@/types/service";
import Image from "next/image";

export const createTableServiceColumns = () => {
    const baseColumns = createTableColumnsBase();

    const serviceColumns = [
        {
            key: "background",
            label: "Background",
            className: "",
            isDisplay: true,
            render: (item: Service) => (
                <TableCell key="background" className="hidden sm:table-cell">
                    <Image
                        alt={`${item.name} image`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item.src || "/placeholder.svg"}
                        width="64"
                    />
                </TableCell>
            ),
        },
        {
            key: "name",
            label: "Name",
            className: "",
            isDisplay: true,
            render: (item: Service) => (
                <TableCell key="name" className="font-medium">
                    {item.name || "No Name"}
                </TableCell>
            ),
        },
        {
            key: "description",
            label: "Description",
            className: "hidden md:table-cell",
            isDisplay: true,
            render: (item: Service) => (
                <TableCell key="description">{item.description || "N/A"}</TableCell>
            ),
        },
        {
            key: "price",
            label: "Price",
            className: "hidden md:table-cell",
            isDisplay: true,
            render: (item: Service) => (
                <TableCell key="price">
                    {item.price != null ? `$${item.price.toFixed(2)}` : "N/A"}
                </TableCell>
            ),
        },
        {
            key: "duration",
            label: "Duration",
            className: "hidden md:table-cell",
            isDisplay: true,
            render: (item: Service) => (
                <TableCell key="duration">
                    {item.duration || "N/A"}
                </TableCell>
            ),
        },
        {
            key: "promotion",
            label: "Promotion",
            className: "hidden md:table-cell",
            isDisplay: true,
            render: (item: Service) => (
                <TableCell key="promotion">
                    {item.promotion || "None"}
                </TableCell>
            ),
        },
    ];

    // Kết hợp các cột cơ bản với các cột riêng biệt cho Service
    return [...serviceColumns, ...baseColumns];
};