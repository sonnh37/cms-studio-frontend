import {columns} from "./columns";
import {DataOnlyTable} from "@/components/dashboard/data-table/origin/data-only-table";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {Photo} from "@/types/photo";

const query: PhotoGetAllQuery = {
    isPagination: false,
}

interface PhotoProps {
    photos: Photo[];
}

export default function DataOnlyTablePhotos({photos}: PhotoProps) {
    return (
        <div className="space-y-6">
            <DataOnlyTable data={photos} columns={columns}/>
        </div>
    );
}
