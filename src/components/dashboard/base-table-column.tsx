import {TableCell} from "@/components/ui/table";
import {BaseEntity} from "@/types/base"

export const createTableColumnsBase = () => {
    return [
        {
            key: "id",
            label: "ID",
            isDisplay: false,
            render: (item: BaseEntity) => (
                <TableCell key="id">
                    {item.id}
                </TableCell>
            ),
        },
        {
            key: "createdBy",
            label: "Created By",
            isDisplay: false,  // Có thể chuyển thành false nếu muốn ẩn
            render: (item: BaseEntity) => (
                <TableCell key="createdBy">
                    {item.createdBy || "Unknown"}
                </TableCell>
            ),
        },
        {
            key: "createdDate",
            label: "Created Date",
            isDisplay: true,
            render: (item: BaseEntity) => (
                <TableCell key="createdDate">
                    {item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A"}
                </TableCell>
            ),
        },
        {
            key: "isDeleted",
            label: "Is Deleted",
            isDisplay: true,
            render: (item: BaseEntity) => (
                <TableCell key="isDeleted">
                    {item.isDeleted ? "Deleted" : "Active"}
                </TableCell>
            ),
        },
        // Các cột tùy chỉnh khác...
    ];
};
