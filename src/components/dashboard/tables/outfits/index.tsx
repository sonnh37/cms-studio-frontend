import {columns} from "./columns";
import {DataTable} from "../../data-table/data-table";
import {fetchOutfits} from "@/services/outfit-service";
import {Outfit} from "@/types/outfit";
import {StringObject} from "@/components/dashboard/tables/enum-string-object";

export default function DataTableOutfits() {
    return (
        <div className="space-y-6">
            <DataTable<Outfit, any>
                stringObject={StringObject.Outfit}
                columns={columns}
                fetchData={fetchOutfits}
            />
        </div>
    );
}
