import {columns} from "./columns";
import {DataTable} from "../../data-table/data-table";
import {fetchServices} from "@/services/service-service";
import {Service} from "@/types/service";
import {StringObject} from "@/components/dashboard/tables/enum-string-object";

export default function DataTableServices() {
    return (
        <div className="space-y-6">
            <DataTable<Service, any>
                stringObject={StringObject.Service}
                columns={columns}
                fetchData={fetchServices}
            />
        </div>
    );
}
