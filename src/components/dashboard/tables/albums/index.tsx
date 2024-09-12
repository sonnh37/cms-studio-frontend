import {columns} from "./columns";
import {DataTable} from "../../data-table/data-table";
import {fetchAlbums} from "@/services/album-service";
import {Album} from "@/types/album";
import {StringObject} from "@/components/dashboard/tables/enum-string-object";
import {Breadcrumbs} from "@/components/user/breadcrumb";

export default function DataTableAlbums() {
    const breadcrumbItems = [
        {title: 'Dashboard', link: '/dashboard'},
        {title: 'Album', link: '/dashboard/album'}
    ];
    return (
        <div className="container mx-auto py-10 space-y-2">
            <Breadcrumbs items={breadcrumbItems}/>
            <DataTable<Album, any>
                stringObject={StringObject.Album}
                columns={columns}
                fetchData={fetchAlbums}
            />
        </div>
    );
}
