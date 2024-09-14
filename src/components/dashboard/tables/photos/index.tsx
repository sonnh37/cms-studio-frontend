import {columns} from "./columns";
import {DataTable} from "../../data-table/data-table";
import {fetchPhotos} from "@/services/photo-service";
import {Photo} from "@/types/photo";
import {StringObject} from "@/components/dashboard/tables/enum-string-object";

export default function DataTablePhotos() {
    return (
        <div className="space-y-6">
            <DataTable<Photo, any>
                stringObject={StringObject.Photo}
                columns={columns}
                fetchData={fetchPhotos}
            />
        </div>
    );
}
