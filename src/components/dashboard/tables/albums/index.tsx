import {columns} from "./columns";
import {DataTable} from "../../data-table";
import {fetchAlbums} from "@/services/album-service";
import {Album} from "@/types/album";

export default function DataTableAlbums() {
    return (
        <div className="container mx-auto py-10">
            <DataTable<Album, any>
                columns={columns}
                fetchData={fetchAlbums}
            />
        </div>
    );
}
