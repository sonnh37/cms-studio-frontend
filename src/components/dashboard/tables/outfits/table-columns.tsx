import {createTableColumnsBase} from "@/components/dashboard/base-table-column";
import {TableCell} from "@/components/ui/table";
import {Outfit} from "@/types/outfit";

export const createTableOutfitColumns = () => {
    const baseColumns = createTableColumnsBase();

    const outfitColumns = [
        {
            key: "sku",
            label: "SKU",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="sku">
                    {item.sku || "No SKU"}
                </TableCell>
            ),
        },
        {
            key: "name",
            label: "Name",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="name" className="font-medium">
                    {item.name || "No Name"}
                </TableCell>
            ),
        },
        {
            key: "price",
            label: "Price",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="price">
                    {item.price ? `$${item.price.toFixed(2)}` : "N/A"}
                </TableCell>
            ),
        },
        {
            key: "description",
            label: "Description",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="description">
                    {item.description || "N/A"}
                </TableCell>
            ),
        },
        {
            key: "categoryId",
            label: "Category",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="category">
                    {item.categoryId ?? "No Category"}
                </TableCell>
            ),
        },
        {
            key: "sizeId",
            label: "Size",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="size">
                    {item.sizeId ?? "No Size"}
                </TableCell>
            ),
        },
        {
            key: "colorId",
            label: "Color",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="color">
                    {item.colorId ?? "No Color"}
                </TableCell>
            ),
        },
        {
            key: "status",
            label: "Status",
            isDisplay: true,
            render: (item: Outfit) => (
                <TableCell key="status">
                    {item.status}
                </TableCell>
            ),
        },
    ];

    // Kết hợp các cột cơ bản với các cột riêng biệt cho Outfit
    return [...outfitColumns, ...baseColumns];
};
