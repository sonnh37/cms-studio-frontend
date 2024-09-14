import {columns} from "./columns";
import {DataTable} from "../../data-table/data-table";
import {fetchAlbums} from "@/services/album-service";
import {Album} from "@/types/album";
import {StringObject} from "@/components/dashboard/tables/enum-string-object";

export default function DataTableAlbums() {
    return (
        <div className="space-y-6">
            <DataTable<Album, any>
                stringObject={StringObject.Album}
                columns={columns}
                fetchData={fetchAlbums}
            />
        </div>
    );
}
