enum SortOrder {
    Ascending = 'Ascending',
    Descending = 'Descending'
}

interface PagedResponse<TResult> {
    results?: TResult[];
    totalPages?: number;
    totalRecordsPerPage?: number;
    totalRecords?: number;
    pageNumber?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: SortOrder;
}